import { useState } from 'react';
import { Calendar, Plus, Edit3, Trash2, Eye, EyeOff, CheckCircle2, X, Trophy, Tag } from 'lucide-react';
import type { EventItemData } from '@/types/cms';
import type { EventCategory, EventStatus } from '@/data/events';
import { cmsService } from '@/services/cmsService';

interface TabEventsProps {
  events: EventItemData[];
}

export default function TabEvents({ events }: TabEventsProps) {
  const [editingEvent, setEditingEvent] = useState<Partial<EventItemData> | null>(null);
  const [activeTabCategory, setActiveTabCategory] = useState<EventCategory | 'All'>('All');
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const filteredEvents = activeTabCategory === 'All'
    ? events
    : events.filter((e) => e.category === activeTabCategory);

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent || !editingEvent.name || !editingEvent.description) return;

    const finalEvent: EventItemData = {
      id: editingEvent.id || editingEvent.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: editingEvent.name,
      category: editingEvent.category || 'Technical',
      tagline: editingEvent.tagline || '',
      description: editingEvent.description,
      concept: editingEvent.concept || editingEvent.description,
      rules: editingEvent.rules || ['Follow coordinator instructions.'],
      roundsDetails: editingEvent.roundsDetails || [],
      evaluationCriteria: editingEvent.evaluationCriteria || [],
      winnerCriteria: editingEvent.winnerCriteria || 'Highest score wins.',
      skillsTested: editingEvent.skillsTested || [],
      teamSize: editingEvent.teamSize || 'Individual or Team (1–2 members)',
      fee: editingEvent.fee || 'Single Entry Fee',
      duration: editingEvent.duration || 'TBA',
      rounds: editingEvent.rounds || '1 Round',
      eligibility: editingEvent.eligibility || 'Open to all college students',
      prizes: editingEvent.prizes || '1st Prize — ₹1,000 | 2nd Prize — ₹500',
      firstPrize: editingEvent.firstPrize || '₹1,000',
      secondPrize: editingEvent.secondPrize || '₹500',
      image: editingEvent.image || 'code',
      registrationLink: editingEvent.registrationLink || 'https://docs.google.com/forms/d/e/1FAIpQLScJBrmOymB9yixizaYP8SRDUXp4h-cMwWDTxqCBSI5szyfQgA/viewform',
      status: (editingEvent.status as EventStatus) || 'Open',
      displayOrder: editingEvent.displayOrder || events.length + 1,
      isPublished: editingEvent.isPublished ?? true,
    };

    cmsService.saveEvent(finalEvent);
    setEditingEvent(null);
    showToast(`Event "${finalEvent.name}" saved successfully!`);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      cmsService.deleteEvent(id);
      showToast('Event deleted.');
    }
  };

  const togglePublish = (ev: EventItemData) => {
    cmsService.saveEvent({ ...ev, isPublished: !ev.isPublished });
    showToast(`Event ${ev.isPublished ? 'unpublished' : 'published'} live.`);
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
            <Calendar size={22} className="text-[var(--accent)]" />
            Event Management (Technical & Non-Technical)
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Add, edit, reorder, delete, and publish competitions. Technical & Non-Technical categories are strictly separated.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingEvent({
              name: '',
              category: 'Technical',
              tagline: '',
              description: '',
              teamSize: '1–2 members',
              prizes: '1st Prize — ₹1,000 | 2nd Prize — ₹500',
              firstPrize: '₹1,000',
              secondPrize: '₹500',
              status: 'Open',
              rules: ['Participants must follow coordinator instructions.'],
              image: 'code',
              displayOrder: events.length + 1,
              isPublished: true,
            })
          }
          className="btn btn-primary text-xs flex items-center gap-1.5 shrink-0"
        >
          <Plus size={15} />
          Add New Event
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
        {(['All', 'Technical', 'Non-Technical'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTabCategory(cat)}
            className={`btn text-xs ${
              activeTabCategory === cat ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            {cat} ({cat === 'All' ? events.length : events.filter((e) => e.category === cat).length})
          </button>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <form
            onSubmit={handleSaveEvent}
            className="surface-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900 max-w-2xl w-full space-y-4 text-white shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={() => setEditingEvent(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X size={18} />
            </button>

            <h3 className="font-display font-bold text-lg border-b border-zinc-800 pb-3">
              {editingEvent.id ? `Edit Event: ${editingEvent.name}` : 'Add New Event'}
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Event Name</label>
                <input
                  type="text"
                  required
                  value={editingEvent.name || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm"
                  placeholder="PIXEL2ALCHEMY"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Category</label>
                <select
                  value={editingEvent.category || 'Technical'}
                  onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value as EventCategory })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm"
                >
                  <option value="Technical">Technical</option>
                  <option value="Non-Technical">Non-Technical</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Tagline</label>
              <input
                type="text"
                value={editingEvent.tagline || ''}
                onChange={(e) => setEditingEvent({ ...editingEvent, tagline: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm"
                placeholder="See it. Think it. Prompt it."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Description</label>
              <textarea
                rows={3}
                required
                value={editingEvent.description || ''}
                onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm resize-none"
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Team Size</label>
                <input
                  type="text"
                  value={editingEvent.teamSize || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, teamSize: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Status</label>
                <select
                  value={editingEvent.status || 'Open'}
                  onChange={(e) => setEditingEvent({ ...editingEvent, status: e.target.value as EventStatus })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2 text-xs"
                >
                  <option value="Open">Open</option>
                  <option value="Coming Soon">Coming Soon</option>
                  <option value="Closed">Closed</option>
                  <option value="Full">Full</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Display Order</label>
                <input
                  type="number"
                  value={editingEvent.displayOrder || 1}
                  onChange={(e) => setEditingEvent({ ...editingEvent, displayOrder: parseInt(e.target.value) || 1 })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2 text-xs"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">1st Prize</label>
                <input
                  type="text"
                  value={editingEvent.firstPrize || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, firstPrize: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs font-bold text-emerald-400"
                  placeholder="₹1,000"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">2nd Prize</label>
                <input
                  type="text"
                  value={editingEvent.secondPrize || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, secondPrize: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs font-bold text-emerald-400"
                  placeholder="₹500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Rules (One per line)</label>
              <textarea
                rows={3}
                value={editingEvent.rules ? editingEvent.rules.join('\n') : ''}
                onChange={(e) => setEditingEvent({ ...editingEvent, rules: e.target.value.split('\n').filter(Boolean) })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs resize-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button type="submit" className="btn btn-primary text-xs flex-1 py-3 font-bold">
                Save Event
              </button>
              <button type="button" onClick={() => setEditingEvent(null)} className="btn btn-secondary text-xs">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Events List Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map((ev) => (
          <div
            key={ev.id}
            className="surface-card p-5 rounded-2xl border border-zinc-800 bg-zinc-900 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`badge text-[10px] ${
                  ev.category === 'Technical' ? 'badge-accent' : 'badge-neutral'
                }`}>
                  {ev.category}
                </span>
                <span className={`badge text-[10px] ${ev.isPublished ? 'badge-success' : 'badge-neutral'}`}>
                  {ev.isPublished ? 'Live' : 'Hidden'}
                </span>
              </div>

              <h3 className="font-display font-bold text-base text-white">{ev.name}</h3>
              {ev.tagline && <p className="text-xs font-semibold text-[var(--accent)]">{ev.tagline}</p>}

              <p className="text-xs text-zinc-400 line-clamp-3 mt-2">{ev.description}</p>
            </div>

            <div className="pt-3 border-t border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-300 font-medium">
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <Trophy size={14} />
                  {ev.firstPrize || '₹1,000'} | {ev.secondPrize || '₹500'}
                </span>
                <span className="text-zinc-500 font-mono text-[10px]">Order: #{ev.displayOrder}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingEvent(ev)}
                  className="btn btn-secondary text-xs flex-1 flex items-center justify-center gap-1"
                >
                  <Edit3 size={13} /> Edit Event
                </button>
                <button
                  onClick={() => togglePublish(ev)}
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                  title="Toggle Visibility"
                >
                  {ev.isPublished ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                <button
                  onClick={() => handleDelete(ev.id)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                  title="Delete Event"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
