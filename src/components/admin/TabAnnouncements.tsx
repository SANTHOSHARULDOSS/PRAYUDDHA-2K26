import { useState } from 'react';
import { Bell, Plus, Edit3, Trash2, Eye, EyeOff, CheckCircle2, X } from 'lucide-react';
import type { AnnouncementData } from '@/types/cms';
import { cmsService } from '@/services/cmsService';

interface TabAnnouncementsProps {
  announcements: AnnouncementData[];
}

export default function TabAnnouncements({ announcements }: TabAnnouncementsProps) {
  const [editingAnn, setEditingAnn] = useState<Partial<AnnouncementData> | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAnn || !editingAnn.title || !editingAnn.content) return;

    const finalAnn: AnnouncementData = {
      id: editingAnn.id || `ann-${Date.now()}`,
      title: editingAnn.title,
      content: editingAnn.content,
      type: editingAnn.type || 'info',
      priority: editingAnn.priority || 1,
      isPublished: editingAnn.isPublished ?? true,
      date: editingAnn.date || new Date().toISOString().split('T')[0],
    };

    cmsService.saveAnnouncement(finalAnn);
    setEditingAnn(null);
    showToast('Announcement saved live!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this announcement?')) {
      cmsService.deleteAnnouncement(id);
      showToast('Announcement deleted.');
    }
  };

  const togglePublish = (ann: AnnouncementData) => {
    cmsService.saveAnnouncement({ ...ann, isPublished: !ann.isPublished });
    showToast(`Announcement ${ann.isPublished ? 'hidden' : 'published'} live.`);
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
            <Bell size={22} className="text-[var(--accent)]" />
            Announcement & Notice System
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Create, edit, toggle visibility, and set priority for public site hero announcements and banner notices.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingAnn({
              title: '',
              content: '',
              type: 'urgent',
              priority: 1,
              isPublished: true,
              date: new Date().toISOString().split('T')[0],
            })
          }
          className="btn btn-primary text-xs flex items-center gap-1.5 shrink-0"
        >
          <Plus size={15} />
          Create Announcement
        </button>
      </div>

      {/* Modal */}
      {editingAnn && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleSave}
            className="surface-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900 max-w-lg w-full space-y-4 text-white shadow-2xl relative"
          >
            <button
              type="button"
              onClick={() => setEditingAnn(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X size={18} />
            </button>

            <h3 className="font-display font-bold text-lg border-b border-zinc-800 pb-3">
              {editingAnn.id ? 'Edit Announcement' : 'New Announcement'}
            </h3>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Title</label>
              <input
                type="text"
                required
                value={editingAnn.title || ''}
                onChange={(e) => setEditingAnn({ ...editingAnn, title: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm"
                placeholder="Registration closing date extended"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Notice Content</label>
              <textarea
                rows={3}
                required
                value={editingAnn.content || ''}
                onChange={(e) => setEditingAnn({ ...editingAnn, content: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs resize-none"
                placeholder="Details of the announcement..."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Notice Type</label>
                <select
                  value={editingAnn.type || 'info'}
                  onChange={(e) => setEditingAnn({ ...editingAnn, type: e.target.value as any })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs"
                >
                  <option value="urgent">Urgent (Red Badge)</option>
                  <option value="warning">Warning (Amber Badge)</option>
                  <option value="info">Info (Blue Badge)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Priority Order</label>
                <input
                  type="number"
                  value={editingAnn.priority || 1}
                  onChange={(e) => setEditingAnn({ ...editingAnn, priority: parseInt(e.target.value) || 1 })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button type="submit" className="btn btn-primary text-xs flex-1 py-3 font-bold">
                Save Announcement
              </button>
              <button type="button" onClick={() => setEditingAnn(null)} className="btn btn-secondary text-xs">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Announcements List */}
      <div className="space-y-3">
        {announcements.map((a) => (
          <div
            key={a.id}
            className="surface-card p-5 rounded-2xl border border-zinc-800 bg-zinc-900 flex items-center justify-between gap-4 text-white"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`badge text-[10px] ${
                  a.type === 'urgent' ? 'badge-danger' : a.type === 'warning' ? 'badge-warning' : 'badge-neutral'
                }`}>
                  {a.type.toUpperCase()}
                </span>
                <h4 className="font-display font-bold text-base text-white">{a.title}</h4>
              </div>
              <p className="text-xs text-zinc-400">{a.content}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => togglePublish(a)}
                className={`btn text-xs ${a.isPublished ? 'btn-primary' : 'btn-secondary'}`}
              >
                {a.isPublished ? <Eye size={14} /> : <EyeOff size={14} />}
                {a.isPublished ? 'Live' : 'Hidden'}
              </button>
              <button
                onClick={() => setEditingAnn(a)}
                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                title="Edit"
              >
                <Edit3 size={14} />
              </button>
              <button
                onClick={() => handleDelete(a.id)}
                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
