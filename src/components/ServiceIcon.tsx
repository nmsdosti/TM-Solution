import {
  Activity,
  Crosshair,
  Droplets,
  Fan,
  Thermometer,
  Wrench,
  ShieldCheck,
  Users,
  Cpu,
  SearchCheck,
  ClipboardCheck,
  Handshake,
} from 'lucide-react';

interface ServiceIconProps {
  serviceId: string;
  className?: string;
}

export function ServiceIcon({ serviceId, className = 'w-6 h-6' }: ServiceIconProps) {
  switch (serviceId) {
    case 'vibration-analysis':
      return <Activity className={className} aria-hidden="true" />;
    case 'laser-shaft-alignment':
      return <Crosshair className={className} aria-hidden="true" />;
    case 'oil-analysis':
      return <Droplets className={className} aria-hidden="true" />;
    case 'fan-blower-balancing':
      return <Fan className={className} aria-hidden="true" />;
    case 'thermography':
      return <Thermometer className={className} aria-hidden="true" />;
    case 'troubleshooting':
      return <Wrench className={className} aria-hidden="true" />;
    default:
      return <Activity className={className} aria-hidden="true" />;
  }
}

export function ReasonIcon({ reasonId, className = 'w-6 h-6' }: { reasonId: string; className?: string }) {
  switch (reasonId) {
    case 'reliable-solutions':
      return <ShieldCheck className={className} aria-hidden="true" />;
    case 'experienced-team':
      return <Users className={className} aria-hidden="true" />;
    case 'modern-technology':
      return <Cpu className={className} aria-hidden="true" />;
    case 'root-cause':
      return <SearchCheck className={className} aria-hidden="true" />;
    case 'actionable-recommendations':
      return <ClipboardCheck className={className} aria-hidden="true" />;
    case 'long-term-partnership':
      return <Handshake className={className} aria-hidden="true" />;
    default:
      return <ShieldCheck className={className} aria-hidden="true" />;
  }
}
