import React, { useState } from 'react';
import { X, QrCode, Copy, Check, Download, Share2 } from 'lucide-react';
import { ProfileData } from '../types/contact';
import { generateQRMatrix } from '../utils/qrCode';
import { downloadVCard } from '../utils/vcard';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, profile }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ahmadsoban.design';
  const qrMatrix = generateQRMatrix(currentUrl);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-sm glass-panel rounded-3xl border border-white/15 overflow-hidden shadow-2xl p-6 sm:p-8 text-center">
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close QR Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-[#C6F432] mb-3">
          <QrCode className="w-3.5 h-3.5" />
          <span className="font-semibold uppercase tracking-wider text-[10px]">Instant Mobile Scan</span>
        </div>

        <h3 className="text-xl font-extrabold text-white font-['Outfit']">
          Save Contact to Mobile
        </h3>
        <p className="mt-1 text-xs text-zinc-400">
          Point your smartphone camera at this code to open and instantly store this profile.
        </p>

        {/* QR Code Container with liquid bevel */}
        <div className="my-6 p-4 rounded-2xl bg-white flex items-center justify-center shadow-[0_0_35px_rgba(198,244,50,0.18)] max-w-[220px] mx-auto">
          <svg viewBox="0 0 25 25" className="w-full h-full text-[#0B0B0C]" shapeRendering="crispEdges">
            {qrMatrix.map((row, r) =>
              row.map((col, c) =>
                col ? <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#0B0B0C" /> : null
              )
            )}
          </svg>
        </div>

        <div className="text-xs text-zinc-300 font-medium mb-4">
          <span className="text-white font-bold">{profile.fullName}</span>
          <span className="text-zinc-500"> · </span>
          <span className="text-zinc-400">{profile.professionalTitle}</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => downloadVCard(profile)}
            className="w-full glass-pill-accent py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Contact (.vcf)</span>
          </button>

          <button
            onClick={handleCopy}
            className="w-full glass-pill py-2.5 px-4 rounded-xl text-xs font-semibold text-zinc-200 hover:text-white flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#C6F432]" />
                <span className="text-[#C6F432]">Profile URL Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Profile Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
