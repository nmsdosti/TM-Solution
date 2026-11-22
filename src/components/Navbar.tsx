import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { CONTACT_INFO, PageRoute } from '../data/siteData';

export type NavKey = PageRoute | 'industries';

interface NavbarProps {
  activeNav: NavKey;
  onNavigate: (target: NavKey) => void;
}

const NAV_ITEMS: { key: NavKey; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'about', label: 'About Us' },
  { key: 'services', label: 'Services' },
  { key: 'industries', label: 'Industries' },
  { key: 'contact', label: 'Contact' },
];

export function Navbar({ activeNav, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 28);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelect = (key: NavKey) => {
    setMobileOpen(false);
    onNavigate(key);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#071D36]/96 backdrop-blur-md border-b border-white/10 py-2.5 shadow-lg shadow-[#041223]/25'
          : 'bg-[#071D36]/90 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Single clean brand wordmark / uploaded logo */}
        <button
          type="button"
          onClick={() => handleSelect('home')}
          aria-label="TM Industrial Solution Home"
          className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B51B] rounded"
        >
          <img
            src={CONTACT_INFO.logoSrc}
            alt="TM Industrial Solution"
            className={`w-auto object-contain transition-all duration-200 ${
              scrolled ? 'h-8 sm:h-9' : 'h-9 sm:h-11'
            }`}
          />
        </button>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleSelect(item.key)}
                className={`relative py-2 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B51B] rounded-sm ${
                  isActive ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-underline"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#F5B51B]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single prominent primary action + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelect('contact')}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs sm:text-sm font-display font-bold tracking-wider uppercase bg-[#F5B51B] text-[#071D36] rounded-md hover:bg-[#E0A20F] active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#071D36]"
          >
            Get in Touch
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5B51B]"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Mobile navigation"
            className="lg:hidden bg-[#071D36] border-t border-white/10 px-4 pt-3 pb-6 shadow-2xl"
          >
            <div className="flex flex-col space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeNav === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleSelect(item.key)}
                    className={`w-full text-left px-3 py-3 text-base font-medium rounded-md transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-white/10 text-[#F5B51B] font-semibold'
                        : 'text-slate-200 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-5 rounded-sm bg-[#F5B51B]" aria-hidden="true" />
                    )}
                  </button>
                );
              })}

              <div className="pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => handleSelect('contact')}
                  className="w-full py-3 px-4 text-sm font-display font-bold tracking-wider uppercase bg-[#F5B51B] text-[#071D36] rounded-md hover:bg-[#E0A20F] transition-colors"
                >
                  Get in Touch
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
