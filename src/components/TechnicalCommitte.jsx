import { useEffect, useState } from "react";
import PageLayout from "./PageLayout";
import { fetchCommitteeByType } from "../lib/committeeData";
import { useYear } from "../context/yearContext";
import conferenceData from "../content/conferenceData";

function TechnicalCommittee() {
  const [committee, setCommittee] = useState({});
  const { selectedYear } = useYear();

  useEffect(() => {
    let cancelled = false;

    // Check if we have hardcoded data for this year first
    const yearData = conferenceData[selectedYear];
    if (yearData?.technicalCommittee) {
      const grouped = { "Technical Program Committee": yearData.technicalCommittee };
      setCommittee(grouped);
      return;
    }

    (async () => {
      try {
        const filtered = await fetchCommitteeByType("technical committee");
        if (cancelled) return;
        const grouped = {};
        filtered.forEach((member) => {
          if (!grouped[member.sub_committe]) grouped[member.sub_committe] = [];
          grouped[member.sub_committe].push(member);
        });
        setCommittee(grouped);
      } catch (err) {
        console.error("Error loading committee:", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selectedYear]);

  return (
    <PageLayout 
      title="Technical Committee"
      subtitle={`Global experts reviewing and guiding the technical program for the ${selectedYear} International Conference on Applied AI`}
    >
      <div className="space-y-8">
        {Object.entries(committee).map(([section, members], idx) => (
          <div key={idx} className="bg-white rounded shadow-sm p-6">
            {section && section.trim() !== "" && section !== "null" && (
              <h3 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-amber-600 pl-4">
                {section}
              </h3>
            )}
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {members.map((member, i) => (
                <div key={i} className="border border-gray-200 rounded p-4 hover:shadow-md transition">
                  <h4 className="font-bold text-gray-800 text-base">{member.name}</h4>
                  {member.designation && (
                    <p className="text-sm text-gray-600 mt-1">{member.designation}</p>
                  )}
                  {member.affiliation && (
                    <p className="text-sm text-amber-600 mt-1">
                      {member.affiliation}
                      {member.country && `, ${member.country}`}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        {Object.keys(committee).length === 0 && (
          <div className="text-center py-20 bg-white rounded shadow-sm">
            <p className="text-zinc-500 italic">Technical committee details will be displayed soon.</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}

export default TechnicalCommittee;
