import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationTicket from "./RegistrationTicket";

function RegistrationSuccess() {
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState(null);
  const [showTicket, setShowTicket] = useState(false);

  useEffect(() => {
    const result = sessionStorage.getItem("registrationResult");
    if (result) {
      const data = JSON.parse(result);
      setRegistrationData(data);
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (!registrationData) return;
    if (sessionStorage.getItem("openTicketAfterSuccess") !== "1") return;
    sessionStorage.removeItem("openTicketAfterSuccess");
    const t = setTimeout(() => setShowTicket(true), 1100);
    return () => clearTimeout(t);
  }, [registrationData]);

  if (!registrationData) {
    return null;
  }

  return (
    <>
      {showTicket && registrationData && (
        <RegistrationTicket
          registrationData={{
            ...registrationData,
            qrCode: registrationData.qrCode,
          }}
          onClose={() => setShowTicket(false)}
        />
      )}

      <div className="registration-success-shell min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              You&apos;re confirmed
            </h1>
            <p className="text-gray-600 mb-4">
              Your payment was verified, your registration is saved, and your conference ticket has been generated.
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-green-800 border border-green-200">
                <span aria-hidden>✓</span> Payment
              </span>
              <span className="text-gray-300">→</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-green-800 border border-green-200">
                <span aria-hidden>✓</span> Registration
              </span>
              <span className="text-gray-300">→</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-blue-800 border border-blue-200">
                Ticket ready
              </span>
            </div>
          </div>

          {/* Registration Details */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-blue-900 mb-4 text-lg">Registration Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Registration ID:</span>
                <span className="font-mono font-semibold text-gray-900">{registrationData.registrationId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-mono text-gray-900">{registrationData.transactionId || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Email Confirmation */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Email sent.</strong> We&apos;ve emailed a copy of your confirmation and ticket details to your address.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => setShowTicket(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              View / print ticket
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition"
            >
              Return to Home
            </button>
          </div>

          {/* Important Information */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-3">Important Information:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Save your Registration ID for future reference</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Bring a printed or digital copy of your ticket to the conference</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Your QR code will be scanned at the venue for verification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Check your email for the complete registration details</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegistrationSuccess;
