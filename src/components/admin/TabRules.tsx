import { useState } from 'react';
import { FileCheck, Edit3, Plus, CheckCircle2, X } from 'lucide-react';
import type { RuleCategoryData } from '@/types/cms';
import { cmsService } from '@/services/cmsService';

interface TabRulesProps {
  rules: RuleCategoryData[];
}

export default function TabRules({ rules }: TabRulesProps) {
  const [editingCategory, setEditingCategory] = useState<Partial<RuleCategoryData> | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !editingCategory.category) return;

    const finalCategory: RuleCategoryData = {
      id: editingCategory.id || `rule-${Date.now()}`,
      category: editingCategory.category,
      icon: editingCategory.icon || 'info',
      rules: editingCategory.rules || ['Follow coordinator instructions.'],
    };

    cmsService.saveRules(finalCategory);
    setEditingCategory(null);
    showToast('Rule category saved live!');
  };

  return (
    <div className="space-y-6">
      {toastMsg && (
        <div className="fixed top-4 right-4 z-[100] bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={16} />
          {toastMsg}
        </div>
      )}

      <div className="surface-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
            <FileCheck size={22} className="text-[var(--accent)]" />
            General & Symposium Rules Management
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Manage general rules, registration rules, payment guidelines, dress code, and reporting time instructions.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingCategory({
              category: '',
              icon: 'info',
              rules: ['Rule line 1', 'Rule line 2'],
            })
          }
          className="btn btn-primary text-xs flex items-center gap-1.5 shrink-0"
        >
          <Plus size={15} />
          Add Rule Category
        </button>
      </div>

      {editingCategory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleSave}
            className="surface-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900 max-w-lg w-full space-y-4 text-white shadow-2xl relative"
          >
            <button
              type="button"
              onClick={() => setEditingCategory(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X size={18} />
            </button>

            <h3 className="font-display font-bold text-lg border-b border-zinc-800 pb-3">
              {editingCategory.id ? 'Edit Rule Category' : 'New Rule Category'}
            </h3>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Category Name</label>
              <input
                type="text"
                required
                value={editingCategory.category || ''}
                onChange={(e) => setEditingCategory({ ...editingCategory, category: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm"
                placeholder="General Rules"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">
                Rules Bullet Points (One per line)
              </label>
              <textarea
                rows={6}
                required
                value={editingCategory.rules ? editingCategory.rules.join('\n') : ''}
                onChange={(e) => setEditingCategory({ ...editingCategory, rules: e.target.value.split('\n').filter(Boolean) })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs font-mono resize-none leading-relaxed"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button type="submit" className="btn btn-primary text-xs flex-1 py-3 font-bold">
                Save Rule Category
              </button>
              <button type="button" onClick={() => setEditingCategory(null)} className="btn btn-secondary text-xs">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {rules.map((cat) => (
          <div key={cat.id} className="surface-card p-5 rounded-2xl border border-zinc-800 bg-zinc-900 space-y-3 text-white">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-display font-bold text-base text-[var(--accent)]">{cat.category}</h3>
              <button
                onClick={() => setEditingCategory(cat)}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                title="Edit Rules"
              >
                <Edit3 size={14} />
              </button>
            </div>

            <ul className="space-y-1.5 text-xs text-zinc-300">
              {cat.rules.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0 mt-1.5" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
