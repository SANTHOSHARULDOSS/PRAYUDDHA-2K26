import { useState } from 'react';
import { ExternalLink, CheckCircle2, QrCode, Phone, Sparkles, MapPin, AlertTriangle, ShieldCheck, Ticket } from 'lucide-react';
import { useCMS } from '@/hooks/useCMS';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';

export default function Registration() {
  const { siteConfig } = useCMS();
  const ref = useRevealOnScroll<HTMLElement>();
  const [showQRZoom, setShowQRZoom] = useState(false);

  const handleRegisterClick = () => {
    window.open(siteConfig.googleFormUrl, '_blank', 'noopener,noreferrer');
  };

  const isOpen = siteConfig.registrationStatus === 'OPEN';

  return (
    <section id="register" ref={ref} className="section-py">
      <div className="container-px">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 reveal">
          <span className="section-eyebrow">Official Registration</span>
          <h2 className="section-title mt-2 mb-4">Registration & Payment</h2>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg">
            Join us for PRAYUDDHA 2K26 at Anna University (BIT Campus), Tiruchirappalli.
          </p>
        </div>

        {/* REGISTRATION STATUS & GOOGLE FORM CARD */}
        <div className="max-w-3xl mx-auto surface-card p-6 sm:p-8 rounded-2xl border-2 border-[var(--accent)] shadow-xl reveal space-y-6 bg-[var(--surface)] relative overflow-hidden">
          {/* Top Status Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-[var(--accent-light)]/40 border border-[var(--accent)]/30">
            <div className="flex items-center gap-2">
              <span className={`badge text-xs font-bold uppercase tracking-wider ${isOpen ? 'badge-success' : 'badge-danger'}`}>
                REGISTRATION STATUS: {siteConfig.registrationStatus}
              </span>
            </div>
            <span className="text-xs font-semibold text-[var(--accent)]">
              {siteConfig.entryFeeNotice || 'ONE ENTRY FEE • FULL SYMPOSIUM ACCESS'}
            </span>
          </div>

          {/* Description & Included Highlights */}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="font-display text-2xl font-bold text-[var(--text-primary)]">
              Complete Your Registration via Official Google Form
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Registration for all technical and non-technical events is managed through our official Google Form. Single entry fee of <strong className="text-[var(--accent)]">{siteConfig.registrationFee}</strong> covers participation in all symposium events, participation certificates, and a delicious <strong>Veg / Non-Veg Biryani Lunch</strong>.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3 rounded-xl bg-[var(--code-bg)] border border-[var(--border)] space-y-1">
                <span className="font-bold text-[var(--accent)] uppercase tracking-wider block">
                  Included in ₹299 Entry Fee:
                </span>
                <ul className="space-y-1 text-[var(--text-secondary)]">
                  <li>• Access to all Technical Competitions</li>
                  <li>• Access to all Non-Technical Events</li>
                  <li>• Veg / Non-Veg Biryani Lunch</li>
                  <li>• Official Symposium Certificate</li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-[var(--code-bg)] border border-[var(--border)] space-y-1">
                <span className="font-bold text-[var(--accent)] uppercase tracking-wider block">
                  Payment Mode (GPay / PhonePe / UPI):
                </span>
                <p className="text-[var(--text-secondary)] font-medium">
                  UPI / Phone: <strong className="text-[var(--text-primary)] font-mono">{siteConfig.upiPhone}</strong>
                </p>
                <p className="text-[var(--text-muted)] text-[11px] pt-1">
                  Keep your payment transaction ID or screenshot ready to enter in the Google Form.
                </p>
              </div>
            </div>
          </div>

          {/* QR Code & Payment Section */}
          <div className="surface-card p-5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <QrCode size={20} className="text-[var(--accent)]" />
                <h4 className="font-display font-bold text-base text-[var(--text-primary)]">
                  Scan QR Code to Pay
                </h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                Scan using Google Pay, PhonePe, Paytm or any UPI app.
              </p>
              <div className="text-xs font-mono bg-[var(--code-bg)] p-2 rounded-lg text-[var(--accent)] font-bold inline-block">
                UPI: {siteConfig.upiPhone}
              </div>
            </div>

            {/* QR Image Box */}
            <div
              onClick={() => setShowQRZoom(true)}
              className="w-32 h-32 rounded-xl bg-white p-2 border-2 border-[var(--accent)]/40 shadow-md shrink-0 cursor-pointer group hover:scale-105 transition-transform relative"
              title="Click to zoom QR Code"
            >
              <img
                src={siteConfig.qrCodeUrl}
                alt="Registration UPI QR Code"
                className="w-full h-full object-contain"
              />
              <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center text-white text-[10px] font-bold">
                Click to Zoom
              </span>
            </div>
          </div>

          {/* MAIN GOOGLE FORM ACTION BUTTON */}
          <div className="pt-2 text-center space-y-3">
            {isOpen ? (
              <button
                onClick={handleRegisterClick}
                className="btn btn-primary w-full py-4 text-base font-bold shadow-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
              >
                <ExternalLink size={20} />
                {siteConfig.registrationBtnText || 'Open Official Google Form'}
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-bold text-center">
                Registrations are currently closed. Please check back later for updates.
              </div>
            )}

            <p className="text-xs text-[var(--text-muted)] font-mono">
              Link: <span className="underline truncate max-w-md inline-block align-bottom">{siteConfig.googleFormUrl}</span>
            </p>
          </div>
        </div>

        {/* FINAL VENUE & CTA BAR */}
        <div className="max-w-4xl mx-auto mt-16 surface-card p-8 rounded-2xl border border-[var(--border)] shadow-md text-center reveal bg-[var(--surface)]">
          <div className="space-y-3">
            <span className="badge badge-accent text-xs font-bold uppercase tracking-wider">
              Anna University (BIT Campus), Tiruchirappalli
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
              Don’t just hear about PRAYUDDHA 2K26. Be there.
            </h3>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] font-medium max-w-2xl mx-auto">
              One entry. Full symposium experience. Great events, great food, great memories.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button onClick={handleRegisterClick} className="btn btn-primary shadow-md">
                <Ticket size={16} />
                {siteConfig.registrationBtnText || 'Register Now'}
              </button>
              <a
                href={siteConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary shadow-sm"
              >
                Get Location Directions
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* QR ZOOM LIGHTBOX */}
      {showQRZoom && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setShowQRZoom(false)}
        >
          <div
            className="surface-card p-6 rounded-2xl border border-white/20 bg-zinc-900 max-w-sm w-full text-center text-white space-y-4 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="font-display font-bold text-lg">PRAYUDDHA Official QR Code</h4>
            <div className="w-64 h-64 mx-auto rounded-xl bg-white p-3 border shadow-inner">
              <img src={siteConfig.qrCodeUrl} alt="QR Code Large" className="w-full h-full object-contain" />
            </div>
            <p className="text-xs text-zinc-300 font-mono">UPI Phone: {siteConfig.upiPhone}</p>
            <button onClick={() => setShowQRZoom(false)} className="btn btn-secondary text-xs w-full">
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
