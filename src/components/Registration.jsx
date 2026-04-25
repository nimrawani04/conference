// Edited by Milad Ajaz 
// https://m4milaad.github.io/ 

import { useEffect, useState } from "react";
import PageLayout from "./PageLayout";
import RegistrationForm from "./RegistrationForm";
import { useTheme } from "../context/themeContext";
import { useYear } from "../context/yearContext";
import conferenceData from "../content/conferenceData";
import { Calendar, Users, DollarSign, Clock, CheckCircle, AlertCircle, Info } from "lucide-react";

const FX_API_URL = "https://fxapi.app/api/INR/USD.json";
const DEFAULT_USD_TO_INR = 90;

function isLateFeeActive(now = new Date()) {
  const year = now.getFullYear();
  const cutoff = new Date(year, 4, 5, 23, 59, 59, 999);
  return now > cutoff;
}

function Registration() {
  const [usdToInrRate, setUsdToInrRate] = useState(DEFAULT_USD_TO_INR);
  const { isDark } = useTheme();
  const { selectedYear } = useYear();
  const is2024 = selectedYear === 2024;
  const data = conferenceData[selectedYear];
  const meta = data?.meta || conferenceData[2026].meta;

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

  const tableBg = isDark ? '#18181b' : '#ffffff';
  const cellBg = isDark ? '#18181b' : '#ffffff';
  const categoryBg = isDark ? '#27272a' : '#f4f4f5';

  // 2026 fee data (default)
  const registrationData2026 = [
    {
      category: "Authors",
      rows: [
        { subCategory: "UG/PG/PhD students", southAsian: 80, others: 150 },
        { subCategory: "Others", southAsian: 120, others: 200 }
      ]
    },
    {
      category: "Non authors",
      rows: [
        { subCategory: "UG/PG/PhD students", southAsian: 50, others: 75 },
        { subCategory: "Others", southAsian: 60, others: 100 }
      ]
    }
  ];

  const conferenceDates = is2024 ? "July 2-4, 2024" : "June 17-19, 2026";
  const mode = meta.mode;
  const deadline = is2024 ? "June 20, 2024" : "May 5, 2026";

  return (
    <PageLayout 
      title="Registration"
      subtitle={`Register for the ${selectedYear} International Conference on Applied Artificial Intelligence`}
    >
      {/* Hero Info Banner */}
      <section className="linear-card border-l-4 border-[#5E6AD2] dark:border-[#c9a86a] p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#5E6AD2]/10 dark:bg-[#c9a86a]/10 flex items-center justify-center">
            <Info size={24} className="text-[#5E6AD2] dark:text-[#c9a86a]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-100 mb-2">
              Conference Dates: {conferenceDates} ({mode})
            </h2>
            <p className="text-zinc-700 dark:text-zinc-400">
              {is2024
                ? "This is a past event. Registration is closed."
                : "Registration includes access to all conference sessions, lunch, tea breaks, and conference kit for physical attendees."}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Info Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="linear-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#5E6AD2]/10 dark:bg-[#c9a86a]/10 flex items-center justify-center">
              <Calendar size={18} className="text-[#5E6AD2] dark:text-[#c9a86a]" />
            </div>
            <p className="terminal-label text-zinc-600 dark:text-zinc-400">Dates</p>
          </div>
          <p className="text-sm font-bold text-zinc-950 dark:text-zinc-100">{conferenceDates}</p>
        </div>

        <div className="linear-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#5E6AD2]/10 dark:bg-[#c9a86a]/10 flex items-center justify-center">
              <Users size={18} className="text-[#5E6AD2] dark:text-[#c9a86a]" />
            </div>
            <p className="terminal-label text-zinc-600 dark:text-zinc-400">Mode</p>
          </div>
          <p className="text-sm font-bold text-zinc-950 dark:text-zinc-100">{mode}</p>
        </div>

        <div className="linear-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <Clock size={18} className="text-orange-600 dark:text-orange-400" />
            </div>
            <p className="terminal-label text-zinc-600 dark:text-zinc-400">Deadline</p>
          </div>
          <p className="text-sm font-bold text-zinc-950 dark:text-zinc-100">{deadline}</p>
        </div>

        <div className="linear-card p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <CheckCircle size={18} className="text-green-600 dark:text-green-400" />
            </div>
            <p className="terminal-label text-zinc-600 dark:text-zinc-400">Includes</p>
          </div>
          <p className="text-sm font-bold text-zinc-950 dark:text-zinc-100">Kit + Meals</p>
        </div>
      </div>

      {/* Registration Fee Section */}
      <section className="linear-card p-6 md:p-8 mb-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#5E6AD2]/10 dark:bg-[#c9a86a]/10 flex items-center justify-center">
              <DollarSign size={24} className="text-[#5E6AD2] dark:text-[#c9a86a]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-zinc-950 dark:text-zinc-100">
                Registration Fees
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {is2024 ? "Conference: July 2-4, 2024" : "Main Conference: June 18-19, 2026"}
              </p>
            </div>
          </div>
        </div>
        
        {is2024 ? (
          /* 2024 Registration Fees */
          <div className="overflow-x-auto rounded-xl border border-black/[0.06] dark:border-white/10 shadow-sm">
            <table className="w-full text-left border-collapse text-sm" style={{ backgroundColor: tableBg }}>
              <thead>
                <tr className="bg-[#5E6AD2] dark:bg-[#c9a86a]">
                  <th className="p-4 font-semibold text-white dark:text-zinc-950 border-r border-white/20 dark:border-zinc-950/20">Category</th>
                  <th className="p-4 font-semibold text-white dark:text-zinc-950 border-r border-white/20 dark:border-zinc-950/20">Sub-category</th>
                  <th className="p-4 font-semibold text-white dark:text-zinc-950 border-r border-white/20 dark:border-zinc-950/20">Indian (INR)</th>
                  <th className="p-4 font-semibold text-white dark:text-zinc-950">Foreign (USD)</th>
                </tr>
              </thead>
              <tbody className="text-zinc-800 dark:text-zinc-300">
                {data.registration.fees.map((section, sIdx) =>
                  section.rows.map((row, rIdx) => (
                    <tr key={`${sIdx}-${rIdx}`} className="border-t border-black/[0.06] dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors" style={{ backgroundColor: cellBg }}>
                      {rIdx === 0 && (
                        <td rowSpan={section.rows.length} className="p-4 font-bold border-r border-black/[0.06] dark:border-white/10 align-middle" style={{ backgroundColor: categoryBg }}>
                          {section.category}
                        </td>
                      )}
                      <td className="p-4 border-r border-black/[0.06] dark:border-white/10" style={{ backgroundColor: cellBg }}>{row.subCategory}</td>
                      <td className="p-4 font-semibold border-r border-black/[0.06] dark:border-white/10 text-[#5E6AD2] dark:text-[#c9a86a]" style={{ backgroundColor: cellBg }}>
                        {row.inr ? `₹ ${row.inr.toLocaleString()}` : "—"}
                      </td>
                      <td className="p-4 font-semibold text-[#5E6AD2] dark:text-[#c9a86a]" style={{ backgroundColor: cellBg }}>
                        {row.usd ? `$ ${row.usd}` : "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          /* 2026 Registration Fees */
          <div className="overflow-x-auto rounded-xl border border-black/[0.06] dark:border-white/10 shadow-sm">
            <table className="w-full text-left border-collapse text-sm" style={{ backgroundColor: tableBg }}>
              <thead>
                <tr className="bg-[#5E6AD2] dark:bg-[#c9a86a]">
                  <th className="p-4 font-semibold text-white dark:text-zinc-950 border-r border-white/20 dark:border-zinc-950/20">Category</th>
                  <th className="p-4 font-semibold text-white dark:text-zinc-950 border-r border-white/20 dark:border-zinc-950/20">Sub-category</th>
                  <th className="p-4 font-semibold text-white dark:text-zinc-950 border-r border-white/20 dark:border-zinc-950/20">South Asian</th>
                  <th className="p-4 font-semibold text-white dark:text-zinc-950">Others</th>
                </tr>
              </thead>
              <tbody className="text-zinc-800 dark:text-zinc-300">
                {registrationData2026.map((section, sectionIdx) => (
                  section.rows.map((row, rowIdx) => (
                    <tr key={`${sectionIdx}-${rowIdx}`} className="border-t border-black/[0.06] dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors" style={{ backgroundColor: cellBg }}>
                      {rowIdx === 0 && (
                        <td rowSpan={section.rows.length} className="p-4 font-bold border-r border-black/[0.06] dark:border-white/10 align-middle" style={{ backgroundColor: categoryBg }}>
                          {section.category}
                        </td>
                      )}
                      <td className="p-4 border-r border-black/[0.06] dark:border-white/10" style={{ backgroundColor: cellBg }}>{row.subCategory}</td>
                      <td className="p-4 font-semibold border-r border-black/[0.06] dark:border-white/10 text-[#5E6AD2] dark:text-[#c9a86a]" style={{ backgroundColor: cellBg }}>
                        {formatFee(row.southAsian)}
                      </td>
                      <td className="p-4 font-semibold text-[#5E6AD2] dark:text-[#c9a86a]" style={{ backgroundColor: cellBg }}>
                        {formatFee(row.others)}
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Important Notes Grid */}
      <div className="grid gap-4 lg:grid-cols-3 mb-8">
        <div className="linear-card border-l-4 border-[#5E6AD2] dark:border-[#c9a86a] p-5">
          <div className="flex items-start gap-3">
            <CheckCircle size={20} className="text-[#5E6AD2] dark:text-[#c9a86a] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-zinc-950 dark:text-zinc-100 mb-1.5 text-sm">Registration Includes</p>
              <p className="text-sm text-zinc-700 dark:text-zinc-400 leading-relaxed">
                Lunch, tea breaks, and conference kit for all physical attendees.
              </p>
            </div>
          </div>
        </div>

        {!is2024 && (
          <div className="linear-card border-l-4 border-orange-500 dark:border-orange-400 p-5">
            <div className="flex items-start gap-3">
              <DollarSign size={20} className="text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-zinc-950 dark:text-zinc-100 mb-1.5 text-sm">Workshop Fee</p>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  Pre-Conference Workshop (June 17): <span className="font-bold text-orange-600 dark:text-orange-400">{formatFee(20)}</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {is2024 && data.registration.bankDetails && (
          <div className="linear-card border-l-4 border-orange-500 dark:border-orange-400 p-5">
            <div className="flex items-start gap-3">
              <DollarSign size={20} className="text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-zinc-950 dark:text-zinc-100 mb-1.5 text-sm">Bank Details</p>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {data.registration.bankDetails.bank} — A/C: {data.registration.bankDetails.accountNo}
                  <br />IFSC: {data.registration.bankDetails.ifsc}
                </p>
              </div>
            </div>
          </div>
        )}

        {!is2024 && (
          <div className={`linear-card border-l-4 p-5 ${isLateFeeActive() ? 'border-red-500 dark:border-red-400 bg-red-50/50 dark:bg-red-950/10' : 'border-zinc-300 dark:border-zinc-600'}`}>
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className={`flex-shrink-0 mt-0.5 ${isLateFeeActive() ? 'text-red-600 dark:text-red-400' : 'text-zinc-600 dark:text-zinc-400'}`} />
              <div>
                <p className="font-bold text-zinc-950 dark:text-zinc-100 mb-1.5 text-sm">Late Fee Policy</p>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  20% late fee applies after May 5, 2026.
                  {isLateFeeActive() && <span className="block mt-1 font-bold text-red-700 dark:text-red-400">⚠ Currently active!</span>}
                </p>
              </div>
            </div>
          </div>
        )}

        {is2024 && (
          <div className="linear-card border-l-4 border-emerald-500 dark:border-emerald-400 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-zinc-950 dark:text-zinc-100 mb-1.5 text-sm">Event Status</p>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  Registration for 2AI-2024 is closed. This was a past event.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Registration Form Section — only for current year */}
      {!is2024 && (
        <section className="linear-card p-6 md:p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-zinc-950 dark:text-zinc-100 mb-2">
              Complete Your Registration
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Fill in your details below to register for the conference
            </p>
          </div>
          <RegistrationForm />
        </section>
      )}
    </PageLayout>
  );
}

export default Registration;
