// Edited by Milad Ajaz 
// https://m4milaad.github.io/ 

import { FileDown, MapPin, BookOpen, CalendarDays, BadgeCheck } from "lucide-react";

const NotificationBar = () => {
  const items = [
    {
      icon: MapPin,
      text: "Exclusive Offer: Free one day local Kashmir trip for limited participants.",
      tone: "text-[#1A5C38]",
    },
    {
      icon: FileDown,
      text: "Download Conference Brochure",
      href: "/brochure.pdf",
      download: "2AI_2026_Brochure.pdf",
      tone: "text-[#E8A020]",
    },
    {
      icon: BookOpen,
      text: "Selected and presented papers will be considered for Springer CCIS proceedings (Scopus indexed).",
      tone: "text-[#7B4FFF]",
    },
    {
      icon: CalendarDays,
      text: "Pre-conference workshop: 17 June 2026 | Main conference: 18-19 June 2026.",
      tone: "text-[#0F766E]",
    },
    {
      icon: BadgeCheck,
      text: "Accepted papers must be presented by at least one registered author.",
      tone: "text-[#2563EB]",
    },
  ];

  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#E8A020]/45 bg-gradient-to-r from-[#FFF9EB] via-[#F8F0DD] to-[#F3E7C8] shadow-[0_10px_28px_rgba(232,160,32,0.16)] dark:border-[#E8A020]/30 dark:bg-[#0A0F1E] dark:shadow-[0_0_28px_rgba(123,79,255,0.12)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(232,160,32,0.16),transparent_35%),radial-gradient(circle_at_90%_80%,rgba(123,79,255,0.14),transparent_35%)] dark:bg-[radial-gradient(circle_at_10%_20%,rgba(232,160,32,0.16),transparent_35%),radial-gradient(circle_at_90%_80%,rgba(123,79,255,0.14),transparent_35%)]" />

      <div className="notification-marquee relative flex w-max items-center whitespace-nowrap py-3 hover:[animation-play-state:paused]">
        {doubled.map((item, idx) => {
          const Icon = item.icon;
          const baseItemClass =
            "mx-2 inline-flex items-center gap-2 rounded-full border border-black/[0.14] bg-white/80 px-4 py-1.5 text-sm md:text-[15px] font-medium text-zinc-800 backdrop-blur transition hover:-translate-y-0.5 hover:border-[#E8A020]/60 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-[#F0EDE6] dark:hover:border-[#E8A020]/50 dark:hover:bg-white/[0.07]";

          if (item.href) {
            return (
              <a key={`${item.text}-${idx}`} href={item.href} download={item.download} className={`${baseItemClass} hover:text-[#E8A020]`}>
                <Icon size={16} className={`${item.tone} flex-shrink-0`} />
                {item.text}
              </a>
            );
          }

          return (
            <span key={`${item.text}-${idx}`} className={baseItemClass}>
              <Icon size={16} className={`${item.tone} flex-shrink-0`} />
              {item.text}
            </span>
          );
        })}
      </div>

    </div>
  );
};

export default NotificationBar;
