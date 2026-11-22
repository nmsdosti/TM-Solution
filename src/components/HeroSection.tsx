import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Gauge, PhoneCall, ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';
import { HERO_MEDIA } from '../data/siteData';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onExploreServices: () => void;
  onTalkToExperts: () => void;
}

type PreviewHealthState = 'Good' | 'Warning' | 'Critical';

const HEALTH_PROFILES: Record<
  PreviewHealthState,
  {
    label: string;
    colorHex: string;
    textColor: string;
    rpm: number;
    rms: string;
    peakLabel: string;
    peakX: number;
    peakAmp: number;
    secondaryAmp: number;
    waveNoise: number;
    gaugePct: number;
    bearingText: string;
  }
> = {
  Good: {
    label: 'Good',
    colorHex: '#16A34A',
    textColor: 'text-emerald-400',
    rpm: 2984,
    rms: '1.82 mm/s',
    peakLabel: '1X 298.4 Hz',
    peakX: 78,
    peakAmp: 62,
    secondaryAmp: 16,
    waveNoise: 0.25,
    gaugePct: 0.88,
    bearingText: 'Normal',
  },
  Warning: {
    label: 'Warning',
    colorHex: '#F5B51B',
    textColor: 'text-[#F5B51B]',
    rpm: 2962,
    rms: '5.46 mm/s',
    peakLabel: '2X 596.0 Hz',
    peakX: 146,
    peakAmp: 74,
    secondaryAmp: 40,
    waveNoise: 0.72,
    gaugePct: 0.56,
    bearingText: 'Monitor',
  },
  Critical: {
    label: 'Critical',
    colorHex: '#DC2626',
    textColor: 'text-red-400',
    rpm: 2938,
    rms: '8.94 mm/s',
    peakLabel: 'BPFO 638.0 Hz',
    peakX: 192,
    peakAmp: 84,
    secondaryAmp: 58,
    waveNoise: 1.35,
    gaugePct: 0.24,
    bearingText: 'Wear Alert',
  },
};

export function HeroSection({ onExploreServices, onTalkToExperts }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [healthState, setHealthState] = useState<PreviewHealthState>('Good');
  const [phase, setPhase] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 48]);

  // Smooth oscilloscope phase update for illustrative live vibration preview
  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = window.setInterval(() => {
      setPhase((prev) => (prev + 0.35) % (Math.PI * 20));
    }, 90);
    return () => window.clearInterval(timer);
  }, [shouldReduceMotion]);

  const profile = HEALTH_PROFILES[healthState];

  // Generate SVG path for animated FFT spectrum
  const fftPath = useMemo(() => {
    const width = 260;
    const height = 88;
    const points: string[] = [];
    for (let x = 0; x <= width; x += 4) {
      const base =
        4 +
        Math.abs(Math.sin(x * 0.22 + phase * 0.15) * 3.5) +
        Math.abs(Math.cos(x * 0.09) * 2.5);
      const d1 = Math.abs(x - profile.peakX);
      const peak1 = profile.peakAmp * Math.exp(-(d1 * d1) / 56);
      const d2 = Math.abs(x - 42);
      const peak2 = profile.secondaryAmp * Math.exp(-(d2 * d2) / 64);
      const d3 = Math.abs(x - 165);
      const peak3 = (profile.secondaryAmp * 0.7) * Math.exp(-(d3 * d3) / 72);
      const y = Math.max(4, height - Math.min(height - 4, base + peak1 + peak2 + peak3));
      points.push(`${x === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return points.join(' ');
  }, [phase, profile]);

  // Generate SVG path for animated time waveform
  const waveformPath = useMemo(() => {
    const width = 260;
    const midY = 26;
    const pts: string[] = [];
    for (let x = 0; x <= width; x += 3) {
      const t = x * 0.14 + phase;
      const primary = Math.sin(t) * (healthState === 'Critical' ? 14 : healthState === 'Warning' ? 11 : 8);
      const harmonic = Math.sin(t * 2.7 + 0.8) * (4.5 * profile.waveNoise);
      const impact = Math.cos(t * 5.1) * (3.2 * profile.waveNoise);
      const y = Math.max(3, Math.min(49, midY + primary + harmonic + impact));
      pts.push(`${x === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(' ');
  }, [phase, healthState, profile.waveNoise]);

  const gaugeRadius = 24;
  const gaugeCircumference = 2 * Math.PI * gaugeRadius;
  const gaugeDashOffset = gaugeCircumference * (1 - profile.gaugePct);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] bg-[#071D36] text-white pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden flex items-center"
    >
      {/* Subtle architectural engineering blueprint grid & depth gradient */}
      <div className="absolute inset-0 bg-engineering-grid opacity-80 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(245,181,27,0.11),transparent_55%),radial-gradient(ellipse_at_15%_85%,rgba(19,58,102,0.6),transparent_60%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Brand Value Proposition & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <p className="text-xs sm:text-sm font-medium tracking-[0.16em] uppercase text-[#F5B51B] mb-5">
              The Intelligence Behind Reliable Machines
            </p>

            <h1 className="font-display font-extrabold tracking-tight leading-[1.03] text-[clamp(2.5rem,4.6vw,4.15rem)] text-white mb-6">
              KNOW YOUR MACHINE.
              <span className="block text-[#F5B51B] mt-1">BEFORE IT FAILS.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl mb-3">
              Advanced Condition Monitoring &amp; Reliability Solutions for a Smarter, More
              Reliable Industrial Future.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed max-w-xl mb-9">
              Precision vibration analysis, laser shaft alignment, oil diagnostics, dynamic
              balancing, infrared thermography, and root cause troubleshooting across India.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                type="button"
                onClick={onExploreServices}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#F5B51B] text-[#071D36] font-display font-bold text-sm sm:text-base tracking-wide uppercase rounded-md hover:bg-[#E0A20F] active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#071D36]"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onTalkToExperts}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white/5 text-white border border-white/25 font-display font-semibold text-sm sm:text-base tracking-wide uppercase rounded-md hover:bg-white/12 hover:border-white/40 active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B51B]"
              >
                <PhoneCall className="w-4 h-4 text-[#F5B51B]" aria-hidden="true" />
                <span>Talk to Our Experts</span>
              </button>
            </div>

            {/* Quiet unboxed discipline line (Zero-Pill Discipline) */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-slate-300">
              <span>Vibration Analysis</span>
              <span className="text-[#F5B51B]" aria-hidden="true">/</span>
              <span>Laser Shaft Alignment</span>
              <span className="text-[#F5B51B]" aria-hidden="true">/</span>
              <span>Oil Analysis</span>
              <span className="text-[#F5B51B]" aria-hidden="true">/</span>
              <span>Balancing</span>
              <span className="text-[#F5B51B]" aria-hidden="true">/</span>
              <span>Thermography</span>
            </div>
          </motion.div>

          {/* Right Column: Industrial Motor Photography + Interactive Vibration Spectrum Telemetry Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-between gap-4"
          >
            {/* Primary Industrial Motor Frame with subtle parallax */}
            <div className="relative rounded-xl overflow-hidden border border-white/15 bg-[#0C2A4D] shadow-2xl shadow-[#041223]/60">
              <motion.div style={{ y: imageParallaxY }} className="aspect-[16/10] w-full overflow-hidden">
                <ResilientImage
                  src={HERO_MEDIA.motorImage}
                  alt={HERO_MEDIA.motorAlt}
                  loading="eager"
                  fallbackTitle="Industrial Rotating Machinery Condition Monitoring"
                  className="w-full h-full object-cover scale-[1.04]"
                />
              </motion.div>
              {/* Measured gradient scrim for legibility */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#071D36] via-[#071D36]/20 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Subtle Sensor Callout Anchor */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-4 text-xs text-slate-200">
                <span className="font-medium text-white">
                  3-Axis Vibration Diagnostics · Electric Motor &amp; Centrifugal Pump
                </span>
                <span className="font-mono tabular-nums text-[#F5B51B] whitespace-nowrap">
                  {profile.rpm} RPM
                </span>
              </div>
            </div>

            {/* Interactive Digital Vibration Spectrum & Machine Health Console */}
            <div className="rounded-xl bg-[#0B223D]/95 border border-white/15 p-4 sm:p-5 shadow-xl shadow-[#041223]/50">
              {/* Top Console Row: Title + Interactive Condition State Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 mb-4 border-b border-white/10">
                <div>
                  <p className="text-xs font-medium text-slate-300">
                    Condition Diagnostic Preview
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Illustrative simulation · Select state to inspect signature
                  </p>
                </div>

                {/* Interactive Segmented Health State Buttons */}
                <div
                  role="group"
                  aria-label="Select machine health state preview"
                  className="inline-flex items-center gap-1 p-1 bg-[#071D36] rounded-md border border-white/10"
                >
                  {(['Good', 'Warning', 'Critical'] as PreviewHealthState[]).map((stateKey) => {
                    const active = healthState === stateKey;
                    return (
                      <button
                        key={stateKey}
                        type="button"
                        onClick={() => setHealthState(stateKey)}
                        className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                          active
                            ? stateKey === 'Good'
                              ? 'bg-emerald-600 text-white'
                              : stateKey === 'Warning'
                                ? 'bg-[#F5B51B] text-[#071D36] font-semibold'
                                : 'bg-red-600 text-white'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {stateKey}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Telemetry Grid: FFT Spectrum + Health Gauge & RPM */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                {/* FFT Spectrum + Time Waveform */}
                <div className="sm:col-span-8 space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-300 font-medium">FFT Spectrum (mm/s vs Hz)</span>
                      <span className="font-mono tabular-nums text-[#F5B51B]">
                        {profile.peakLabel}
                      </span>
                    </div>
                    <div className="bg-[#071D36] rounded-md border border-white/10 p-2">
                      <svg
                        viewBox="0 0 260 92"
                        className="w-full h-[76px] overflow-visible"
                        role="img"
                        aria-label={`Illustrative FFT vibration spectrum showing peak at ${profile.peakLabel}`}
                      >
                        {/* Grid lines */}
                        <line x1="0" y1="22" x2="260" y2="22" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                        <line x1="0" y1="46" x2="260" y2="46" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                        <line x1="0" y1="70" x2="260" y2="70" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                        {/* Peak guide line */}
                        <line
                          x1={profile.peakX}
                          y1="4"
                          x2={profile.peakX}
                          y2="88"
                          stroke="#F5B51B"
                          strokeOpacity="0.45"
                          strokeDasharray="3 3"
                        />
                        {/* Spectrum trace */}
                        <path
                          d={fftPath}
                          fill="none"
                          stroke="#38BDF8"
                          strokeWidth="1.75"
                          strokeLinejoin="round"
                        />
                        {/* Highlight peak dot */}
                        <circle cx={profile.peakX} cy={88 - profile.peakAmp} r="3.2" fill="#F5B51B" />
                      </svg>
                    </div>
                  </div>

                  {/* Animated Time Waveform */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-300 font-medium">Time Waveform</span>
                      <span className="font-mono tabular-nums text-slate-300">
                        RMS {profile.rms}
                      </span>
                    </div>
                    <div className="bg-[#071D36] rounded-md border border-white/10 px-2 py-1.5">
                      <svg
                        viewBox="0 0 260 52"
                        className="w-full h-[42px]"
                        role="img"
                        aria-label="Illustrative vibration time waveform"
                      >
                        <line x1="0" y1="26" x2="260" y2="26" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
                        <path
                          d={waveformPath}
                          fill="none"
                          stroke={profile.colorHex}
                          strokeWidth="1.65"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Machine Health Gauge + RPM Indicator */}
                <div className="sm:col-span-4 flex sm:flex-col justify-between gap-3 h-full">
                  {/* Machine Health Ring */}
                  <div className="flex-1 bg-[#071D36] rounded-md border border-white/10 p-3 flex flex-col items-center justify-center text-center">
                    <span className="text-[11px] text-slate-400 mb-1.5">Machine Health</span>
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <svg className="w-16 h-16 -rotate-90" viewBox="0 0 60 60" aria-hidden="true">
                        <circle
                          cx="30"
                          cy="30"
                          r={gaugeRadius}
                          fill="none"
                          stroke="rgba(255,255,255,0.12)"
                          strokeWidth="5"
                        />
                        <circle
                          cx="30"
                          cy="30"
                          r={gaugeRadius}
                          fill="none"
                          stroke={profile.colorHex}
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeDasharray={gaugeCircumference}
                          strokeDashoffset={gaugeDashOffset}
                          className="transition-all duration-300"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center">
                        {healthState === 'Good' ? (
                          <ShieldCheck className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                        ) : healthState === 'Warning' ? (
                          <AlertTriangle className="w-5 h-5 text-[#F5B51B]" aria-hidden="true" />
                        ) : (
                          <ShieldAlert className="w-5 h-5 text-red-400" aria-hidden="true" />
                        )}
                      </span>
                    </div>
                    <span className={`mt-1 text-xs font-semibold ${profile.textColor}`}>
                      {profile.label} · {profile.bearingText}
                    </span>
                  </div>

                  {/* RPM Readout */}
                  <div className="flex-1 bg-[#071D36] rounded-md border border-white/10 p-3 flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
                      <Gauge className="w-3.5 h-3.5 text-[#F5B51B]" aria-hidden="true" />
                      <span>Shaft Speed</span>
                    </div>
                    <span className="font-mono font-semibold text-xl text-white tabular-nums leading-none">
                      {profile.rpm}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1">RPM</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle brochure diagonal accent bar anchored at bottom edge */}
      <div className="absolute bottom-0 left-0 w-44 h-2 tm-diagonal-accent" aria-hidden="true" />
    </section>
  );
}
