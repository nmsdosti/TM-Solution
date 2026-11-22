import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT_INFO, CORE_SERVICES } from '../data/siteData';
import { NavKey } from './Navbar';

interface FooterProps {
  onNavigate: (target: NavKey) => void;
  onSelectService: (serviceId: string) => void;
}

export function Footer({ onNavigate, onSelectService }: FooterProps) {
  return (
    <footer className="bg-[#041223] text-slate-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              aria-label="TM Industrial Solution Home"
              className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B51B] rounded"
            >
              <img
                src={CONTACT_INFO.logoSrc}
                alt="TM Industrial Solution"
                className="h-10 w-auto object-contain"
              />
            </button>

            <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#F5B51B]">
              {CONTACT_INFO.tagline}
            </p>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Industrial condition monitoring, predictive maintenance diagnostics, and
              precision reliability engineering services helping plants reduce unexpected
              downtime and extend critical machinery life.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs tracking-[0.16em] uppercase text-slate-400">
              <span>Monitor</span>
              <span className="text-[#F5B51B]" aria-hidden="true">/</span>
              <span>Analyze</span>
              <span className="text-[#F5B51B]" aria-hidden="true">/</span>
              <span>Optimize</span>
              <span className="text-[#F5B51B]" aria-hidden="true">/</span>
              <span>Together</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-2">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              {(
                [
                  { key: 'home', label: 'Home' },
                  { key: 'about', label: 'About Us' },
                  { key: 'services', label: 'Services' },
                  { key: 'industries', label: 'Industries' },
                  { key: 'contact', label: 'Contact' },
                ] as { key: NavKey; label: string }[]
              ).map((item) => (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.key)}
                    className="text-slate-400 hover:text-[#F5B51B] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services Column */}
          <div className="lg:col-span-3">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-4">
              Core Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {CORE_SERVICES.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onSelectService(service.id)}
                    className="text-slate-400 hover:text-[#F5B51B] transition-colors text-left cursor-pointer"
                  >
                    {service.number}. {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-4">
              Direct Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="text-white font-medium">{CONTACT_INFO.contactPerson}</li>
              <li>
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="inline-flex items-center gap-2.5 text-slate-300 hover:text-[#F5B51B] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#F5B51B] shrink-0" aria-hidden="true" />
                  <span className="tabular-nums">{CONTACT_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_INFO.emailHref}
                  className="inline-flex items-center gap-2.5 text-slate-300 hover:text-[#F5B51B] transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#F5B51B] shrink-0" aria-hidden="true" />
                  <span>{CONTACT_INFO.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_INFO.websiteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-slate-300 hover:text-[#F5B51B] transition-colors"
                >
                  <Globe className="w-4 h-4 text-[#F5B51B] shrink-0" aria-hidden="true" />
                  <span>{CONTACT_INFO.websiteDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_INFO.mapsShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2.5 text-slate-400 hover:text-[#F5B51B] transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#F5B51B] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{CONTACT_INFO.region}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} TM Industrial Solution. All rights reserved.
          </p>
          <p className="tracking-[0.14em] uppercase text-slate-400">
            Precision / Insights / Reliability
          </p>
        </div>
      </div>
    </footer>
  );
}
