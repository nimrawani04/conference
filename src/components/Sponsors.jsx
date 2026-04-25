import PageLayout from "./PageLayout";
import { Sparkles, Check, X, Shield, Medal, Trophy, Award } from "lucide-react";
import { useYear } from "../context/yearContext";
import conferenceData from "../content/conferenceData";

function Sponsors() {
  const { selectedYear } = useYear();
  const yearData = conferenceData[selectedYear];
  const sponsorsData = yearData?.sponsorship;

  if (!sponsorsData) {
    return (
      <PageLayout 
        title="Sponsors"
        subtitle={`Partnership opportunities for the ${selectedYear} International Conference on Applied Artificial Intelligence`}
      >
        <div className="bg-white rounded shadow-sm p-12">
          <div className="flex flex-col items-center justify-center text-center min-h-[400px]">
            <Sparkles size={64} className="text-yellow-500 mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Sponsorship Opportunities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mb-6">
              We are working on creating exciting sponsorship packages for partners, organizations, and companies who want to be part of our conference.
            </p>
            <div className="inline-block bg-yellow-100 border border-yellow-300 text-yellow-800 font-medium px-6 py-3 rounded shadow-sm">
              Details will be announced soon
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  const getTierIcon = (tierName) => {
    if (tierName.includes("Platinum")) return <Trophy className="text-[#E5E4E2]" size={32} />;
    if (tierName.includes("Gold")) return <Medal className="text-[#FFD700]" size={32} />;
    if (tierName.includes("Silver")) return <Award className="text-[#C0C0C0]" size={32} />;
    return <Shield className="text-[#CD7F32]" size={32} />;
  };

  return (
    <PageLayout 
      title="Sponsors"
      subtitle={`Sponsorship tiers and partnership benefits for the ${selectedYear} International Conference on Applied Artificial Intelligence`}
    >
      <div className="space-y-12">
        {/* Tier Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {sponsorsData.tiers.map((tier, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              <div className="p-6 text-center border-b border-gray-50 bg-gray-50/50">
                <div className="flex justify-center mb-4">
                  {getTierIcon(tier.name)}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{tier.name}</h3>
                <p className="text-2xl font-black text-[#c9a86a] mt-2">{tier.amount}</p>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Available Slots</span>
                    <span className="font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded-full">{tier.slots}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Free Passes</span>
                    <span className="font-bold text-gray-800">{tier.benefits["Conference passes"]}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Comparison Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800">Benefit Matrix</h2>
            <p className="text-sm text-gray-500 mt-1">Detailed comparison across all sponsorship tiers</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-600">
                  <th className="px-6 py-4 border-b">Benefit</th>
                  {sponsorsData.tiers.map(t => (
                    <th key={t.name} className="px-6 py-4 border-b text-center">{t.name.split(" ")[0]}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {sponsorsData.benefitList.map((benefit) => (
                  <tr key={benefit} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-700">{benefit}</td>
                    {sponsorsData.tiers.map(tier => {
                      const value = tier.benefits[benefit];
                      return (
                        <td key={tier.name} className="px-6 py-4 text-center">
                          {typeof value === "boolean" ? (
                            value ? (
                              <Check className="mx-auto text-green-500" size={18} />
                            ) : (
                              <X className="mx-auto text-gray-300" size={18} />
                            )
                          ) : (
                            <span className="font-bold text-gray-800">{value}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#c9a86a]/10 border border-[#c9a86a]/20 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Interested in Partnering?</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            For more details on sponsorship opportunities, please contact the organizing committee at <span className="font-bold text-[#c9a86a]">appliedaiconf@gmail.com</span>
          </p>
          <a 
            href="mailto:appliedaiconf@gmail.com"
            className="inline-flex items-center gap-2 bg-[#c9a86a] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#b8975a] transition-all shadow-lg shadow-[#c9a86a]/20"
          >
            Contact for Sponsorship
          </a>
        </div>
      </div>
    </PageLayout>
  );
}

export default Sponsors;

