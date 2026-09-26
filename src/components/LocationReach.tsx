import { Navigation, MapPin, Bus, ArrowRight, Compass } from 'lucide-react';
import { useCMS } from '@/hooks/useCMS';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';

export default function LocationReach() {
  const { travel, siteConfig } = useCMS();
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
                  {travel.venueName || siteConfig.venue}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
                  {siteConfig.institution} · {siteConfig.university}, Tiruchirappalli – 620024
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  The campus is located on the main Tiruchirappalli–Pudukkottai National Highway (NH 336), easily accessible from Trichy, Mannarpuram, Panjapur, and Keeranur sides.
                </p>
              </div>

              <a
                href={travel.googleMapsUrl || siteConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary shrink-0 flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
              >
                <Navigation size={18} />
                Get Directions
              </a>
            </div>

            {/* BLOCK INFORMATION */}
            <div className="pt-6 border-b border-[var(--border)] pb-6">
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
                    📍 {travel.bBlockInfo}
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
                    ⚡ {travel.cBlockInfo}
                  </p>
                </div>
              </div>
            </div>

            {/* VENUE ASSET GALLERY: ENTRANCE & CAMPUS MAP */}
            <div className="pt-6 border-b border-[var(--border)] pb-6">
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-4 flex items-center gap-2">
                <MapPin size={16} className="text-[var(--accent)]" />
                Campus Entrance & Navigation Map
              </h4>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Entrance Image */}
                <div className="surface-card p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] space-y-2">
                  <div className="aspect-[16/10] w-full rounded-lg overflow-hidden bg-black/20">
                    <img
                      src="/images/venue/venue-entrance.png"
                      alt="Anna University BIT Campus Main Entrance"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-[var(--text-primary)]">
                      Campus Main Entrance
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      Main gate on NH 336 Bypass Road
                    </p>
                  </div>
                </div>

                {/* Campus Map Image */}
                <div className="surface-card p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] space-y-2">
                  <div className="aspect-[16/10] w-full rounded-lg overflow-hidden bg-black/20">
                    <img
                      src="/images/venue/campus-map.png"
                      alt="BIT Campus Block Navigation Map"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-[var(--text-primary)]">
                      Campus Layout Map
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      B-Block Auditorium & C-Block Labs
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* LIVE INTERACTIVE GOOGLE MAP EMBED */}
            <div className="pt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                <h4 className="font-display text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <Compass size={16} className="text-[var(--accent)]" />
                  Live Interactive Map — Anna University (BIT Campus)
                </h4>
                <span className="text-xs text-[var(--text-muted)] font-medium">
                  Zoom and pan to navigate campus entrance & blocks
                </span>
              </div>
              <div className="w-full h-80 sm:h-96 rounded-xl overflow-hidden border border-[var(--border)] shadow-md bg-zinc-950 relative">
                <iframe
                  title="Anna University BIT Campus Tiruchirappalli Live Google Map"
                  src="https://maps.google.com/maps?q=Anna%20University%20BIT%20Campus%20Tiruchirappalli&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter saturate-[1.1]"
                />
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
                      From Trichy Central / Chathiram / Mannarpuram / Panjapur
                    </h4>
                    <p className="text-[11px] text-[var(--text-muted)]">Trichy → BIT Campus</p>
                  </div>
                </div>
                <span className="badge badge-accent text-[10px]">Frequent Buses</span>
              </div>

              <div className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                <p>{travel.trichyRouteInfo}</p>
              </div>

              <div className="p-2.5 rounded-xl bg-[var(--code-bg)] border border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--accent)] font-semibold">
                <span>TRICHY</span>
                <ArrowRight size={14} />
                <span>BUS</span>
                <ArrowRight size={14} />
                <span>BIT CAMPUS STOP</span>
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
                      From Keeranur / Pudukkottai Direction
                    </h4>
                    <p className="text-[11px] text-[var(--text-muted)]">Keeranur → BIT Campus</p>
                  </div>
                </div>
                <span className="badge badge-accent text-[10px]">Frequent Buses</span>
              </div>

              <div className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                <p>{travel.keeranurRouteInfo}</p>
              </div>

              <div className="p-2.5 rounded-xl bg-[var(--code-bg)] border border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--accent)] font-semibold">
                <span>KEERANUR</span>
                <ArrowRight size={14} />
                <span>BUS</span>
                <ArrowRight size={14} />
                <span>BIT CAMPUS STOP</span>
                <ArrowRight size={14} />
                <span>B/C BLOCK</span>
              </div>
            </div>
          </div>

          {/* TRAVEL NOTES */}
          <div className="surface-card p-4 rounded-xl border border-[var(--border)] reveal flex flex-col sm:flex-row items-center justify-between gap-4 text-xs bg-[var(--accent-light)]/20">
            <div className="space-y-1 text-center sm:text-left">
              <p className="font-semibold text-[var(--text-primary)] flex items-center justify-center sm:justify-start gap-1.5">
                <Compass size={15} className="text-[var(--accent)]" />
                Travel Notes & Fare Estimate
              </p>
              <p className="text-[var(--text-secondary)]">
                Ask for an <strong>Anna University / BIT Campus</strong> ticket when boarding.
              </p>
              <p className="text-[var(--text-muted)] text-[11px]">
                Approximate bus fare: <strong>{travel.fareEstimate}</strong>.
              </p>
            </div>
            <a
              href={travel.googleMapsUrl || siteConfig.googleMapsUrl}
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
