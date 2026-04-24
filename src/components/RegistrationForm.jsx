import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { startGatewayCheckout } from "./PaymentGateway";
import { declarationCheckboxText } from "../content/conferencePolicies";
import {
  loadRegistrationDraft,
  saveRegistrationDraft,
  clampStep,
} from "../lib/registrationStorage";

const DEFAULT_FORM = {
  fullName: "",
  affiliation: "",
  designation: "UG Student",
  country: "",
  email: "",
  contactNumber: "",
  participantType: "Author",
  paperId: "",
  paperTitle: "",
  numAuthors: "",
  subCategory: "UG / PG / PhD Student",
  region: "South Asian",
  attendanceMode: "Offline",
  attendWorkshop: "No",
  modeOfPayment: "",
  transactionId: "",
  dateOfPayment: "",
  declaration: false,
};

const FX_API_URL = "https://fxapi.app/api/INR/USD.json";
const DEFAULT_USD_TO_INR = 90;
const LATE_FEE_MULTIPLIER = 1.2;

function roundToNearestRupee(amount) {
  return Math.round(amount);
}

function isLateFeeActive(now = new Date()) {
  const year = now.getFullYear();
  const cutoff = new Date(year, 4, 5, 23, 59, 59, 999);
  return now > cutoff;
}

function getInitialRegistrationState() {
  const draft = loadRegistrationDraft();
  const formData = { ...DEFAULT_FORM, ...(draft?.formData ?? {}) };
  const currentStep = clampStep(draft?.currentStep);
  return { formData, currentStep };
}

function RegistrationForm() {
  const initial = getInitialRegistrationState();
  const [currentStep, setCurrentStep] = useState(initial.currentStep);
  const [paymentBusy, setPaymentBusy] = useState(false);
  const [formData, setFormData] = useState(initial.formData);
  const [usdToInrRate, setUsdToInrRate] = useState(DEFAULT_USD_TO_INR);
  const [fxLoaded, setFxLoaded] = useState(false);

  const [fee, setFee] = useState({ usd: 0, inr: 0 });

  const DESIGNATIONS = [
    "UG Student",
    "PG Student",
    "PhD Scholar",
    "Faculty / Researcher",
    "Industry / Professional",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    saveRegistrationDraft({
      version: 1,
      currentStep,
      formData,
    });
  }, [formData, currentStep]);

  useEffect(() => {
    let active = true;
    const loadFxRate = async () => {
      try {
        const response = await fetch(FX_API_URL);
        if (!response.ok) throw new Error("FX API request failed");
        const data = await response.json();
        const inrToUsd = Number(data?.rate);
        if (!Number.isFinite(inrToUsd) || inrToUsd <= 0) {
          throw new Error("Invalid FX rate");
        }
        const liveUsdToInr = 1 / inrToUsd;
        if (active) {
          setUsdToInrRate(liveUsdToInr);
          setFxLoaded(true);
        }
      } catch (error) {
        console.error("Unable to fetch live FX rate; using fallback", error);
        if (active) {
          setUsdToInrRate(DEFAULT_USD_TO_INR);
          setFxLoaded(true);
        }
      }
    };
    loadFxRate();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let usd = 0;

    const isAuthor = formData.participantType === "Author";
    const isStudent = formData.subCategory === "UG / PG / PhD Student";
    const isSouthAsian = formData.region === "South Asian";
    const wantsWorkshop = formData.attendWorkshop === "Yes";

    if (isAuthor) {
      if (isStudent) {
        usd = isSouthAsian ? 80 : 150;
      } else {
        usd = isSouthAsian ? 120 : 200;
      }
    } else {
      if (isStudent) {
        usd = isSouthAsian ? 50 : 75;
      } else {
        usd = isSouthAsian ? 60 : 100;
      }
    }

    if (wantsWorkshop) {
      usd += 20;
    }

    if (isLateFeeActive()) {
      usd *= LATE_FEE_MULTIPLIER;
    }

    const finalUsd = Math.round(usd * 100) / 100;
    const inr = roundToNearestRupee(finalUsd * usdToInrRate);
    setFee({ usd: finalUsd, inr });
  }, [
    formData.participantType,
    formData.subCategory,
    formData.region,
    formData.attendWorkshop,
    usdToInrRate,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.declaration) {
      alert("Please accept the declaration to continue to payment.");
      return;
    }

    const registrationPayload = {
      ...formData,
      totalFeeUsd: fee.usd,
      totalFeeInr: fee.inr,
    };

    sessionStorage.setItem("pendingRegistration", JSON.stringify(registrationPayload));

    setPaymentBusy(true);
    try {
      await startGatewayCheckout({
        amount: fee.inr,
        currency: "INR",
        registrationData: registrationPayload,
      });
    } catch (err) {
      console.error(err);
      alert(err?.message || "Could not start payment. Please try again.");
      sessionStorage.removeItem("pendingRegistration");
      setPaymentBusy(false);
    }
  };

  const validateStep1 = () => {
    if (!formData.fullName || !formData.affiliation || !formData.country || !formData.email || !formData.contactNumber) {
      alert("Please fill all required fields in Participant Information.");
      return false;
    }
    if (formData.participantType === "Author") {
      if (!formData.paperId || !formData.paperTitle || !formData.numAuthors) {
        alert("Please fill all required Author Details.");
        return false;
      }
    }
    return true;
  };

  const validateStep2 = () => {
    // Dropdowns and radios always have a value default
    return true; 
  };

  const nextStep = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <>
      <div className="bg-white rounded shadow-sm p-8 mt-8 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          2AI Conference Registration
        </h3>
        <p className="text-sm text-gray-600 mb-8 text-center">
          (Based on Approved Fee Structure)
        </p>
        <p className="text-sm text-gray-600 mb-2 text-center">
          Exchange rate: 1 USD = ₹ {usdToInrRate.toFixed(2)} {fxLoaded ? "(live)" : "(loading...)"}
        </p>
        {isLateFeeActive() && (
          <p className="text-sm text-red-600 mb-8 text-center font-semibold">
            Late fee active: 20% added to registration fee after May 5.
          </p>
        )}

      {/* Stepper Progress */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center font-bold rounded-full border-2 
                ${
                  currentStep === step
                    ? "bg-[#1a56db] text-white border-[#1a56db]"
                    : currentStep > step
                    ? "bg-[#16a34a] text-white border-[#16a34a]"
                    : "bg-gray-100 text-gray-400 border-gray-200"
                } transition-all duration-300 shadow-sm`}
            >
              {currentStep > step ? "✓" : step}
            </div>
            {index < 2 && (
              <div
                className={`w-12 md:w-20 h-1 
                  ${currentStep > step ? "bg-[#16a34a]" : "bg-gray-200"}
                  transition-colors duration-300`}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 min-h-[400px]">
        {/* ================= STEP 1: Participant & Category ================= */}
        {currentStep === 1 && (
          <div className="animate-fadeInDown">
            {/* A. Participant Information */}
            <section className="mb-8">
              <h4 className="text-lg font-bold text-[#1a56db] border-b border-gray-200 pb-2 mb-6">
                Step 1: Participant Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                    placeholder="Milad Ajaz Bhat"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Affiliation / Organization <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="affiliation"
                    value={formData.affiliation}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                    placeholder="University/Company"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Designation
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {DESIGNATIONS.map((desig) => (
                      <label key={desig} className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer bg-gray-50 hover:bg-blue-50 p-3 rounded border border-gray-200 transition-colors">
                        <input
                          type="radio"
                          name="designation"
                          value={desig}
                          checked={formData.designation === desig}
                          onChange={handleChange}
                          className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                        />
                        <span className="font-medium">{desig}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                    placeholder="Your Country"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                    placeholder="you@domain.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Contact Number (with country code) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>
            </section>

            {/* B. Registration Category */}
            <section className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Registration Category
              </h4>
              <div className="flex flex-wrap gap-4">
                {["Author", "Non-Author"].map((type) => (
                  <label key={type} className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer bg-white p-3 border border-gray-200 rounded shadow-sm hover:border-blue-500 hover:bg-blue-50 transition-colors">
                    <input
                      type="radio"
                      name="participantType"
                      value={type}
                      checked={formData.participantType === type}
                      onChange={handleChange}
                      className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    <span className="font-semibold">{type}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">
                Attendance Mode
              </h4>
              <div className="flex flex-wrap gap-4">
                {["Offline", "Online"].map((mode) => (
                  <label
                    key={mode}
                    className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer bg-white p-3 border border-gray-200 rounded shadow-sm hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <input
                      type="radio"
                      name="attendanceMode"
                      value={mode}
                      checked={formData.attendanceMode === mode}
                      onChange={handleChange}
                      className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    <span className="font-semibold">{mode}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* C. Author Details */}
            {formData.participantType === "Author" && (
              <section className="bg-blue-50 p-5 rounded-lg border border-blue-100 animate-slideDown">
                <h4 className="text-md font-bold text-[#1a56db] mb-4 flex items-center">
                  C. Author Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Paper ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="paperId"
                      value={formData.paperId}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Paper Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="paperTitle"
                      value={formData.paperTitle}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Number of Authors <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="numAuthors"
                      min="1"
                      value={formData.numAuthors}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </section>
            )}
          </div>
        )}

        {/* ================= STEP 2: Fee Selection & Workshop ================= */}
        {currentStep === 2 && (
          <div className="animate-fadeInDown">
            <h4 className="text-lg font-bold text-[#1a56db] border-b border-gray-200 pb-2 mb-6">
              Step 2: Fee Selection & Add-ons
            </h4>

            {/* D. Fee Category Selection */}
            <section className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-5 rounded border border-gray-200 shadow-sm">
                  <label className="block text-sm font-bold text-gray-800 mb-3 border-b pb-2">
                    Sub-Category
                  </label>
                  <div className="space-y-3">
                    {["UG / PG / PhD Student", "Others"].map((subCat) => (
                      <label key={subCat} className="flex items-center space-x-3 text-sm text-gray-700 cursor-pointer">
                        <input
                          type="radio"
                          name="subCategory"
                          value={subCat}
                          checked={formData.subCategory === subCat}
                          onChange={handleChange}
                          className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                        />
                        <span className="font-medium">{subCat === "Others" ? "Others (Faculty / Researcher / Industry)" : subCat}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-5 rounded border border-gray-200 shadow-sm">
                  <label className="block text-sm font-bold text-gray-800 mb-3 border-b pb-2">
                    Region
                  </label>
                  <div className="space-y-3">
                    {["South Asian", "Other Countries"].map((reg) => (
                      <label key={reg} className="flex items-center space-x-3 text-sm text-gray-700 cursor-pointer">
                        <input
                          type="radio"
                          name="region"
                          value={reg}
                          checked={formData.region === reg}
                          onChange={handleChange}
                          className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                        />
                        <span className="font-medium">{reg}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* F. Pre-Conference Workshop */}
            <section className="mb-8 bg-blue-50 p-5 rounded-lg border border-blue-100">
              <h4 className="text-md font-bold text-blue-900 mb-3">
                Pre-Conference Workshop (Optional)
              </h4>
              <p className="text-sm text-gray-700 mb-4">
                Do you want to attend the Pre-Conference Workshop on 17th June 2026?
              </p>
              <div className="flex gap-6">
                <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer bg-white p-3 rounded border border-gray-200 shadow-sm">
                  <input
                    type="radio"
                    name="attendWorkshop"
                    value="Yes"
                    checked={formData.attendWorkshop === "Yes"}
                    onChange={handleChange}
                    className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="font-semibold text-blue-700">
                    Yes (+ $20 / ₹ {roundToNearestRupee(20 * usdToInrRate)})
                  </span>
                </label>
                <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer bg-white p-3 rounded border border-gray-200 shadow-sm">
                  <input
                    type="radio"
                    name="attendWorkshop"
                    value="No"
                    checked={formData.attendWorkshop === "No"}
                    onChange={handleChange}
                    className="text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="font-semibold">No, Thanks</span>
                </label>
              </div>
            </section>

            {/* E. Auto-Calculated Fee */}
            <section className="bg-orange-50 border-2 border-orange-300 p-6 rounded-lg text-center shadow-sm">
              <h4 className="text-sm font-bold text-gray-600 uppercase tracking-widest mb-2 flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>Total Payable Amount</span>
              </h4>
              <div className="text-4xl font-extrabold text-[#1a56db] animate-zoomFadeIn">
                ₹ {fee.inr} <span className="text-2xl text-gray-500 font-bold ml-2">($ {fee.usd})</span>
              </div>
            </section>
          </div>
        )}

        {/* ================= STEP 3: Payment & Declaration ================= */}
        {currentStep === 3 && (
          <div className="animate-fadeInDown">
            <h4 className="text-lg font-bold text-[#1a56db] border-b border-gray-200 pb-2 mb-6">
              Step 3: Payment & Declaration
            </h4>

            <div className="bg-[#1a56db] text-white rounded p-4 mb-6 text-center shadow">
              <p className="text-sm opacity-90 mb-1">Amount due</p>
              <p className="text-2xl font-bold">
                ₹ {fee.inr} ($ {fee.usd})
              </p>
            </div>

            <section className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-sm font-semibold text-gray-800 mb-2">Secure online payment</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Use the button below to open the payment portal, complete your transaction, and return here to finish
                registration automatically. You will leave this site briefly and be redirected back after payment.
              </p>
              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                <li>Card, UPI, and other options available on the gateway</li>
                <li>Do not close the browser until you return to the confirmation page</li>
              </ul>
            </section>

            <section className="bg-white p-5 rounded border border-gray-200">
              <label className="flex items-start space-x-3 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="declaration"
                  required
                  checked={formData.declaration}
                  onChange={handleChange}
                  className="mt-1 h-5 w-5 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="font-semibold leading-relaxed">
                  {declarationCheckboxText.split("conference rules and policies").map((part, i, arr) =>
                    i < arr.length - 1 ? (
                      <span key={i}>
                        {part}
                        <Link
                          to="/rules-and-policies"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#1a56db] underline underline-offset-2 hover:text-blue-800"
                          onClick={(e) => e.stopPropagation()}
                        >
                          conference rules and policies
                        </Link>
                      </span>
                    ) : (
                      <span key={i}>{part}</span>
                    ),
                  )}
                </span>
              </label>
            </section>
          </div>
        )}

        {/* ================= NAVIGATION BUTTONS ================= */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="bg-white border border-gray-300 text-gray-700 font-bold py-2 px-6 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition"
            >
              ← Back
            </button>
          ) : (
            <div></div> // Empty div to push 'Next' to the right
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-[#1a56db] hover:bg-blue-800 text-white font-bold py-2 px-8 rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Next Step →
            </button>
          ) : (
            <button
              type="submit"
              disabled={paymentBusy}
              className="bg-[#16a34a] hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 px-10 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#16a34a]/50"
            >
              {paymentBusy ? "Opening payment portal…" : "Proceed to payment"}
            </button>
          )}
        </div>
      </form>
    </div>
    </>
  );
}

export default RegistrationForm;
