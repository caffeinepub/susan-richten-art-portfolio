import { useRef, useState } from 'react';
import { MediaItem, useCMS } from '../../contexts/CMSContext';
import { Tag, X, RefreshCw } from 'lucide-react';

interface MediaTileProps {
  item: MediaItem;
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function MediaTile({ item }: MediaTileProps) {
  const { updateMediaItem, deleteMediaItem } = useCMS();
  const [newTag, setNewTag] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const reuploadRef = useRef<HTMLInputElement>(null);

  function addTag() {
    const tag = newTag.trim();
    if (!tag || item.tags.includes(tag)) return;
    updateMediaItem({ ...item, tags: [...item.tags, tag] });
    setNewTag('');
    setShowTagInput(false);
  }

  function removeTag(tag: string) {
    updateMediaItem({ ...item, tags: item.tags.filter(t => t !== tag) });
  }

  async function handleReupload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await readFileAsDataURL(file);
    updateMediaItem({ ...item, url: dataUrl, filename: file.name });
    if (reuploadRef.current) reuploadRef.current.value = '';
  }

  return (
    <div className="bg-white shadow-xs overflow-hidden group">
      {/* Thumbnail */}
      <div className="relative aspect-square bg-beige overflow-hidden">
        <img
          src={item.url}
          alt={item.filename}
          className="w-full h-full object-cover"
        />
        {/* Overlay actions */}
        <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={() => reuploadRef.current?.click()}
            className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-sm transition-colors"
            title="Replace image"
          >
            <RefreshCw size={14} />
          </button>
          <button
            onClick={() => deleteMediaItem(item.id)}
            className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-sm transition-colors"
            title="Delete"
          >
            <X size={14} />
          </button>
        </div>
        <input
          ref={reuploadRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleReupload}
        />
      </div>

      {/* Info */}
      <div className="p-2">
        <p className="font-body text-xs text-charcoal truncate" title={item.filename}>
          {item.filename}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-1.5">
          {item.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-beige text-charcoal-muted text-[10px] rounded-sm"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="hover:text-red-500 transition-colors"
              >
                <X size={8} />
              </button>
            </span>
          ))}
          {showTagInput ? (
            <input
              autoFocus
              type="text"
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') addTag(); if (e.key === 'Escape') setShowTagInput(false); }}
              onBlur={addTag}
              placeholder="tag"
              className="w-16 text-[10px] border border-beige-dark px-1 py-0.5 focus:outline-none"
            />
          ) : (
            <button
              onClick={() => setShowTagInput(true)}
              className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-charcoal-muted hover:text-charcoal text-[10px] border border-dashed border-beige-dark rounded-sm transition-colors"
            >
              <Tag size={8} /> tag
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
