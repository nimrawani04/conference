// Edited by Milad Ajaz 
// https://m4milaad.github.io/ 

import PageLayout from "./PageLayout";
import { Wrench, Calendar, User } from "lucide-react";
import { useYear } from "../context/yearContext";
import conferenceData from "../content/conferenceData";

function Workshops() {
  const { selectedYear } = useYear();
  const is2024 = selectedYear === 2024;
  const data = conferenceData[selectedYear];

  if (is2024 && data.workshops?.available) {
    return (
      <PageLayout 
        title="Conference Workshops"
        subtitle={`Workshops conducted during the 2024 International Conference on Applied AI`}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.workshops.items.map((ws, idx) => (
            <div key={idx} className="linear-card p-6 hover:shadow-md transition hover:-translate-y-0.5">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#5E6AD2]/10 dark:bg-[#c9a86a]/10 flex items-center justify-center">
                  <Wrench size={20} className="text-[#5E6AD2] dark:text-[#c9a86a]" />
                </div>
                <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-100">{ws.title}</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-400">
                  <User size={14} className="text-[#5E6AD2] dark:text-[#c9a86a]" />
                  <span>{ws.speaker}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-400">
                  <Calendar size={14} className="text-[#5E6AD2] dark:text-[#c9a86a]" />
                  <span>{ws.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title="Pre-Conference Workshops"
      subtitle="Hands-on workshops on June 17, 2026"
    >
      <div className="bg-white rounded shadow-sm p-12">
        <div className="flex flex-col items-center justify-center text-center min-h-[400px]">
          <Wrench size={64} className="text-blue-600 mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Workshop Details Coming Soon
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mb-4">
            Pre-conference workshops will be held on June 17, 2026. Detailed information about workshop topics, speakers, and registration will be announced soon.
          </p>
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded mt-4">
            <p className="text-sm text-gray-700">
              <span className="font-bold">Workshop Fee:</span> $ 20 (Rs. 1800)
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default Workshops;
