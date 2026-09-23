import { useState, useEffect } from 'react';
import { Sparkles, MessageCircle, ArrowUpRight, ChevronLeft, ChevronRight, QrCode } from 'lucide-react';
import { SITE_CONFIG } from '@/data/siteConfig';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';

const studentTips = [
  'Trichy la irundhu vara ready-aa? PRAYUDDHA 2K26-ku direct-aa vandhuru!',
  'Keeranur side-aa? Bus frequent-aa irukku — straight-aa BIT Campus-ku vandhudunga!',
  'Oru naal. Neraya events. New people. New ideas. Full memories.',
  'Just watch panna vara vendam… participate panna vandhu unga talent-a show pannunga!',
  'Friends-oda team up panni oru event-a conquer pannunga!',
  'Skills irukka? Show pannunga. Ideas irukka? Battle pannunga.',
  'Competition mattum illa — connections, experience, memories ellame oru place-la.',
  '9 AM-ku start… 4:45 PM varaikkum full-on PRAYUDDHA!',
  'Technical-aa irundhaalum, non-technical-aa irundhaalum… ungalukku oru stage inga irukku.',
  'College-la irundhu veliya oru different experience venuma? PRAYUDDHA 2K26-ku vandhuru!',
  'See you at BIT Campus. Let the ideas battle.',
];

export default function StudentTipWhatsApp() {
  const ref = useRevealOnScroll<HTMLDivElement>();
  const [tipIdx, setTipIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTipIdx((prev) => (prev + 1) % studentTips.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const whatsappURL = SITE_CONFIG.whatsapp;
  const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
    whatsappURL,
  )}`;

  return (
    <div ref={ref} className="py-6 bg-[var(--surface)]/60 border-y border-[var(--border)]">
      <div className="container-px max-w-5xl mx-auto space-y-4">
        {/* COMPACT STUDENT TIP BAR */}
        <div className="surface-card p-3.5 sm:p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] reveal shadow-sm flex items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-[var(--accent)] shrink-0 font-bold">
            <Sparkles size={16} />
            <span className="hidden xs:inline">Symposium Tip:</span>
          </div>
          <p className="text-[var(--text-primary)] font-medium italic text-center transition-all duration-300 line-clamp-1 sm:line-clamp-none">
            "{studentTips[tipIdx]}"
          </p>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setTipIdx((prev) => (prev - 1 + studentTips.length) % studentTips.length)}
              className="p-1 rounded hover:bg-[var(--code-bg)] text-[var(--text-muted)]"
              aria-label="Previous tip"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => setTipIdx((prev) => (prev + 1) % studentTips.length)}
              className="p-1 rounded hover:bg-[var(--code-bg)] text-[var(--text-muted)]"
              aria-label="Next tip"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* SUBTLE WHATSAPP COMMUNITY CTA CARD */}
        <div className="surface-card p-4 sm:p-5 rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent-light)]/20 reveal flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          {/* Left info */}
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <MessageCircle size={24} />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h4 className="font-display font-bold text-sm sm:text-base text-[var(--text-primary)]">
                  Stay Connected
                </h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] font-medium max-w-xl">
                Join the official PRAYUDDHA 2K26 WhatsApp group for updates, announcements and event information.
              </p>
            </div>
          </div>

          {/* Right QR & Button */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Official QR Image Visual */}
            <div className="hidden md:flex flex-col items-center bg-white p-1 rounded-lg border border-slate-200 shadow-xs">
              <img
                src="/images/whatsapp-qr.jpg"
                alt="PRAYUDDHA WhatsApp Official QR Code"
                className="w-14 h-14 object-contain rounded"
              />
              <span className="text-[9px] font-bold text-slate-700 mt-0.5 flex items-center gap-0.5">
                <QrCode size={10} /> Scan QR
              </span>
            </div>

            <a
              href={whatsappURL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary !bg-emerald-600 hover:!bg-emerald-700 !text-white flex items-center gap-1.5 text-xs sm:text-sm font-semibold shadow-md hover:scale-105 transition-all"
            >
              <MessageCircle size={16} />
              <span>Join WhatsApp Group</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
