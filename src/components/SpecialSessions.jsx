// Edited by Milad Ajaz 
// https://m4milaad.github.io/ 

import PageLayout from "./PageLayout";
import { Star } from "lucide-react";
import { useYear } from "../context/yearContext";

function SpecialSessions() {
  const { selectedYear } = useYear();

  return (
    <PageLayout 
      title="Special Sessions"
      subtitle="Focused sessions on cutting-edge AI topics"
    >
      <div className="bg-white rounded shadow-sm p-12">
        <div className="flex flex-col items-center justify-center text-center min-h-[400px]">
          <Star size={64} className="text-purple-600 mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {selectedYear === 2024 ? "Special Sessions — 2AI 2024" : "Special Sessions Coming Soon"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            {selectedYear === 2024
              ? "Special sessions at the 2024 conference featured focused discussions on cutting-edge topics in applied artificial intelligence, including dedicated tracks on AI for Healthcare, Education, and Defense applications."
              : "Special sessions will feature focused discussions on cutting-edge topics in applied artificial intelligence. Details about session topics, organizers, and submission guidelines will be announced soon."}
          </p>
        </div>
      </div>
    </PageLayout>
  );
}

export default SpecialSessions;
