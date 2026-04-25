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
        title="Workshops & Expert Talks"
        subtitle="Full schedule for technical sessions conducted during 2AI-2024 (Online Mode)"
      >
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-4 border-b">Day / Date</th>
                  <th className="px-6 py-4 border-b">Time</th>
                  <th className="px-6 py-4 border-b">Event</th>
                  <th className="px-6 py-4 border-b">Resource Person</th>
                  <th className="px-6 py-4 border-b">Coordinator</th>
                  <th className="px-6 py-4 border-b">Moderator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.workshops.items.map((ws, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors text-sm">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">{ws.day}</div>
                      <div className="text-xs text-gray-500">{ws.date}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{ws.time}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#c9a86a]">{ws.title}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{ws.speaker}</td>
                    <td className="px-6 py-4 text-gray-600">{ws.coordinator}</td>
                    <td className="px-6 py-4 text-gray-600">{ws.moderator}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
