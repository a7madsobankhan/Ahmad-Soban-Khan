import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, ExternalLink, Sparkles } from 'lucide-react';
import { ProfileData } from '../types/contact';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose, profile }) => {
  const [meetingType, setMeetingType] = useState('30-min Intro & Project Scope');
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM PST');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const meetingOptions = [
    {
      id: '30-min Intro & Project Scope',
      duration: '30 mins',
      desc: 'Ideal for initial product introductions and scope alignment.',
    },
    {
      id: '45-min Spatial UI Architecture Consultation',
      duration: '45 mins',
      desc: 'Deep-dive into your spatial product tokens, shaders, and hardware ergonomics.',
    },
    {
      id: '15-min Quick Sync',
      duration: '15 mins',
      desc: 'Brief touchpoint for ongoing advisory or quick technical inquiries.',
    },
  ];

  const timeSlots = ['09:30 AM PST', '11:00 AM PST', '02:00 PM PST', '04:30 PM PST'];

  const handleConfirm = () => {
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl border border-white/15 overflow-hidden shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close Scheduling Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {isBooked ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#C6F432]/20 border border-[#C6F432]/40 flex items-center justify-center text-[#C6F432] shadow-[0_0_20px_rgba(198,244,50,0.3)]">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white font-['Outfit']">
              Intro Call Reserved
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-sm mx-auto">
              Your meeting <span className="text-white font-medium">({meetingType})</span> on <span className="text-[#C6F432] font-medium">{selectedDate} at {selectedSlot}</span> has been logged. A calendar dispatch has been drafted for your direct email.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsBooked(false);
                  onClose();
                }}
                className="glass-pill-accent px-6 py-2.5 rounded-xl text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-[#C6F432] mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span className="font-semibold uppercase tracking-wider text-[10px]">
                  Direct Calendar Sync
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-white font-['Outfit']">
                Schedule a Consultation
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Direct booking sync with Ahmad's working availability in {profile.timeZone}.
              </p>
            </div>

            {/* Meeting Type Selection */}
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider text-zinc-300 font-bold block">
                Select Format
              </label>
              <div className="space-y-2">
                {meetingOptions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setMeetingType(opt.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                      meetingType === opt.id
                        ? 'border-[#C6F432] bg-[#C6F432]/10 shadow-[0_0_15px_rgba(198,244,50,0.15)]'
                        : 'border-white/10 glass-card hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-white">
                      <span>{opt.id}</span>
                      <span className="text-[#C6F432] font-mono text-[11px]">{opt.duration}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1">{opt.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Time Slots */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-zinc-300 font-bold">
                <span>Select Slot (Next Openings)</span>
                <span className="text-[#C6F432] lowercase font-normal">pst time zone</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      selectedSlot === slot
                        ? 'glass-pill-accent text-[#0B0B0C]'
                        : 'glass-pill text-zinc-300 hover:text-white'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Confirm & External Cal.com / Calendly link */}
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={handleConfirm}
                className="w-full glass-pill-accent py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Lock In {selectedSlot}</span>
              </button>

              <a
                href={profile.links.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full glass-pill py-2.5 px-4 rounded-xl text-xs font-medium text-zinc-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Or open custom schedule on Cal.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
