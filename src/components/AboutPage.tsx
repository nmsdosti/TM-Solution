import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Compass, Eye, ShieldCheck, Wrench } from 'lucide-react';
import { CORE_SERVICES, HERO_MEDIA } from '../data/siteData';
import { ResilientImage } from './ResilientImage';
import { ServiceIcon } from './ServiceIcon';

interface AboutPageProps {
  onNavigateServices: (serviceId?: string) => void;
  onNavigateContact: () => void;
}

const RELIABILITY_STEPS = [
  {
    number: '01',
    title: 'Monitor',
    description:
      'Establish accurate baseline measurements across rotating machinery, bearings, couplings, lubricants, and electrical panels under real plant load.',
  },
  {
    number: '02',
    title: 'Analyze',
    description:
      'Evaluate FFT vibration spectra, time waveforms, thermal profiles, and oil laboratory indicators to distinguish early developing defects from normal operating dynamics.',
  },
  {
    number: '03',
    title: 'Optimize',
    description:
      'Execute corrective precision alignment, on-site dynamic balancing, and root cause rectification to restore machinery to smooth, efficient operation.',
  },
  {
    number: '04',
    title: 'Together',
    description:
      'Partner alongside your plant maintenance and reliability engineers with transparent reporting, verification measurements, and ongoing asset health follow-through.',
  },
];

export function AboutPage({ onNavigateServices, onNavigateContact }: AboutPageProps) {
  return (
    <div className="pt-20">
      {/* Page Hero Banner */}
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
              About TM Industrial Solution
            </p>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-white mb-6">
              THE INTELLIGENCE BEHIND{' '}
              <span className="text-[#F5B51B]">RELIABLE MACHINES.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Dedicated to industrial condition monitoring, precision engineering, and
              proactive equipment reliability for manufacturing and process facilities across
              India.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-44 h-2 tm-diagonal-accent" aria-hidden="true" />
      </section>

      {/* Company Introduction */}
      <section className="bg-white py-20 lg:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-6 flex flex-col justify-center"
            >
              <p className="text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-[#071D36]/65 mb-3">
                Who We Are
              </p>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-[#071D36] mb-6 leading-tight">
                Precision Condition Monitoring Built for Real Industrial Environments.
              </h2>
              <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                <p>
                  TM Industrial Solution is an industrial condition monitoring and reliability
                  engineering service provider committed to helping plants move from reactive
                  breakdown repairs to informed, predictive asset care.
                </p>
                <p>
                  Modern industrial operations depend on uninterrupted availability of motors,
                  pumps, compressors, gearboxes, fans, and electrical distribution networks.
                  Even a single unexpected failure on a critical train can halt production
                  lines, increase safety risks, and escalate overhaul expenses.
                </p>
                <p>
                  Our engineering focus is straightforward: measure accurately, diagnose the
                  underlying fault mechanism, and deliver clear corrective actions that keep
                  critical machinery running safely, smoothly, and efficiently.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="lg:col-span-6"
            >
              <div className="h-full min-h-[320px] rounded-xl overflow-hidden border border-slate-200 bg-[#071D36]">
                <ResilientImage
                  src="/src/assets/images/service_troubleshooting_1795326764008.jpg"
                  alt="TM Industrial Solution reliability engineer analyzing diagnostic waveforms beside an industrial gearbox"
                  fallbackTitle="Industrial Reliability Field Engineering"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission & Our Vision */}
      <section className="bg-[#F4F6F9] py-20 lg:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45 }}
              className="bg-white rounded-xl border border-slate-200 p-8 sm:p-10"
            >
              <div className="w-12 h-12 rounded-lg bg-[#071D36] text-[#F5B51B] flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" aria-hidden="true" />
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#071D36] mb-4">
                Our Mission
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                To empower industrial facilities with accurate condition monitoring, precision
                mechanical correction, and actionable engineering diagnostics that minimize
                unplanned downtime, reduce maintenance risk, and extend the operational life of
                critical plant machinery.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="bg-[#071D36] text-white rounded-xl border border-white/10 p-8 sm:p-10"
            >
              <div className="w-12 h-12 rounded-lg bg-[#F5B51B] text-[#071D36] flex items-center justify-center mb-6">
                <Eye className="w-6 h-6" aria-hidden="true" />
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-4">
                Our Vision
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                To be a trusted long-term reliability partner for Indian industry—setting a
                dependable benchmark for data-driven predictive diagnostics, technical
                integrity, and sustainable machine health across manufacturing, power, cement,
                steel, chemical, and pharmaceutical operations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Approach to Machine Reliability (Monitor / Analyze / Optimize / Together) */}
      <section className="bg-white py-20 lg:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-[#071D36]/65 mb-3">
              Methodology
            </p>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-[#071D36]">
              Our Approach to Machine Reliability.
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Every diagnostic engagement follows a disciplined four-stage engineering cycle
              built for measurable operational clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RELIABILITY_STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="rounded-xl border border-slate-200 bg-[#F4F6F9]/60 p-6 flex flex-col"
              >
                <span className="font-mono font-semibold text-xs text-[#071D36] bg-[#F5B51B] px-2.5 py-1 rounded self-start mb-5">
                  {step.number}
                </span>
                <h3 className="font-display font-bold text-2xl text-[#071D36] mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Technical Expertise + Commitment to Customers */}
      <section className="bg-[#071D36] text-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Technical Expertise */}
            <div className="lg:col-span-7">
              <p className="text-xs sm:text-sm font-medium tracking-[0.16em] uppercase text-[#F5B51B] mb-3">
                Technical Capabilities
              </p>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-white mb-5">
                Six Integrated Diagnostic &amp; Corrective Disciplines.
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-8">
                Rather than offering isolated measurements, TM Industrial Solution bridges the
                full diagnostic-to-correction workflow—detecting faults early and verifying the
                mechanical fix on site.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CORE_SERVICES.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => onNavigateServices(service.id)}
                    className="text-left p-4 rounded-lg bg-[#0B223D] border border-white/10 hover:border-[#F5B51B]/50 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <ServiceIcon
                        serviceId={service.id}
                        className="w-5 h-5 text-[#F5B51B] shrink-0"
                      />
                      <span className="font-display font-bold text-base text-white group-hover:text-[#F5B51B] transition-colors">
                        {service.number}. {service.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {service.highlights.join(' · ')}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Commitment to Customers */}
            <div className="lg:col-span-5 bg-[#0B223D] border border-white/12 rounded-xl overflow-hidden">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <ResilientImage
                  src={HERO_MEDIA.motorImage}
                  alt={HERO_MEDIA.motorAlt}
                  fallbackTitle="Industrial Reliability Commitment"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2.5 text-[#F5B51B] mb-3">
                  <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-[0.14em]">
                    Customer Commitment
                  </span>
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-4">
                  Built Around Plant Availability &amp; Practical Execution
                </h3>
                <ul className="space-y-3 text-sm text-slate-300 mb-7">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F5B51B] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Clear, evidence-backed diagnostic reports without ambiguity</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F5B51B] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Focus on root cause resolution rather than temporary patchwork</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F5B51B] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Safety-conscious field execution with minimal disruption to production</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F5B51B] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Long-term collaborative reliability support for maintenance leaders</span>
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={onNavigateContact}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#F5B51B] text-[#071D36] font-display font-bold text-sm uppercase tracking-wider rounded-md hover:bg-[#E0A20F] transition-colors cursor-pointer"
                >
                  <Wrench className="w-4 h-4" aria-hidden="true" />
                  <span>Schedule a Reliability Consultation</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
