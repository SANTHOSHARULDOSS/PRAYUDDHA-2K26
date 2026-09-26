import { useState } from 'react';
import { Clock, Plus, Edit3, Trash2, CheckCircle2, X } from 'lucide-react';
import type { ScheduleItemData } from '@/types/cms';
import { cmsService } from '@/services/cmsService';

interface TabScheduleProps {
  schedule: ScheduleItemData[];
}

export default function TabSchedule({ schedule }: TabScheduleProps) {
  const [editingItem, setEditingItem] = useState<Partial<ScheduleItemData> | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.time || !editingItem.programme) return;

    const finalItem: ScheduleItemData = {
      id: editingItem.id || `sch-${Date.now()}`,
      time: editingItem.time,
      programme: editingItem.programme,
      venue: editingItem.venue || 'BIT Campus',
      isBreak: editingItem.isBreak ?? false,
      isEnd: editingItem.isEnd ?? false,
      displayOrder: editingItem.displayOrder || schedule.length + 1,
    };

    cmsService.saveScheduleItem(finalItem);
    setEditingItem(null);
    showToast('Schedule item saved live!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this schedule entry?')) {
      cmsService.deleteScheduleItem(id);
      showToast('Schedule item deleted.');
    }
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
            <Clock size={22} className="text-[var(--accent)]" />
            Schedule Management
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Edit symposium timing, activity programmes, venues, lunch break highlights, and closing ceremony time.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingItem({
              time: '9:00 AM – 10:00 AM',
              programme: '',
              venue: 'BIT Campus',
              isBreak: false,
              isEnd: false,
              displayOrder: schedule.length + 1,
            })
          }
          className="btn btn-primary text-xs flex items-center gap-1.5 shrink-0"
        >
          <Plus size={15} />
          Add Schedule Entry
        </button>
      </div>

      {/* Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleSave}
            className="surface-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900 max-w-md w-full space-y-4 text-white shadow-2xl relative"
          >
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X size={18} />
            </button>

            <h3 className="font-display font-bold text-lg border-b border-zinc-800 pb-3">
              {editingItem.id ? 'Edit Schedule Item' : 'Add Schedule Item'}
            </h3>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Time Range</label>
              <input
                type="text"
                required
                value={editingItem.time || ''}
                onChange={(e) => setEditingItem({ ...editingItem, time: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm"
                placeholder="9:00 AM – 10:30 AM"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Programme Activity</label>
              <input
                type="text"
                required
                value={editingItem.programme || ''}
                onChange={(e) => setEditingItem({ ...editingItem, programme: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm"
                placeholder="Inauguration Ceremony"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Venue Block</label>
              <input
                type="text"
                value={editingItem.venue || ''}
                onChange={(e) => setEditingItem({ ...editingItem, venue: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm"
                placeholder="B-Block Auditorium"
              />
            </div>

            <div className="flex items-center gap-4 p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingItem.isBreak ?? false}
                  onChange={(e) => setEditingItem({ ...editingItem, isBreak: e.target.checked })}
                  className="w-4 h-4 accent-[var(--accent)]"
                />
                Lunch / Refreshment Break
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingItem.isEnd ?? false}
                  onChange={(e) => setEditingItem({ ...editingItem, isEnd: e.target.checked })}
                  className="w-4 h-4 accent-[var(--accent)]"
                />
                Symposium End Tag
              </label>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button type="submit" className="btn btn-primary text-xs flex-1 py-3 font-bold">
                Save Schedule Entry
              </button>
              <button type="button" onClick={() => setEditingItem(null)} className="btn btn-secondary text-xs">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Schedule Items List */}
      <div className="surface-card rounded-2xl border border-zinc-800 bg-zinc-900 divide-y divide-zinc-800 overflow-hidden">
        {schedule.map((item) => (
          <div key={item.id} className="p-4 flex items-center justify-between gap-4 hover:bg-zinc-950/50 transition-colors text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 text-[var(--accent)] flex items-center justify-center shrink-0 font-bold text-xs">
                <Clock size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[var(--accent)] font-bold">{item.time}</span>
                  {item.isBreak && <span className="badge badge-warning text-[10px]">Lunch Break</span>}
                  {item.isEnd && <span className="badge badge-accent text-[10px]">Closing</span>}
                </div>
                <h4 className="font-display font-bold text-sm text-white mt-0.5">{item.programme}</h4>
                {item.venue && <p className="text-xs text-zinc-400">📍 {item.venue}</p>}
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setEditingItem(item)}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                title="Edit Item"
              >
                <Edit3 size={14} />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                title="Delete Item"
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
