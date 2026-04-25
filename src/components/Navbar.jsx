// Edited by Milad Ajaz
// https://m4milaad.github.io/

import { useEffect, useState } from "react";
import { ChevronDown, Menu, Moon, Search, Sun, User, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/themeContext";
import { useYear } from "../context/yearContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const [committeeOpen, setCommitteeOpen] = useState(false);
  const [sessionsOpen, setSessionsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { selectedYear, setSelectedYear } = useYear();

  const committeeItems = [
    { name: "Steering Committee", path: "/committee/SteeringCommitte" },
    { name: "Organizing Committee", path: "/committee/OrganizingCommitte" },
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
          <label className="linear-search hidden h-8 items-center gap-2 border border-black/10 bg-white px-2.5 text-zinc-500 md:flex">
            <Search size={14} aria-hidden />
            <input
              type="text"
              placeholder="Search"
              className="w-28 border-0 bg-transparent text-xs text-zinc-800 outline-none placeholder:text-zinc-400 lg:w-40"
            />
          </label>
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
              <label className="linear-search mb-3 flex h-8 items-center gap-2 border border-black/10 bg-white px-2.5 text-zinc-500 md:hidden">
                <Search size={14} aria-hidden />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full border-0 bg-transparent text-xs text-zinc-800 outline-none placeholder:text-zinc-400"
                />
              </label>
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
