export type PageRoute = 'home' | 'about' | 'services' | 'contact';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  detailedExplanation: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  applications: string[];
  benefits: string[];
  technicalCapabilities: string[];
}

export interface ReasonItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface IndustryItem {
  id: string;
  title: string;
  description: string;
  criticalAssets: string;
  image: string;
  imageAlt: string;
}

export interface BrochureStat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  detail: string;
  isStaticText?: string;
}

export interface MonitoringAssetProfile {
  id: string;
  name: string;
  type: string;
  location: string;
  rpm: number;
  overallVibration: number; // mm/s RMS
  bearingTempC: number;
  status: 'Good' | 'Warning' | 'Alert';
  bearingCondition: 'Good' | 'Monitor' | 'Wear Detected';
  dominantPeakHz: number;
  dominantPeakLabel: string;
  faultSummary: string;
  fftData: { freq: number; amplitude: number }[];
  trendData: { day: string; overall: number; x: number; y: number; z: number }[];
  waveformHarmonics: { freq: number; amp: number }[];
}

export interface EquipmentAlert {
  id: string;
  asset: string;
  issue: string;
  severity: 'Alert' | 'Warning' | 'Nominal';
  metric: string;
  time: string;
  action: string;
}

export const CONTACT_INFO = {
  companyName: 'TM INDUSTRIAL SOLUTION',
  tagline: 'THE INTELLIGENCE BEHIND RELIABLE MACHINES',
  contactPerson: 'Rinkesh Patel',
  phoneDisplay: '+91 9106616179',
  phoneHref: 'tel:+919106616179',
  whatsappNumber: '919106616179',
  email: 'services@tmsolution.in',
  emailHref: 'mailto:services@tmsolution.in',
  websiteDisplay: 'tmsolution.in',
  websiteHref: 'https://tmsolution.in',
  mapsShareUrl: 'https://maps.app.goo.gl/BRP7ow1BRbouxfSN9',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=21.1779748,72.8404935+(TM+Industrial+Solution)&z=16&output=embed',
  region: 'Surat, Gujarat — Serving Industrial Plants Across India',
  logoSrc: '/assets/aistudio/TM_Industrial_Solutions_Logo_efbca0fe.png',
};

export const HERO_MEDIA = {
  motorImage: '/src/assets/images/hero_industrial_motor_1795326766194.jpg',
  motorAlt:
    'Heavy-duty industrial electric motor coupled to a centrifugal pump with mounted vibration monitoring sensor',
};

export const BROCHURE_STATS: BrochureStat[] = [
  {
    value: 10,
    suffix: 'K+',
    label: 'Equipment Analysed',
    detail: 'Rotating and electrical industrial assets evaluated',
  },
  {
    value: 100,
    suffix: '+',
    label: 'Sites Supported',
    detail: 'Manufacturing and process plants served across India',
  },
  {
    value: 99,
    suffix: '%',
    label: 'Uptime Improvement',
    detail: 'Sustained availability on critical monitored machinery',
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Monitoring Support',
    detail: 'Responsive diagnostic guidance for continuous operations',
    isStaticText: '24/7',
  },
];

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: 'vibration-analysis',
    number: '01',
    title: 'Vibration Analysis',
    shortDescription:
      'Detects imbalance, misalignment, bearing wear and other faults through advanced vibration analysis and FFT spectrum evaluation.',
    detailedExplanation:
      'Every rotating machine produces a distinct vibration signature. Our vibration specialists capture triaxial velocity, acceleration, and envelope data across bearings and housings to isolate mechanical looseness, rotor unbalance, shaft misalignment, gear mesh defects, and early-stage rolling-element bearing degradation well before catastrophic failure.',
    image: '/src/assets/images/service_vibration_analysis_1795326765648.jpg',
    imageAlt:
      'Reliability engineer mounting a triaxial vibration sensor on an electric motor bearing housing with diagnostic spectrum analyzer',
    highlights: [
      'FFT Spectrum Analysis',
      'Time Waveform Analysis',
      'Trend Analysis',
      'Machine Condition Assessment',
    ],
    applications: [
      'Electric motors, centrifugal & positive-displacement pumps',
      'Industrial gearboxes, compressors, and steam turbines',
      'Cooling tower drives, agitators, and process centrifuges',
      'High-speed spindles, crushers, and rotary kiln drives',
    ],
    benefits: [
      'Early fault detection weeks or months before breakdown',
      'Elimination of unplanned production stoppages and secondary damage',
      'ISO 10816 / ISO 20816 severity grading for maintenance prioritization',
      'Extended bearing, seal, and coupling service intervals',
    ],
    technicalCapabilities: [
      'High-resolution Fast Fourier Transform (FFT) spectral evaluation',
      'Time waveform impact & modulation diagnostics',
      'Historical multi-axis trend tracking (X, Y, Z & overall RMS)',
      'Comprehensive machine condition assessment reports with severity ratings',
    ],
  },
  {
    id: 'laser-shaft-alignment',
    number: '02',
    title: 'Laser Shaft Alignment',
    shortDescription:
      'Improves machine efficiency, reduces wear and extends equipment life using precision laser alignment technology.',
    detailedExplanation:
      'Shaft misalignment is a primary driver of premature bearing fatigue, mechanical seal leaks, coupling damage, and elevated power draw. Using high-precision optical laser measurement systems, we align horizontal and vertical coupled machinery to tight sub-millimeter tolerances while compensating for real operating thermal growth.',
    image: '/src/assets/images/service_laser_alignment_1795326763026.jpg',
    imageAlt:
      'Precision laser shaft alignment heads mounted across an industrial motor-to-pump coupling',
    highlights: [
      'Soft Foot Correction',
      'Thermal Growth Compensation',
      'Precision Horizontal & Vertical Alignment',
      'Live Move',
    ],
    applications: [
      'Motor-to-pump, motor-to-fan, and motor-to-compressor trains',
      'Multi-coupling gearbox and turbine drive assemblies',
      'Vertical flange-mounted pumps and mixer drives',
      'Post-overhaul commissioning and baseplate re-installation',
    ],
    benefits: [
      'Significant reduction in radial and axial bearing loads',
      'Lower electrical energy consumption and operating temperatures',
      'Longer mechanical seal and flexible coupling lifespan',
      'Documented before-and-after alignment tolerance verification reports',
    ],
    technicalCapabilities: [
      'Soft foot detection, shimming, and baseplate stress correction',
      'Calculated thermal growth offset compensation for hot-running assets',
      'Precision horizontal and vertical angular & parallel shaft alignment',
      'Real-time Live Move monitoring during machine positioning',
    ],
  },
  {
    id: 'oil-analysis',
    number: '03',
    title: 'Oil Analysis',
    shortDescription:
      'Monitors lubricant condition to detect contamination, wear metals and degradation before they cause failure.',
    detailedExplanation:
      'Industrial lubricants carry vital forensic evidence from inside gearboxes, hydraulic units, and bearing sumps. Our structured oil analysis service evaluates lubricant health, particulate and moisture contamination, and microscopic wear metals so maintenance teams can intervene early and optimize oil change intervals based on actual condition.',
    image: '/src/assets/images/service_oil_analysis_1795326764444.jpg',
    imageAlt:
      'Industrial lubrication specialist inspecting a clear amber lubricant sample in a diagnostic laboratory',
    highlights: ['Contamination Analysis', 'Wear Metals', 'Viscosity'],
    applications: [
      'Heavy-duty industrial gearboxes and reducer sumps',
      'Hydraulic power packs, presses, and injection molding machines',
      'Turbine, compressor, and circulating bearing lubrication systems',
      'Transformer and critical continuous-process oil reservoirs',
    ],
    benefits: [
      'Detects abrasive wear and water ingress before component scoring',
      'Prevents premature oil degradation and additive depletion',
      'Extends lubricant drain intervals safely through condition-based monitoring',
      'Pinpoints specific component metallurgy experiencing abnormal wear',
    ],
    technicalCapabilities: [
      'Particle count and moisture contamination screening',
      'Elemental wear metal profiling (iron, copper, chromium, lead, aluminum)',
      'Kinematic viscosity verification against OEM operating specifications',
      'Lubricant oxidation, degradation, and corrective filtration guidance',
    ],
  },
  {
    id: 'fan-blower-balancing',
    number: '04',
    title: 'Fan & Blower Balancing',
    shortDescription:
      'Eliminates vibration, improves efficiency and ensures smooth, reliable operation of rotating air-handling equipment.',
    detailedExplanation:
      'Process dust buildup, blade erosion, and thermal distortion quickly create rotor unbalance in industrial fans and blowers. We perform precision in-situ dynamic balancing directly on-site at operating speed—eliminating the downtime, crane work, and disassembly costs of removing heavy impellers to an off-site workshop.',
    image: '/src/assets/images/service_fan_balancing_1795326764542.jpg',
    imageAlt:
      'Large industrial centrifugal blower impeller assembly with dynamic balancing diagnostic instrumentation',
    highlights: [
      'Single Plane Balancing',
      'Dual Plane Balancing',
      'On-site Balancing',
      'Vibration Reduction',
    ],
    applications: [
      'ID fans, FD fans, PA fans, and boiler exhaust blowers',
      'Baghouse dust collector fans and kiln exhaust impellers',
      'HVAC air-handling units and cooling tower fan assemblies',
      'Centrifugal blowers, rotary drums, and industrial pulverizers',
    ],
    benefits: [
      'Restores smooth operation to ISO 1940 / ISO 21940 balance grades',
      'Eliminates costly rotor removal and off-site transport downtime',
      'Protects pillow-block bearings, structural foundations, and ductwork',
      'Reduces aerodynamic noise and structural fatigue across housings',
    ],
    technicalCapabilities: [
      'Single-plane static and dynamic unbalance correction',
      'Dual-plane dynamic balancing for wide and overhung impellers',
      'On-site in-situ trim balancing at normal operating speed',
      'Before-and-after phase, amplitude, and vibration reduction certification',
    ],
  },
  {
    id: 'thermography',
    number: '05',
    title: 'Thermography',
    shortDescription:
      'Identifies hotspots and thermal anomalies in electrical and mechanical systems before they lead to failure.',
    detailedExplanation:
      'Abnormal heat is one of the earliest indicators of electrical resistance faults, overloaded circuits, bearing friction, and refractory or insulation breakdown. Our non-contact infrared thermography surveys inspect live plant equipment safely under normal operating load without interrupting production.',
    image: '/src/assets/images/service_thermography_1795326766519.jpg',
    imageAlt:
      'Engineer performing infrared thermal imaging inspection on an industrial electrical switchgear panel showing a busbar hotspot',
    highlights: ['Electrical Systems', 'Mechanical Equipment', 'Hotspot Detection'],
    applications: [
      'HT/LT switchgear panels, MCCs, busbars, and circuit breakers',
      'Power transformers, cable terminations, and capacitor banks',
      'Motor windings, bearing housings, couplings, and belt drives',
      'Steam traps, kiln shells, heat exchangers, and refractory linings',
    ],
    benefits: [
      'Prevents electrical arc flash, panel fires, and unexpected power trips',
      '100% non-contact inspection performed safely while equipment runs under load',
      'Visual thermal and digital photographic reports for rapid repair dispatch',
      'Identifies energy losses from poor insulation or excessive mechanical friction',
    ],
    technicalCapabilities: [
      'High-resolution radiometric infrared imaging of electrical distribution systems',
      'Mechanical friction, lubrication starvation, and heat-transfer diagnostics',
      'Quantitative Delta-T hotspot severity classification and prioritization',
      'Actionable thermographic inspection reports with paired visual reference imagery',
    ],
  },
  {
    id: 'troubleshooting',
    number: '06',
    title: 'Troubleshooting',
    shortDescription:
      'Finds root causes of complex vibration and operational issues using expert analysis and advanced tools.',
    detailedExplanation:
      'Recurring failures, structural resonance, and chronic high vibration cannot be solved by repeatedly swapping bearings or seals. Our diagnostic engineers combine multi-channel vibration testing, phase analysis, bump tests, thermal profiling, and operational correlation to uncover the true underlying mechanical or process root cause.',
    image: '/src/assets/images/service_troubleshooting_1795326764008.jpg',
    imageAlt:
      'Reliability engineer analyzing multi-channel diagnostic waveforms on a rugged laptop beside an industrial gearbox',
    highlights: [
      'Expert Analysis',
      'Root Cause Identification',
      'Actionable Solutions',
    ],
    applications: [
      'Bad-actor machines experiencing repeat bearing or seal failures',
      'Structural, piping, and baseplate natural frequency resonance issues',
      'Variable frequency drive (VFD) speed-dependent vibration anomalies',
      'Commissioning acceptance testing and chronic noise investigations',
    ],
    benefits: [
      'Stops recurring breakdown cycles rather than treating surface symptoms',
      'Provides clear, prioritized mechanical corrective action plans',
      'Saves maintenance budgets wasted on unnecessary component replacements',
      'Verifies permanent fix effectiveness through post-repair validation',
    ],
    technicalCapabilities: [
      'Cross-channel phase, coherence, and natural frequency bump testing',
      'Run-up / coast-down transient vibration and critical speed analysis',
      'Structured Root Cause Failure Analysis (RCFA) on critical rotating trains',
      'Engineering recommendations tailored to plant maintenance execution',
    ],
  },
];

export const SIX_REASONS: ReasonItem[] = [
  {
    id: 'reliable-solutions',
    number: '01',
    title: 'Reliable Solutions',
    description:
      'Accurate insights for better decisions—turning raw machine vibration, thermal, and oil signatures into clear maintenance priorities.',
  },
  {
    id: 'experienced-team',
    number: '02',
    title: 'Experienced Team',
    description:
      'Skilled professionals with hands-on industrial field expertise across rotating machinery, power trains, and process facilities.',
  },
  {
    id: 'modern-technology',
    number: '03',
    title: 'Modern Technology',
    description:
      'Advanced diagnostic analyzers, optical laser alignment systems, and infrared thermography tools for precise field evaluation.',
  },
  {
    id: 'root-cause',
    number: '04',
    title: 'Root Cause Identification',
    description:
      'We look past surface symptoms to isolate the actual mechanical, electrical, or lubrication root cause behind chronic faults.',
  },
  {
    id: 'actionable-recommendations',
    number: '05',
    title: 'Actionable Recommendations',
    description:
      'Practical, prioritized engineering solutions that plant maintenance teams can execute immediately for lasting reliability.',
  },
  {
    id: 'long-term-partnership',
    number: '06',
    title: 'Long-Term Partnership',
    description:
      'Your reliability is our priority—supporting ongoing equipment health programs from baseline audits through continuous optimization.',
  },
];

export const INDUSTRIES: IndustryItem[] = [
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    description: 'Ensure high availability and optimal performance.',
    criticalAssets: 'CNC spindles · Hydraulic packs · Compressors · Conveyors',
    image: '/src/assets/images/industry_manufacturing_1795326765072.jpg',
    imageAlt: 'Modern automated industrial manufacturing facility floor',
  },
  {
    id: 'power',
    title: 'Power',
    description: 'Maintain reliability and reduce unplanned downtime.',
    criticalAssets: 'Boiler feed pumps · ID/FD fans · Turbines · HT switchgear',
    image: '/src/assets/images/industry_power_1795326762159.jpg',
    imageAlt: 'Industrial power generation station with cooling towers and substation',
  },
  {
    id: 'cement',
    title: 'Cement',
    description: 'Maximize efficiency and extend equipment life.',
    criticalAssets: 'Kiln drives · Raw & ball mills · Heavy gearboxes · Baghouse fans',
    image: '/src/assets/images/industry_cement_1795326765839.jpg',
    imageAlt: 'Cement manufacturing plant with silos, rotary kiln, and conveyor galleries',
  },
  {
    id: 'steel',
    title: 'Steel',
    description: 'Manage critical assets for continuous production.',
    criticalAssets: 'Rolling mill drives · Overhead cranes · Blowers · Hydraulic systems',
    image: '/src/assets/images/industry_steel_1795326762050.jpg',
    imageAlt: 'Modern steel rolling mill bay with rolled steel coils and heavy cranes',
  },
  {
    id: 'chemical',
    title: 'Chemical',
    description: 'Prevent failures and ensure safe operations.',
    criticalAssets: 'Process pumps · Agitators · Centrifuges · Process compressors',
    image: '/src/assets/images/industry_chemical_1795326764143.jpg',
    imageAlt: 'Chemical processing plant with distillation columns and compressor bays',
  },
  {
    id: 'pharmaceutical',
    title: 'Pharmaceutical',
    description: 'Maintain purity, quality and uptime.',
    criticalAssets: 'Cleanroom AHUs · Chillers · Purified water pumps · Electrical panels',
    image: '/src/assets/images/industry_pharmaceutical_1795326764236.jpg',
    imageAlt: 'Clean pharmaceutical bioprocessing facility with stainless steel vessels',
  },
];

// Deterministic FFT generator for clean, realistic industrial spectra (0 - 1000 Hz)
function buildFftSpectrum(peaks: { freq: number; amp: number; width?: number }[]) {
  const points: { freq: number; amplitude: number }[] = [];
  for (let f = 0; f <= 1000; f += 12.5) {
    let val = 0.25 + Math.abs(Math.sin(f * 0.19) * 0.28) + Math.abs(Math.cos(f * 0.07) * 0.16);
    for (const p of peaks) {
      const w = p.width ?? 18;
      const dist = Math.abs(f - p.freq);
      if (dist < w * 3) {
        val += p.amp * Math.exp(-(dist * dist) / (2 * (w * 0.55) * (w * 0.55)));
      }
    }
    points.push({
      freq: Math.round(f),
      amplitude: Number(val.toFixed(2)),
    });
  }
  return points;
}

export const MONITORING_ASSETS: MonitoringAssetProfile[] = [
  {
    id: 'motor-03',
    name: 'Motor-03 · Main Process Drive',
    type: 'Induction Motor (250 kW)',
    location: 'Process Utility Line A',
    rpm: 2984,
    overallVibration: 1.82,
    bearingTempC: 54,
    status: 'Good',
    bearingCondition: 'Good',
    dominantPeakHz: 298.4,
    dominantPeakLabel: '1X Harmonic · 298.4 Hz',
    faultSummary:
      'Nominal mechanical signature. Vibration levels remain well inside ISO 20816 Zone A acceptable limits.',
    fftData: buildFftSpectrum([
      { freq: 50, amp: 1.4, width: 14 },
      { freq: 298.4, amp: 8.6, width: 16 },
      { freq: 596, amp: 1.9, width: 18 },
      { freq: 750, amp: 1.1, width: 16 },
    ]),
    trendData: [
      { day: 'Day 1', overall: 1.62, x: 1.1, y: 0.9, z: 0.65 },
      { day: 'Day 5', overall: 1.68, x: 1.15, y: 0.92, z: 0.68 },
      { day: '7d', overall: 1.71, x: 1.18, y: 0.95, z: 0.7 },
      { day: 'Day 11', overall: 1.69, x: 1.14, y: 0.93, z: 0.69 },
      { day: '14d', overall: 1.76, x: 1.21, y: 0.98, z: 0.72 },
      { day: '21d', overall: 1.8, x: 1.24, y: 1.01, z: 0.74 },
      { day: '28d', overall: 1.82, x: 1.25, y: 1.02, z: 0.75 },
    ],
    waveformHarmonics: [
      { freq: 1, amp: 3.1 },
      { freq: 2.5, amp: 0.7 },
      { freq: 5, amp: 0.35 },
    ],
  },
  {
    id: 'pump-02',
    name: 'Pump-02 · Boiler Feed Pump',
    type: 'Centrifugal Pump (160 kW)',
    location: 'Utility Pump House B',
    rpm: 1488,
    overallVibration: 5.46,
    bearingTempC: 71,
    status: 'Warning',
    bearingCondition: 'Monitor',
    dominantPeakHz: 200,
    dominantPeakLabel: '2X Misalignment · 200.0 Hz',
    faultSummary:
      'Elevated 2X shaft-speed and axial components indicate developing coupling misalignment. Laser shaft alignment recommended.',
    fftData: buildFftSpectrum([
      { freq: 100, amp: 4.1, width: 16 },
      { freq: 200, amp: 9.8, width: 18 },
      { freq: 300, amp: 4.6, width: 16 },
      { freq: 450, amp: 2.2, width: 20 },
    ]),
    trendData: [
      { day: 'Day 1', overall: 2.35, x: 1.6, y: 1.4, z: 1.1 },
      { day: 'Day 5', overall: 2.74, x: 1.85, y: 1.65, z: 1.32 },
      { day: '7d', overall: 3.15, x: 2.1, y: 1.9, z: 1.64 },
      { day: 'Day 11', overall: 3.68, x: 2.48, y: 2.15, z: 1.95 },
      { day: '14d', overall: 4.22, x: 2.84, y: 2.52, z: 2.38 },
      { day: '21d', overall: 4.88, x: 3.31, y: 2.86, z: 2.74 },
      { day: '28d', overall: 5.46, x: 3.74, y: 3.15, z: 3.12 },
    ],
    waveformHarmonics: [
      { freq: 1, amp: 4.4 },
      { freq: 2, amp: 3.6 },
      { freq: 4, amp: 1.1 },
    ],
  },
  {
    id: 'compressor-01',
    name: 'Compressor-01 · Air Compressor',
    type: 'Rotary Screw Drive (315 kW)',
    location: 'Compressed Air Station 1',
    rpm: 2970,
    overallVibration: 8.94,
    bearingTempC: 86,
    status: 'Alert',
    bearingCondition: 'Wear Detected',
    dominantPeakHz: 638,
    dominantPeakLabel: 'BPFO Bearing Defect · 638.0 Hz',
    faultSummary:
      'High-frequency outer-race bearing defect harmonics (BPFO) with rising temperature. Schedule immediate bearing replacement & oil check.',
    fftData: buildFftSpectrum([
      { freq: 150, amp: 3.2, width: 16 },
      { freq: 325, amp: 5.4, width: 20 },
      { freq: 638, amp: 11.4, width: 22 },
      { freq: 812, amp: 6.8, width: 20 },
      { freq: 925, amp: 4.1, width: 18 },
    ]),
    trendData: [
      { day: 'Day 1', overall: 3.12, x: 2.1, y: 1.85, z: 1.4 },
      { day: 'Day 5', overall: 3.85, x: 2.5, y: 2.2, z: 1.65 },
      { day: '7d', overall: 4.62, x: 3.05, y: 2.72, z: 1.98 },
      { day: 'Day 11', overall: 5.48, x: 3.7, y: 3.28, z: 2.4 },
      { day: '14d', overall: 6.54, x: 4.45, y: 3.92, z: 2.86 },
      { day: '21d', overall: 7.72, x: 5.3, y: 4.74, z: 3.45 },
      { day: '28d', overall: 8.94, x: 6.18, y: 5.52, z: 4.02 },
    ],
    waveformHarmonics: [
      { freq: 1, amp: 5.6 },
      { freq: 3.2, amp: 3.8 },
      { freq: 7.5, amp: 2.9 },
    ],
  },
  {
    id: 'fan-01',
    name: 'Fan-01 · ID Exhaust Blower',
    type: 'Centrifugal ID Fan (185 kW)',
    location: 'Kiln Exhaust Section',
    rpm: 988,
    overallVibration: 6.18,
    bearingTempC: 67,
    status: 'Warning',
    bearingCondition: 'Monitor',
    dominantPeakHz: 162.5,
    dominantPeakLabel: '1X Rotor Unbalance · 162.5 Hz',
    faultSummary:
      'Strong dominant radial 1X vibration peak indicative of material buildup on impeller blades. In-situ dual-plane balancing advised.',
    fftData: buildFftSpectrum([
      { freq: 162.5, amp: 10.6, width: 18 },
      { freq: 325, amp: 2.1, width: 16 },
      { freq: 487.5, amp: 1.4, width: 16 },
    ]),
    trendData: [
      { day: 'Day 1', overall: 2.6, x: 2.2, y: 1.2, z: 0.85 },
      { day: 'Day 5', overall: 3.1, x: 2.65, y: 1.38, z: 0.94 },
      { day: '7d', overall: 3.74, x: 3.22, y: 1.62, z: 1.05 },
      { day: 'Day 11', overall: 4.3, x: 3.76, y: 1.85, z: 1.18 },
      { day: '14d', overall: 4.92, x: 4.35, y: 2.08, z: 1.29 },
      { day: '21d', overall: 5.58, x: 4.96, y: 2.34, z: 1.44 },
      { day: '28d', overall: 6.18, x: 5.52, y: 2.61, z: 1.58 },
    ],
    waveformHarmonics: [
      { freq: 1, amp: 6.8 },
      { freq: 2, amp: 1.1 },
      { freq: 3, amp: 0.45 },
    ],
  },
];

export const ILLUSTRATIVE_ALERTS: EquipmentAlert[] = [
  {
    id: 'al-1',
    asset: 'Compressor-01',
    issue: 'High-Frequency Bearing Defect (BPFO)',
    severity: 'Alert',
    metric: '8.94 mm/s RMS',
    time: '14:20',
    action: 'Bearing replacement & oil sample check',
  },
  {
    id: 'al-2',
    asset: 'Pump-02',
    issue: '2X Axial Alignment Drift & Bearing Temp',
    severity: 'Warning',
    metric: '5.46 mm/s RMS',
    time: '12:45',
    action: 'Schedule precision laser shaft alignment',
  },
  {
    id: 'al-3',
    asset: 'Fan-01',
    issue: '1X Radial Impeller Unbalance Peak',
    severity: 'Warning',
    metric: '6.18 mm/s RMS',
    time: '11:32',
    action: 'On-site dual-plane dynamic balancing',
  },
  {
    id: 'al-4',
    asset: 'Motor-03',
    issue: 'Nominal Vibration & Thermal Profile',
    severity: 'Nominal',
    metric: '1.82 mm/s RMS',
    time: '09:15',
    action: 'Continue standard periodic monitoring',
  },
];
