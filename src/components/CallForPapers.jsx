// Edited by Milad Ajaz 
// https://m4milaad.github.io/ 

import PageLayout from "./PageLayout";
import { FileText, Shield, Presentation, FileDown, ExternalLink } from "lucide-react";

function CallForPapers() {
  const sections = [
    {
      id: 1,
      title: "Paper Submission Instructions",
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm leading-relaxed">
          <li>All authors must comply with guidelines while preparing their manuscripts</li>
          <li>The images and tables must be self-drawn or must be used with proper permissions and copyrights</li>
          <li>All the equations used in the manuscript must be written using equation editor</li>
          <li>The similarity index/plagiarism should not be more than <strong>5%</strong> from a single source and must be less than <strong>15%</strong> (including self-plagiarism)</li>
          <li>It is mandatory to use Mendeley software for referencing in the manuscript</li>
          <li className="mt-3">
            <a
              href="https://cmt3.research.microsoft.com/AAI2026"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold hover:underline"
            >
              Submit your paper via Microsoft CMT
              <ExternalLink size={14} />
            </a>
          </li>
        </ul>
      ),
    },
    {
      id: 2,
      title: "Copyright Form",
      icon: <Shield className="w-6 h-6 text-green-600" />,
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm leading-relaxed">
          <li>You will have to send us the signed copy of Copyright form as a scanned PDF, after the acceptance of your manuscript</li>
          <li>The corresponding author should be available to check the paper before it is published</li>
          <li>Please note that once a paper has been delivered to Springer, changes relating to the authorship of the paper cannot be made</li>
          <li>Once paper is delivered to Springer Author's names cannot be added or deleted, their order cannot be changed, and the corresponding author cannot be altered</li>
          <li>The corresponding author signing the copyright form should match the corresponding author marked on the paper</li>
        </ul>
      ),
    },
    {
      id: 3,
      title: "Presentation Guidelines",
      icon: <Presentation className="w-6 h-6 text-red-600" />,
      content: (
        <div className="text-gray-700 text-sm leading-relaxed">
          <p>Oral presentations should strictly comply with the content of the corresponding paper. The duration of the presentation will be determined before the event, authors will be informed with sufficient time.</p>
          <p className="mt-2">Speakers must be registered in the conference, just like any other attendee.</p>
        </div>
      ),
    },
    {
      id: 4,
      title: "Paper Template",
      icon: <FileDown className="w-6 h-6 text-indigo-600" />,
      content: (
        <div className="text-gray-700 text-sm leading-relaxed">
          <p className="mb-3">
            Those who are interested in submitting their papers to the conference should use the{" "}
            <a
              href="https://www.springer.com/gp/computer-science/lncs/conference-proceedings-guidelines"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
            >
              CCIS SpringerNature
            </a>{" "}
            Template. You can also use{" "}
            <a
              href="https://www.overleaf.com/latex/templates/springer-conference-proceedings-template-updated-2022-01-12/wcvbtmwtykqj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
            >
              Overleaf
            </a>{" "}
            for editing your article.
          </p>
          <p>The Full-Length Paper should not exceed 15 pages and the file size should not exceed 10 MB. Any submissions below 12 pages will be considered a Short Paper.</p>
        </div>
      ),
    }
  ];

  return (
    <PageLayout 
      title="Call For Papers"
      subtitle="Submit your original research to the 2026 International Conference on Applied Artificial Intelligence"
    >
      {/* Submission Link Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Paper Submission</h3>
        <p className="text-gray-700 mb-3">
          Authors are invited to submit their original and unpublished research papers.
        </p>
        <a
          href="https://cmt3.research.microsoft.com/AAI2026"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-[#007bff] hover:bg-[#0056b3] text-white font-semibold px-5 py-2 rounded text-sm transition"
        >
          Submit Paper via Microsoft CMT
          <ExternalLink size={16} />
        </a>
      </div>

      <div className="bg-white rounded shadow-sm p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Copyright Form</h3>
        <p className="text-sm text-gray-600 mb-4">
          Download and review the copyright form. You can also view it directly below.
        </p>
        <a
          href="/copyright.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold hover:underline mb-4"
        >
          Open Copyright PDF
          <ExternalLink size={14} />
        </a>
        <div className="border border-gray-200 rounded overflow-hidden">
          <iframe
            src="/copyright.pdf"
            title="Copyright Form PDF"
            className="w-full h-[700px]"
          />
        </div>
      </div>

      {/* Guidelines Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((sec) => (
          <div
            key={sec.id}
            className="bg-white rounded shadow-sm p-6 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
              {sec.icon}
              <h3 className="text-lg font-bold text-gray-800">
                {sec.title}
              </h3>
            </div>
            {sec.content}
          </div>
        ))}
      </div>
    </PageLayout>
  );
}

export default CallForPapers;
