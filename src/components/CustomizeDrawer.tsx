import React, { useState } from 'react';
import { X, Save, RotateCcw, Download, Sparkles, Check } from 'lucide-react';
import { ProfileData } from '../types/contact';

interface CustomizeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onSave: (updated: ProfileData) => void;
  onReset: () => void;
}

export const CustomizeDrawer: React.FC<CustomizeDrawerProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<ProfileData>(profile);
  const [justSaved, setJustSaved] = useState(false);

  if (!isOpen) return null;

  const handleFieldChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLinkChange = (linkKey: keyof ProfileData['links'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      links: { ...prev.links, [linkKey]: value },
    }));
  };

  const handleSave = () => {
    onSave(formData);
    setJustSaved(true);
    setTimeout(() => {
      setJustSaved(false);
      onClose();
    }, 1000);
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'personal_contact_profile.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md h-full glass-panel border-l border-white/15 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#C6F432]" />
              <h3 className="text-lg font-bold text-white font-['Outfit']">
                Live Profile Customizer
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="mt-3 text-xs text-zinc-400">
            Customize your contact details and active links in real time. Changes are stored locally.
          </p>

          {/* Form Fields */}
          <div className="mt-6 space-y-4">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-zinc-300 font-bold block mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleFieldChange('fullName', e.target.value)}
                className="w-full glass-input px-3 py-2 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-zinc-300 font-bold block mb-1">
                Professional Title
              </label>
              <input
                type="text"
                value={formData.professionalTitle}
                onChange={(e) => handleFieldChange('professionalTitle', e.target.value)}
                className="w-full glass-input px-3 py-2 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-zinc-300 font-bold block mb-1">
                Primary Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                className="w-full glass-input px-3 py-2 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-zinc-300 font-bold block mb-1">
                Direct Phone
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                className="w-full glass-input px-3 py-2 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-zinc-300 font-bold block mb-1">
                Location / Region
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleFieldChange('location', e.target.value)}
                className="w-full glass-input px-3 py-2 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-zinc-300 font-bold block mb-1">
                Timezone
              </label>
              <input
                type="text"
                value={formData.timeZone}
                onChange={(e) => handleFieldChange('timeZone', e.target.value)}
                className="w-full glass-input px-3 py-2 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-zinc-300 font-bold block mb-1">
                Status / Availability Badge Text
              </label>
              <input
                type="text"
                value={formData.statusText}
                onChange={(e) => handleFieldChange('statusText', e.target.value)}
                className="w-full glass-input px-3 py-2 rounded-xl text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-zinc-300 font-bold block mb-1">
                Bio / Executive Summary
              </label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => handleFieldChange('bio', e.target.value)}
                className="w-full glass-input px-3 py-2 rounded-xl text-xs text-white resize-none"
              />
            </div>

            <div className="pt-2 border-t border-white/10 space-y-3">
              <span className="text-[11px] uppercase tracking-wider text-[#C6F432] font-bold block">
                Social & Direct Messaging Links
              </span>

              <div>
                <label className="text-[10px] text-zinc-400 block mb-0.5">LinkedIn Profile</label>
                <input
                  type="text"
                  value={formData.links.linkedin}
                  onChange={(e) => handleLinkChange('linkedin', e.target.value)}
                  className="w-full glass-input px-3 py-1.5 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 block mb-0.5">Instagram Profile</label>
                <input
                  type="text"
                  value={formData.links.instagram}
                  onChange={(e) => handleLinkChange('instagram', e.target.value)}
                  className="w-full glass-input px-3 py-1.5 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 block mb-0.5">Telegram Direct Link (https://t.me/...)</label>
                <input
                  type="text"
                  value={formData.links.telegram}
                  onChange={(e) => handleLinkChange('telegram', e.target.value)}
                  className="w-full glass-input px-3 py-1.5 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 block mb-0.5">WhatsApp Direct Link (https://wa.me/...)</label>
                <input
                  type="text"
                  value={formData.links.whatsapp}
                  onChange={(e) => handleLinkChange('whatsapp', e.target.value)}
                  className="w-full glass-input px-3 py-1.5 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 block mb-0.5">Calendly / Cal.com URL</label>
                <input
                  type="text"
                  value={formData.links.calendly}
                  onChange={(e) => handleLinkChange('calendly', e.target.value)}
                  className="w-full glass-input px-3 py-1.5 rounded-lg text-xs text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-6 border-t border-white/10 mt-6 space-y-2">
          <button
            onClick={handleSave}
            className="w-full glass-pill-accent py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            {justSaved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Profile Updated!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Apply & Save Changes</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJSON}
              className="flex-1 glass-pill py-2 px-3 rounded-xl text-xs font-medium text-zinc-300 hover:text-white flex items-center justify-center gap-1.5"
              title="Export Profile as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={() => {
                onReset();
                onClose();
              }}
              className="glass-pill py-2 px-3 rounded-xl text-xs font-medium text-zinc-400 hover:text-red-400 flex items-center justify-center gap-1.5"
              title="Reset to Template Defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
