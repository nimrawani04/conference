import PageLayout from "./PageLayout";
import { Star, Users, Target, BookOpen } from "lucide-react";
import { useYear } from "../context/yearContext";
import conferenceData from "../content/conferenceData";

function SpecialSessions() {
  const { selectedYear } = useYear();
  const yearData = conferenceData[selectedYear];
  const ssData = yearData?.specialSessions;

  if (!ssData) {
    return (
      <PageLayout 
        title="Special Sessions"
        subtitle="Focused sessions on cutting-edge AI topics"
      >
        <div className="bg-white rounded shadow-sm p-12">
          <div className="flex flex-col items-center justify-center text-center min-h-[400px]">
            <Star size={64} className="text-purple-600 mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Special Sessions Coming Soon
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Special sessions will feature focused discussions on cutting-edge topics in applied artificial intelligence. Details about session topics, organizers, and submission guidelines will be announced soon.
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title="Special Sessions"
      subtitle={`Collaborative and technical tracks for 2AI-${selectedYear}`}
    >
      <div className="space-y-8">
        {/* Overview Section */}
        <div className="linear-card p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
              <Star size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg">
            {ssData.overview}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Invited Participants */}
          <div className="linear-card p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Invited Participants</h3>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ssData.invitedParticipants.map((p, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Purpose Section */}
          <div className="linear-card p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Purpose</h3>
            </div>
            <ul className="space-y-4">
              {ssData.purposes.map((purpose, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                  <div className="mt-1 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                    <CheckCircle size={12} />
                  </div>
                  {purpose}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Publication Section */}
        <div className="linear-card p-8 border-l-4 border-amber-500">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
              <BookOpen size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Publication Opportunity</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-amber-50/50 p-4 rounded-lg border border-amber-100">
              <p className="text-sm font-semibold text-amber-800 mb-1">Pre-Conference</p>
              <p className="text-sm text-amber-700">{ssData.publication.proceedings}</p>
            </div>
            <div className="bg-amber-50/50 p-4 rounded-lg border border-amber-100">
              <p className="text-sm font-semibold text-amber-800 mb-1">Final Publication</p>
              <p className="text-sm text-amber-700">{ssData.publication.submission}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-8 border border-purple-100 text-center">
          <h3 className="text-xl font-bold text-purple-900 mb-2">Conduct a Special Session</h3>
          <p className="text-purple-700 mb-6">We were open to proposals for conducting Special Sessions during 2AI-2024.</p>
          <div className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg font-bold opacity-50 cursor-not-allowed">
            Call for Proposals Closed
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

// Internal component for check icon
function CheckCircle({ size }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default SpecialSessions;

