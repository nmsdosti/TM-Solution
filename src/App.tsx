import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { PageRoute } from './data/siteData';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { Navbar, NavKey } from './components/Navbar';
import { ServicesPage } from './components/ServicesPage';

const PAGE_TITLES: Record<PageRoute, string> = {
  home: 'TM Industrial Solution — Advanced Condition Monitoring & Reliability Services',
  about: 'About Us — TM Industrial Solution | Industrial Reliability Engineering',
  services: 'Services — TM Industrial Solution | Vibration, Alignment, Oil & Balancing',
  contact: 'Contact Us — TM Industrial Solution | Talk to Our Reliability Experts',
};

export default function App() {
  const [page, setPage] = useState<PageRoute>('home');
  const [activeNav, setActiveNav] = useState<NavKey>('home');
  const [focusServiceId, setFocusServiceId] = useState<string | null>(null);
  const [prefillService, setPrefillService] = useState<string | null>(null);
  const [pendingIndustriesScroll, setPendingIndustriesScroll] = useState(false);

  // Update SEO document title on route change
  useEffect(() => {
    document.title = PAGE_TITLES[page];
  }, [page]);

  // Smoothly scroll to #industries when arriving from another page
  useEffect(() => {
    if (page === 'home' && pendingIndustriesScroll) {
      const timer = window.setTimeout(() => {
        const el = document.getElementById('industries');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setPendingIndustriesScroll(false);
      }, 120);
      return () => window.clearTimeout(timer);
    }
  }, [page, pendingIndustriesScroll]);

  // Highlight 'Industries' nav link when scrolling through the Industries section on Home
  useEffect(() => {
    if (page !== 'home') return;
    const target = document.getElementById('industries');
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveNav('industries');
          } else {
            setActiveNav('home');
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [page]);

  const handleNavigate = useCallback(
    (target: NavKey) => {
      if (target === 'industries') {
        setActiveNav('industries');
        if (page === 'home') {
          const el = document.getElementById('industries');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else {
          setPage('home');
          setPendingIndustriesScroll(true);
        }
        return;
      }

      setFocusServiceId(null);
      setPage(target);
      setActiveNav(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [page]
  );

  const handleNavigateServices = useCallback((serviceId?: string) => {
    setFocusServiceId(serviceId || null);
    setPage('services');
    setActiveNav('services');
    if (!serviceId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleNavigateContact = useCallback((serviceTitle?: string) => {
    setPrefillService(serviceTitle || null);
    setPage('contact');
    setActiveNav('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-white text-[#071D36]">
        <Navbar activeNav={activeNav} onNavigate={handleNavigate} />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {page === 'home' && (
                <HomePage
                  onNavigateAbout={() => handleNavigate('about')}
                  onNavigateServices={handleNavigateServices}
                  onNavigateContact={handleNavigateContact}
                />
              )}

              {page === 'about' && (
                <AboutPage
                  onNavigateServices={handleNavigateServices}
                  onNavigateContact={() => handleNavigateContact()}
                />
              )}

              {page === 'services' && (
                <ServicesPage
                  focusServiceId={focusServiceId}
                  onRequestService={(title) => handleNavigateContact(title)}
                />
              )}

              {page === 'contact' && <ContactPage prefillService={prefillService} />}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer
          onNavigate={handleNavigate}
          onSelectService={(serviceId) => handleNavigateServices(serviceId)}
        />
      </div>
    </MotionConfig>
  );
}
