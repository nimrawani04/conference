// Edited by Milad Ajaz 
// https://m4milaad.github.io/ 

import PageLayout from "./PageLayout";
import { useTheme } from "../context/themeContext";
import { useYear } from "../context/yearContext";
import conferenceData from "../content/conferenceData";

function About() {
  const { isDark } = useTheme();
  const { selectedYear } = useYear();
  const is2024 = selectedYear === 2024;
  const data = conferenceData[selectedYear];
  const meta = data?.meta || conferenceData[2026].meta;

  const sections2026 = [
    {
      title: "About Kashmir",
      text: `Kashmir is a stunningly beautiful region in the northwestern part of the Indian subcontinent, often called "Paradise on Earth." It is famous for its breathtaking landscapes, which include snow-capped Himalayan mountains, lush green valleys, and pristine lakes such as Dal Lake and Wular Lake. The climate varies greatly, from the temperate valleys to the high-altitude glaciers, which feed the Jhelum River.
      
      The culture of Kashmir is a rich tapestry woven from various influences, including Hindu, Buddhist, and Islamic traditions. This blend is reflected in the region's unique handicrafts,like intricate Pashmina shawls and walnut wood carvings, and its distinct cuisine, most notably the elaborate Wazwan feast. The people are known for their hospitality and artistic skills.Kashmir remains a popular tourist destination, drawing visitors with its serene houseboats, beautiful gardens, and opportunities for trekking and skiing. The region's natural beauty and rich cultural heritage continue to be its defining features.`,
      image: "/fdgdfg.jpg",
    },
    {
      title: "About Central University of Kashmir",
      text: `The Central University of Kashmir (CUK) is a government-funded university established in 2009 by an Act of Parliament. It's located in the Ganderbal district of Jammu and Kashmir.The university was created to provide quality higher education and promote research and extension activities in the region.
      
      CUK offers a wide range of academic programs, including undergraduate, postgraduate, and doctoral degrees across various disciplines. These include arts, commerce, engineering,education, law, and science. The university is in the process of developing a full-fledged campus at Tulmulla, with over 500 acres of land acquired for this purpose. While construction is ongoing,the university currently operates from several temporary campuses in Ganderbal.
      
      The university places a strong emphasis on providing a conducive learning environment, with facilities like a library, hostels, and sports complexes. Admissions to most undergraduate and postgraduate programs are based on the Common University Entrance Test (CUET). The university attracts students from various states across India.`,
      image: "/TULMUULAH CAMPUS.jpg",
    },
    {
      title: "About USD AI Research",
      text: (
        <>
          Based at the University of South Dakota (USD), we push the boundaries of foundational AI and machine learning while embracing sustainable AI solutions. Our research covers green computing, active learning, and scalable, robust AI, delivering efficiency with minimal carbon footprint.
          <br /><br />
          We specialize in pattern recognition, computer vision, image processing, data mining, and big data analytics, with interdisciplinary applications in healthcare informatics, medical imaging, document analysis, biometrics, forensics, speech processing, and the Internet of Things.
          <br /><br />
          Join us as we drive AI innovation with sustainability at its core! More information:{" "}
          <a
            href="https://www.ai-research-lab.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            www.ai-research-lab.org
          </a>{" "}
          (Founding Director, Prof. KC (Casey) Santosh).
        </>
      ),
      image: "/aiconference.jpeg",
    },

    {
      title: "About Conference",
      text: `The 2026 International Conference on Applied Artificial Intelligence (2AI), to be organized by Central University of Kashmir in collaboration with USD AI Research  (formerly 2AI Research Lab), University of South Dakota (USA), is a three-day event, running from June 17 to 19, 2026. The conference aims to facilitate global collaboration and the exchange of ideas among researchers, students, and industry professionals in the fields of computer science, data science, and artificial intelligence.
      The conference will cover various themes, including the application of AI in education, healthcare, agriculture, business and finance, energy, and defense and information security. It will feature plenary talks, workshops, and technical sessions on the latest advancements in data science, machine learning, and real-time computing.
`,
      image: "/KASHMIR1.jpg",
    },
  ];

  const sections2024 = is2024 && data.about ? [
    ...data.about.sections.map(s => ({
      title: s.title,
      text: s.text,
      image: s.image,
    })),
    {
      title: "About Conference",
      text: data.about.conference,
      image: "/2024/shoolini1.jpg",
    },
  ] : [];

  const sections = is2024 ? sections2024 : sections2026;

  return (
    <PageLayout 
      title={`About 2AI Conference ${selectedYear}`}
      subtitle={`Learn more about the ${selectedYear} conference, venue, and organizers`}
    >
      <section className="linear-card overflow-hidden p-0">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 md:p-8">
            <p className="text-sm font-semibold uppercase text-[#5E6AD2] dark:text-[#c9a86a]">
              Conference Overview
            </p>
            <h2 className="mt-3 max-w-3xl text-2xl font-bold leading-tight text-zinc-950 dark:text-zinc-100 md:text-4xl">
              {meta.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
              {is2024
                ? data.about.overview
                : "A three-day flagship academic event hosted by Central University of Kashmir in collaboration with USD AI Research, bringing together researchers, students, and industry professionals working across applied artificial intelligence."}
            </p>
          </div>

          <div
            className={`grid border-t p-6 md:grid-cols-3 lg:border-l lg:border-t-0 lg:grid-cols-1 ${
              isDark ? "border-white/20 bg-black/20" : "border-black/45 bg-[#F8F4EA]"
            }`}
          >
            <div
              className={`pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4 lg:border-b lg:border-r-0 lg:pb-4 lg:pr-0 ${
                isDark ? "border-b border-white/20" : "border-b border-black/45"
              }`}
            >
              <p className="text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">Date</p>
              <p className="mt-1 text-sm font-bold text-zinc-950 dark:text-zinc-100">{meta.dates}</p>
              <p className="mt-1 text-xs text-zinc-700 dark:text-zinc-400">{meta.mode}</p>
            </div>
            <div
              className={`py-4 md:border-b-0 md:border-r md:px-4 md:py-0 lg:border-b lg:border-r-0 lg:px-0 lg:py-4 ${
                isDark ? "border-b border-white/20" : "border-b border-black/45"
              }`}
            >
              <p className="text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">Venue</p>
              <a
                href={meta.venueUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block text-sm font-bold text-[#5E6AD2] dark:text-[#c9a86a] hover:underline"
              >
                {is2024 ? "Shoolini University, Solan, India" : "Central University of Kashmir, India"}
              </a>
            </div>
            <div className="pt-4 md:pl-4 md:pt-0 lg:pl-0 lg:pt-4">
              <p className="text-xs font-semibold uppercase text-zinc-600 dark:text-zinc-400">Collaboration</p>
              <a
                href={meta.collaborationUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block text-sm font-bold text-[#5E6AD2] dark:text-[#c9a86a] hover:underline"
              >
                {meta.collaboration}
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8 space-y-6">
        {sections.map((section, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <article key={section.title} className="linear-card overflow-hidden p-0">
              <div
                className={`grid gap-0 ${
                  isEven ? "lg:grid-cols-[0.92fr_1.08fr]" : "lg:grid-cols-[1.08fr_0.92fr]"
                }`}
              >
                <div className={`${isEven ? "" : "lg:order-2"} h-72 lg:h-full`}>
                  <img
                    src={section.image}
                    alt={section.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-6 md:p-8">
                  <p className="text-xs font-semibold uppercase text-zinc-400">
                    {String(idx + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-zinc-950 dark:text-zinc-100">
                    {section.title}
                  </h3>
                  <div className="mt-4 text-base leading-8 text-zinc-600 dark:text-zinc-400 whitespace-pre-line">
                    {section.text}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <section className="linear-card mt-8 border-l-4 border-[#5E6AD2] dark:border-[#c9a86a] p-6">
        <p className="text-base leading-7 text-zinc-700 dark:text-zinc-300">
          The Microsoft CMT service was used for managing the peer-reviewing
          process for this conference. This service was provided for free by
          Microsoft and they bore all expenses, including costs for Azure
          cloud services as well as for software development and support.
        </p>
      </section>
    </PageLayout>
  );
}

export default About;
