import { Navigation, MapPin, Bus, Train, ArrowRight, Compass } from 'lucide-react';
import { SITE_CONFIG } from '@/data/siteConfig';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';

export default function LocationReach() {
  const ref = useRevealOnScroll<HTMLElement>();

  return (
    <section id="reach-us" ref={ref} className="section-py bg-[var(--surface)]/30">
      <div className="container-px">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 reveal">
          <span className="section-eyebrow">Travel & Venue Guide</span>
          <h2 className="section-title mt-2 mb-3">Location & How to Reach</h2>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg">
            Planning your trip to PRAYUDDHA 2K26? Here’s the easiest way to reach us.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {/* Main Venue Card */}
          <div className="surface-card p-6 sm:p-8 rounded-2xl border border-[var(--border)] reveal shadow-md bg-[var(--surface)]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[var(--border)]">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="badge badge-accent text-xs">NH 336 Bypass Road</span>
                  <span className="badge badge-neutral text-xs">Tiruchirappalli</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  {SITE_CONFIG.venue}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
                  {SITE_CONFIG.institution} · {SITE_CONFIG.university}, Tiruchirappalli – 620024
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  The campus is located on the main Tiruchirappalli–Pudukkottai National Highway (NH 336), easily accessible from both Trichy and Keeranur sides.
                </p>
              </div>

              <a
                href={SITE_CONFIG.googleMapsURL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary shrink-0 flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
              >
                <Navigation size={18} />
                Get Directions
              </a>
            </div>

            {/* BLOCK INFORMATION */}
            <div className="pt-6">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-4 flex items-center gap-2">
                <MapPin size={16} className="text-[var(--accent)]" />
                Important Block Information
              </h4>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* B-BLOCK */}
                <div className="surface-card p-4 rounded-xl border-l-4 border-l-[var(--accent)] border-[var(--border)] bg-[var(--surface-elevated)] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-base font-bold text-[var(--accent)]">
                      B-Block
                    </span>
                    <span className="badge badge-accent text-[10px]">Auditorium</span>
                  </div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    Dr. A.P.J. Abdul Kalam Auditorium
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] font-medium">
                    📍 Inauguration Ceremony & Prize Distribution (Valedictory)
                  </p>
                </div>

                {/* C-BLOCK */}
                <div className="surface-card p-4 rounded-xl border-l-4 border-l-[var(--warning)] border-[var(--border)] bg-[var(--surface-elevated)] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-base font-bold text-[var(--warning)]">
                      C-Block
                    </span>
                    <span className="badge badge-warning text-[10px]">Event Halls</span>
                  </div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    Department Labs & Seminar Halls
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] font-medium">
                    ⚡ All Technical & Non-Technical Event Competitions
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ACTION-ORIENTED VISUAL TRAVEL FLOW CARDS */}
          <div className="grid md:grid-cols-2 gap-5 reveal">
            {/* FROM TRICHY */}
            <div className="surface-card p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent-light)] flex items-center justify-center">
                    <Bus size={18} className="text-[var(--accent)]" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-[var(--text-primary)]">
                      From Trichy
                    </h4>
                    <p className="text-[11px] text-[var(--text-muted)]">Trichy → BIT Campus</p>
                  </div>
                </div>
                <span className="badge badge-accent text-[10px]">Frequent Buses</span>
              </div>

              {/* Step Flow */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <span className="w-5 h-5 rounded-full bg-[var(--code-bg)] font-bold text-center flex items-center justify-center shrink-0">1</span>
                  <span>Board bus at <strong>Trichy Central</strong> or <strong>Chathiram Bus Stand</strong> (Pudukkottai / Karaikudi route).</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <span className="w-5 h-5 rounded-full bg-[var(--code-bg)] font-bold text-center flex items-center justify-center shrink-0">2</span>
                  <span>Get down directly at <strong>Anna University / BIT Campus stop</strong>.</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <span className="w-5 h-5 rounded-full bg-[var(--code-bg)] font-bold text-center flex items-center justify-center shrink-0">3</span>
                  <span>Walk into campus → Head to <strong>B-Block (Inauguration)</strong> or <strong>C-Block (Events)</strong>.</span>
                </div>
              </div>

              {/* Visual Mini Flow */}
              <div className="p-2.5 rounded-xl bg-[var(--code-bg)] border border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--accent)] font-semibold">
                <span>TRICHY</span>
                <ArrowRight size={14} />
                <span>BUS</span>
                <ArrowRight size={14} />
                <span>BIT CAMPUS</span>
                <ArrowRight size={14} />
                <span>B/C BLOCK</span>
              </div>
            </div>

            {/* FROM KEERANUR */}
            <div className="surface-card p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent-light)] flex items-center justify-center">
                    <Bus size={18} className="text-[var(--accent)]" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-[var(--text-primary)]">
                      From Keeranur
                    </h4>
                    <p className="text-[11px] text-[var(--text-muted)]">Keeranur → BIT Campus</p>
                  </div>
                </div>
                <span className="badge badge-accent text-[10px]">Frequent Buses</span>
              </div>

              {/* Step Flow */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <span className="w-5 h-5 rounded-full bg-[var(--code-bg)] font-bold text-center flex items-center justify-center shrink-0">1</span>
                  <span>Board bus from <strong>Keeranur Bus Stop</strong> taking Trichy direction / BIT Campus route.</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <span className="w-5 h-5 rounded-full bg-[var(--code-bg)] font-bold text-center flex items-center justify-center shrink-0">2</span>
                  <span>Get down directly at <strong>Anna University / BIT Campus stop</strong>.</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <span className="w-5 h-5 rounded-full bg-[var(--code-bg)] font-bold text-center flex items-center justify-center shrink-0">3</span>
                  <span>Walk into campus → Head to <strong>B-Block (Inauguration)</strong> or <strong>C-Block (Events)</strong>.</span>
                </div>
              </div>

              {/* Visual Mini Flow */}
              <div className="p-2.5 rounded-xl bg-[var(--code-bg)] border border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--accent)] font-semibold">
                <span>KEERANUR</span>
                <ArrowRight size={14} />
                <span>BUS</span>
                <ArrowRight size={14} />
                <span>BIT CAMPUS</span>
                <ArrowRight size={14} />
                <span>B/C BLOCK</span>
              </div>
            </div>
          </div>

          {/* TRAVEL NOTES & RAILWAY INFO */}
          <div className="surface-card p-4 rounded-xl border border-[var(--border)] reveal flex flex-col sm:flex-row items-center justify-between gap-4 text-xs bg-[var(--accent-light)]/20">
            <div className="space-y-1 text-center sm:text-left">
              <p className="font-semibold text-[var(--text-primary)] flex items-center justify-center sm:justify-start gap-1.5">
                <Compass size={15} className="text-[var(--accent)]" />
                Travel Notes & Fare Estimate
              </p>
              <p className="text-[var(--text-secondary)]">
                Bus services are available frequently from both Trichy and Keeranur sides. Ask for an <strong>Anna University / BIT Campus</strong> ticket.
              </p>
              <p className="text-[var(--text-muted)] text-[11px]">
                Approximate bus fare: <strong>₹15 – ₹30</strong> depending on starting point. Railway travelers: <strong>Keeranur Railway Station</strong> → continue to campus by local bus or auto.
              </p>
            </div>
            <a
              href={SITE_CONFIG.googleMapsURL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary !text-xs shrink-0 flex items-center gap-1.5"
            >
              <Navigation size={14} />
              Open Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
