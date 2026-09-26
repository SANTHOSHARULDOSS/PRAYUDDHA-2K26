import { useState } from 'react';
import { Phone, Mail, Instagram, MessageCircle, MapPin, CheckCircle2 } from 'lucide-react';
import type { ContactConfigData } from '@/types/cms';
import { cmsService } from '@/services/cmsService';

interface TabContactProps {
  contact: ContactConfigData;
}

export default function TabContact({ contact }: TabContactProps) {
  const [email, setEmail] = useState(contact.email);
  const [phone1, setPhone1] = useState(contact.phone1);
  const [phone2, setPhone2] = useState(contact.phone2);
  const [whatsappUrl, setWhatsappUrl] = useState(contact.whatsappUrl);
  const [instagramUrl, setInstagramUrl] = useState(contact.instagramUrl);
  const [address, setAddress] = useState(contact.address);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    cmsService.updateContactConfig({
      email,
      phone1,
      phone2,
      whatsappUrl,
      instagramUrl,
      address,
    });
    showToast('Contact details updated live across all components!');
  };

  return (
    <div className="space-y-6">
      {toastMsg && (
        <div className="fixed top-4 right-4 z-[100] bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={16} />
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <div className="surface-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
            <Phone size={22} className="text-[var(--accent)]" />
            Centralized Contact Management
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Maintain ONE single source of truth for email, main helpline numbers, WhatsApp community, and Instagram handle.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="surface-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900 space-y-5 text-white max-w-2xl">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1.5 flex items-center gap-1.5">
            <Mail size={15} className="text-[var(--accent)]" /> Official Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm font-medium"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1.5 flex items-center gap-1.5">
              <Phone size={15} className="text-[var(--accent)]" /> Primary Helpline Phone
            </label>
            <input
              type="text"
              required
              value={phone1}
              onChange={(e) => setPhone1(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1.5 flex items-center gap-1.5">
              <Phone size={15} className="text-[var(--accent)]" /> Secondary Helpline Phone
            </label>
            <input
              type="text"
              required
              value={phone2}
              onChange={(e) => setPhone2(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm font-mono"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1.5 flex items-center gap-1.5">
              <MessageCircle size={15} className="text-emerald-400" /> WhatsApp Community Link
            </label>
            <input
              type="text"
              required
              value={whatsappUrl}
              onChange={(e) => setWhatsappUrl(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1.5 flex items-center gap-1.5">
              <Instagram size={15} className="text-pink-400" /> Instagram Handle
            </label>
            <input
              type="text"
              required
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1.5 flex items-center gap-1.5">
            <MapPin size={15} className="text-[var(--accent)]" /> Official Campus Address
          </label>
          <textarea
            rows={2}
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm resize-none"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full py-3 text-sm font-bold shadow-lg">
          Save Contact Settings Live
        </button>
      </form>
    </div>
  );
}
