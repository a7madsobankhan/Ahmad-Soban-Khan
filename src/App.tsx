import React, { useState } from 'react';
import FluidField from './components/FluidField';
import { Header } from './components/Header';
import { HeroContactCard } from './components/HeroContactCard';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { QuickContactForm } from './components/QuickContactForm';
import { Footer } from './components/Footer';
import { QRCodeModal } from './components/QRCodeModal';
import { ScheduleModal } from './components/ScheduleModal';
import { CustomizeDrawer } from './components/CustomizeDrawer';
import { DEFAULT_PROFILE } from './data/defaultProfile';
import { ProfileData } from './types/contact';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem('personal_contact_profile_v4');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return DEFAULT_PROFILE;
  });

  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string>('General Inquiry');
  const [showWelcomeTip, setShowWelcomeTip] = useState(true);

  const handleSaveProfile = (updated: ProfileData) => {
    setProfile(updated);
    try {
      localStorage.setItem('personal_contact_profile_v4', JSON.stringify(updated));
    } catch {
      // Storage unavailable
    }
  };

  const handleResetProfile = () => {
    setProfile(DEFAULT_PROFILE);
    try {
      localStorage.removeItem('personal_contact_profile_v4');
    } catch {
      // Storage unavailable
    }
  };

  const handleSelectService = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="top" className="min-h-screen bg-[#0B0B0C] text-white selection:bg-[#C6F432] selection:text-[#0B0B0C] relative">
      {/* Fluid Field WebGL Interactive Noise Warp Shader Background */}
      <FluidField />

      {/* Main Top Navigation conforming strictly to Top Bar Contract */}
      <Header
        profile={profile}
        onOpenQR={() => setIsQRModalOpen(true)}
        onOpenCustomize={() => setIsCustomizeOpen(true)}
        onOpenSchedule={() => setIsScheduleModalOpen(true)}
      />

      {/* Main Content Layout Container (max-w-6xl for optimal spatial math) */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 space-y-6">
        {/* Subtle Liquid Glass Notification Pill for User Onboarding */}
        {showWelcomeTip && (
          <div className="pt-4">
            <div className="glass-card px-4 py-2.5 rounded-2xl border border-white/10 flex items-center justify-between gap-3 text-xs shadow-lg animate-in fade-in">
              <div className="flex items-center gap-2 text-zinc-300">
                <Sparkles className="w-4 h-4 text-[#C6F432] shrink-0" />
                <span>
                  <strong className="text-white font-semibold">Liquid Glass UI Active:</strong> Live contact cards, vCard .vcf generator, and direct channels. Click the customize slider to tweak your information anytime!
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsCustomizeOpen(true)}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-[#0B0B0C] bg-[#C6F432] hover:bg-[#d4f852] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <SlidersHorizontal className="w-3 h-3" />
                  <span>Customize Info</span>
                </button>
                <button
                  onClick={() => setShowWelcomeTip(false)}
                  className="text-zinc-400 hover:text-white text-xs px-1 cursor-pointer"
                  aria-label="Dismiss tip"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 1. Core Contact Dashboard & Floating Hero (Evenly Distributed, Zero Negative Space) */}
        <HeroContactCard
          profile={profile}
          onOpenQR={() => setIsQRModalOpen(true)}
          onOpenSchedule={() => setIsScheduleModalOpen(true)}
          onSelectService={handleSelectService}
        />

        {/* 2. Services Provided / Offerings */}
        <ServicesSection
          services={profile.services}
          onSelectService={handleSelectService}
        />

        {/* 3. Testimonials & Client Endorsements */}
        <TestimonialsSection testimonials={profile.testimonials} />

        {/* 5. Quick Embedded Contact Form & CV Download */}
        <QuickContactForm
          profile={profile}
          preselectedService={preselectedService}
          onClearPreselectedService={() => setPreselectedService('General Inquiry')}
        />
      </main>

      {/* Footer */}
      <Footer profile={profile} onOpenQR={() => setIsQRModalOpen(true)} />

      {/* Modals & Overlays */}
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        profile={profile}
      />

      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        profile={profile}
      />

      <CustomizeDrawer
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
        onReset={handleResetProfile}
      />
    </div>
  );
}
