import { useState } from 'react';
import { Artwork } from '../../contexts/CMSContext';
import { X, Upload } from 'lucide-react';

interface ArtworkFormProps {
  artwork?: Artwork;
  onSave: (artwork: Omit<Artwork, 'id'> | Artwork) => void;
  onClose: () => void;
}

interface FormState {
  title: string;
  year: number;
  medium: string;
  size: string;
  location: string;
  description: string;
  category: string;
  image: string;
  additionalImages: string[];
  available: boolean;
  featured: boolean;
  visible: boolean;
  order: number;
}

export default function ArtworkForm({ artwork, onSave, onClose }: ArtworkFormProps) {
  const [form, setForm] = useState<FormState>({
    title: artwork?.title ?? '',
    year: artwork?.year ?? new Date().getFullYear(),
    medium: artwork?.medium ?? '',
    size: artwork?.size ?? '',
    location: artwork?.location ?? '',
    description: artwork?.description ?? '',
    category: artwork?.category ?? '',
    image: artwork?.image ?? '',
    additionalImages: artwork?.additionalImages ?? [],
    available: artwork?.available ?? true,
    featured: artwork?.featured ?? false,
    visible: artwork?.visible ?? true,
    order: artwork?.order ?? 0,
  });

  function handleSave() {
    const data: Omit<Artwork, 'id'> = {
      title: form.title,
      year: form.year,
      medium: form.medium,
      size: form.size,
      location: form.location,
      description: form.description,
      category: form.category,
      image: form.image,
      additionalImages: form.additionalImages,
      available: form.available,
      featured: form.featured,
      visible: form.visible,
      order: form.order,
    };
    if (artwork) {
      onSave({ ...data, id: artwork.id });
    } else {
      onSave(data);
    }
  }

  function addAdditionalImage(url: string) {
    if (!url.trim()) return;
    setForm(f => ({ ...f, additionalImages: [...f.additionalImages, url.trim()] }));
  }

  function removeAdditionalImage(index: number) {
    setForm(f => ({ ...f, additionalImages: f.additionalImages.filter((_, i) => i !== index) }));
  }

  const inputClass = 'w-full px-3 py-2 border border-sand/60 rounded-sm bg-warm-white text-charcoal text-sm focus:outline-none focus:border-gold';
  const labelClass = 'block text-xs font-medium text-charcoal-muted uppercase tracking-wide mb-1';

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/60 flex items-center justify-center p-4">
      <div className="bg-warm-white rounded-sm shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-sand/40">
          <h2 className="font-serif text-xl text-charcoal">{artwork ? 'Edit Artwork' : 'Add Artwork'}</h2>
          <button onClick={onClose} className="text-charcoal-muted hover:text-charcoal transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelClass}>Title</label>
              <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className={inputClass} placeholder="Artwork title" />
            </div>
            <div>
              <label className={labelClass}>Year</label>
              <input type="number" value={form.year} onChange={e => setForm(f => ({ ...f, year: Number(e.target.value) }))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <input type="text" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className={inputClass} placeholder="e.g. Seascapes" />
            </div>
            <div>
              <label className={labelClass}>Medium</label>
              <input type="text" value={form.medium} onChange={e => setForm(f => ({ ...f, medium: e.target.value }))} className={inputClass} placeholder="e.g. Oil on Canvas" />
            </div>
            <div>
              <label className={labelClass}>Size</label>
              <input type="text" value={form.size} onChange={e => setForm(f => ({ ...f, size: e.target.value }))} className={inputClass} placeholder='e.g. 24" × 30"' />
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Location</label>
              <input type="text" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className={inputClass} placeholder="e.g. Private Collection, Honolulu" />
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Image URL</label>
              <input type="text" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} className={inputClass} placeholder="/assets/..." />
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Description</label>
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className={inputClass} placeholder="Artwork description..." />
            </div>
          </div>

          {/* Availability & toggles */}
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm text-charcoal cursor-pointer">
              <input
                type="checkbox"
                checked={form.available}
                onChange={e => setForm(f => ({ ...f, available: e.target.checked }))}
                className="rounded"
              />
              Available for sale
            </label>
            <label className="flex items-center gap-2 text-sm text-charcoal cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                className="rounded"
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm text-charcoal cursor-pointer">
              <input
                type="checkbox"
                checked={form.visible}
                onChange={e => setForm(f => ({ ...f, visible: e.target.checked }))}
                className="rounded"
              />
              Visible in gallery
            </label>
          </div>

          {/* Additional Photos */}
          <div>
            <label className={labelClass}>Additional Photos</label>
            <div className="space-y-2 mb-2">
              {form.additionalImages.map((img, i) => (
                <div key={i} className="flex items-center gap-2">
                  <img src={img} alt={`Additional ${i + 1}`} className="w-12 h-12 object-cover rounded-sm border border-sand/40" />
                  <span className="flex-1 text-xs text-charcoal-muted truncate">{img}</span>
                  <button onClick={() => removeAdditionalImage(i)} className="text-red-400 hover:text-red-600 shrink-0">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                id="additional-image-input"
                type="text"
                placeholder="Image URL..."
                className={inputClass}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    addAdditionalImage((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById('additional-image-input') as HTMLInputElement;
                  if (input) { addAdditionalImage(input.value); input.value = ''; }
                }}
                className="px-3 py-2 border border-sand/60 rounded-sm text-charcoal-muted hover:text-charcoal hover:border-gold transition-colors shrink-0"
              >
                <Upload size={16} />
              </button>
            </div>
            <p className="text-xs text-charcoal-muted mt-1">Press Enter or click the button to add each URL.</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-sand/40">
          <button onClick={onClose} className="px-4 py-2 text-sm text-charcoal-muted hover:text-charcoal transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-gold text-warm-white text-sm font-medium rounded-sm hover:bg-gold/90 transition-colors"
          >
            {artwork ? 'Save Changes' : 'Add Artwork'}
          </button>
        </div>
      </div>
    </div>
  );
}
