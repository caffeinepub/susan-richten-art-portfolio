import { useState } from 'react';
import { MediaItem, useCMS } from '../../contexts/CMSContext';
import { Tag, X, RefreshCw } from 'lucide-react';

interface MediaTileProps {
  item: MediaItem;
}

export default function MediaTile({ item }: MediaTileProps) {
  const { updateMediaItem, deleteMediaItem } = useCMS();
  const [newTag, setNewTag] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);

  function addTag() {
    const tag = newTag.trim();
    if (!tag || item.tags.includes(tag)) return;
    updateMediaItem(item.id, { tags: [...item.tags, tag] });
    setNewTag('');
    setShowTagInput(false);
  }

  function removeTag(tag: string) {
    updateMediaItem(item.id, { tags: item.tags.filter(t => t !== tag) });
  }

  return (
    <div className="bg-warm-white border border-sand/40 rounded-sm overflow-hidden group">
      <div className="relative aspect-square bg-sand/20">
        <img src={item.url} alt={item.filename} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button
            onClick={() => deleteMediaItem(item.id)}
            className="p-1.5 bg-red-500 text-white rounded-sm hover:bg-red-600 transition-colors"
            title="Delete"
          >
            <X size={14} />
          </button>
          <button
            className="p-1.5 bg-warm-white text-charcoal rounded-sm hover:bg-sand transition-colors"
            title="Re-upload"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      <div className="p-2">
        <p className="text-xs text-charcoal font-medium truncate">{item.filename}</p>
        {item.width > 0 && (
          <p className="text-xs text-charcoal-muted">{item.width} × {item.height}</p>
        )}
        {item.usedIn.length > 0 && (
          <p className="text-xs text-charcoal-muted mt-0.5">Used in: {item.usedIn.join(', ')}</p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-1.5">
          {item.tags.map(tag => (
            <span key={tag} className="flex items-center gap-0.5 px-1.5 py-0.5 bg-sand/40 text-charcoal-muted text-xs rounded-sm">
              {tag}
              <button onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors">
                <X size={10} />
              </button>
            </span>
          ))}
          {showTagInput ? (
            <input
              type="text"
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTag()}
              onBlur={() => { addTag(); setShowTagInput(false); }}
              autoFocus
              className="w-16 text-xs px-1 border border-gold/40 rounded-sm focus:outline-none"
              placeholder="tag"
            />
          ) : (
            <button
              onClick={() => setShowTagInput(true)}
              className="flex items-center gap-0.5 px-1.5 py-0.5 text-xs text-charcoal-muted hover:text-gold transition-colors"
            >
              <Tag size={10} /> add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
