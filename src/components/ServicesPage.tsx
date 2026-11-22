import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Layers, ShieldCheck, Wrench } from 'lucide-react';
import { CORE_SERVICES } from '../data/siteData';
import { ResilientImage } from './ResilientImage';
import { ServiceIcon } from './ServiceIcon';

interface ServicesPageProps {
  focusServiceId?: string | null;
  onRequestService: (serviceTitle: string) => void;
}

export function ServicesPage({ focusServiceId, onRequestService }: ServicesPageProps) {
  useEffect(() => {
    if (!focusServiceId) return;
    const el = document.getElementById(focusServiceId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, [focusServiceId]);

  const scrollToService = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-20">
      {/* Services Hero Banner */}
      <section className="relative bg-[#071D36] text-white py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-engineering-grid opacity-60 pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="max-w-3xl"
          >
            <p className="text-xs sm:text-sm font-medium tracking-[0.16em] uppercase text-[#F5B51B] mb-4">
              Condition Monitoring &amp; Reliability Portfolio
            </p>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-white mb-6">
              SIX SERVICES. <span className="text-[#F5B51B]">ONE GOAL.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Comprehensive field diagnostics, precision laser alignment, lubricant condition
              analysis, on-site balancing, infrared thermography, and root cause troubleshooting
              engineered to maximize industrial uptime.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-44 h-2 tm-diagonal-accent" aria-hidden="true" />
      </section>

      {/* Quick-Jump Service Index Strip */}
      <div className="sticky top-[56px] sm:top-[60px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {CORE_SERVICES.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => scrollToService(service.id)}
                className="px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium text-[#071D36] bg-[#F4F6F9] hover:bg-[#071D36] hover:text-white transition-colors whitespace-nowrap cursor-pointer"
              >
                <span className="font-mono text-[#D4960B] mr-1.5">{service.number}.</span>
                {service.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Service Breakdowns */}
      <div className="divide-y divide-slate-200">
        {CORE_SERVICES.map((service, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <section
              key={service.id}
              id={service.id}
              className={`py-20 lg:py-24 scroll-mt-28 ${isEven ? 'bg-white' : 'bg-[#F4F6F9]'}`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Split: Photo + Technical Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch mb-12">
                  {/* Large Industrial Photograph */}
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45 }}
                    className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                  >
                    <div className="relative h-full min-h-[300px] sm:min-h-[380px] rounded-xl overflow-hidden border border-slate-200 bg-[#071D36]">
                      <ResilientImage
                        src={service.image}
                        alt={service.imageAlt}
                        fallbackTitle={service.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-4 left-4 font-mono font-bold text-sm bg-[#F5B51B] text-[#071D36] px-3 py-1 rounded">
                        Service {service.number}
                      </span>
                    </div>
                  </motion.div>

                  {/* Detailed Explanation + Capabilities + CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: 0.06 }}
                    className={`lg:col-span-6 flex flex-col justify-center ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-[#071D36] text-[#F5B51B] flex items-center justify-center shrink-0">
                        <ServiceIcon serviceId={service.id} className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
                          Discipline {service.number}
                        </p>
                        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#071D36] tracking-tight">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-base sm:text-lg font-medium text-[#071D36]/90 leading-relaxed mb-4">
                      {service.shortDescription}
                    </p>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-7">
                      {service.detailedExplanation}
                    </p>

                    {/* Highlighted Capabilities Line */}
                    <div className="pb-6 mb-7 border-b border-slate-200/90 text-xs sm:text-sm text-slate-600">
                      <span className="font-semibold text-[#071D36] mr-2">Core Scope:</span>
                      {service.highlights.map((h, hIdx) => (
                        <span key={h}>
                          {hIdx > 0 && (
                            <span className="mx-2 text-[#D4960B]" aria-hidden="true">
                              ·
                            </span>
                          )}
                          <span>{h}</span>
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => onRequestService(service.title)}
                        className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#F5B51B] text-[#071D36] font-display font-bold text-sm uppercase tracking-wider rounded-md hover:bg-[#E0A20F] active:scale-[0.98] transition-all duration-150 whitespace-nowrap cursor-pointer"
                      >
                        <span>Request {service.title}</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Bottom 3-Column Technical Matrix: Applications / Benefits / Technical Capabilities */}
                <div className="grid grid-cols-1 md:grid-cols-3 border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <div className="p-6 sm:p-7 border-b md:border-b-0 md:border-r border-slate-200">
                    <div className="flex items-center gap-2 text-[#071D36] font-display font-bold text-base mb-4">
                      <Layers className="w-4 h-4 text-[#D4960B]" aria-hidden="true" />
                      <h3>Industrial Applications</h3>
                    </div>
                    <ul className="space-y-2.5 text-sm text-slate-600">
                      {service.applications.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className="w-4 h-4 text-[#071D36]/60 shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 sm:p-7 border-b md:border-b-0 md:border-r border-slate-200">
                    <div className="flex items-center gap-2 text-[#071D36] font-display font-bold text-base mb-4">
                      <ShieldCheck className="w-4 h-4 text-[#D4960B]" aria-hidden="true" />
                      <h3>Reliability Benefits</h3>
                    </div>
                    <ul className="space-y-2.5 text-sm text-slate-600">
                      {service.benefits.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className="w-4 h-4 text-[#D4960B] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 sm:p-7">
                    <div className="flex items-center gap-2 text-[#071D36] font-display font-bold text-base mb-4">
                      <Wrench className="w-4 h-4 text-[#D4960B]" aria-hidden="true" />
                      <h3>Technical Capabilities</h3>
                    </div>
                    <ul className="space-y-2.5 text-sm text-slate-600">
                      {service.technicalCapabilities.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className="w-4 h-4 text-[#071D36] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom Engineering CTA */}
      <section className="bg-[#071D36] text-white py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2">
              Need a Combined Plant Condition Monitoring Program?
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Speak directly with our reliability engineering team to scope a tailored inspection
              schedule for your facility.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onRequestService('Comprehensive Condition Monitoring Program')}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#F5B51B] text-[#071D36] font-display font-bold text-sm uppercase tracking-wider rounded-md hover:bg-[#E0A20F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Request Proposal</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}
