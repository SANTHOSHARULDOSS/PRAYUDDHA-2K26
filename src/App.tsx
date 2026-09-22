import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Events from '@/components/Events';
import Prizes from '@/components/Prizes';
import Rules from '@/components/Rules';
import Schedule from '@/components/Schedule';
import Team from '@/components/Team';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Registration from '@/components/Registration';
import Footer from '@/components/Footer';
import OfflineIndicator from '@/components/OfflineIndicator';

export default function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').catch(() => {});
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Events />
        <Prizes />
        <Rules />
        <Schedule />
        <Team />
        <Gallery />
        <Contact />
        <Registration />
      </main>
      <Footer />
      <OfflineIndicator />
    </div>
  );
}
