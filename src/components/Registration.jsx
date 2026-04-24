// Edited by Milad Ajaz 
// https://m4milaad.github.io/ 

import { useEffect, useState } from "react";
import PageLayout from "./PageLayout";
import RegistrationForm from "./RegistrationForm";

const FX_API_URL = "https://fxapi.app/api/INR/USD.json";
const DEFAULT_USD_TO_INR = 90;

function isLateFeeActive(now = new Date()) {
  const year = now.getFullYear();
  const cutoff = new Date(year, 4, 5, 23, 59, 59, 999);
  return now > cutoff;
}

function Registration() {
  const [usdToInrRate, setUsdToInrRate] = useState(DEFAULT_USD_TO_INR);

  useEffect(() => {
    let active = true;
    const loadFxRate = async () => {
      try {
        const response = await fetch(FX_API_URL);
        if (!response.ok) throw new Error("FX API request failed");
        const data = await response.json();
        const inrToUsd = Number(data?.rate);
        if (!Number.isFinite(inrToUsd) || inrToUsd <= 0) throw new Error("Invalid FX rate");
        if (active) setUsdToInrRate(1 / inrToUsd);
      } catch (error) {
        console.error("Unable to fetch live FX rate; using fallback", error);
        if (active) setUsdToInrRate(DEFAULT_USD_TO_INR);
      }
    };
    loadFxRate();
    return () => {
      active = false;
    };
  }, []);

  const formatFee = (usd) => `$ ${usd} (Rs. ${Math.round(usd * usdToInrRate)})`;

  return (
    <PageLayout 
      title="Registration"
      subtitle="Register for the 2026 International Conference on Applied Artificial Intelligence"
    >
      {/* Registration Info Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Conference Dates: June 17-19, 2026 (Hybrid Mode)
        </h2>
        <p className="text-gray-700">
          Registration includes access to all conference sessions, lunch, tea breaks, and conference kit for physical attendees.
        </p>
      </div>

      {/* Registration Table */}
      <div className="bg-white rounded shadow-sm p-6 mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b-2 border-gray-200 pb-4">
          Registration fee for the conference (18-19 June 2026)
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-[#1a56db] text-white">
                <th className="p-3 border border-gray-300 font-semibold">Category</th>
                <th className="p-3 border border-gray-300 font-semibold">Sub-category</th>
                <th className="p-3 border border-gray-300 font-semibold">South Asian</th>
                <th className="p-3 border border-gray-300 font-semibold">Others</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 bg-white">
              {/* Authors Section */}
              <tr>
                <td rowSpan="2" className="p-3 border border-gray-300 font-bold bg-gray-50 align-middle">
                  Authors
                </td>
                <td className="p-3 border border-gray-300">UG/PG/PhD students</td>
                <td className="p-3 border border-gray-300 font-semibold">{formatFee(80)}</td>
                <td className="p-3 border border-gray-300 font-semibold">{formatFee(150)}</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-300">Others</td>
                <td className="p-3 border border-gray-300 font-semibold">{formatFee(120)}</td>
                <td className="p-3 border border-gray-300 font-semibold">{formatFee(200)}</td>
              </tr>

              {/* Non-Authors Section */}
              <tr>
                <td rowSpan="2" className="p-3 border border-gray-300 font-bold bg-gray-50 align-middle">
                  Non authors
                </td>
                <td className="p-3 border border-gray-300">UG/PG/PhD students</td>
                <td className="p-3 border border-gray-300 font-semibold">{formatFee(50)}</td>
                <td className="p-3 border border-gray-300 font-semibold">{formatFee(75)}</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-300">Others</td>
                <td className="p-3 border border-gray-300 font-semibold">{formatFee(60)}</td>
                <td className="p-3 border border-gray-300 font-semibold">{formatFee(100)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Notes */}
        <div className="mt-6 space-y-3">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-gray-700 text-sm">
              <span className="font-bold">Note:</span> All registrations include Lunch, Tea breaks and conference kit for the participants attending physically.
            </p>
          </div>
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
            <p className="text-gray-700 text-sm">
              <span className="font-bold">Workshop:</span> Registration fee for Pre-Conference Workshop (17th June 2026):{" "}
              <span className="font-bold text-red-600">{formatFee(20)}</span>
            </p>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-gray-700 text-sm">
              <span className="font-bold">Late Fee Policy:</span> A 20% late fee is applied to registration fees
              for payments made after May 5.
              {isLateFeeActive() && <span className="font-bold text-red-700"> Late fee is currently active.</span>}
            </p>
          </div>
        </div>
      </div>

      <RegistrationForm />
    </PageLayout>
  );
}

export default Registration;
