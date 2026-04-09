// Edited by Milad Ajaz 
// https://m4milaad.github.io/ 

import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300 mt-12">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Left Column - Contact Us */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <Link to="/contact" className="text-blue-600 hover:underline">
                  2AI Help Desk
                </Link>
              </p>
              <p className="leading-relaxed">
                Please contact us with questions about the following topics:
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Author - Paper Submission - Technical Issues, Author - Camera-Ready Paper, Registration -
                General, Registration - Cancellation, Childcare/Guests, Expo/Guests, Lodging, Visa Letter,
                Reviewer - Open Review Issues, Reviewer - General Issues, Reviewer - Conflict of Interest
              </p>
              <div className="pt-3">
                <p className="font-semibold text-gray-800 mb-2">Website and Invitation Letter Help</p>
                <p className="text-xs text-gray-600">
                  Use the website help link for issues including login, inactive accounts, invitation letters,
                  papers not associated with a registration.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Useful Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">USEFUL LINKS</h3>
            <div className="space-y-3">
              {/* IEEE Computer Society */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                    IEEE
                  </div>
                </div>
                <div>
                  <a
                    href="https://www.computer.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    IEEE Computer Society
                  </a>
                </div>
              </div>

              {/* Computer Vision Foundation -> 2AI */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">
                    2AI
                  </div>
                </div>
                <div>
                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    2AI Committee & Foundations
                  </a>
                </div>
              </div>

              {/* Additional Links */}
              <div className="pt-3 space-y-2">
                <div>
                  <Link to="/about" className="text-blue-600 hover:underline text-sm">
                    2AI Proceedings
                  </Link>
                </div>
                <div>
                  <Link to="/contact" className="text-blue-600 hover:underline text-sm">
                    Code of Conduct
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Webmaster */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700 font-medium">Follow Us:</span>
              <div className="flex gap-4 text-xl">
                <a
                  href="#"
                  className="text-gray-600 hover:text-pink-600 transition"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-700 transition"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
              </div>
            </div>

            {/* Webmaster */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Webmaster:</span> Swathi and Central University of Kashmir Team
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-600">
            <p>
              © {new Date().getFullYear()} 2026 International Conference on Applied Artificial Intelligence (2AI). All Rights Reserved.
            </p>
            <div className="flex items-center gap-3">
              <img src="/CUKLogo.png" alt="CUK Logo" className="h-8 w-auto object-contain" />
              <img src="/logo.png" alt="Conference Logo" className="h-8 w-auto object-contain" />
              <a 
                href="https://www.springer.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img 
                  src="/springer.png" 
                  alt="Springer Logo" 
                  className="h-8 w-auto object-contain hover:opacity-80 transition"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CVF Knowledge Link -> 2AI Knowledge */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 text-center">
          <a 
            href="#" 
            className="text-blue-600 hover:underline text-sm"
          >
            2AI Knowledge base
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
