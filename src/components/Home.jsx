// Edited by Milad Ajaz
// https://m4milaad.github.io/

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import NotificationBar from "./NotificationBar";
import useInView from "../hooks/useInView";
import { Link } from "react-router-dom";
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

function Home() {
  const images = [
    "/Sammeer Wani Winter_8.jpg",
    "/KASGMIR8.jpg",
    "/KASGMIR7.jpg",
    "/KASHMIR2.jpg",
  ];

  const stats = [
    { value: "500+", label: "Attendees" },
    { value: "40", label: "Speakers" },
    { value: "20", label: "Countries" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [images.length]);

  const [speakersRef, speakersInView] = useInView({ threshold: 0.2 });
  const [sponsorsRef, sponsorsInView] = useInView({ threshold: 0.2 });

  return (
    <div className="app-shell flex min-h-screen flex-col">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl px-6 py-10">
        <section className="linear-card event-hero overflow-hidden p-0">
          <div className="grid gap-8 p-6 md:grid-cols-[1.08fr_0.92fr] md:p-8 lg:p-10">
            <div className="flex flex-col justify-center">
              <div className="terminal-label mb-5 inline-flex w-fit items-center gap-2 border border-black/[0.2] dark:border-white/10 bg-white dark:bg-white/5 px-3 py-1.5 text-zinc-900 dark:text-zinc-300 shadow-sm">
                <Sparkles size={14} className="text-[#5E6AD2] dark:text-[#c9a86a]" aria-hidden />
                CUK & USD AI Research | Flagship Hybrid Conference
              </div>
              <h1 className="max-w-4xl text-3xl font-bold leading-[1.08] text-zinc-950 dark:text-zinc-100 md:text-5xl">
                2026 International Conference on Applied Artificial Intelligence (2AI)
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-800 dark:text-zinc-400">
                A major academic forum for applied AI research, technical exchange, and cross-sector collaboration in education, healthcare, agriculture, finance, energy, and security.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="border border-black/[0.15] dark:border-white/10 bg-white dark:bg-white/5 p-4 shadow-sm">
                  <p className="terminal-label text-zinc-600">Date</p>
                  <p className="mt-1 text-sm font-bold text-zinc-950 dark:text-zinc-100">June 17 - 19, 2026</p>
                </div>
                <div className="border border-black/[0.15] dark:border-white/10 bg-white dark:bg-white/5 p-4 shadow-sm">
                  <p className="terminal-label text-zinc-600">Venue</p>
                  <p className="mt-1 text-sm font-bold text-zinc-950 dark:text-zinc-100">CUK, Ganderbal, India</p>
                </div>
                <div className="border border-black/[0.15] dark:border-white/10 bg-white dark:bg-white/5 p-4 shadow-sm">
                  <p className="terminal-label text-zinc-600">Mode</p>
                  <p className="mt-1 text-sm font-bold text-zinc-950 dark:text-zinc-100">Hybrid Event</p>
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link to="/registration" className="linear-primary inline-flex justify-center px-5 py-3">
                  Register
                </Link>
                <Link to="/sessions/workshops" className="linear-secondary inline-flex justify-center px-5 py-3">
                  Workshop
                </Link>
              </div>
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
              <a
                href="https://cmt3.research.microsoft.com/AAI2026"
                target="_blank"
                rel="noreferrer"
                className="linear-primary mt-4 inline-flex w-full justify-center px-5 py-2 text-sm"
              >
                Submit Paper →
              </a>
            </div>

            <div className="linear-card p-6 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-100">Past Event</h3>
              <p className="mt-2 text-sm text-zinc-800 dark:text-zinc-400 flex-1">
                <span className="font-medium">2024 International Conference on Applied Artificial Intelligence (2AI)</span>{" "}
                (July 2 - 4, 2024) at the Shoolini University of Biotechnology and Management Sciences, Solan, India
              </p>
              <a
                href="https://applied-ai-conference.org/"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex text-sm font-medium text-[#5E6AD2] dark:text-[#c9a86a] hover:underline"
              >
                Visit Past Event's Website →
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="linear-card overflow-hidden">
              <div className="px-6 pb-4 pt-6">
                <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-100">Announcements</h2>
                <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-400">Latest conference updates and publication information.</p>
              </div>

              <div className="px-6">
                <div className="overflow-hidden rounded-2xl border border-black/[0.1] dark:border-white/10">
                  <NotificationBar />
                </div>
              </div>

              <div className="px-6 pb-6">
                <div className="mt-6 border-t border-black/[0.1] dark:border-white/10 pt-5">
                  <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-100">Important Dates</h3>
                  <div className="mt-4 relative">
                    {/* Timeline line */}
                    <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-zinc-400 dark:bg-golden"></div>
                    
                    <div className="space-y-3">
                      {/* Timeline Item 1 */}
                      <div className="relative flex gap-3 items-start group">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white border-2 border-[#5E6AD2] dark:border-[#c9a86a] flex items-center justify-center z-10 shadow-sm">
                          <div className="w-2 h-2 rounded-full bg-[#5E6AD2] dark:bg-[#c9a86a]"></div>
                        </div>
                        <div className="flex-1 flex justify-between items-baseline gap-4 pb-1">
                          <div>
                            <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">Article Submission Deadline</p>
                            <p className="text-xs text-zinc-700 dark:text-zinc-400 mt-0.5">Submit your research papers</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs font-bold text-[#5E6AD2] dark:text-[#c9a86a] whitespace-nowrap">15 Feb 2026</p>
                            <p className="text-[10px] text-zinc-600 dark:text-zinc-400 mt-0.5">Deadline</p>
                          </div>
                        </div>
                      </div>

                      {/* Timeline Item 2 */}
                      <div className="relative flex gap-3 items-start group">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white border-2 border-[#5E6AD2] dark:border-[#c9a86a] flex items-center justify-center z-10 shadow-sm">
                          <div className="w-2 h-2 rounded-full bg-[#5E6AD2] dark:bg-[#c9a86a]"></div>
                        </div>
                        <div className="flex-1 flex justify-between items-baseline gap-4 pb-1">
                          <div>
                            <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">Notification of Acceptance</p>
                            <p className="text-xs text-zinc-700 dark:text-zinc-400 mt-0.5">Review results announced</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs font-bold text-[#5E6AD2] dark:text-[#c9a86a] whitespace-nowrap">25 Apr 2026</p>
                            <p className="text-[10px] text-zinc-600 dark:text-zinc-400 mt-0.5">Notification</p>
                          </div>
                        </div>
                      </div>

                      {/* Timeline Item 3 */}
                      <div className="relative flex gap-3 items-start group">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white border-2 border-[#5E6AD2] dark:border-[#c9a86a] flex items-center justify-center z-10 shadow-sm">
                          <div className="w-2 h-2 rounded-full bg-[#5E6AD2] dark:bg-[#c9a86a]"></div>
                        </div>
                        <div className="flex-1 flex justify-between items-baseline gap-4 pb-1">
                          <div>
                            <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">Camera Ready Submission</p>
                            <p className="text-xs text-zinc-700 dark:text-zinc-400 mt-0.5">Final paper submission</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs font-bold text-[#5E6AD2] dark:text-[#c9a86a] whitespace-nowrap">01 Jun 2026</p>
                            <p className="text-[10px] text-zinc-600 dark:text-zinc-400 mt-0.5">Deadline</p>
                          </div>
                        </div>
                      </div>

                      {/* Timeline Item 4 */}
                      <div className="relative flex gap-3 items-start group">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white border-2 border-[#5E6AD2] dark:border-[#c9a86a] flex items-center justify-center z-10 shadow-sm">
                          <div className="w-2 h-2 rounded-full bg-[#5E6AD2] dark:bg-[#c9a86a]"></div>
                        </div>
                        <div className="flex-1 flex justify-between items-baseline gap-4 pb-1">
                          <div>
                            <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">Registration Opens</p>
                            <p className="text-xs text-zinc-700 dark:text-zinc-400 mt-0.5">Early bird registration starts</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs font-bold text-[#5E6AD2] dark:text-[#c9a86a] whitespace-nowrap">25 Apr 2026</p>
                            <p className="text-[10px] text-zinc-600 dark:text-zinc-400 mt-0.5">Start Date</p>
                          </div>
                        </div>
                      </div>

                      {/* Timeline Item 5 */}
                      <div className="relative flex gap-3 items-start group">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white border-2 border-[#5E6AD2] dark:border-[#c9a86a] flex items-center justify-center z-10 shadow-sm">
                          <div className="w-2 h-2 rounded-full bg-[#5E6AD2] dark:bg-[#c9a86a]"></div>
                        </div>
                        <div className="flex-1 flex justify-between items-baseline gap-4 pb-1">
                          <div>
                            <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">Pre-Conference Workshop</p>
                            <p className="text-xs text-zinc-700 dark:text-zinc-400 mt-0.5">Hands-on training sessions</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs font-bold text-[#5E6AD2] dark:text-[#c9a86a] whitespace-nowrap">17 Jun 2026</p>
                            <p className="text-[10px] text-zinc-600 dark:text-zinc-400 mt-0.5">Workshop Day</p>
                          </div>
                        </div>
                      </div>

                      {/* Timeline Item 6 - Conference Days */}
                      <div className="relative flex gap-3 items-start group">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#5E6AD2] dark:bg-[#c9a86a] border-2 border-[#5E6AD2] dark:border-[#c9a86a] flex items-center justify-center z-10 shadow-sm">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                        <div className="flex-1 flex justify-between items-baseline gap-4 pb-1">
                          <div>
                            <p className="text-sm font-bold text-zinc-950 dark:text-zinc-100">Main Conference</p>
                            <p className="text-xs text-zinc-800 dark:text-zinc-400 mt-0.5">Keynotes, presentations & networking</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs font-bold text-[#5E6AD2] dark:text-[#c9a86a] whitespace-nowrap">18-19 Jun 2026</p>
                            <p className="text-[10px] text-zinc-600 dark:text-zinc-400 mt-0.5">Conference Days</p>
                          </div>
                        </div>
                      </div>
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
            <div className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white/45 p-3 text-sm text-zinc-600 transition hover:-translate-y-0.5 hover:bg-white/70">
              <Zap size={20} className="shrink-0 text-[#5E6AD2]" />
              <span>AI for Energy</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white/45 p-3 text-sm text-zinc-600 transition hover:-translate-y-0.5 hover:bg-white/70">
              <GraduationCap size={20} className="shrink-0 text-[#5E6AD2]" />
              <span>AI for Education</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white/45 p-3 text-sm text-zinc-600 transition hover:-translate-y-0.5 hover:bg-white/70">
              <Stethoscope size={20} className="shrink-0 text-[#5E6AD2]" />
              <span>AI for Healthcare</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white/45 p-3 text-sm text-zinc-600 transition hover:-translate-y-0.5 hover:bg-white/70">
              <Wheat size={20} className="shrink-0 text-[#5E6AD2]" />
              <span>AI for Agriculture</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white/45 p-3 text-sm text-zinc-600 transition hover:-translate-y-0.5 hover:bg-white/70">
              <Briefcase size={20} className="shrink-0 text-[#5E6AD2]" />
              <span>AI for Business & Finance</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white/45 p-3 text-sm text-zinc-600 transition hover:-translate-y-0.5 hover:bg-white/70">
              <Shield size={20} className="shrink-0 text-[#5E6AD2]" />
              <span>AI for Defense & Security</span>
            </div>
          </div>
        </section>

        <section
          ref={speakersRef}
          className={`linear-card mt-6 p-6 transition-all duration-700 ${speakersInView ? "opacity-100" : "opacity-0"}`}
        >
          <h2 className="text-xl font-bold text-zinc-950">Distinguished Speakers</h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-black/[0.06] bg-white/45 p-4 text-center transition hover:-translate-y-0.5 hover:bg-white/70">
              <div className="mx-auto mb-3 h-24 w-24 overflow-hidden rounded-full border border-black/[0.06]">
                <img
                  src="/nishchal.jpg"
                  alt="Prof. Nishchal K Verma"
                  className="h-full w-full object-cover"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/150?text=Speaker")}
                />
              </div>
              <h3 className="text-base font-bold text-zinc-950">Prof. Nishchal K Verma</h3>
              <p className="text-sm font-medium text-[#5E6AD2]">Keynote Speaker</p>
              <p className="text-xs text-zinc-500">IIT Kanpur, India</p>
            </div>

            <div className="rounded-2xl border border-black/[0.06] bg-white/45 p-4 text-center transition hover:-translate-y-0.5 hover:bg-white/70">
              <div className="mx-auto mb-3 h-24 w-24 overflow-hidden rounded-full border border-black/[0.06]">
                <img
                  src="/karunakar.jpg"
                  alt="A K Karunakar"
                  className="h-full w-full object-cover"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/150?text=Speaker")}
                />
              </div>
              <h3 className="text-base font-bold text-zinc-950">A K Karunakar</h3>
              <p className="text-sm font-medium text-[#5E6AD2]">Invited Speaker</p>
              <p className="text-xs text-zinc-500">Manipal University Jaipur, India</p>
            </div>
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
          <h2 className="text-xl font-bold text-zinc-950">Sponsors</h2>
          <div className="flex justify-center py-8">
            <p className="flex items-center gap-2 text-center text-base text-zinc-500">
              <Sparkles size={20} className="text-[#5E6AD2]" />
              Information will be available shortly
              <Sparkles size={20} className="text-[#5E6AD2]" />
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
