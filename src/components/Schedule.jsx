// Edited by Milad Ajaz 
// https://m4milaad.github.io/ 

import PageLayout from "./PageLayout";
import { Calendar, Clock } from "lucide-react";
import { useYear } from "../context/yearContext";
import conferenceData from "../content/conferenceData";

function Schedule() {
  const { selectedYear } = useYear();
  const is2024 = selectedYear === 2024;
  const data = conferenceData[selectedYear];

  if (is2024 && data.schedule?.available) {
    return (
      <PageLayout 
        title="Conference Schedule"
        subtitle="Detailed schedule for the 2024 International Conference on Applied AI"
      >
        <div className="space-y-6">
          {data.schedule.days.map((day, dIdx) => (
            <div key={dIdx} className="linear-card overflow-hidden">
              <div className="bg-[#5E6AD2] dark:bg-[#c9a86a] px-6 py-4">
                <h3 className="text-lg font-bold text-white dark:text-zinc-950">{day.date}</h3>
                <p className="text-sm text-white/80 dark:text-zinc-950/70">{day.label}</p>
              </div>
              <div className="divide-y divide-black/[0.06] dark:divide-white/10">
                {day.events.map((event, eIdx) => (
                  <div key={eIdx} className="flex items-center gap-4 px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition">
                    <div className="flex items-center gap-2 flex-shrink-0 w-36">
                      <Clock size={14} className="text-[#5E6AD2] dark:text-[#c9a86a]" />
                      <span className="text-sm font-mono font-semibold text-zinc-700 dark:text-zinc-300">{event.time}</span>
                    </div>
                    <p className="text-sm text-zinc-900 dark:text-zinc-100 font-medium">{event.title}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title="Conference Schedule"
      subtitle="Stay up to date with our sessions, workshops, and keynotes"
    >
      <div className="bg-white rounded shadow-sm p-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <Calendar size={64} className="text-blue-600 mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Schedule Coming Soon
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            The detailed conference schedule will be published soon. Please check back later for information about sessions, workshops, and keynote presentations.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}

export default Schedule;
