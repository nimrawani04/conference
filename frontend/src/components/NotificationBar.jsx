// Edited by Milad Ajaz 
// https://m4milaad.github.io/ 

import { FileDown, MapPin, BookOpen } from "lucide-react";

const NotificationBar = () => {
  return (
    <div className="bg-gradient-to-r from-[#0B1021] via-[#1A365D] to-[#0B1021] border-b border-[#2c5aa0]/30 text-white overflow-hidden relative shadow-xl">
      <div className="animate-marquee whitespace-nowrap flex items-center w-max hover:[animation-play-state:paused] py-3">
        
        {/* 1. FREE TRIP OFFER */}
        <span className="text-white font-semibold text-sm md:text-base mx-6 inline-flex items-center gap-2">
          <MapPin size={18} className="text-yellow-300 flex-shrink-0" />
          Exclusive Offer: Free one day Local Kashmir trip for limited participants!
        </span>
        <span className="text-yellow-300 mx-3 text-xl">•</span>

        {/* 2. DOWNLOAD BROCHURE (Clickable) */}
        <a 
          href="/brochure.pdf" 
          download="2AI_2026_Brochure.pdf"
          className="text-white font-semibold text-sm md:text-base mx-6 inline-flex items-center gap-2 hover:text-yellow-200 cursor-pointer transition-colors"
        >
          <FileDown size={18} className="text-yellow-300 flex-shrink-0" />
          Download Conference Brochure
        </a>
        <span className="text-yellow-300 mx-3 text-xl">•</span>

        {/* 3. SPRINGER NEWS */}
        <span className="text-white font-semibold text-sm md:text-base mx-6 inline-flex items-center gap-2">
          <BookOpen size={18} className="text-yellow-300 flex-shrink-0" />
          All selected and presented articles will be published in Springer CCIS Proceedings (Scopus Indexed, Pending approval)
        </span>
        <span className="text-yellow-300 mx-3 text-xl">•</span>

        {/* --- REPEAT FOR SMOOTH SCROLLING --- */}

        {/* 1. FREE TRIP OFFER (Repeat) */}
        <span className="text-white font-semibold text-sm md:text-base mx-6 inline-flex items-center gap-2">
          <MapPin size={18} className="text-yellow-300 flex-shrink-0" />
          Exclusive Offer: Free one day Local Kashmir trip for limited participants!
        </span>
        <span className="text-yellow-300 mx-3 text-xl">•</span>

        {/* 2. DOWNLOAD BROCHURE (Repeat) */}
        <a 
          href="/brochure.pdf" 
          download="2AI_2026_Brochure.pdf"
          className="text-white font-semibold text-sm md:text-base mx-6 inline-flex items-center gap-2 hover:text-yellow-200 cursor-pointer transition-colors"
        >
          <FileDown size={18} className="text-yellow-300 flex-shrink-0" />
          Download Conference Brochure
        </a>
        <span className="text-yellow-300 mx-3 text-xl">•</span>

        {/* 3. SPRINGER NEWS (Repeat) */}
        <span className="text-white font-semibold text-sm md:text-base mx-6 inline-flex items-center gap-2">
          <BookOpen size={18} className="text-yellow-300 flex-shrink-0" />
          All selected and presented articles will be published in Springer CCIS Proceedings (Scopus Indexed, Pending approval)
        </span>
        <span className="text-yellow-300 mx-3 text-xl">•</span>
        
      </div>

      <style>{`
        .animate-marquee {
          animation: marquee 45s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } 
        }
      `}</style>
    </div>
  );
};

export default NotificationBar;
