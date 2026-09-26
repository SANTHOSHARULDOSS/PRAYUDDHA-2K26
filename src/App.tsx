import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StudentTipWhatsApp from '@/components/StudentTipWhatsApp';
import About from '@/components/About';
import LocationReach from '@/components/LocationReach';
import Events from '@/components/Events';
import Prizes from '@/components/Prizes';
import Rules from '@/components/Rules';
import Schedule from '@/components/Schedule';
import Team from '@/components/Team';
import Gallery from '@/components/Gallery';
import Brochure from '@/components/Brochure';
import Contact from '@/components/Contact';
import Registration from '@/components/Registration';
import Footer from '@/components/Footer';
import OfflineIndicator from '@/components/OfflineIndicator';
import AudioPlayer from '@/components/AudioPlayer';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function App() {
  const [isAdminView, setIsAdminView] = useState(false);

  useEffect(() => {
    // Check initial route
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || path.startsWith('/admin/') || hash === '#admin') {
        setIsAdminView(true);
      } else {
        setIsAdminView(false);
      }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').catch(() => {});
    }

    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  const openAdmin = () => {
    window.history.pushState({}, '', '/admin');
    setIsAdminView(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPublicSite = () => {
    window.history.pushState({}, '', '/');
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isAdminView) {
    return <AdminDashboard onGoHome={openPublicSite} />;
  }

  return (
    <div className="min-h-screen">
      <Navbar onOpenAdmin={openAdmin} />
      <main>
        <Hero />
        <StudentTipWhatsApp />
        <About />
        <LocationReach />
        <Events />
        <Prizes />
        <Rules />
        <Schedule />
        <Team />
        <Gallery />
        <Brochure />
        <Contact />
        <Registration />
      </main>
      <Footer onOpenAdmin={openAdmin} />
      <AudioPlayer />
      <OfflineIndicator />
    </div>
  );
}
