import { useState } from 'react';
import { CheckCircle2, AlertCircle, Info, Calendar } from 'lucide-react';
import { events } from '@/data/events';
import { SITE_CONFIG } from '@/data/siteConfig';
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll';

interface FormData {
  name: string;
  college: string;
  department: string;
  year: string;
  phone: string;
  email: string;
  event: string;
  teamMembers: string;
  transactionId: string;
}

const initialForm: FormData = {
  name: '',
  college: '',
  department: '',
  year: '',
  phone: '',
  email: '',
  event: '',
  teamMembers: '',
  transactionId: '',
};

export default function Registration() {
  const ref = useRevealOnScroll<HTMLElement>();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [regId, setRegId] = useState('');

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.college.trim()) e.college = 'College name is required';
    if (!form.department.trim()) e.department = 'Department is required';
    if (!form.year) e.year = 'Year is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid 10-digit phone number';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.event) e.event = 'Please select an event';
    if (!form.transactionId.trim()) e.transactionId = 'Transaction ID is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const id = `PRY-DEMO-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    setRegId(id);
    setSubmitted(true);
  };

  const reset = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
  };

  const update = (key: keyof FormData, value: string) => {
    setForm({ ...form, [key]: value });
    if (errors[key]) setErrors({ ...errors, [key]: undefined });
  };

  const inputClass = (key: keyof FormData) =>
    `input-field ${errors[key] ? 'border-[var(--danger)]' : ''}`;

  const openEvents = events.filter((ev) => ev.status === 'Open');

  return (
    <section id="register" ref={ref} className="section-py">
      <div className="container-px">
        <div className="max-w-3xl mx-auto text-center mb-10 reveal">
          <span className="section-eyebrow">Register</span>
          <h2 className="section-title mt-2 mb-4">Registration</h2>
          <p className="text-[var(--text-secondary)] text-lg">
            Register for your chosen event. This is a prototype — no payment is processed.
          </p>
        </div>

        {submitted ? (
          <div className="max-w-lg mx-auto surface-card p-8 text-center reveal animate-scale-in">
            <CheckCircle2 size={56} className="text-[var(--success)] mx-auto mb-4" />
            <h3 className="font-display text-xl font-bold mb-2">Registration Successful</h3>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              This is prototype/demo functionality. No data has been saved.
            </p>
            <div className="surface-card p-4 text-left space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-sm text-[var(--text-muted)]">Registration ID:</span>
                <span className="text-sm font-mono font-bold text-[var(--accent)]">{regId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[var(--text-muted)]">Selected Event:</span>
                <span className="text-sm font-medium">{form.event}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[var(--text-muted)]">Participant:</span>
                <span className="text-sm font-medium">{form.name}</span>
              </div>
            </div>
            <button onClick={reset} className="btn btn-secondary">
              Register Another Event
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto surface-card p-6 sm:p-8 space-y-5 reveal"
            noValidate
          >
            {/* Single Fee & Lunch Highlight Banner */}
            <div className="surface-card p-4 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-light)]/30 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[var(--accent)] uppercase tracking-wider">
                <span>ONE ENTRY FEE • FULL SYMPOSIUM ACCESS</span>
                <span>Includes Biryani Lunch</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                Single registration fee covers all technical & non-technical events plus delicious Veg / Non-Veg Biryani lunch for participants.
              </p>
            </div>

            {/* Prototype notice */}
            <div className="flex items-start gap-2 p-3 rounded-lg bg-[var(--warning-light)] text-[var(--warning)] text-sm">
              <Info size={16} className="shrink-0 mt-0.5" />
              <span>
                This is a prototype registration form. No real payment is processed and no data is
                stored. The form is designed to connect to a backend later.
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label htmlFor="r-name" className="block text-sm font-medium mb-1.5">
                  Name <span className="text-[var(--danger)]">*</span>
                </label>
                <input
                  id="r-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  className={inputClass('name')}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="text-xs text-[var(--danger)] mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.name}
                  </p>
                )}
              </div>

              {/* College */}
              <div>
                <label htmlFor="r-college" className="block text-sm font-medium mb-1.5">
                  College Name <span className="text-[var(--danger)]">*</span>
                </label>
                <input
                  id="r-college"
                  type="text"
                  value={form.college}
                  onChange={(e) => update('college', e.target.value)}
                  className={inputClass('college')}
                  placeholder="Your college name"
                />
                {errors.college && (
                  <p className="text-xs text-[var(--danger)] mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.college}
                  </p>
                )}
              </div>

              {/* Department */}
              <div>
                <label htmlFor="r-dept" className="block text-sm font-medium mb-1.5">
                  Department <span className="text-[var(--danger)]">*</span>
                </label>
                <input
                  id="r-dept"
                  type="text"
                  value={form.department}
                  onChange={(e) => update('department', e.target.value)}
                  className={inputClass('department')}
                  placeholder="e.g., IT, AIML, CSE"
                />
                {errors.department && (
                  <p className="text-xs text-[var(--danger)] mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.department}
                  </p>
                )}
              </div>

              {/* Year */}
              <div>
                <label htmlFor="r-year" className="block text-sm font-medium mb-1.5">
                  Year <span className="text-[var(--danger)]">*</span>
                </label>
                <select
                  id="r-year"
                  value={form.year}
                  onChange={(e) => update('year', e.target.value)}
                  className={inputClass('year')}
                >
                  <option value="">Select year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
                {errors.year && (
                  <p className="text-xs text-[var(--danger)] mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.year}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="r-phone" className="block text-sm font-medium mb-1.5">
                  Phone <span className="text-[var(--danger)]">*</span>
                </label>
                <input
                  id="r-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  className={inputClass('phone')}
                  placeholder="10-digit phone number"
                  maxLength={10}
                />
                {errors.phone && (
                  <p className="text-xs text-[var(--danger)] mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.phone}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="r-email" className="block text-sm font-medium mb-1.5">
                  Email <span className="text-[var(--danger)]">*</span>
                </label>
                <input
                  id="r-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className={inputClass('email')}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-xs text-[var(--danger)] mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Event */}
            <div>
              <label htmlFor="r-event" className="block text-sm font-medium mb-1.5">
                Event <span className="text-[var(--danger)]">*</span>
              </label>
              <select
                id="r-event"
                value={form.event}
                onChange={(e) => update('event', e.target.value)}
                className={inputClass('event')}
              >
                <option value="">Select an event</option>
                {openEvents.map((ev) => (
                  <option key={ev.id} value={ev.name}>
                    {ev.name} ({ev.category})
                  </option>
                ))}
              </select>
              {errors.event && (
                <p className="text-xs text-[var(--danger)] mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.event}
                </p>
              )}
            </div>

            {/* Team members */}
            <div>
              <label htmlFor="r-team" className="block text-sm font-medium mb-1.5">
                Team Members
              </label>
              <textarea
                id="r-team"
                rows={2}
                value={form.teamMembers}
                onChange={(e) => update('teamMembers', e.target.value)}
                className="input-field resize-none"
                placeholder="List team member names (if applicable)"
              />
            </div>

            {/* Transaction ID */}
            <div>
              <label htmlFor="r-txn" className="block text-sm font-medium mb-1.5">
                Transaction ID <span className="text-[var(--danger)]">*</span>
              </label>
              <input
                id="r-txn"
                type="text"
                value={form.transactionId}
                onChange={(e) => update('transactionId', e.target.value)}
                className={inputClass('transactionId')}
                placeholder="Payment transaction ID"
              />
              {errors.transactionId && (
                <p className="text-xs text-[var(--danger)] mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.transactionId}
                </p>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-full">
              <Calendar size={16} />
              Submit Registration
            </button>
          </form>
        )}

        {/* FINAL CTA BLOCK */}
        <div className="max-w-4xl mx-auto mt-16 surface-card p-8 rounded-2xl border-2 border-[var(--accent)] shadow-xl text-center reveal bg-[var(--surface)] relative overflow-hidden">
          <div className="space-y-3">
            <span className="badge badge-accent text-xs font-bold uppercase tracking-wider">
              Join Us at Anna University BIT Campus
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
              Don’t just hear about PRAYUDDHA 2K26. Be there.
            </h3>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] font-medium max-w-2xl mx-auto">
              One entry. Full symposium experience. Great events, great food, great memories.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <a
                href="#register"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
                  document.getElementById('r-name')?.focus();
                }}
                className="btn btn-primary shadow-md"
              >
                <Calendar size={16} />
                Register Now
              </a>
              <a
                href={SITE_CONFIG.googleMapsURL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary shadow-sm"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
