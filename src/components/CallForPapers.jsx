// Edited by Milad Ajaz 
// https://m4milaad.github.io/ 

import PageLayout from "./PageLayout";
import { FileText, Shield, Presentation, FileDown, ExternalLink } from "lucide-react";
import { useTheme } from "../context/themeContext";
import { useYear } from "../context/yearContext";
import conferenceData from "../content/conferenceData";

function CallForPapers() {
  const { isDark } = useTheme();
  const { selectedYear } = useYear();
  const is2024 = selectedYear === 2024;
  const data = conferenceData[selectedYear];
  const meta = data?.meta || conferenceData[2026].meta;
  const pdfUrl = `${import.meta.env.BASE_URL}copyright.pdf`;
  const cmtUrl = meta.cmt;
  const sections = [
    {
      id: 1,
      title: "Paper Submission Instructions",
      icon: <FileText className="w-6 h-6 text-[#E8A020]" />,
      content: (
        <div className="relative pl-6">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-[#c9a86a] dark:bg-[#c9a86a]"></div>
          
          <ul className="space-y-3 text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
            <li className="relative flex gap-3">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#E8A020] border-2 border-black dark:border-zinc-900 mt-0.5 z-10 shadow-sm"></div>
              <span>All authors must comply with guidelines while preparing their manuscripts</span>
            </li>
            <li className="relative flex gap-3">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#E8A020] border-2 border-black dark:border-zinc-900 mt-0.5 z-10"></div>
              <span>The images and tables must be self-drawn or must be used with proper permissions and copyrights</span>
            </li>
            <li className="relative flex gap-3">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#E8A020] border-2 border-black dark:border-zinc-900 mt-0.5 z-10"></div>
              <span>All the equations used in the manuscript must be written using equation editor</span>
            </li>
            <li className="relative flex gap-3">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#E8A020] border-2 border-black dark:border-zinc-900 mt-0.5 z-10"></div>
              <span>The similarity index/plagiarism should not be more than <strong>5%</strong> from a single source and must be less than <strong>15%</strong> (including self-plagiarism)</span>
            </li>
            <li className="relative flex gap-3">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#E8A020] border-2 border-black dark:border-zinc-900 mt-0.5 z-10"></div>
              <span>It is mandatory to use Mendeley software for referencing in the manuscript</span>
            </li>
            <li className="relative flex gap-3 mt-4">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#5E6AD2] dark:bg-[#c9a86a] border-2 border-black dark:border-zinc-900 mt-0.5 z-10"></div>
              <a
                href={cmtUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[#5E6AD2] dark:text-[#c9a86a] font-semibold hover:underline"
              >
                Submit your paper via Microsoft CMT
                <ExternalLink size={14} />
              </a>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 2,
      title: "Copyright Form",
      icon: <Shield className="w-6 h-6 text-[#1A5C38]" />,
      content: (
        <div className="relative pl-6">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-[#c9a86a] dark:bg-[#c9a86a]"></div>
          
          <ul className="space-y-3 text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
            <li className="relative flex gap-3">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#1A5C38] border-2 border-black dark:border-zinc-900 mt-0.5 z-10 shadow-sm"></div>
              <span>You will have to send us the signed copy of Copyright form as a scanned PDF, after the acceptance of your manuscript</span>
            </li>
            <li className="relative flex gap-3">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#1A5C38] border-2 border-black dark:border-zinc-900 mt-0.5 z-10"></div>
              <span>The corresponding author should be available to check the paper before it is published</span>
            </li>
            <li className="relative flex gap-3">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#1A5C38] border-2 border-black dark:border-zinc-900 mt-0.5 z-10"></div>
              <span>Please note that once a paper has been delivered to Springer, changes relating to the authorship of the paper cannot be made</span>
            </li>
            <li className="relative flex gap-3">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#1A5C38] border-2 border-black dark:border-zinc-900 mt-0.5 z-10"></div>
              <span>Once paper is delivered to Springer Author's names cannot be added or deleted, their order cannot be changed, and the corresponding author cannot be altered</span>
            </li>
            <li className="relative flex gap-3">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#1A5C38] border-2 border-black dark:border-zinc-900 mt-0.5 z-10"></div>
              <span>The corresponding author signing the copyright form should match the corresponding author marked on the paper</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 3,
      title: "Presentation Guidelines",
      icon: <Presentation className="w-6 h-6 text-[#7B4FFF]" />,
      content: (
        <div className="relative pl-6">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-[#c9a86a] dark:bg-[#c9a86a]"></div>
          
          <div className="space-y-3 text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
            <div className="relative flex gap-3">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#7B4FFF] border-2 border-black dark:border-zinc-900 mt-0.5 z-10 shadow-sm"></div>
              <p>Oral presentations should strictly comply with the content of the corresponding paper. The duration of the presentation will be determined before the event, authors will be informed with sufficient time.</p>
            </div>
            <div className="relative flex gap-3">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#7B4FFF] border-2 border-black dark:border-zinc-900 mt-0.5 z-10"></div>
              <p>Speakers must be registered in the conference, just like any other attendee.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: "Paper Template",
      icon: <FileDown className="w-6 h-6 text-[#5E6AD2]" />,
      content: (
        <div className="relative pl-6">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-[#c9a86a] dark:bg-[#c9a86a]"></div>
          
          <div className="space-y-3 text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
            <div className="relative flex gap-3">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#5E6AD2] dark:bg-[#c9a86a] border-2 border-black dark:border-zinc-900 mt-0.5 z-10 shadow-sm"></div>
              <p>
                Those who are interested in submitting their papers to the conference should use the{" "}
                <a
                  href="https://www.springer.com/gp/computer-science/lncs/conference-proceedings-guidelines"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5E6AD2] dark:text-[#c9a86a] font-semibold hover:underline"
                >
                  CCIS SpringerNature
                </a>{" "}
                Template. You can also use{" "}
                <a
                  href="https://www.overleaf.com/latex/templates/springer-conference-proceedings-template-updated-2022-01-12/wcvbtmwtykqj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5E6AD2] dark:text-[#c9a86a] font-semibold hover:underline"
                >
                  Overleaf
                </a>{" "}
                for editing your article.
              </p>
            </div>
            <div className="relative flex gap-3">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#5E6AD2] dark:bg-[#c9a86a] border-2 border-black dark:border-zinc-900 mt-0.5 z-10"></div>
              <p>The Full-Length Paper should not exceed 15 pages and the file size should not exceed 10 MB. Any submissions below 12 pages will be considered a Short Paper.</p>
            </div>
          </div>
        </div>
      ),
    }
  ];

  return (
    <PageLayout 
      title="Call For Papers"
      subtitle={`Submit your original research to the ${selectedYear} International Conference on Applied Artificial Intelligence`}
    >
      <div className="linear-card mb-6 overflow-hidden p-0">
        <div className={`flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8 ${
          isDark ? "bg-black/20" : "bg-[#F8F4EA]"
        }`}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5E6AD2] dark:text-[#c9a86a]">Call For Papers</p>
            <h3 className="mt-2 text-2xl font-bold text-zinc-950 dark:text-zinc-100">Paper Submission</h3>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-400">
              Authors are invited to submit original, unpublished research aligned with the conference tracks.
            </p>
          </div>
          <a
            href={cmtUrl}
            target="_blank"
            rel="noreferrer"
            className="linear-primary inline-flex items-center justify-center gap-2 whitespace-nowrap px-5 py-2.5 text-sm"
          >
            Submit Paper via Microsoft CMT
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      <div className="linear-card mb-6 overflow-hidden p-0">
        <div className="p-6 md:p-8">
          <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-100 mb-2">Copyright Form</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            Download and review the copyright form. You can also view it directly below.
          </p>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#5E6AD2] dark:text-[#c9a86a] font-semibold hover:underline mb-4"
          >
            Open Copyright PDF
            <ExternalLink size={14} />
          </a>
        </div>
        <div className="border-t border-black/[0.08] dark:border-white/10">
          <object data={pdfUrl} type="application/pdf" className="w-full h-[700px]">
            <embed src={pdfUrl} type="application/pdf" className="w-full h-[700px]" />
            <div className="p-4 text-sm text-zinc-700 dark:text-zinc-300">
              PDF preview is not available in this browser.{" "}
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5E6AD2] dark:text-[#c9a86a] font-semibold underline"
              >
                Open or download the copyright form
              </a>
              .
            </div>
          </object>
        </div>
      </div>

      {/* Guidelines Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((sec) => (
          <div
            key={sec.id}
            className="linear-card p-6 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="mb-4 flex items-center gap-3 border-b border-black/[0.08] dark:border-white/10 pb-3">
              {sec.icon}
              <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-100">
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
