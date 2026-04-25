// Edited by Milad Ajaz
// https://m4milaad.github.io/

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import NotificationBar from "./NotificationBar";
import useInView from "../hooks/useInView";
import { Link } from "react-router-dom";
import { useYear } from "../context/yearContext";
import conferenceData from "../content/conferenceData";
import {
  Bell,
  Briefcase,
  Calendar,
  Camera,
  FileText,
  GraduationCap,
  Presentation,
  Shield,
  Sparkles,
  Stethoscope,
  Wheat,
  Zap,
} from "lucide-react";

const iconMap = {
  GraduationCap,
  Stethoscope,
  Wheat,
  Briefcase,
  Zap,
  Shield,
};

function Home() {
  const { selectedYear } = useYear();
  const data = conferenceData[selectedYear];
  const is2024 = selectedYear === 2024;

  // 2026 default data (fallback when not in conferenceData)
  const images2026 = [
    "/Sammeer Wani Winter_8.jpg",
    "/KASGMIR8.jpg",
    "/KASGMIR7.jpg",
    "/KASHMIR2.jpg",
  ];

  const stats2026 = [
    { value: "500+", label: "Attendees" },
    { value: "40", label: "Speakers" },
    { value: "20", label: "Countries" },
  ];

  const images = is2024 ? data.hero.images : images2026;
  const stats = is2024 ? data.hero.stats : stats2026;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedYear]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [images.length]);

  const [speakersRef, speakersInView] = useInView({ threshold: 0.2 });
  const [sponsorsRef, sponsorsInView] = useInView({ threshold: 0.2 });

  // Important dates for 2024 come from data; for 2026 use hardcoded
  const importantDates2026 = [
    { title: "Article Submission Deadline", subtitle: "Submit your research papers", date: "15 Feb 2026", label: "Deadline" },
    { title: "Notification of Acceptance", subtitle: "Review results announced", date: "25 Apr 2026", label: "Notification" },
    { title: "Camera Ready Submission", subtitle: "Final paper submission", date: "01 Jun 2026", label: "Deadline" },
    { title: "Registration Opens", subtitle: "Early bird registration starts", date: "25 Apr 2026", label: "Start Date" },
    { title: "Pre-Conference Workshop", subtitle: "Hands-on training sessions", date: "17 Jun 2026", label: "Workshop Day" },
    { title: "Main Conference", subtitle: "Keynotes, presentations & networking", date: "18-19 Jun 2026", label: "Conference Days", isMain: true },
  ];

  const dates = is2024 ? data.importantDates : importantDates2026;
  const themes = is2024 ? data.themes : [
    { name: "AI for Energy", icon: "Zap" },
    { name: "AI for Education", icon: "GraduationCap" },
    { name: "AI for Healthcare", icon: "Stethoscope" },
    { name: "AI for Agriculture", icon: "Wheat" },
    { name: "AI for Business & Finance", icon: "Briefcase" },
    { name: "AI for Defense & Security", icon: "Shield" },
  ];

  const speakers2024 = is2024 ? data.keynoteSpeakers.slice(0, 3) : [];
  const speakers2026 = [
    { name: "Prof. Nishchal K Verma", role: "Keynote Speaker", org: "IIT Kanpur, India", image: "/nishchal.jpg" },
    { name: "A K Karunakar", role: "Invited Speaker", org: "Manipal University Jaipur, India", image: "/karunakar.jpg" },
    { name: "Maheshkumar H. Kolekar", role: "Invited Speaker", org: "IIT Patna, India", image: "/mahesh.jpg" },
    { name: "Dr. Karan Nathwani", role: "Invited Speaker", org: "IIT Jammu, India", image: "/karan.jpg" },
  ];

  const displaySpeakers = is2024 ? speakers2024 : speakers2026;

  const meta = data?.meta || conferenceData[2026].meta;

  return (
    <div className="app-shell flex min-h-screen flex-col">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-6 py-10">
        <section className="linear-card event-hero overflow-hidden p-0">
          <div className="grid gap-8 p-6 md:grid-cols-[1.08fr_0.92fr] md:p-8 lg:p-10">
            <div className="flex flex-col justify-center">
              <div className="terminal-label mb-5 inline-flex w-fit items-center gap-2 border border-black/[0.2] dark:border-white/10 bg-white dark:bg-white/5 px-3 py-1.5 text-zinc-900 dark:text-zinc-300 shadow-sm">
                <Sparkles size={14} className="text-[#5E6AD2] dark:text-[#c9a86a]" aria-hidden />
                {is2024 ? data.hero.badge : "CUK & USD AI Research | Flagship Hybrid Conference"}
              </div>
              <h1 className="max-w-4xl text-3xl font-bold leading-[1.08] text-zinc-950 dark:text-zinc-100 md:text-5xl">
                {meta.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-800 dark:text-zinc-400">
                {is2024
                  ? data.hero.description
                  : "A major academic forum for applied AI research, technical exchange, and cross-sector collaboration in education, healthcare, agriculture, finance, energy, and security."}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="border border-black/[0.15] dark:border-white/10 bg-white dark:bg-white/5 p-4 shadow-sm">
                  <p className="terminal-label text-zinc-600">Date</p>
                  <p className="mt-1 text-sm font-bold text-zinc-950 dark:text-zinc-100">{meta.dates}</p>
                </div>
                <div className="border border-black/[0.15] dark:border-white/10 bg-white dark:bg-white/5 p-4 shadow-sm">
                  <p className="terminal-label text-zinc-600">Venue</p>
                  <p className="mt-1 text-sm font-bold text-zinc-950 dark:text-zinc-100">{meta.venue}</p>
                </div>
                <div className="border border-black/[0.15] dark:border-white/10 bg-white dark:bg-white/5 p-4 shadow-sm">
                  <p className="terminal-label text-zinc-600">Mode</p>
                  <p className="mt-1 text-sm font-bold text-zinc-950 dark:text-zinc-100">{meta.mode}</p>
                </div>
              </div>

              {!is2024 && (
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link to="/registration" className="linear-primary inline-flex justify-center px-5 py-3">
                    Register
                  </Link>
                  <Link to="/sessions/workshops" className="linear-secondary inline-flex justify-center px-5 py-3">
                    Workshop
                  </Link>
                </div>
              )}
              {is2024 && (
                <div className="mt-7">
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 px-4 py-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                    <Sparkles size={14} /> Past Event — Successfully Concluded
                  </span>
                </div>
              )}
            </div>

            <div className="relative min-h-[340px] overflow-hidden border border-black/[0.15] dark:border-white/10 bg-white dark:bg-white/5 shadow-sm">
              <img
                src={images[currentIndex]}
                alt="Conference Location"
                className="h-full min-h-[340px] w-full object-cover transition-all duration-1000"
              />
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="linear-card p-5">
              <p className="terminal-label text-zinc-400">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold text-zinc-950 dark:text-zinc-100">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="linear-card p-6 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-100">Paper Submission</h3>
              <p className="mt-2 text-sm text-zinc-800 dark:text-zinc-400 flex-1">
                Authors are invited to submit their original and unpublished research paper.
              </p>
              {!is2024 && (
                <a
                  href={meta.cmt}
                  target="_blank"
                  rel="noreferrer"
                  className="linear-primary mt-4 inline-flex w-full justify-center px-5 py-2 text-sm"
                >
                  Submit Paper →
                </a>
              )}
              {is2024 && (
                <span className="mt-4 inline-flex w-full justify-center px-5 py-2 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 cursor-not-allowed rounded">
                  Submissions Closed
                </span>
              )}
            </div>

            <div className="linear-card p-6 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-100">
                {is2024 ? "Current Event" : "Past Event"}
              </h3>
              <p className="mt-2 text-sm text-zinc-800 dark:text-zinc-400 flex-1">
                {is2024 ? (
                  <>
                    <span className="font-medium">2026 International Conference on Applied Artificial Intelligence (2AI)</span>{" "}
                    (June 17 - 19, 2026) at Central University of Kashmir, Ganderbal, India
                  </>
                ) : (
                  <>
                    <span className="font-medium">2024 International Conference on Applied Artificial Intelligence (2AI)</span>{" "}
                    (July 2 - 4, 2024) at the Shoolini University of Biotechnology and Management Sciences, Solan, India
                  </>
                )}
              </p>
              {is2024 ? (
                <span
                  className="mt-3 inline-flex text-sm font-medium text-[#5E6AD2] dark:text-[#c9a86a] hover:underline cursor-pointer"
                  onClick={() => {/* Year switching handled by the Navbar */}}
                >
                  View 2026 Conference →
                </span>
              ) : (
                <a
                  href="https://applied-ai-conference.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex text-sm font-medium text-[#5E6AD2] dark:text-[#c9a86a] hover:underline"
                >
                  Visit Past Event's Website →
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="linear-card overflow-hidden">
              <div className="px-6 pb-4 pt-6">
                <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-100">Announcements</h2>
                <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-400">Latest conference updates and publication information.</p>
              </div>

              {!is2024 && (
                <div className="px-6">
                  <div className="overflow-hidden rounded-2xl border border-black/[0.1] dark:border-white/10">
                    <NotificationBar />
                  </div>
                </div>
              )}
              {is2024 && (
                <div className="px-6">
                  <div className="overflow-hidden rounded-2xl border border-black/[0.1] dark:border-white/10 p-4 bg-emerald-50/50 dark:bg-emerald-900/10">
                    <p className="text-sm text-zinc-700 dark:text-zinc-300">
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">📚 Published:</span> Selected papers from 2AI-2024 were published in Springer CCIS proceedings (Scopus indexed).
                    </p>
                  </div>
                </div>
              )}

              <div className="px-6 pb-6">
                <div className="mt-6 border-t border-black/[0.1] dark:border-white/10 pt-5">
                  <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-100">Important Dates</h3>
                  <div className="mt-4 relative">
                    {/* Timeline line */}
                    <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-zinc-400 dark:bg-golden"></div>
                    
                    <div className="space-y-3">
                      {dates.map((item, idx) => (
                        <div key={idx} className="relative flex gap-3 items-start group">
                          <div className={`flex-shrink-0 w-6 h-6 rounded-full ${
                            item.isMain
                              ? "bg-[#5E6AD2] dark:bg-[#c9a86a] border-2 border-[#5E6AD2] dark:border-[#c9a86a]"
                              : "bg-white border-2 border-[#5E6AD2] dark:border-[#c9a86a]"
                          } flex items-center justify-center z-10 shadow-sm`}>
                            <div className={`w-2 h-2 rounded-full ${
                              item.isMain ? "bg-white" : "bg-[#5E6AD2] dark:bg-[#c9a86a]"
                            }`}></div>
                          </div>
                          <div className="flex-1 flex justify-between items-baseline gap-4 pb-1">
                            <div>
                              <p className={`text-sm ${item.isMain ? "font-bold" : "font-semibold"} text-zinc-950 dark:text-zinc-100`}>{item.title}</p>
                              <p className="text-xs text-zinc-700 dark:text-zinc-400 mt-0.5">{item.subtitle}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-xs font-bold text-[#5E6AD2] dark:text-[#c9a86a] whitespace-nowrap">{item.date}</p>
                              <p className="text-[10px] text-zinc-600 dark:text-zinc-400 mt-0.5">{item.label}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="linear-card mt-6 p-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-zinc-950">Conference Themes</h2>
              <p className="mt-1 text-sm text-zinc-500">Applied AI tracks designed for academic and industry participation.</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {themes.map((theme) => {
              const Icon = iconMap[theme.icon] || Zap;
              return (
                <div key={theme.name} className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white/45 p-3 text-sm text-zinc-600 transition hover:-translate-y-0.5 hover:bg-white/70">
                  <Icon size={20} className="shrink-0 text-[#5E6AD2]" />
                  <span>{theme.name}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section
          ref={speakersRef}
          className={`linear-card mt-6 p-6 transition-all duration-700 ${speakersInView ? "opacity-100" : "opacity-0"}`}
        >
          <h2 className="text-xl font-bold text-zinc-950">Distinguished Speakers</h2>

          <div className={`mt-4 grid gap-4 md:grid-cols-2 ${displaySpeakers.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {displaySpeakers.map((speaker, idx) => (
              <div key={idx} className="rounded-2xl border border-black/[0.06] bg-white/45 p-4 text-center transition hover:-translate-y-0.5 hover:bg-white/70">
                <div className="mx-auto mb-3 h-24 w-24 overflow-hidden rounded-full border border-black/[0.06]">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="h-full w-full object-cover"
                    onError={(e) => (e.target.src = "https://via.placeholder.com/150?text=Speaker")}
                  />
                </div>
                <h3 className="text-base font-bold text-zinc-950">{speaker.name}</h3>
                <p className="text-sm font-medium text-[#5E6AD2]">{speaker.role}</p>
                <p className="text-xs text-zinc-500">{speaker.org}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link to="/KeyNotes" className="linear-secondary inline-flex px-6 py-2 text-sm">
              View All Speakers →
            </Link>
          </div>
        </section>

        <section
          ref={sponsorsRef}
          className={`linear-card mt-6 p-6 transition-all duration-700 ${sponsorsInView ? "opacity-100" : "opacity-0"}`}
        >
          <h2 className="text-xl font-bold text-zinc-950">Sponsors & Partners</h2>
          
          {is2024 && data.sponsorship ? (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.sponsorship.tiers.map((tier, idx) => (
                <div key={idx} className="flex flex-col items-center p-4 rounded-xl border border-black/[0.06] bg-white/45 text-center transition hover:-translate-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">{tier.name.split(' ')[0]}</span>
                  <span className="text-base font-black text-[#c9a86a]">{tier.amount}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center py-8">
              <p className="flex items-center gap-2 text-center text-base text-zinc-500">
                <Sparkles size={20} className="text-[#5E6AD2]" />
                Information will be available shortly
                <Sparkles size={20} className="text-[#5E6AD2]" />
              </p>
            </div>
          )}

          {is2024 && (
            <div className="mt-6 text-center">
              <Link to="/Sponsors" className="text-sm font-medium text-[#5E6AD2] dark:text-[#c9a86a] hover:underline">
                View Detailed Sponsorship Benefits →
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;
