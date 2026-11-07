import React, { useState, useEffect } from 'react';
import { 
  Send, 
  FileText, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  Mail, 
  User, 
  MessageSquare,
  Eye,
  X,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { ProfileData } from '../types/contact';

interface QuickContactFormProps {
  profile: ProfileData;
  preselectedService?: string;
  onClearPreselectedService?: () => void;
}

export const QuickContactForm: React.FC<QuickContactFormProps> = ({
  profile,
  preselectedService,
  onClearPreselectedService,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: preselectedService || 'General Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleDownloadResume = () => {
    const cvContent = `
==============================================================
${profile.fullName.toUpperCase()} — CURRICULUM VITAE
${profile.professionalTitle}
Email: ${profile.email} | Phone: ${profile.phone}
Location: ${profile.location} | Timezone: Dubai (GST · UTC+4)
LinkedIn: ${profile.links.linkedin}
Instagram: ${profile.links.instagram}
Telegram: @ahmadsobankhan
==============================================================

EXECUTIVE SUMMARY
-----------------
${profile.bio}

PROFESSIONAL EXPERIENCE
-----------------------
- Sales Executive in Automotive (Freelance)
  Independent sales execution, client negotiation, and automotive deal brokering.

- Sales Executive — Bohayra Chocolates
  Customer relations, corporate account distribution, and premium retail sales.

- Intern — Foxnib Studios
  Design engineering internship, production workflow support, and creative execution.

EDUCATION & ACADEMICS
---------------------
- Studying Textile Business — IFA Paris (Paris-based fashion university)
  Specializing in commercial strategy, luxury textile markets, and fashion management.

- High School Diploma — Qatar
  Secondary school graduation with academic focus in commerce and sciences.

CORE SPECIALIZATIONS & TECHNICAL STRENGTHS
------------------------------------------
- Full-Stack Web Applications & High-Performance UI/UX Architectures
- Autonomous AI & Multi-Agent Systems Orchestration
- Interactive 3D / Liquid Glass Refractive Interfaces & Motion Physics
- Commercial Client Management, Strategic Sales & Cross-Border Communications

CONTACT & COLLABORATION
-----------------------
Direct Inquiries: ${profile.email}
Schedule Meeting: ${profile.links.calendly}
Telegram: https://t.me/ahmadsobankhan
==============================================================
    `.trim();

    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.fullName.replace(/\s+/g, '_')}_CV.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="contact" className="py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Direct Inquiry (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] relative overflow-hidden">
          <div className="mb-6">
            <div className="text-xs uppercase tracking-widest text-[#C6F432] font-semibold mb-2">
              Get in Touch
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Outfit']">
              Direct Contact & Inquiry
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400">
              Have a web application project, multi-agent AI system requirement, or consulting need? Send a direct dispatch below.
            </p>
          </div>

          {isSubmitted ? (
            <div className="glass-card p-8 rounded-2xl border border-[#C6F432]/30 text-center space-y-4 animate-in fade-in">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#C6F432]/20 border border-[#C6F432]/40 flex items-center justify-center text-[#C6F432] shadow-[0_0_20px_rgba(198,244,50,0.3)]">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white font-['Outfit']">
                Dispatch Received
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto">
                Thank you, <span className="text-white font-medium">{formData.name}</span>. Your message regarding <span className="text-[#C6F432] font-medium">{formData.service}</span> has been received. Ahmad will respond within 24 hours.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    service: 'General Inquiry',
                    message: '',
                  });
                  if (onClearPreselectedService) onClearPreselectedService();
                }}
                className="mt-2 glass-pill px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-200 hover:text-white cursor-pointer"
              >
                Send Another Dispatch
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-zinc-300 font-semibold flex items-center gap-1.5">
                    <User className="w-3 h-3 text-[#C6F432]" />
                    <span>Your Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julian Hayes"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs placeholder:text-zinc-500 text-zinc-100"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-zinc-300 font-semibold flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-[#C6F432]" />
                    <span>Direct Email *</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. julian@firm.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs placeholder:text-zinc-500 text-zinc-100"
                  />
                </div>
              </div>

              {/* Service Topic */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-zinc-300 font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#C6F432]" />
                    <span>Inquiry Topic / Service</span>
                  </span>
                  {preselectedService && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, service: 'General Inquiry' });
                        if (onClearPreselectedService) onClearPreselectedService();
                      }}
                      className="text-[10px] text-zinc-400 hover:text-white underline cursor-pointer"
                    >
                      Reset selection
                    </button>
                  )}
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs text-zinc-200 cursor-pointer bg-[#0e0e10]"
                >
                  <option value="General Inquiry" className="bg-[#0B0B0C] text-white">General Inquiry & Introduction</option>
                  <option value="Full-Stack Web Applications & UI/UX Solutions" className="bg-[#0B0B0C] text-white">Full-Stack Web Applications & UI/UX Solutions</option>
                  <option value="Autonomous AI & Multi-Agent Systems Architect" className="bg-[#0B0B0C] text-white">Autonomous AI & Multi-Agent Systems Architect</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-zinc-300 font-semibold flex items-center gap-1.5">
                  <MessageSquare className="w-3 h-3 text-[#C6F432]" />
                  <span>Project Overview & Scope *</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Outline your application goals, AI system needs, or desired collaboration..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs placeholder:text-zinc-500 text-zinc-100 resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full glass-pill-accent py-3 px-6 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Encrypting & Transmitting...</span>
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Direct Inquiry</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Formal Resume / CV Download Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.6)] relative overflow-hidden">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/15 flex items-center justify-center text-[#C6F432] shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]">
                <FileText className="w-6 h-6" />
              </div>
              <span className="glass-pill px-2.5 py-1 rounded-full text-[10px] font-bold text-zinc-300 tracking-wider uppercase">
                Updated 2026
              </span>
            </div>

            <h3 className="text-xl font-bold text-white font-['Outfit']">
              Formal CV & Dossier
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Curriculum vitae detailing experience in automotive sales, Bohayra Chocolates, Foxnib Studios, and academic studies at IFA Paris.
            </p>

            <div className="my-5 p-3.5 rounded-2xl glass-card border border-white/5 space-y-2 text-xs text-zinc-300">
              <div className="flex justify-between">
                <span className="text-zinc-400">Experience:</span>
                <span className="text-white font-medium">Automotive · Bohayra · Foxnib Studios</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Education:</span>
                <span className="text-zinc-200">IFA Paris (Textile Business) · Qatar</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Base Location:</span>
                <span className="text-[#C6F432] font-semibold">Dubai, UAE (GST · UTC+4)</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleDownloadResume}
                className="flex-1 glass-pill-accent py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CV</span>
              </button>

              <button
                onClick={() => setShowResumeModal(true)}
                className="glass-pill py-2.5 px-3.5 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5 cursor-pointer"
                title="Preview CV Outline"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>
            </div>
          </div>

          {/* Quick Contact Information Card */}
          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-3">
            <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold">
              Immediate Contact Direct Lines
            </div>
            <div className="text-xs text-zinc-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Direct Email:</span>
                <a href={`mailto:${profile.email}`} className="text-[#C6F432] hover:underline font-mono">
                  {profile.email}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Telegram:</span>
                <a href={profile.links.telegram} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline font-mono">
                  @ahmadsobankhan
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Instagram:</span>
                <a href={profile.links.instagram} target="_blank" rel="noopener noreferrer" className="text-[#E1306C] hover:underline font-mono">
                  @oryxmedia.ae
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Time Zone:</span>
                <span className="text-zinc-200">Dubai (Asia/Dubai · UTC+4)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Preview Modal */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in">
          <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-white/15 overflow-hidden shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#C6F432]" />
                <h3 className="text-lg font-bold text-white font-['Outfit']">
                  Curriculum Vitae Preview
                </h3>
              </div>
              <button
                onClick={() => setShowResumeModal(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-6 space-y-5 max-h-[60vh] overflow-y-auto text-xs text-zinc-300 pr-2">
              <div>
                <h4 className="text-white font-bold text-base font-['Outfit']">{profile.fullName}</h4>
                <p className="text-[#C6F432] font-medium">{profile.professionalTitle}</p>
                <p className="text-zinc-400 mt-1">{profile.location} · {profile.email} · Dubai (GST · UTC+4)</p>
              </div>

              {/* Experience */}
              <div className="pt-3 border-t border-white/5 space-y-2.5">
                <h5 className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#C6F432]" />
                  <span>Work Experience</span>
                </h5>
                <div className="space-y-2 pl-1">
                  <div className="border-l-2 border-[#C6F432]/40 pl-3 py-0.5">
                    <span className="font-semibold text-white block">Sales Executive — Automotive</span>
                    <span className="text-[11px] text-zinc-400">Freelancer · Deal negotiation, luxury & commercial vehicle sales execution.</span>
                  </div>
                  <div className="border-l-2 border-[#C6F432]/40 pl-3 py-0.5">
                    <span className="font-semibold text-white block">Sales Executive — Bohayra Chocolates</span>
                    <span className="text-[11px] text-zinc-400">Commercial client relations, corporate gifting accounts, and retail distribution.</span>
                  </div>
                  <div className="border-l-2 border-[#C6F432]/40 pl-3 py-0.5">
                    <span className="font-semibold text-white block">Intern — Foxnib Studios</span>
                    <span className="text-[11px] text-zinc-400">Creative production, design support, and studio workflow operations.</span>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="pt-3 border-t border-white/5 space-y-2.5">
                <h5 className="font-bold text-white uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Education & Academics</span>
                </h5>
                <div className="space-y-2 pl-1">
                  <div className="border-l-2 border-cyan-400/40 pl-3 py-0.5">
                    <span className="font-semibold text-white block">Textile Business — IFA Paris</span>
                    <span className="text-[11px] text-zinc-400">Currently studying textile business at IFA Paris, a Paris-based fashion university.</span>
                  </div>
                  <div className="border-l-2 border-cyan-400/40 pl-3 py-0.5">
                    <span className="font-semibold text-white block">High School Diploma — Qatar</span>
                    <span className="text-[11px] text-zinc-400">Completed high school education in Qatar.</span>
                  </div>
                </div>
              </div>

              {/* Core Offerings */}
              <div className="pt-3 border-t border-white/5 space-y-2">
                <h5 className="font-bold text-white uppercase text-[11px] tracking-wider">
                  Technical Architecture & Core Offerings
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300">
                  <div>· Full-Stack Web Applications</div>
                  <div>· Autonomous AI Multi-Agent Systems</div>
                  <div>· Liquid Glass UI & Modern Shaders</div>
                  <div>· React & Tailwind Fluid Architectures</div>
                  <div>· Context Routing & Prompt Engineering</div>
                  <div>· Luxury Textile & Commercial Sales</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setShowResumeModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-zinc-300 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDownloadResume();
                  setShowResumeModal(false);
                }}
                className="glass-pill-accent px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Complete CV (.txt)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
