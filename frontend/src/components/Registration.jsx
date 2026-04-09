// Edited by Milad Ajaz 
// https://m4milaad.github.io/ 

import PageLayout from "./PageLayout";
import RegistrationForm from "./RegistrationForm";

function Registration() {
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
              <tr className="bg-[#2c5aa0] text-white">
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
                <td className="p-3 border border-gray-300 font-semibold">$ 80 (Rs. 7200)</td>
                <td className="p-3 border border-gray-300 font-semibold">$ 150</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-300">Others</td>
                <td className="p-3 border border-gray-300 font-semibold">$ 120 (Rs. 10800)</td>
                <td className="p-3 border border-gray-300 font-semibold">$ 200</td>
              </tr>

              {/* Non-Authors Section */}
              <tr>
                <td rowSpan="2" className="p-3 border border-gray-300 font-bold bg-gray-50 align-middle">
                  Non authors
                </td>
                <td className="p-3 border border-gray-300">UG/PG/PhD students</td>
                <td className="p-3 border border-gray-300 font-semibold">$ 50 (Rs. 4500)</td>
                <td className="p-3 border border-gray-300 font-semibold">$ 75</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-300">Others</td>
                <td className="p-3 border border-gray-300 font-semibold">$ 60 (Rs. 5400)</td>
                <td className="p-3 border border-gray-300 font-semibold">$ 100</td>
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
              <span className="font-bold text-red-600">$ 20 (Rs. 1800)</span>
            </p>
          </div>
        </div>
      </div>

      <RegistrationForm />
    </PageLayout>
  );
}

export default Registration;
