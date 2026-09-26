import { useState } from 'react';
import { Upload, Plus, Trash2, Edit3, Eye, EyeOff, Image as ImageIcon, CheckCircle2, X } from 'lucide-react';
import type { GalleryItemData } from '@/types/cms';
import { uploadMediaFile } from '@/lib/supabase';
import { cmsService } from '@/services/cmsService';

interface TabGalleryProps {
  gallery: GalleryItemData[];
}

export default function TabGallery({ gallery }: TabGalleryProps) {
  const [editingItem, setEditingItem] = useState<Partial<GalleryItemData> | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const categories = ['Inauguration', 'Events', 'Behind the Scenes', 'Venue', 'Other'] as const;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = await uploadMediaFile(file, 'gallery');

        const newItem: GalleryItemData = {
          id: `g-${Date.now()}-${i}`,
          title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          description: 'Uploaded photo from admin dashboard.',
          category: 'Events',
          image: url,
          displayOrder: gallery.length + i + 1,
          date: new Date().toISOString().split('T')[0],
          isPublished: true,
        };

        cmsService.saveGalleryPhoto(newItem);
      }
      showToast(`${files.length} photo(s) uploaded successfully!`);
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.title || !editingItem.image) return;

    const finalItem: GalleryItemData = {
      id: editingItem.id || `g-${Date.now()}`,
      title: editingItem.title,
      description: editingItem.description || '',
      category: (editingItem.category as any) || 'Events',
      image: editingItem.image,
      displayOrder: editingItem.displayOrder || gallery.length + 1,
      date: editingItem.date || new Date().toISOString().split('T')[0],
      isPublished: editingItem.isPublished ?? true,
    };

    cmsService.saveGalleryPhoto(finalItem);
    setEditingItem(null);
    showToast('Gallery photo saved successfully!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this gallery photo?')) {
      cmsService.deleteGalleryPhoto(id);
      showToast('Gallery photo deleted.');
    }
  };

  const togglePublish = (item: GalleryItemData) => {
    cmsService.saveGalleryPhoto({ ...item, isPublished: !item.isPublished });
    showToast(`Photo ${item.isPublished ? 'unpublished' : 'published'} live.`);
  };

  return (
    <div className="space-y-6">
      {toastMsg && (
        <div className="fixed top-4 right-4 z-[100] bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={16} />
          {toastMsg}
        </div>
      )}

      {/* Action Header */}
      <div className="surface-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
            <ImageIcon size={22} className="text-[var(--accent)]" />
            Gallery Photo Management
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Upload, edit descriptions, change categories, set display order, and publish/unpublish gallery photos.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <label className="btn btn-primary text-xs cursor-pointer flex items-center gap-1.5 shadow-md">
            <Upload size={15} />
            {isUploading ? 'Uploading...' : 'Upload Photos'}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>

          <button
            onClick={() =>
              setEditingItem({
                title: '',
                description: '',
                category: 'Events',
                image: '',
                displayOrder: gallery.length + 1,
                date: new Date().toISOString().split('T')[0],
                isPublished: true,
              })
            }
            className="btn btn-secondary text-xs flex items-center gap-1.5"
          >
            <Plus size={15} />
            Add Photo URL
          </button>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleSaveItem}
            className="surface-card p-6 rounded-2xl border border-zinc-800 bg-zinc-900 max-w-lg w-full space-y-4 text-white shadow-2xl relative"
          >
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X size={18} />
            </button>

            <h3 className="font-display font-bold text-lg">
              {editingItem.id ? 'Edit Gallery Photo' : 'Add New Gallery Photo'}
            </h3>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Photo Title</label>
              <input
                type="text"
                required
                value={editingItem.title || ''}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm"
                placeholder="PRAYUDDHA Inauguration"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Description</label>
              <textarea
                rows={2}
                value={editingItem.description || ''}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm resize-none"
                placeholder="Moments from the inauguration ceremony."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Category</label>
                <select
                  value={editingItem.category || 'Events'}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Display Order</label>
                <input
                  type="number"
                  value={editingItem.displayOrder || 1}
                  onChange={(e) => setEditingItem({ ...editingItem, displayOrder: parseInt(e.target.value) || 1 })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase mb-1">Photo Image URL or File</label>
              <input
                type="text"
                required
                value={editingItem.image || ''}
                onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm font-mono"
                placeholder="/images/photo.jpg or https://..."
              />
            </div>

            {editingItem.image && (
              <div className="h-32 w-full rounded-xl overflow-hidden bg-black/40 border border-zinc-800 relative">
                <img src={editingItem.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="flex items-center gap-2 pt-2">
              <button type="submit" className="btn btn-primary text-xs flex-1">
                Save Photo
              </button>
              <button type="button" onClick={() => setEditingItem(null)} className="btn btn-secondary text-xs">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Photo Cards Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((photo) => (
          <div
            key={photo.id}
            className="surface-card rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 flex flex-col justify-between group"
          >
            <div className="relative aspect-video w-full bg-black/40 overflow-hidden">
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <span className="absolute top-2 left-2 badge badge-neutral text-[10px]">
                {photo.category}
              </span>
              <button
                onClick={() => togglePublish(photo)}
                className={`absolute top-2 right-2 p-1.5 rounded-lg backdrop-blur-md text-xs font-semibold ${
                  photo.isPublished ? 'bg-emerald-500/80 text-white' : 'bg-zinc-800/80 text-zinc-400'
                }`}
                title={photo.isPublished ? 'Published Live' : 'Unpublished (Draft)'}
              >
                {photo.isPublished ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
            </div>

            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-display font-bold text-sm text-white line-clamp-1">{photo.title}</h4>
                <p className="text-xs text-zinc-400 line-clamp-2 mt-1">{photo.description}</p>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
                <span className="text-zinc-500 font-mono text-[10px]">Order: #{photo.displayOrder}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingItem(photo)}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                    title="Edit Photo"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                    title="Delete Photo"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
