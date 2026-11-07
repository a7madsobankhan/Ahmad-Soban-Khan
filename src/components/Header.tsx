import React from 'react';
import { Download, SlidersHorizontal, QrCode } from 'lucide-react';
import { ProfileData } from '../types/contact';
import { downloadVCard } from '../utils/vcard';

interface HeaderProps {
  profile: ProfileData;
  onOpenQR: () => void;
  onOpenCustomize: () => void;
  onOpenSchedule: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  onOpenQR,
  onOpenCustomize,
  onOpenSchedule,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 border-b border-white/[0.07] bg-[#0B0B0C]/70 backdrop-blur-2xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#top" 
          className="text-lg font-bold tracking-tight text-white hover:text-[#C6F432] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#C6F432] shadow-[0_0_10px_#C6F432] transition-transform group-hover:scale-125" />
          <span className="font-['Outfit']">{profile.fullName}</span>
        </a>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-wider font-medium text-zinc-400">
          <a href="#about" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            About
          </a>
          <a href="#services" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Services
          </a>
          <a href="#testimonials" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Endorsements
          </a>
          <a href="#contact" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Inquiry
          </a>
        </nav>

        {/* Zone 3: 1 primary action + utility buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenQR}
            title="Scan QR Code"
            className="p-2 rounded-xl text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-center cursor-pointer"
            aria-label="Show QR Code"
          >
            <QrCode className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenCustomize}
            title="Customize Profile Info"
            className="p-2 rounded-xl text-zinc-300 hover:text-[#C6F432] bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-center cursor-pointer"
            aria-label="Edit Profile Details"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          <button
            onClick={() => downloadVCard(profile)}
            className="glass-pill-accent px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 transition-transform active:scale-95"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Save Contact</span>
          </button>
        </div>
      </div>
    </header>
  );
};
