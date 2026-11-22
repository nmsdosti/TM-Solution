import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  isStaticText?: string;
  durationMs?: number;
}

export function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  isStaticText,
  durationMs = 1300,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isStaticText) return;
    if (!isInView) return;
    if (shouldReduceMotion) {
      setDisplayValue(target);
      return;
    }

    let rafId = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target, durationMs, isStaticText, shouldReduceMotion]);

  if (isStaticText) {
    return (
      <span ref={ref} className="tabular-nums">
        {isStaticText}
      </span>
    );
  }

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {isInView ? displayValue : 0}
      {suffix}
    </span>
  );
}
