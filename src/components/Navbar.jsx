// Edited by Milad Ajaz
// https://m4milaad.github.io/

import { useEffect, useState, useCallback } from "react";
import { ChevronDown, Menu, Moon, Search, Sun, User, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/themeContext";
import { useYear } from "../context/yearContext";
import conferenceData from "../content/conferenceData";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const [committeeOpen, setCommitteeOpen] = useState(false);
  const [sessionsOpen, setSessionsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { selectedYear, setSelectedYear } = useYear();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");

  // Search function that can be reused for both desktop and mobile
  const performSearch = useCallback((query) => {
    if (!query.trim()) {
      return [];
    }

    const q = query.toLowerCase();
    const data = conferenceData[selectedYear];
    const results = [];

    if (!data) return results;

    // Search Speakers
    data.keynoteSpeakers?.forEach(s => {
      if (s.name.toLowerCase().includes(q) || s.org.toLowerCase().includes(q) || s.bio?.toLowerCase().includes(q)) {
        results.push({ type: "Speaker", title: s.name, subtitle: s.org, link: "/KeyNotes" });
      }
    });

    // Search Themes
    data.themes?.forEach(t => {
      if (t.name.toLowerCase().includes(q)) {
        results.push({ type: "Theme", title: t.name, subtitle: "Conference Track", link: "/" });
      }
    });

    // Search Sessions/Workshops
    const workshops = data.workshops?.items || data.workshops?.schedule || [];
    workshops.forEach(w => {
      const title = w.title || w.event || "";
      const speaker = w.speaker || w.resourcePerson || "";
      if (title.toLowerCase().includes(q) || speaker.toLowerCase().includes(q)) {
        results.push({ type: "Session", title: title, subtitle: speaker, link: "/sessions/workshops" });
      }
    });

    // Search Special Sessions
    if (data.specialSessions) {
      data.specialSessions.forEach(s => {
        if (s.title?.toLowerCase().includes(q) || s.organizer?.toLowerCase().includes(q)) {
          results.push({ type: "Special Session", title: s.title, subtitle: s.organizer, link: "/sessions/specialSessions" });
        }
      });
    }

    // Search Committees
    if (data.technicalCommittee) {
      data.technicalCommittee.forEach(m => {
        if (m.name.toLowerCase().includes(q) || m.affiliation?.toLowerCase().includes(q)) {
          results.push({ type: "Committee", title: m.name, subtitle: m.affiliation, link: "/committee/TechnicalCommitte" });
        }
      });
    }

    if (data.organizingCommittee) {
      Object.values(data.organizingCommittee).forEach(val => {
        if (Array.isArray(val)) {
          val.forEach(m => {
            if (m.name.toLowerCase().includes(q) || m.affiliation?.toLowerCase().includes(q)) {
              results.push({ type: "Committee", title: m.name, subtitle: m.affiliation || "Organizing Committee", link: "/committee/OrganizingCommitte" });
            }
          });
        }
      });
    }

    if (data.steeringCommittee) {
      data.steeringCommittee.forEach(m => {
        if (m.name.toLowerCase().includes(q) || m.affiliation?.toLowerCase().includes(q)) {
          results.push({ type: "Committee", title: m.name, subtitle: m.affiliation, link: "/committee/SteeringCommitte" });
        }
      });
    }

    // Search general pages based on keywords
    const pageKeywords = {
      "about": { link: "/about", title: "About Conference", subtitle: "Conference Information" },
      "call for papers": { link: "/call-for-papers", title: "Call for Papers", subtitle: "Submit Your Research" },
      "papers": { link: "/call-for-papers", title: "Call for Papers", subtitle: "Submit Your Research" },
      "submission": { link: "/call-for-papers", title: "Call for Papers", subtitle: "Submit Your Research" },
      "schedule": { link: "/schedule", title: "Conference Schedule", subtitle: "Event Timeline" },
      "program": { link: "/schedule", title: "Conference Schedule", subtitle: "Event Timeline" },
      "registration": { link: "/registration", title: "Registration", subtitle: "Register for Conference" },
      "register": { link: "/registration", title: "Registration", subtitle: "Register for Conference" },
      "contact": { link: "/contact", title: "Contact Us", subtitle: "Get in Touch" },
      "sponsors": { link: "/sponsors", title: "Sponsors", subtitle: "Conference Sponsors" },
      "venue": { link: "/about", title: "About Conference", subtitle: "Venue Information" },
      "location": { link: "/about", title: "About Conference", subtitle: "Venue Information" }
    };

    Object.entries(pageKeywords).forEach(([keyword, page]) => {
      if (keyword.includes(q) || q.includes(keyword)) {
        results.push({ type: "Page", title: page.title, subtitle: page.subtitle, link: page.link });
      }
    });

    return results.slice(0, 10);
  }, [selectedYear]);

  useEffect(() => {
    setSearchResults(performSearch(searchQuery));
  }, [searchQuery, performSearch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      const firstResult = searchResults[0];
      setSearchQuery("");
      setIsSearchFocused(false);
      navigate(firstResult.link);
    }
  };

  const handleMobileSearchSubmit = (e) => {
    e.preventDefault();
    const results = performSearch(mobileSearchQuery);
    if (results.length > 0) {
      setMobileSearchQuery("");
      handleMenuToggle();
      navigate(results[0].link);
    }
  };

  const committeeItems = [
    { name: "Steering Committee", path: "/committee/SteeringCommitte" },
    { name: "Organizing Committee", path: "/committee/OrganizingCommitte" },
    ...(selectedYear === 2024 ? [{ name: "Technical Committee", path: "/committee/TechnicalCommitte" }] : []),
  ];

  const sessionsItems = [
    { name: "Special Sessions", path: "/sessions/specialSessions" },
    { name: "Workshops", path: "/sessions/workshops" },
  ];

  const navLinkClass =
    "terminal-nav-item px-2 py-1.5 text-xs font-medium text-zinc-600 transition hover:bg-black/[0.04] hover:text-zinc-950 whitespace-nowrap";
  const mobileLinkClass =
    "terminal-nav-item block px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-black/[0.04] hover:text-zinc-950";

  const handleMenuToggle = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 300);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown")) {
        setYearOpen(false);
        setCommitteeOpen(false);
        setSessionsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="linear-nav sticky top-0 z-50 border-b border-black/[0.06] bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <img src="/CUKLogo.png" alt="CUK Logo" className="h-11 w-auto shrink-0 object-contain" />
          <img src="/logo.png" alt="Conference Logo" className="h-11 w-auto shrink-0 object-contain" />
          <a
            href="https://www.springer.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center sm:flex"
          >
            <img src="/springer.png" alt="Springer Logo" className="h-7 w-auto object-contain" />
          </a>
          <span className="hidden min-w-0 border-l border-black/[0.08] pl-3 md:block">
            <span className="block text-sm font-bold text-zinc-950">2AI</span>
            <span className="terminal-label block text-zinc-500">CONFERENCE {selectedYear}</span>
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden md:block">
            <form onSubmit={handleSearchSubmit}>
              <label className={`linear-search flex h-8 items-center gap-2 border bg-white px-2.5 text-zinc-500 transition-all ${
                isSearchFocused ? "border-[#5E6AD2] ring-2 ring-[#5E6AD2]/10 w-64" : "border-black/10 w-44 lg:w-52"
              }`}>
                <Search size={14} aria-hidden />
                <input
                  type="text"
                  placeholder="Search conference..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  className="w-full border-0 bg-transparent text-xs text-zinc-800 outline-none placeholder:text-zinc-400"
                />
              </label>
            </form>

            {isSearchFocused && searchResults.length > 0 && (
              <div className="linear-dropdown absolute right-0 mt-2 w-72 overflow-hidden border border-black/[0.06] bg-white shadow-2xl">
                <div className="px-3 py-2 border-b border-black/5 bg-zinc-50/50">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Search Results</p>
                </div>
                <ul className="py-1 max-h-80 overflow-y-auto">
                  {searchResults.map((result, idx) => (
                    <li key={idx}>
                      <Link
                        to={result.link}
                        onClick={() => {
                          setSearchQuery("");
                          setIsSearchFocused(false);
                        }}
                        className="flex flex-col px-3 py-2 transition hover:bg-black/[0.04]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-zinc-900 line-clamp-1">{result.title}</span>
                          <span className="text-[9px] font-bold uppercase tracking-tighter px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-500">
                            {result.type}
                          </span>
                        </div>
                        <span className="text-[10px] text-zinc-500 line-clamp-1 mt-0.5">{result.subtitle}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle inline-flex h-8 w-8 items-center justify-center border border-black/10 bg-white text-zinc-700 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[#5E6AD2]/40"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
          </button>
          <Link
            to="/admin/login"
            className="terminal-nav-item hidden items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-zinc-600 transition hover:bg-black/[0.04] hover:text-zinc-950 sm:flex"
          >
            <User size={16} aria-hidden />
            <span>Admin</span>
          </Link>
          <button
            className="inline-flex h-8 w-8 items-center justify-center border border-black/10 bg-white text-zinc-700 transition hover:bg-zinc-50 lg:hidden"
            onClick={handleMenuToggle}
            aria-label={isOpen ? "Close menu" : "Toggle menu"}
          >
            {isOpen ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </div>

      <nav className="border-t border-black/[0.06] bg-white">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-2 px-6">
          <div className="relative dropdown">
            <button
              onClick={() => {
                setYearOpen(!yearOpen);
                setCommitteeOpen(false);
                setSessionsOpen(false);
              }}
              className="terminal-nav-item flex items-center gap-0.5 border border-black/[0.06] bg-white px-2.5 py-1 text-xs font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 hover:text-zinc-950 whitespace-nowrap"
            >
              Select Year ({selectedYear})
              <ChevronDown size={12} className={`transition-transform ${yearOpen ? "rotate-180" : ""}`} />
            </button>
              {yearOpen && (
              <div className="linear-dropdown absolute left-0 mt-1 w-44 overflow-hidden border border-black/[0.06] bg-white shadow-2xl">
                <ul className="py-0.5">
                  <li
                    onClick={() => { setSelectedYear(2026); setYearOpen(false); }}
                    className={`px-3 py-1.5 text-xs cursor-pointer transition ${
                      selectedYear === 2026
                        ? "text-[#5E6AD2] dark:text-[#c9a86a] font-bold bg-[#5E6AD2]/5 dark:bg-[#c9a86a]/5"
                        : "text-zinc-700 hover:bg-black/[0.04]"
                    }`}
                  >
                    2026 {selectedYear === 2026 && "✓"}
                  </li>
                  <li
                    onClick={() => { setSelectedYear(2024); setYearOpen(false); }}
                    className={`px-3 py-1.5 text-xs cursor-pointer transition ${
                      selectedYear === 2024
                        ? "text-[#5E6AD2] dark:text-[#c9a86a] font-bold bg-[#5E6AD2]/5 dark:bg-[#c9a86a]/5"
                        : "text-zinc-700 hover:bg-black/[0.04]"
                    }`}
                  >
                    2024 {selectedYear === 2024 && "✓"}
                  </li>
                  <li className="px-3 py-1.5 text-xs text-zinc-400 cursor-not-allowed">2025</li>
                </ul>
              </div>
            )}
          </div>

          <div className="hidden items-center gap-0.5 lg:flex">
            <Link to="/" className={navLinkClass}>Home</Link>
            <Link to="/about" className={navLinkClass}>About</Link>
            <Link to="/call-for-papers" className={navLinkClass}>Call For Papers</Link>

            <div className="relative dropdown">
              <button
                onClick={() => {
                  setCommitteeOpen(!committeeOpen);
                  setSessionsOpen(false);
                }}
                className={`${navLinkClass} flex items-center gap-0.5`}
              >
                Committee
                <ChevronDown size={12} className={`transition-transform ${committeeOpen ? "rotate-180" : ""}`} />
              </button>
              {committeeOpen && (
                <div className="linear-dropdown absolute left-0 mt-1 w-52 overflow-hidden border border-black/[0.06] bg-white shadow-2xl">
                  <ul className="py-0.5">
                    {committeeItems.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          onClick={() => setCommitteeOpen(false)}
                          className="block px-3 py-1.5 text-xs text-zinc-700 transition hover:bg-black/[0.04] hover:text-zinc-950"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Link to="/schedule" className={navLinkClass}>Schedule</Link>

            <div className="relative dropdown">
              <button
                onClick={() => {
                  setSessionsOpen(!sessionsOpen);
                  setCommitteeOpen(false);
                }}
                className={`${navLinkClass} flex items-center gap-0.5`}
              >
                Sessions
                <ChevronDown size={12} className={`transition-transform ${sessionsOpen ? "rotate-180" : ""}`} />
              </button>
              {sessionsOpen && (
                <div className="linear-dropdown absolute left-0 mt-1 w-52 overflow-hidden border border-black/[0.06] bg-white shadow-2xl">
                  <ul className="py-0.5">
                    {sessionsItems.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          onClick={() => setSessionsOpen(false)}
                          className="block px-3 py-1.5 text-xs text-zinc-700 transition hover:bg-black/[0.04] hover:text-zinc-950"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Link to="/KeyNotes" className={navLinkClass}>Speakers</Link>
            <Link to="/sponsors" className={navLinkClass}>Sponsors</Link>
            <Link to="/registration" className="terminal-nav-item bg-[#5E6AD2] px-2 py-1.5 text-xs font-semibold text-white shadow-[0_12px_26px_rgba(94,106,210,0.22)] transition hover:bg-[#6f7af0] whitespace-nowrap">
              Registration
            </Link>
            <Link to="/contact" className={navLinkClass}>Contact</Link>
          </div>
        </div>

        {isOpen && (
          <div
            className={`linear-mobile-menu lg:hidden max-h-[calc(100vh-128px)] overflow-y-auto border-t border-black/[0.06] bg-white ${
              isClosing ? "animate-slideUp" : "animate-slideDown"
            }`}
          >
            <div className="space-y-1 px-6 py-3">
              <form onSubmit={handleMobileSearchSubmit} className="mb-3">
                <label className="linear-search flex h-8 items-center gap-2 border border-black/10 bg-white px-2.5 text-zinc-500 md:hidden">
                  <Search size={14} aria-hidden />
                  <input
                    type="text"
                    placeholder="Search conference..."
                    value={mobileSearchQuery}
                    onChange={(e) => setMobileSearchQuery(e.target.value)}
                    className="w-full border-0 bg-transparent text-xs text-zinc-800 outline-none placeholder:text-zinc-400"
                  />
                </label>
              </form>
              <Link to="/" onClick={handleMenuToggle} className={mobileLinkClass}>Home</Link>
              <Link to="/about" onClick={handleMenuToggle} className={mobileLinkClass}>About</Link>
              <Link to="/call-for-papers" onClick={handleMenuToggle} className={mobileLinkClass}>Call For Papers</Link>

              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCommitteeOpen(!committeeOpen);
                  }}
                  className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-black/[0.04] hover:text-zinc-950"
                >
                  Committee
                  <ChevronDown size={14} className={`transition-transform ${committeeOpen ? "rotate-180" : ""}`} />
                </button>
                {committeeOpen && (
                  <div className="mt-1 pl-4">
                    {committeeItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => {
                          setCommitteeOpen(false);
                          handleMenuToggle();
                        }}
                        className="block px-3 py-2 text-sm text-zinc-500 transition hover:bg-black/[0.04] hover:text-zinc-950"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/schedule" onClick={handleMenuToggle} className={mobileLinkClass}>Schedule</Link>

              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSessionsOpen(!sessionsOpen);
                  }}
                  className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-black/[0.04] hover:text-zinc-950"
                >
                  Sessions
                  <ChevronDown size={14} className={`transition-transform ${sessionsOpen ? "rotate-180" : ""}`} />
                </button>
                {sessionsOpen && (
                  <div className="mt-1 pl-4">
                    {sessionsItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => {
                          setSessionsOpen(false);
                          handleMenuToggle();
                        }}
                        className="block px-3 py-2 text-sm text-zinc-500 transition hover:bg-black/[0.04] hover:text-zinc-950"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/KeyNotes" onClick={handleMenuToggle} className={mobileLinkClass}>Speakers</Link>
              <Link to="/sponsors" onClick={handleMenuToggle} className={mobileLinkClass}>Sponsors</Link>
              <Link to="/registration" onClick={handleMenuToggle} className="block bg-[#5E6AD2] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#6f7af0]">
                Registration
              </Link>
              <Link to="/contact" onClick={handleMenuToggle} className={mobileLinkClass}>Contact</Link>
              <Link to="/admin/login" onClick={handleMenuToggle} className={`${mobileLinkClass} sm:hidden`}>
                Admin
              </Link>
              <button
                type="button"
                onClick={toggleTheme}
                className="theme-toggle mt-2 flex w-full items-center justify-between border border-black/10 bg-white px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                <span>{isDark ? "Light mode" : "Dark mode"}</span>
                {isDark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
