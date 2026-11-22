import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronUp, PhoneCall } from 'lucide-react';
import {
  BROCHURE_STATS,
  CORE_SERVICES,
  INDUSTRIES,
  SIX_REASONS,
} from '../data/siteData';
import { AnimatedCounter } from './AnimatedCounter';
import { ConditionMonitoringSection } from './ConditionMonitoringSection';
import { HeroSection } from './HeroSection';
import { ResilientImage } from './ResilientImage';
import { ReasonIcon, ServiceIcon } from './ServiceIcon';

interface HomePageProps {
  onNavigateAbout: () => void;
  onNavigateServices: (serviceId?: string) => void;
  onNavigateContact: (prefillService?: string) => void;
}

export function HomePage({
  onNavigateAbout,
  onNavigateServices,
  onNavigateContact,
}: HomePageProps) {
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  return (
    <div>
      {/* 1. Full-Screen Hero Section */}
      <HeroSection
        onExploreServices={() => onNavigateServices()}
        onTalkToExperts={() => onNavigateContact()}
      />

      {/* 2. Company Introduction + Brochure Proof Strip */}
      <section className="bg-white py-20 lg:py-28 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <p className="text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-[#071D36]/65 mb-3">
                About TM Industrial Solution
              </p>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[2.85rem] tracking-tight leading-[1.08] text-[#071D36] mb-6">
                RELIABILITY IS NOT AN OPTION.{' '}
                <span className="text-[#D4960B]">IT&apos;S A NECESSITY.</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-5">
                TM Industrial Solution provides advanced condition monitoring, machine
                diagnostics, and reliability engineering services to help industrial plants
                prevent unexpected failures, improve rotating equipment performance, and
                extend machinery life.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
                By combining field-proven diagnostic instrumentation with structured root cause
                analysis, we equip maintenance teams with clear, prioritized actions before minor
                anomalies escalate into costly unplanned shutdowns.
              </p>

              <button
                type="button"
                onClick={onNavigateAbout}
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#071D36] text-white font-display font-bold text-sm tracking-wider uppercase rounded-md hover:bg-[#0C2A4D] active:scale-[0.98] transition-all duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B51B]"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4 text-[#F5B51B]" aria-hidden="true" />
              </button>
            </motion.div>

            {/* Adjacent Proof Metrics (From Uploaded Brochure Page 3) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 border border-slate-200 rounded-xl overflow-hidden bg-[#F4F6F9]">
                {BROCHURE_STATS.map((stat, idx) => (
                  <div
                    key={stat.label}
                    className={`p-6 sm:p-8 bg-white ${
                      idx % 2 === 0 ? 'sm:border-r border-slate-200' : ''
                    } ${idx < 2 ? 'border-b border-slate-200' : idx === 2 ? 'border-b sm:border-b-0 border-slate-200' : ''}`}
                  >
                    <div className="font-display font-extrabold text-4xl sm:text-5xl text-[#071D36] tracking-tight mb-2">
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                        isStaticText={stat.isStaticText}
                      />
                    </div>
                    <h3 className="font-display font-bold text-base text-[#071D36] mb-1">
                      {stat.label}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {stat.detail}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Core Services – Six Services, One Goal */}
      <section id="core-services" className="bg-[#F4F6F9] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45 }}
              className="max-w-2xl"
            >
              <p className="text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-[#071D36]/65 mb-3">
                Our Core Services
              </p>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.08] text-[#071D36]">
                SIX SERVICES. <span className="text-[#D4960B]">ONE GOAL.</span>
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                Maximize uptime. Minimize risk. Build a more reliable future across every
                critical rotating and electrical asset in your facility.
              </p>
            </motion.div>

            <button
              type="button"
              onClick={() => onNavigateServices()}
              className="inline-flex items-center gap-2 text-sm font-display font-bold uppercase tracking-wider text-[#071D36] hover:text-[#D4960B] transition-colors self-start lg:self-end cursor-pointer whitespace-nowrap"
            >
              <span>View All Technical Specifications</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* 6 Premium Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {CORE_SERVICES.map((service, index) => {
              const isExpanded = expandedServiceId === service.id;
              return (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.45,
                    delay: (index % 3) * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group bg-white rounded-xl border border-slate-200/90 overflow-hidden flex flex-col hover:border-[#071D36]/35 hover:shadow-lg hover:shadow-slate-900/5 transition-all duration-200"
                >
                  {/* Industrial Service Photograph */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#071D36]">
                    <ResilientImage
                      src={service.image}
                      alt={service.imageAlt}
                      fallbackTitle={service.title}
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#071D36]/70 via-transparent to-transparent pointer-events-none"
                      aria-hidden="true"
                    />
                    <span className="absolute top-3.5 left-3.5 font-mono font-semibold text-xs text-[#071D36] bg-[#F5B51B] px-2.5 py-1 rounded">
                      {service.number}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#071D36] text-[#F5B51B] flex items-center justify-center shrink-0 group-hover:bg-[#F5B51B] group-hover:text-[#071D36] transition-colors duration-200">
                        <ServiceIcon serviceId={service.id} className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-bold text-xl text-[#071D36] leading-snug">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed mb-5">
                      {service.shortDescription}
                    </p>

                    {/* Clean Unboxed Capabilities Metadata (Zero-Pill Discipline) */}
                    <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 leading-relaxed mb-5">
                      <span className="font-semibold text-[#071D36] block mb-1">
                        Key Capabilities
                      </span>
                      <p>
                        {service.highlights.map((item, hIdx) => (
                          <span key={item}>
                            {hIdx > 0 && (
                              <span className="mx-1.5 text-[#D4960B]" aria-hidden="true">
                                ·
                              </span>
                            )}
                            <span>{item}</span>
                          </span>
                        ))}
                      </p>
                    </div>

                    {/* Expandable Quick Scope Details */}
                    {isExpanded && (
                      <div className="mb-5 pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-2.5">
                        <p className="leading-relaxed">{service.detailedExplanation}</p>
                        <div>
                          <span className="font-semibold text-[#071D36] block mb-1">
                            Typical Equipment:
                          </span>
                          <ul className="space-y-1 text-slate-600">
                            {service.applications.slice(0, 3).map((app) => (
                              <li key={app}>— {app}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Card Footer Controls */}
                    <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedServiceId(isExpanded ? null : service.id)
                        }
                        aria-expanded={isExpanded}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#071D36] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <span>{isExpanded ? 'Hide Summary' : 'Quick Overview'}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => onNavigateServices(service.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-wider text-[#071D36] hover:text-[#D4960B] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <span>Full Details</span>
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Interactive Digital Condition Monitoring Section (Dark Navy) */}
      <ConditionMonitoringSection />

      {/* 5. Why Choose TM Industrial Solution – Six Reasons. One Partner. */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45 }}
            className="max-w-2xl mb-14"
          >
            <p className="text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-[#071D36]/65 mb-3">
              Our Commitment
            </p>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.08] text-[#071D36]">
              SIX REASONS. <span className="text-[#D4960B]">ONE PARTNER.</span>
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Reliable condition monitoring, alignment, balancing, and root cause diagnostics
              delivered by a focused engineering team committed to plant availability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-slate-200">
            {SIX_REASONS.map((reason, idx) => (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.05 }}
                className="p-7 sm:p-8 border-r border-b border-slate-200 bg-white hover:bg-[#F4F6F9]/75 transition-colors duration-200 group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-lg bg-[#071D36] text-[#F5B51B] flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                    <ReasonIcon reasonId={reason.id} className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-medium text-slate-400 tabular-nums">
                    {reason.number}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-[#071D36] mb-2.5">
                  {reason.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Industries We Serve (Dark Charcoal Contrast Section) */}
      <section
        id="industries"
        className="bg-[#0E141B] text-white py-20 lg:py-28 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45 }}
              className="max-w-2xl"
            >
              <p className="text-xs sm:text-sm font-medium tracking-[0.16em] uppercase text-[#F5B51B] mb-3">
                Sector Expertise
              </p>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.08] text-white">
                INDUSTRIES WE SERVE.
              </h2>
              <p className="mt-4 text-base text-slate-300 leading-relaxed">
                Supporting continuous-process and heavy industrial plants where unscheduled
                equipment downtime directly impacts safety, product quality, and output.
              </p>
            </motion.div>

            <button
              type="button"
              onClick={() => onNavigateContact()}
              className="inline-flex items-center gap-2 text-sm font-display font-bold uppercase tracking-wider text-[#F5B51B] hover:text-white transition-colors self-start lg:self-end cursor-pointer whitespace-nowrap"
            >
              <span>Discuss Your Facility</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map((industry, idx) => (
              <motion.article
                key={industry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: (idx % 3) * 0.06 }}
                className="group relative rounded-xl overflow-hidden border border-white/10 bg-[#141C25] flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ResilientImage
                    src={industry.image}
                    alt={industry.imageAlt}
                    fallbackTitle={industry.title}
                    className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500 ease-out"
                  />
                  {/* Measured gradient scrim for WCAG AA contrast */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#071D36] via-[#071D36]/55 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <h3 className="font-display font-extrabold text-2xl text-white tracking-tight mb-1.5">
                      {industry.title}
                    </h3>
                    <p className="text-sm text-slate-200 leading-snug">
                      {industry.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between gap-4 border-t border-white/10">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <span className="text-slate-200 font-medium block mb-1">
                      Monitored Equipment
                    </span>
                    {industry.criticalAssets}
                  </p>
                  <button
                    type="button"
                    onClick={() => onNavigateContact()}
                    className="inline-flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-wider text-[#F5B51B] hover:text-white transition-colors self-start cursor-pointer"
                  >
                    <span>Request Plant Audit</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Final CTA Section */}
      <section className="relative bg-[#071D36] text-white py-20 lg:py-24 overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-engineering-grid opacity-50 pointer-events-none" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-56 h-2.5 tm-diagonal-accent" aria-hidden="true" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-xs sm:text-sm font-medium tracking-[0.16em] uppercase text-[#F5B51B] mb-4">
              Take Control of Equipment Health
            </p>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight leading-[1.06] text-white mb-5">
              LET&apos;S MAKE YOUR MACHINES{' '}
              <span className="text-[#F5B51B]">MORE RELIABLE.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-9">
              Don&apos;t wait for machine failure. Take control of your equipment health today
              with precision diagnostics and proactive maintenance engineering.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => onNavigateContact()}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#F5B51B] text-[#071D36] font-display font-bold text-sm sm:text-base tracking-wider uppercase rounded-md hover:bg-[#E0A20F] active:scale-[0.98] transition-all duration-150 whitespace-nowrap cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" aria-hidden="true" />
                <span>Contact Our Experts</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateServices()}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white/5 text-white border border-white/25 font-display font-semibold text-sm sm:text-base tracking-wider uppercase rounded-md hover:bg-white/12 hover:border-white/45 active:scale-[0.98] transition-all duration-150 whitespace-nowrap cursor-pointer"
              >
                <span>Request a Service</span>
                <ArrowRight className="w-4 h-4 text-[#F5B51B]" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
