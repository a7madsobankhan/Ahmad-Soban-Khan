import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Download, 
  QrCode, 
  Calendar, 
  Check, 
  Copy, 
  ExternalLink,
  MessageCircle,
  Send,
  Linkedin,
  Instagram,
  Sparkles,
  Share2
} from 'lucide-react';
import { ProfileData } from '../types/contact';
import { downloadVCard } from '../utils/vcard';

interface HeroContactCardProps {
  profile: ProfileData;
  onOpenQR: () => void;
  onOpenSchedule: () => void;
  onSelectService: (serviceTitle: string) => void;
}

export const HeroContactCard: React.FC<HeroContactCardProps> = ({
  profile,
  onOpenQR,
  onOpenSchedule,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');

  // Live ticking clock in Dubai timezone (GST · UTC+4)
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: profile.timeZone || 'Asia/Dubai',
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date());
        setCurrentTime(timeStr);
      } catch {
        setCurrentTime(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [profile.timeZone]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.fullName} — ${profile.professionalTitle}`,
          text: profile.tagline,
          url: window.location.href,
        });
      } catch {
        handleCopy(window.location.href, 'link');
      }
    } else {
      handleCopy(window.location.href, 'link');
    }
  };

  return (
    <section id="about" className="relative pt-6 pb-6">
      {/* Equal-Height Two-Column Master Dashboard (Zero Negative Space) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Master Panel: Identity, Narrative & Primary Actions (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-9 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Top Specular Ambient Line */}
          <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#C6F432]/60 to-transparent shadow-[0_0_12px_#C6F432]" />

          <div className="space-y-6">
            {/* Header Lockup: Avatar & Identity */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              {/* Avatar with Bevelled Liquid Frame */}
              <div className="relative group shrink-0">
                <div className="p-1 rounded-2xl bg-gradient-to-b from-white/20 via-white/5 to-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_10px_25px_rgba(0,0,0,0.6)]">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-zinc-900 border border-white/15">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.fullName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 glass-card px-2 py-0.5 rounded-full border border-white/15 flex items-center gap-1 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6F432] shadow-[0_0_6px_#C6F432] animate-pulse" />
                  <span className="text-[10px] font-bold text-zinc-200 uppercase tracking-wider">Active</span>
                </div>
              </div>

              {/* Names & Titles */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-zinc-300">
                  <Sparkles className="w-3 h-3 text-[#C6F432]" />
                  <span className="text-[11px] text-zinc-200 truncate">{profile.statusText}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
                  {profile.fullName}
                </h1>
                <p className="text-sm sm:text-base font-semibold text-[#C6F432] tracking-wide">
                  {profile.professionalTitle}
                </p>
              </div>
            </div>

            {/* Narrative Bio */}
            <div className="glass-card p-5 rounded-2xl border border-white/5">
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal">
                {profile.bio}
              </p>
            </div>
          </div>

          {/* Primary Action Buttons Bar */}
          <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
            <button
              onClick={() => downloadVCard(profile)}
              className="flex-1 min-w-[170px] glass-pill-accent px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(198,244,50,0.3)] transition-all active:scale-95"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Save Contact (.vcf)</span>
            </button>

            <button
              onClick={onOpenQR}
              className="glass-pill px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-100 hover:text-white flex items-center justify-center gap-2 cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-[#C6F432]" />
              <span>QR Code</span>
            </button>

            <button
              onClick={onOpenSchedule}
              className="glass-pill px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-100 hover:text-white flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Schedule Intro</span>
            </button>
          </div>
        </div>

        {/* Right Master Panel: Contact Grid & Channels (5 cols - Equalized Height) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          {/* Card 1: Direct Email Channel */}
          <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex items-center justify-between group hover:border-[#C6F432]/30 transition-all flex-1">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#C6F432] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">
                  Primary Email
                </span>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-xs sm:text-sm font-semibold text-zinc-100 hover:text-[#C6F432] transition-colors truncate block"
                  title={profile.email}
                >
                  {profile.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0 ml-2">
              <button
                onClick={() => handleCopy(profile.email, 'email')}
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Copy Email"
              >
                {copiedKey === 'email' ? (
                  <Check className="w-4 h-4 text-[#C6F432]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <a
                href={`mailto:${profile.email}`}
                className="p-2 rounded-lg text-zinc-400 hover:text-[#C6F432] hover:bg-white/10 transition-colors"
                title="Send Email"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Direct Phone Channel */}
          <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex items-center justify-between group hover:border-[#C6F432]/30 transition-all flex-1">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#C6F432] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">
                  Direct Line
                </span>
                <a
                  href={`tel:${profile.phone}`}
                  className="text-xs sm:text-sm font-semibold text-zinc-100 hover:text-[#C6F432] transition-colors truncate block"
                >
                  {profile.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0 ml-2">
              <button
                onClick={() => handleCopy(profile.phone, 'phone')}
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Copy Phone"
              >
                {copiedKey === 'phone' ? (
                  <Check className="w-4 h-4 text-[#C6F432]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <a
                href={`tel:${profile.phone}`}
                className="p-2 rounded-lg text-zinc-400 hover:text-[#C6F432] hover:bg-white/10 transition-colors"
                title="Call Phone"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 3: Location & Live Dubai Clock */}
          <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex items-center justify-between flex-1">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-cyan-400 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                  <MapPin className="w-3 h-3 text-zinc-400" />
                  <span className="truncate">{profile.location}</span>
                </div>
                <div className="text-xs sm:text-sm font-mono font-bold text-white tabular-nums">
                  {currentTime || '12:00:00 PM'} <span className="text-[#C6F432] font-sans font-medium text-[11px] ml-1">GST (UTC+4)</span>
                </div>
              </div>
            </div>
            <span className="glass-card px-2.5 py-1 rounded-full text-[10px] font-semibold text-[#C6F432] border border-[#C6F432]/30 shrink-0">
              Dubai Active
            </span>
          </div>

          {/* Card 4: Direct Messaging & Social Networks Hub */}
          <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex items-center justify-between gap-2 flex-1">
            <div className="flex items-center gap-2 min-w-0">
              <a
                href={profile.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-pill px-3 py-2 rounded-xl text-xs font-semibold text-zinc-200 hover:text-white flex items-center gap-1.5 hover:border-[#25D366]/50"
                title="WhatsApp Direct"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>

              <a
                href={profile.links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-pill px-3 py-2 rounded-xl text-xs font-semibold text-zinc-200 hover:text-white flex items-center gap-1.5 hover:border-[#0088cc]/50"
                title="Telegram (@ahmadsobankhan)"
              >
                <Send className="w-3.5 h-3.5 text-[#0088cc]" />
                <span>Telegram</span>
              </a>

              <a
                href={profile.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-pill p-2 rounded-xl text-zinc-300 hover:text-white hover:border-[#E1306C]/50"
                title="Instagram (@oryxmedia.ae)"
              >
                <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
              </a>

              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-pill p-2 rounded-xl text-zinc-300 hover:text-white hover:border-[#0077B5]/50"
                title="LinkedIn (ahmad-soban-khan)"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
              </a>
            </div>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl glass-pill text-zinc-300 hover:text-white shrink-0 cursor-pointer"
              title="Share Contact Profile"
            >
              {copiedKey === 'link' ? (
                <Check className="w-4 h-4 text-[#C6F432]" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
