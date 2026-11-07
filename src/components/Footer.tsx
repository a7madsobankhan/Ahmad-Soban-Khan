import React from 'react';
import { Download, ArrowUp, QrCode } from 'lucide-react';
import { ProfileData } from '../types/contact';
import { downloadVCard } from '../utils/vcard';

interface FooterProps {
  profile: ProfileData;
  onOpenQR: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenQR }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#0B0B0C]/80 backdrop-blur-xl py-8 px-4 sm:px-8 mt-16 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Clean Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-xs text-zinc-400">
          <span className="font-bold text-white font-['Outfit']">{profile.fullName}</span>
          <span className="hidden sm:inline text-zinc-600">·</span>
          <span>{profile.professionalTitle}</span>
          <span className="hidden sm:inline text-zinc-600">·</span>
          <span>© {new Date().getFullYear()} All Rights Reserved</span>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenQR}
            className="glass-pill px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5 text-[#C6F432]" />
            <span>QR Code</span>
          </button>

          <button
            onClick={() => downloadVCard(profile)}
            className="glass-pill-accent px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Save Contact</span>
          </button>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl glass-pill text-zinc-400 hover:text-white cursor-pointer ml-1"
            aria-label="Back to top"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
