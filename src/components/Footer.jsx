// Edited by Milad Ajaz 
// https://m4milaad.github.io/ 

import { FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useYear } from "../context/yearContext";

function Footer() {
  const { selectedYear } = useYear();
  return (
    <footer className="mt-14 border-t border-black/[0.12] bg-white/90 dark:bg-zinc-950/90">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Contact Us Section */}
        <div className="max-w-4xl">
          <h3 className="mb-4 text-2xl font-bold text-zinc-900">Contact Us</h3>
          <div className="space-y-3 text-sm text-zinc-700 md:text-base">
            <p>
              <Link to="/contact" className="text-[#5E6AD2] hover:underline">
                2AI Help Desk
              </Link>
            </p>
            <p className="leading-relaxed">
              Please contact us with questions about the following topics:
            </p>
            <p className="text-sm leading-relaxed text-zinc-600">
              Author - Paper Submission - Technical Issues, Author - Camera-Ready Paper, Registration -
              General, Registration - Cancellation, Childcare/Guests, Expo/Guests, Lodging, Visa Letter,
              Reviewer - Open Review Issues, Reviewer - General Issues, Reviewer - Conflict of Interest
            </p>
            <div className="pt-3">
              <p className="mb-2 font-semibold text-zinc-900">Website and Invitation Letter Help</p>
              <p className="text-sm text-zinc-600">
                Use the website help link for issues including login, inactive accounts, invitation letters,
                papers not associated with a registration.
              </p>
            </div>
          </div>
        </div>

        {/* Social Media & Webmaster */}
        <div className="mt-10 border-t border-black/[0.08] pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-zinc-700">Follow Us:</span>
              <div className="flex gap-4 text-xl">
                <a
                  href="#"
                  className="text-zinc-600 transition hover:text-pink-600"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="text-zinc-600 transition hover:text-blue-600"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="#"
                  className="text-zinc-600 transition hover:text-blue-700"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
              </div>
            </div>

            {/* Webmaster */}
            <div className="text-center md:text-right">
              <p className="text-sm text-zinc-700">
                <span className="font-medium">Webmaster:</span> Swathi and Central University of Kashmir Team
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-black/[0.08] bg-zinc-100/60 dark:bg-zinc-900/80">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-col items-center justify-between gap-2 text-xs text-zinc-600 md:flex-row">
            <p>
              © {new Date().getFullYear()} {selectedYear} International Conference on Applied Artificial Intelligence (2AI). All Rights Reserved.
            </p>
            <div className="flex items-center gap-3">
              <img src="/CUKLogo.png" alt="CUK Logo" className="h-8 w-auto object-contain" />
              <img src="/logo.png" alt="Conference Logo" className="h-8 w-auto object-contain" />
              <img src="/ccis.png" alt="CCIS Logo" className="h-8 w-auto object-contain" />
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
      <div className="border-t border-black/[0.08] bg-zinc-50/70 dark:bg-zinc-900/70">
        <div className="mx-auto max-w-7xl px-6 py-3 text-center">
          <a 
            href="#" 
            className="text-sm text-[#5E6AD2] hover:underline"
          >
            2AI Knowledge base
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
