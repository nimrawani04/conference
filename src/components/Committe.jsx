import { Link } from "react-router-dom";
import PageLayout from "./PageLayout";
import { Users, Briefcase, Database } from "lucide-react";

function Committee() {
  const committees = [
    {
      name: "Steering Committee",
      path: "/committee/SteeringCommitte",
      description: "Guides the overall direction of the conference",
      icon: <Users size={32} className="text-blue-600" />
    },
    {
      name: "Organizing Committee",
      path: "/committee/organizingCommitte",
      description: "Handles logistics and event management",
      icon: <Briefcase size={32} className="text-green-600" />
    },
    {
      name: "Technical Program Committee",
      path: "/committee/TechnicalCommitte",
      description: "Academic experts overseeing the peer-review process",
      icon: <Database size={32} className="text-amber-600" />
    }
  ];

  return (
    <PageLayout 
      title="Committees"
      subtitle="Meet the teams organizing the 2026 International Conference on Applied Artificial Intelligence"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {committees.map((committee, idx) => (
          <Link 
            key={idx}
            to={committee.path} 
            className="bg-white rounded shadow-sm p-8 hover:shadow-md transition group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 group-hover:scale-110 transition">
                {committee.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {committee.name}
              </h3>
              <p className="text-gray-600">
                {committee.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}

export default Committee;
