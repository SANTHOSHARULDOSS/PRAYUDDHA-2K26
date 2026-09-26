import { useState } from 'react';
import { Users, Plus, Edit3, Trash2, Crown, Phone, CheckCircle2, X } from 'lucide-react';
import type { TeamMemberData } from '@/types/cms';
import { cmsService } from '@/services/cmsService';

interface TabTeamProps {
  team: TeamMemberData[];
}

export default function TabTeam({ team }: TabTeamProps) {
  const [editingMember, setEditingMember] = useState<Partial<TeamMemberData> | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember || !editingMember.name || !editingMember.role) return;

    const finalMember: TeamMemberData = {
      id: editingMember.id || `tm-${Date.now()}`,
      name: editingMember.name,
      initial: editingMember.initial || '',
      role: editingMember.role,
      phone: editingMember.phone || '',
      photo: editingMember.photo || '',
      priority: editingMember.priority ?? false,
      displayOrder: editingMember.displayOrder || team.length + 1,
    };

    cmsService.saveTeamMember(finalMember);
    setEditingMember(null);
    showToast(`Committee member "${finalMember.name}" saved!`);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this committee member?')) {
      cmsService.deleteTeamMember(id);
      showToast('Committee member removed.');
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
            <Users size={22} className="text-[var(--accent)]" />
            Core Committee Leadership Management
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Add/edit team members, change roles, update contact phone numbers, set President/VP highlights, and reorder members.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingMember({
              name: '',
              initial: '',
              role: 'Coordinator',
              phone: '',
              priority: false,
              displayOrder: team.length + 1,
            })
          }
          className="btn btn-primary text-xs flex items-center gap-1.5 shrink-0"
        >
          <Plus size={15} />
          Add Committee Member
        </button>
      </div>

      {/* Notice box */}
      <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 flex items-center justify-between">
        <span>💡 Committee data modified here serves as the single source of truth across Team & Contact pages.</span>
        <span className="badge badge-accent text-[10px]">Single Source of Truth</span>
      </div>

      {/* Edit / Add Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleSaveMember}
            className="surface-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900 max-w-md w-full space-y-4 text-white shadow-2xl relative"
          >
            <button
              type="button"
              onClick={() => setEditingMember(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X size={18} />
            </button>

            <h3 className="font-display font-bold text-lg border-b border-zinc-800 pb-3">
              {editingMember.id ? 'Edit Committee Member' : 'Add Committee Member'}
            </h3>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Full Name</label>
              <input
                type="text"
                required
                value={editingMember.name || ''}
                onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm"
                placeholder="M. Lakshana"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Role / Designation</label>
                <input
                  type="text"
                  required
                  value={editingMember.role || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm"
                  placeholder="Overall Coordinator"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Phone Number</label>
                <input
                  type="text"
                  value={editingMember.phone || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, phone: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm"
                  placeholder="9344848321"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
              <div>
                <p className="text-xs font-bold">Leadership Priority Highlight</p>
                <p className="text-[11px] text-zinc-400">Highlights member as President/VP in top card row.</p>
              </div>
              <input
                type="checkbox"
                checked={editingMember.priority ?? false}
                onChange={(e) => setEditingMember({ ...editingMember, priority: e.target.checked })}
                className="w-4 h-4 accent-[var(--accent)]"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button type="submit" className="btn btn-primary text-xs flex-1 py-3 font-bold">
                Save Committee Member
              </button>
              <button type="button" onClick={() => setEditingMember(null)} className="btn btn-secondary text-xs">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Members Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {team.map((m) => (
          <div
            key={m.id}
            className={`surface-card p-5 rounded-2xl border bg-zinc-900 flex flex-col justify-between space-y-3 ${
              m.priority ? 'border-[var(--accent)]' : 'border-zinc-800'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center font-bold">
                {m.priority ? <Crown size={20} /> : m.name[0]}
              </div>
              {m.priority && <span className="badge badge-accent text-[10px]">Leader</span>}
            </div>

            <div>
              <h4 className="font-display font-bold text-sm text-white">{m.name}</h4>
              <p className="text-xs text-[var(--accent)] font-semibold">{m.role}</p>
              {m.phone && (
                <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1 font-mono">
                  <Phone size={12} /> {m.phone}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-1">
              <button
                onClick={() => setEditingMember(m)}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                title="Edit Member"
              >
                <Edit3 size={14} />
              </button>
              <button
                onClick={() => handleDelete(m.id)}
                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                title="Delete Member"
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
