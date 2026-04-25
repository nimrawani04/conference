// Edited by Milad Ajaz 
// https://m4milaad.github.io/ 

import { useState, useEffect } from "react";
import { ChevronDown, Moon, Search, Sun, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/themeContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const [committeeOpen, setCommitteeOpen] = useState(false);
  const [sessionsOpen, setSessionsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const committeeItems = [
    { name: "Steering Committee", path: "/committee/SteeringCommitte" },
    { name: "Organizing Committee", path: "/committee/OrganizingCommitte" },
  ];

  const sessionsItems = [
    { name: "Special Sessions", path: "/sessions/specialSessions" },
    { name: "Workshops", path: "/sessions/workshops" },
  ];

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
    <>
      {/* Top Bar - Logo and Utilities */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <img src="/CUKLogo.png" alt="CUK Logo" className="h-12 w-auto object-contain" />
            <img src="/logo.png" alt="Conference Logo" className="h-12 w-auto object-contain" />
            <a 
              href="https://www.springer.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <img 
                src="/springer.png" 
                alt="Springer Logo" 
                className="h-8 w-auto object-contain"
              />
            </a>
            <div className="hidden md:block ml-2">
              <div className="text-sm font-semibold text-gray-800">2AI</div>
              <div className="text-xs text-gray-600">CONFERENCE 2026</div>
            </div>
          </div>

          {/* Right Side - Search and Login */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center bg-gray-100 rounded px-3 py-1.5">
              <Search size={16} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent border-none outline-none text-sm w-32 lg:w-48"
              />
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle inline-flex h-9 w-9 items-center justify-center rounded border border-gray-300 bg-white text-gray-700 shadow-sm transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1a56db]/40"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
            </button>
            <Link
              to="/admin/login"
              className="flex items-center gap-1 text-sm text-gray-700 hover:text-blue-700 transition"
            >
              <User size={18} />
              <span className="hidden md:inline">Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-[#1a56db] shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            {/* Year Selector */}
            <div className="relative dropdown">
              <button
                onClick={() => {
                  setYearOpen(!yearOpen);
                  setCommitteeOpen(false);
                  setSessionsOpen(false);
                }}
                className="flex items-center gap-1 bg-[#1e4a8a] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#1a3d6e] transition"
              >
                Select Year (2026)
                <ChevronDown size={14} className={`transition-transform ${yearOpen ? "rotate-180" : ""}`} />
              </button>
              {yearOpen && (
                <div className="absolute left-0 mt-2 bg-white shadow-lg rounded w-48 z-50">
                  <ul className="py-1">
                    <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">2026</li>
                    <li className="px-4 py-2 text-sm text-gray-400 cursor-not-allowed">2025</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Home */}
              <Link
                to="/"
                className="text-white px-3 py-2 text-sm hover:bg-[#1e4a8a] transition rounded"
              >
                Home
              </Link>

              {/* About */}
              <Link
                to="/about"
                className="text-white px-3 py-2 text-sm hover:bg-[#1e4a8a] transition rounded"
              >
                About
              </Link>

              {/* Call For Papers */}
              <Link
                to="/call-for-papers"
                className="text-white px-3 py-2 text-sm hover:bg-[#1e4a8a] transition rounded"
              >
                Call For Papers
              </Link>

              {/* Committee Dropdown */}
              <div className="relative dropdown">
                <button
                  onClick={() => {
                    setCommitteeOpen(!committeeOpen);
                    setSessionsOpen(false);
                  }}
                  className="flex items-center gap-1 text-white px-3 py-2 text-sm hover:bg-[#1e4a8a] transition rounded"
                >
                  Committee
                  <ChevronDown size={14} className={`transition-transform ${committeeOpen ? "rotate-180" : ""}`} />
                </button>
                {committeeOpen && (
                  <div className="absolute left-0 mt-2 bg-white shadow-lg rounded w-56 z-50">
                    <ul className="py-1">
                      {committeeItems.map((item, idx) => (
                        <li key={idx}>
                          <Link
                            to={item.path}
                            onClick={() => setCommitteeOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Schedule */}
              <Link
                to="/schedule"
                className="text-white px-3 py-2 text-sm hover:bg-[#1e4a8a] transition rounded"
              >
                Schedule
              </Link>

              {/* Sessions Dropdown */}
              <div className="relative dropdown">
                <button
                  onClick={() => {
                    setSessionsOpen(!sessionsOpen);
                    setCommitteeOpen(false);
                  }}
                  className="flex items-center gap-1 text-white px-3 py-2 text-sm hover:bg-[#1e4a8a] transition rounded"
                >
                  Sessions
                  <ChevronDown size={14} className={`transition-transform ${sessionsOpen ? "rotate-180" : ""}`} />
                </button>
                {sessionsOpen && (
                  <div className="absolute left-0 mt-2 bg-white shadow-lg rounded w-56 z-50">
                    <ul className="py-1">
                      {sessionsItems.map((item, idx) => (
                        <li key={idx}>
                          <Link
                            to={item.path}
                            onClick={() => setSessionsOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Speakers */}
              <Link
                to="/KeyNotes"
                className="text-white px-3 py-2 text-sm hover:bg-[#1e4a8a] transition rounded"
              >
                Speakers
              </Link>

              {/* Sponsors */}
              <Link
                to="/sponsors"
                className="text-white px-3 py-2 text-sm hover:bg-[#1e4a8a] transition rounded"
              >
                Sponsors
              </Link>

              {/* Registration */}
              <Link
                to="/registration"
                className="text-white px-3 py-2 text-sm hover:bg-[#1e4a8a] transition rounded"
              >
                Registration
              </Link>

              {/* Contact */}
              <Link
                to="/contact"
                className="text-white px-3 py-2 text-sm hover:bg-[#1e4a8a] transition rounded"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden text-white hover:text-gray-200 transition-colors"
              onClick={handleMenuToggle}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5 flex flex-col justify-between">
                <span 
                  className={`block h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${
                    isOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span 
                  className={`block h-0.5 w-full bg-current transition-all duration-300 ease-in-out ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span 
                  className={`block h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${
                    isOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={`lg:hidden bg-white border-t border-gray-200 max-h-[calc(100vh-120px)] overflow-y-auto ${
            isClosing ? 'animate-slideUp' : 'animate-slideDown'
          }`}>
            <div className="px-4 py-2 space-y-1">
              <Link to="/" onClick={handleMenuToggle} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                Home
              </Link>
              <Link to="/about" onClick={handleMenuToggle} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                About
              </Link>
              <Link to="/call-for-papers" onClick={handleMenuToggle} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                Call For Papers
              </Link>
              
              {/* Committee Dropdown */}
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCommitteeOpen(!committeeOpen);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  Committee
                  <ChevronDown size={14} className={`transition-transform ${committeeOpen ? "rotate-180" : ""}`} />
                </button>
                {committeeOpen && (
                  <div className="pl-4 mt-1">
                    {committeeItems.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.path}
                        onClick={() => {
                          setCommitteeOpen(false);
                          handleMenuToggle();
                        }}
                        className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/schedule" onClick={handleMenuToggle} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                Schedule
              </Link>

              {/* Sessions Dropdown */}
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSessionsOpen(!sessionsOpen);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  Sessions
                  <ChevronDown size={14} className={`transition-transform ${sessionsOpen ? "rotate-180" : ""}`} />
                </button>
                {sessionsOpen && (
                  <div className="pl-4 mt-1">
                    {sessionsItems.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.path}
                        onClick={() => {
                          setSessionsOpen(false);
                          handleMenuToggle();
                        }}
                        className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/KeyNotes" onClick={handleMenuToggle} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                Speakers
              </Link>
              <Link to="/sponsors" onClick={handleMenuToggle} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                Sponsors
              </Link>
              <Link to="/registration" onClick={handleMenuToggle} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                Registration
              </Link>
              <Link to="/contact" onClick={handleMenuToggle} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                Contact
              </Link>
              <button
                type="button"
                onClick={toggleTheme}
                className="theme-toggle mt-2 flex w-full items-center justify-between rounded border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                <span>{isDark ? "Light mode" : "Dark mode"}</span>
                {isDark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
