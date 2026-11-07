import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { ServiceOffering } from '../types/contact';

interface ServicesSectionProps {
  services: ServiceOffering[];
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onSelectService,
}) => {
  return (
    <section id="services" className="py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest text-[#C6F432] font-semibold mb-2">
          Engineering & Architecture
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
          Services Provided
        </h2>
        <p className="mt-2 text-sm text-zinc-400 max-w-2xl">
          Available for full-stack web applications, advanced UI/UX engineering, and autonomous multi-agent system architecture.
        </p>
      </div>

      {/* Services Grid (Balanced 2-Column Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <div
            key={service.id}
            className="glass-card group rounded-3xl p-6 sm:p-7 border border-white/10 hover:border-[#C6F432]/40 transition-all duration-300 flex flex-col justify-between shadow-[0_20px_45px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            {/* Ambient subtle corner highlight */}
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#C6F432]/5 blur-2xl group-hover:bg-[#C6F432]/15 transition-all" />

            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-4">
                <span className="font-mono text-[#C6F432]">0{index + 1}.</span>
                <span className="glass-pill px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase text-zinc-300">
                  {service.timeline}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-[#C6F432] transition-colors font-['Outfit']">
                {service.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {service.description}
              </p>

              {/* Deliverables List */}
              <div className="mt-6 pt-5 border-t border-white/5 space-y-2.5">
                <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold">
                  Core Deliverables
                </div>
                {service.deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C6F432] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inquire Action Button */}
            <div className="mt-8 pt-4">
              <button
                onClick={() => onSelectService(service.title)}
                className="w-full glass-pill py-2.5 px-4 rounded-xl text-xs font-semibold text-zinc-200 group-hover:text-black group-hover:bg-[#C6F432] group-hover:border-[#C6F432] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Request Scope & Quote</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
