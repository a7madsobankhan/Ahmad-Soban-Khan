import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { Testimonial } from '../types/contact';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? testimonials.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === testimonials.length - 1 ? 0 : prevIdx + 1));
  };

  const current = testimonials[currentIndex] || testimonials[0];

  return (
    <section id="testimonials" className="py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-xs uppercase tracking-widest text-[#C6F432] font-semibold mb-2">
            Social Proof & Endorsements
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
            Client & Partner Feedback
          </h2>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="p-2 rounded-xl glass-pill text-zinc-300 hover:text-white cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="p-2 rounded-xl glass-pill text-zinc-300 hover:text-white cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Featured Endorsement Spotlight Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        <Quote className="absolute top-6 right-8 w-20 h-20 text-white/[0.04] pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#C6F432]">
            <CheckCircle className="w-4 h-4" />
            <span>Verified Engagement · {current.highlight}</span>
          </div>

          <blockquote className="text-lg sm:text-2xl font-medium text-zinc-100 leading-relaxed font-['Outfit']">
            "{current.quote}"
          </blockquote>

          <div className="flex items-center gap-4 pt-4 border-t border-white/5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C6F432]/30 via-white/10 to-transparent border border-white/15 flex items-center justify-center font-bold text-white text-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
              {current.avatarText}
            </div>
            <div>
              <div className="text-sm font-bold text-white font-['Outfit']">
                {current.author}
              </div>
              <div className="text-xs text-zinc-400">
                {current.role} <span className="text-zinc-600">·</span> {current.company}
              </div>
            </div>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="flex items-center gap-1.5 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === currentIndex ? 'w-8 bg-[#C6F432]' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
