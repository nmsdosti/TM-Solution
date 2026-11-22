import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Activity,
  AlertTriangle,
  Gauge,
  Info,
  Pause,
  Play,
  ShieldAlert,
  ShieldCheck,
  Thermometer,
} from 'lucide-react';
import {
  EquipmentAlert,
  ILLUSTRATIVE_ALERTS,
  MONITORING_ASSETS,
} from '../data/siteData';

export function ConditionMonitoringSection() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedAssetId, setSelectedAssetId] = useState(MONITORING_ASSETS[0].id);
  const [isPlaying, setIsPlaying] = useState(!shouldReduceMotion);
  const [waveTick, setWaveTick] = useState(0);
  const [alertFilter, setAlertFilter] = useState<'All' | EquipmentAlert['severity']>('All');

  const activeAsset = useMemo(
    () => MONITORING_ASSETS.find((a) => a.id === selectedAssetId) ?? MONITORING_ASSETS[0],
    [selectedAssetId]
  );

  // Subtle waveform phase stepping when enabled
  useEffect(() => {
    if (!isPlaying || shouldReduceMotion) return;
    const id = window.setInterval(() => {
      setWaveTick((prev) => (prev + 1) % 360);
    }, 180);
    return () => window.clearInterval(id);
  }, [isPlaying, shouldReduceMotion]);

  // Build real-time shifting vibration waveform dataset for Recharts
  const waveformData = useMemo(() => {
    const phaseShift = waveTick * 0.28;
    const points: { t: string; amplitude: number }[] = [];
    for (let i = 0; i <= 48; i++) {
      const sec = (i * 0.1).toFixed(1);
      const rad = i * 0.42 + phaseShift;
      let val = 0;
      for (const h of activeAsset.waveformHarmonics) {
        val += Math.sin(rad * h.freq) * h.amp;
      }
      points.push({
        t: `${sec}s`,
        amplitude: Number(val.toFixed(2)),
      });
    }
    return points;
  }, [activeAsset, waveTick]);

  const filteredAlerts = useMemo(() => {
    if (alertFilter === 'All') return ILLUSTRATIVE_ALERTS;
    return ILLUSTRATIVE_ALERTS.filter((item) => item.severity === alertFilter);
  }, [alertFilter]);

  const statusTone =
    activeAsset.status === 'Good'
      ? { text: 'text-emerald-400', label: 'Good · ISO Zone A', icon: ShieldCheck }
      : activeAsset.status === 'Warning'
        ? { text: 'text-[#F5B51B]', label: 'Warning · Action Planned', icon: AlertTriangle }
        : { text: 'text-red-400', label: 'Alert · Immediate Attention', icon: ShieldAlert };

  const StatusIcon = statusTone.icon;

  return (
    <section
      id="digital-monitoring"
      className="relative bg-[#071D36] text-white py-20 lg:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 bg-engineering-grid opacity-55 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"
        >
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-medium tracking-[0.16em] uppercase text-[#F5B51B] mb-3">
              Digital Condition Monitoring
            </p>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.08] text-white">
              DATA-DRIVEN CONDITION{' '}
              <span className="text-[#F5B51B]">MONITORING.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Real-time insights. Better decisions. Higher equipment availability.
            </p>
          </div>

          {/* Transparent Illustrative Disclosure */}
          <div className="flex items-start gap-2.5 text-xs text-slate-300 bg-[#0B223D] border border-white/10 rounded-lg px-4 py-3 max-w-sm">
            <Info className="w-4 h-4 text-[#F5B51B] shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              Interactive illustrative demonstration dashboard showcasing TM Industrial
              Solution&apos;s diagnostic analytics and reporting workflows.
            </span>
          </div>
        </motion.div>

        {/* Main Interactive Dashboard Frame (Single-Elevation Dark Console) */}
        <div className="rounded-xl bg-[#0B223D] border border-white/12 overflow-hidden shadow-2xl shadow-[#041223]/60">
          {/* Asset Switcher & Controls Toolbar */}
          <div className="px-4 sm:px-6 py-4 bg-[#091C33] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div
              role="tablist"
              aria-label="Select demonstration machine"
              className="flex flex-wrap items-center gap-1.5"
            >
              {MONITORING_ASSETS.map((asset) => {
                const isSelected = asset.id === activeAsset.id;
                return (
                  <button
                    key={asset.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedAssetId(asset.id)}
                    className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'bg-[#F5B51B] text-[#071D36] font-semibold'
                        : 'bg-[#071D36] text-slate-300 border border-white/10 hover:text-white hover:border-white/25'
                    }`}
                  >
                    {asset.name.split(' · ')[0]}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-4 text-xs">
              <span className="hidden md:inline text-slate-300">
                {activeAsset.name} · {activeAsset.location}
              </span>
              <button
                type="button"
                onClick={() => setIsPlaying((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#071D36] border border-white/15 text-slate-200 hover:border-[#F5B51B]/60 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#F5B51B]" aria-hidden="true" />
                    <span>Pause Waveform</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-[#F5B51B]" aria-hidden="true" />
                    <span>Animate Waveform</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 4-Column KPI Telemetry Strip (Tabular Numerals, Hairline Dividers) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/10 border-b border-white/10 bg-[#0A1F38]">
            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span>Machine Health Status</span>
                <StatusIcon className={`w-4 h-4 ${statusTone.text}`} aria-hidden="true" />
              </div>
              <p className={`font-display font-bold text-lg sm:text-xl ${statusTone.text}`}>
                {statusTone.label}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Bearing: <span className="text-slate-200">{activeAsset.bearingCondition}</span>
              </p>
            </div>

            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span>Overall Vibration</span>
                <Activity className="w-4 h-4 text-[#F5B51B]" aria-hidden="true" />
              </div>
              <p className="font-mono font-semibold text-xl sm:text-2xl text-white tabular-nums">
                {activeAsset.overallVibration.toFixed(2)}{' '}
                <span className="text-xs font-normal text-slate-400">mm/s RMS</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">ISO 20816 velocity band</p>
            </div>

            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span>Rotational Speed</span>
                <Gauge className="w-4 h-4 text-[#F5B51B]" aria-hidden="true" />
              </div>
              <p className="font-mono font-semibold text-xl sm:text-2xl text-white tabular-nums">
                {activeAsset.rpm}{' '}
                <span className="text-xs font-normal text-slate-400">RPM</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">{activeAsset.type}</p>
            </div>

            <div className="p-4 sm:p-5">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span>Bearing Housing Temp</span>
                <Thermometer className="w-4 h-4 text-[#F5B51B]" aria-hidden="true" />
              </div>
              <p className="font-mono font-semibold text-xl sm:text-2xl text-white tabular-nums">
                {activeAsset.bearingTempC}
                <span className="text-xs font-normal text-slate-400"> °C</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Dominant: <span className="font-mono text-slate-200">{activeAsset.dominantPeakHz} Hz</span>
              </p>
            </div>
          </div>

          {/* Primary Diagnostic Charts Row: FFT Spectrum + Time Waveform */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10 border-b border-white/10">
            {/* FFT Spectrum Chart */}
            <div className="lg:col-span-7 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white">
                    FFT Frequency Spectrum
                  </h3>
                  <p className="text-xs text-slate-400">
                    Amplitude (mm/s) across 0 – 1000 Hz frequency band
                  </p>
                </div>
                <span className="font-mono text-xs text-[#F5B51B] tabular-nums">
                  Peak: {activeAsset.dominantPeakLabel}
                </span>
              </div>

              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={activeAsset.fftData}
                    margin={{ top: 10, right: 12, left: -16, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="fftFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.42} />
                        <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,0.07)" strokeDasharray="3 3" />
                    <XAxis
                      dataKey="freq"
                      stroke="#94A3B8"
                      fontSize={11}
                      tickFormatter={(v) => `${v}Hz`}
                    />
                    <YAxis stroke="#94A3B8" fontSize={11} domain={[0, 12]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#071D36',
                        borderColor: 'rgba(255,255,255,0.18)',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: '#fff',
                      }}
                      labelFormatter={(label) => `Frequency: ${label} Hz`}
                      formatter={(val) => [
                        `${Number(val ?? 0).toFixed(2)} mm/s`,
                        'Amplitude',
                      ]}
                    />
                    <ReferenceLine
                      x={Math.round(activeAsset.dominantPeakHz / 12.5) * 12.5}
                      stroke="#F5B51B"
                      strokeDasharray="4 4"
                    />
                    <Area
                      type="monotone"
                      dataKey="amplitude"
                      stroke="#38BDF8"
                      strokeWidth={2}
                      fill="url(#fftFill)"
                      isAnimationActive={!shouldReduceMotion}
                      animationDuration={450}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="font-semibold text-white">Diagnostic Interpretation: </span>
                {activeAsset.faultSummary}
              </p>
            </div>

            {/* Time Waveform Chart */}
            <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-white">
                      Vibration Time Waveform
                    </h3>
                    <p className="text-xs text-slate-400">
                      Instantaneous signal amplitude over time window (mm/s)
                    </p>
                  </div>
                  <span className="font-mono text-xs text-slate-300 tabular-nums">
                    {isPlaying ? 'Animating' : 'Paused'}
                  </span>
                </div>

                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={waveformData}
                      margin={{ top: 10, right: 10, left: -18, bottom: 0 }}
                    >
                      <CartesianGrid stroke="rgba(255,255,255,0.07)" strokeDasharray="3 3" />
                      <XAxis dataKey="t" stroke="#94A3B8" fontSize={11} interval={11} />
                      <YAxis stroke="#94A3B8" fontSize={11} domain={[-12, 12]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#071D36',
                          borderColor: 'rgba(255,255,255,0.18)',
                          borderRadius: '8px',
                          fontSize: '12px',
                          color: '#fff',
                        }}
                        formatter={(val) => [
                          `${Number(val ?? 0).toFixed(2)} mm/s`,
                          'Amplitude',
                        ]}
                      />
                      <ReferenceLine y={0} stroke="rgba(255,255,255,0.2)" />
                      <Line
                        type="monotone"
                        dataKey="amplitude"
                        stroke={
                          activeAsset.status === 'Alert'
                            ? '#F87171'
                            : activeAsset.status === 'Warning'
                              ? '#F5B51B'
                              : '#34D399'
                        }
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Sampling Window: 4.8 sec</span>
                <span className="font-mono tabular-nums text-slate-200">
                  Triaxial Velocity Channel
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Analytics Row: Historical 28-Day Multi-Axis Trend + Equipment Alerts Log */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {/* 28-Day Historical Trend */}
            <div className="lg:col-span-6 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white">
                    Historical Multi-Axis Trend (28 Days)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Overall RMS alongside Horizontal (X), Vertical (Y) &amp; Axial (Z)
                  </p>
                </div>

                {/* Clean inline legend */}
                <div className="flex items-center gap-3 text-[11px] text-slate-300">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-0.5 bg-[#38BDF8] inline-block" aria-hidden="true" />
                    Overall
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-0.5 bg-[#F5B51B] inline-block" aria-hidden="true" />
                    X
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-0.5 bg-[#34D399] inline-block" aria-hidden="true" />
                    Y
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-0.5 bg-[#A78BFA] inline-block" aria-hidden="true" />
                    Z
                  </span>
                </div>
              </div>

              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={activeAsset.trendData}
                    margin={{ top: 8, right: 12, left: -18, bottom: 0 }}
                  >
                    <CartesianGrid stroke="rgba(255,255,255,0.07)" strokeDasharray="3 3" />
                    <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} />
                    <YAxis stroke="#94A3B8" fontSize={11} domain={[0, 10]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#071D36',
                        borderColor: 'rgba(255,255,255,0.18)',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: '#fff',
                      }}
                      formatter={(val, name) => [
                        `${Number(val ?? 0).toFixed(2)} mm/s`,
                        String(name ?? '').toUpperCase(),
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="overall"
                      stroke="#38BDF8"
                      strokeWidth={2.2}
                      dot={{ r: 3 }}
                    />
                    <Line type="monotone" dataKey="x" stroke="#F5B51B" strokeWidth={1.6} dot={false} />
                    <Line type="monotone" dataKey="y" stroke="#34D399" strokeWidth={1.6} dot={false} />
                    <Line type="monotone" dataKey="z" stroke="#A78BFA" strokeWidth={1.6} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Equipment Alerts & Condition Data Table */}
            <div className="lg:col-span-6 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white">
                    Equipment Alerts &amp; Condition Log
                  </h3>
                  <p className="text-xs text-slate-400">
                    Click an asset row to inspect its spectrum above
                  </p>
                </div>

                {/* Filter buttons */}
                <div
                  role="group"
                  aria-label="Filter equipment alerts by severity"
                  className="inline-flex items-center gap-1 p-1 bg-[#071D36] rounded-md border border-white/10"
                >
                  {(['All', 'Alert', 'Warning', 'Nominal'] as const).map((sev) => (
                    <button
                      key={sev}
                      type="button"
                      onClick={() => setAlertFilter(sev)}
                      className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer whitespace-nowrap ${
                        alertFilter === sev
                          ? 'bg-white/15 text-white font-semibold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400 text-xs">
                      <th className="py-2.5 pr-3 font-medium">Asset</th>
                      <th className="py-2.5 pr-3 font-medium">Diagnostic Finding</th>
                      <th className="py-2.5 pr-3 font-medium text-right">Reading</th>
                      <th className="py-2.5 font-medium text-right">State</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/8">
                    {filteredAlerts.map((alert) => {
                      const matchingId = alert.asset.toLowerCase();
                      const isRowActive = activeAsset.id === matchingId;
                      return (
                        <tr
                          key={alert.id}
                          onClick={() => setSelectedAssetId(matchingId)}
                          className={`cursor-pointer transition-colors ${
                            isRowActive ? 'bg-white/8' : 'hover:bg-white/5'
                          }`}
                        >
                          <td className="py-3 pr-3 font-semibold text-white whitespace-nowrap">
                            {alert.asset}
                          </td>
                          <td className="py-3 pr-3 text-slate-300">
                            <div>{alert.issue}</div>
                            <div className="text-[11px] text-slate-400">{alert.action}</div>
                          </td>
                          <td className="py-3 pr-3 text-right font-mono tabular-nums text-slate-200 whitespace-nowrap">
                            {alert.metric}
                          </td>
                          <td
                            className={`py-3 text-right font-semibold whitespace-nowrap ${
                              alert.severity === 'Alert'
                                ? 'text-red-400'
                                : alert.severity === 'Warning'
                                  ? 'text-[#F5B51B]'
                                  : 'text-emerald-400'
                            }`}
                          >
                            {alert.severity}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
