import { useState } from 'react';
import { QrCode, Upload, CheckCircle2, ExternalLink, Link2, DollarSign, Phone, Eye } from 'lucide-react';
import type { SiteConfigData } from '@/types/cms';
import { uploadMediaFile } from '@/lib/supabase';
import { cmsService } from '@/services/cmsService';

interface TabRegistrationProps {
  siteConfig: SiteConfigData;
}

export default function TabRegistration({ siteConfig }: TabRegistrationProps) {
  const [googleFormUrl, setGoogleFormUrl] = useState(siteConfig.googleFormUrl);
  const [registrationStatus, setRegistrationStatus] = useState<'OPEN' | 'CLOSED'>(siteConfig.registrationStatus);
  const [registrationBtnText, setRegistrationBtnText] = useState(siteConfig.registrationBtnText);
  const [registrationFee, setRegistrationFee] = useState(siteConfig.registrationFee);
  const [upiPhone, setUpiPhone] = useState(siteConfig.upiPhone);
  const [qrCodeUrl, setQrCodeUrl] = useState(siteConfig.qrCodeUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleQRUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadMediaFile(file, 'qr');
      setQrCodeUrl(url);
      cmsService.updateSiteConfig({ qrCodeUrl: url });
      showToast('Registration QR Code updated live!');
    } catch (err) {
      console.error('QR upload failed:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    cmsService.updateSiteConfig({
      googleFormUrl,
      registrationStatus,
      registrationBtnText,
      registrationFee,
      upiPhone,
      qrCodeUrl,
    });
    showToast('Registration & Google Form settings updated live!');
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
            <QrCode size={22} className="text-[var(--accent)]" />
            Google Form Registration & QR Management
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Update Google Form URL, toggle Registration Status (OPEN/CLOSED), edit payment info, and replace QR code image.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary text-xs flex items-center gap-1.5"
          >
            <ExternalLink size={14} />
            Test Google Form Link ↗
          </a>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Settings */}
        <div className="md:col-span-7 surface-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900 space-y-5 text-white">
          <h3 className="font-display font-bold text-base border-b border-zinc-800 pb-3 flex items-center gap-2">
            <Link2 size={18} className="text-[var(--accent)]" />
            Google Form & Registration Controls
          </h3>

          {/* Google Form URL */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1.5">
              Google Form Registration URL <span className="text-red-400">*</span>
            </label>
            <input
              type="url"
              required
              value={googleFormUrl}
              onChange={(e) => setGoogleFormUrl(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs font-mono text-emerald-400 focus:outline-none focus:border-[var(--accent)]"
              placeholder="https://docs.google.com/forms/d/e/.../viewform"
            />
            <p className="text-[11px] text-zinc-500 mt-1">
              All "Register Now" buttons on the public website automatically redirect to this exact URL.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Registration Status */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1.5">
                Registration Status
              </label>
              <select
                value={registrationStatus}
                onChange={(e) => setRegistrationStatus(e.target.value as 'OPEN' | 'CLOSED')}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm font-bold text-white"
              >
                <option value="OPEN">OPEN (Accepting Responses)</option>
                <option value="CLOSED">CLOSED (Registrations Full)</option>
              </select>
            </div>

            {/* Registration Button Text */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1.5">
                CTA Button Text
              </label>
              <input
                type="text"
                required
                value={registrationBtnText}
                onChange={(e) => setRegistrationBtnText(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm font-medium"
                placeholder="Register Now"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Registration Fee */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1.5 flex items-center gap-1">
                <DollarSign size={14} className="text-[var(--accent)]" />
                Single Entry Fee
              </label>
              <input
                type="text"
                required
                value={registrationFee}
                onChange={(e) => setRegistrationFee(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm font-bold text-emerald-400"
                placeholder="₹299"
              />
            </div>

            {/* UPI Phone */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1.5 flex items-center gap-1">
                <Phone size={14} className="text-[var(--accent)]" />
                GPay / PhonePe / UPI Phone
              </label>
              <input
                type="text"
                required
                value={upiPhone}
                onChange={(e) => setUpiPhone(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm font-bold"
                placeholder="9751600742"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full py-3 text-sm font-bold shadow-lg">
            Save & Update Registration Settings Live
          </button>
        </div>

        {/* Right Column: QR Code Management */}
        <div className="md:col-span-5 surface-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900 space-y-4 text-white">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="font-display font-bold text-sm">Official QR Code Image</h3>
            <label className="btn btn-secondary text-xs cursor-pointer flex items-center gap-1.5">
              <Upload size={14} />
              {isUploading ? 'Uploading...' : 'Replace QR Image'}
              <input type="file" accept="image/*" onChange={handleQRUpload} className="hidden" disabled={isUploading} />
            </label>
          </div>

          <div className="aspect-square w-full max-w-[260px] mx-auto rounded-2xl overflow-hidden bg-white p-3 border border-zinc-800 shadow-xl flex items-center justify-center">
            <img src={qrCodeUrl} alt="QR Code Preview" className="w-full h-full object-contain" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">QR Code Image URL</label>
            <input
              type="text"
              value={qrCodeUrl}
              onChange={(e) => setQrCodeUrl(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs font-mono"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 space-y-1">
            <p className="font-bold text-white flex items-center gap-1">
              <CheckCircle2 size={14} className="text-emerald-400" /> Public Website Preview
            </p>
            <p>This QR image is displayed in the Registration section alongside payment guidelines.</p>
          </div>
        </div>
      </form>
    </div>
  );
}
