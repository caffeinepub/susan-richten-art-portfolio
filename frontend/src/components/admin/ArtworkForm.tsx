import { useRef, useState } from 'react';
import { Artwork } from '../../contexts/CMSContext';
import { X, Upload, ImagePlus } from 'lucide-react';

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

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
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

  const primaryImageInputRef = useRef<HTMLInputElement>(null);
  const additionalImageInputRef = useRef<HTMLInputElement>(null);

  async function handlePrimaryImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await readFileAsDataURL(file);
    setForm(f => ({ ...f, image: dataUrl }));
    e.target.value = '';
  }

  async function handleAdditionalImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    const dataUrls = await Promise.all(files.map(readFileAsDataURL));
    setForm(f => ({ ...f, additionalImages: [...f.additionalImages, ...dataUrls] }));
    e.target.value = '';
  }

  function removeAdditionalImage(index: number) {
    setForm(f => ({ ...f, additionalImages: f.additionalImages.filter((_, i) => i !== index) }));
  }

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
              <input
                type="text"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                className={inputClass}
                placeholder="Artwork title"
              />
            </div>
            <div>
              <label className={labelClass}>Year</label>
              <input
                type="number"
                value={form.year}
                onChange={e => setForm(f => ({ ...f, year: Number(e.target.value) }))}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <input
                type="text"
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className={inputClass}
                placeholder="e.g. Seascapes"
              />
            </div>
            <div>
              <label className={labelClass}>Medium</label>
              <input
                type="text"
                value={form.medium}
                onChange={e => setForm(f => ({ ...f, medium: e.target.value }))}
                className={inputClass}
                placeholder="e.g. Oil on Canvas"
              />
            </div>
            <div>
              <label className={labelClass}>Size</label>
              <input
                type="text"
                value={form.size}
                onChange={e => setForm(f => ({ ...f, size: e.target.value }))}
                className={inputClass}
                placeholder='e.g. 24" × 30"'
              />
            </div>
            <div className="col-span-2">
              <label className={labelClass}>Location</label>
              <input
                type="text"
                value={form.location}
                onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                className={inputClass}
                placeholder="e.g. Private Collection, Honolulu"
              />
            </div>

            {/* Primary Image Upload */}
            <div className="col-span-2">
              <label className={labelClass}>Primary Image</label>
              <div className="flex items-start gap-4">
                {form.image ? (
                  <div className="relative shrink-0">
                    <img
                      src={form.image}
                      alt="Primary artwork"
                      className="w-24 h-24 object-cover rounded-sm border border-sand/40"
                    />
                    <button
                      type="button"
                      onClick={() => setForm(f => ({ ...f, image: '' }))}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 border-2 border-dashed border-sand/60 rounded-sm flex items-center justify-center shrink-0 bg-sand/10">
                    <ImagePlus size={24} className="text-charcoal-muted/40" />
                  </div>
                )}
                <div className="flex-1">
                  <button
                    type="button"
                    onClick={() => primaryImageInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 border border-sand/60 rounded-sm text-sm text-charcoal-muted hover:text-charcoal hover:border-gold transition-colors"
                  >
                    <Upload size={15} />
                    {form.image ? 'Replace Image' : 'Upload Image'}
                  </button>
                  <p className="text-xs text-charcoal-muted mt-1.5">JPG, PNG, WebP supported</p>
                  <input
                    ref={primaryImageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePrimaryImageChange}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <label className={labelClass}>Description</label>
              <textarea
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                rows={3}
                className={inputClass}
                placeholder="Artwork description..."
              />
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
            {form.additionalImages.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mb-3">
                {form.additionalImages.map((img, i) => (
                  <div key={i} className="relative group/thumb">
                    <img
                      src={img}
                      alt={`Additional ${i + 1}`}
                      className="w-full aspect-square object-cover rounded-sm border border-sand/40"
                    />
                    <button
                      type="button"
                      onClick={() => removeAdditionalImage(i)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={() => additionalImageInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 border border-dashed border-sand/60 rounded-sm text-sm text-charcoal-muted hover:text-charcoal hover:border-gold transition-colors w-full justify-center"
            >
              <ImagePlus size={15} />
              Add Additional Photos
            </button>
            <input
              ref={additionalImageInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleAdditionalImageChange}
            />
            <p className="text-xs text-charcoal-muted mt-1">You can select multiple files at once.</p>
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
