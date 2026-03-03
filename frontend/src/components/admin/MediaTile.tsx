import { useState } from "react";
import { MediaItem, useCMS } from "../../contexts/CMSContext";
import { Tag, X, Upload, Trash2 } from "lucide-react";

interface MediaTileProps {
  item: MediaItem;
}

export function MediaTile({ item }: MediaTileProps) {
  const { updateMediaItem, deleteMediaItem } = useCMS();
  const [newTag, setNewTag] = useState("");
  const [showTags, setShowTags] = useState(false);

  const addTag = () => {
    const tag = newTag.trim();
    if (!tag || item.tags.includes(tag)) return;
    updateMediaItem(item.id, { tags: [...item.tags, tag] });
    setNewTag("");
  };

  const removeTag = (tag: string) => {
    updateMediaItem(item.id, { tags: item.tags.filter((t) => t !== tag) });
  };

  const handleReplace = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    updateMediaItem(item.id, { url, filename: file.name });
  };

  return (
    <div className="border border-border rounded-md overflow-hidden bg-background group">
      <div className="relative aspect-square bg-warm-50">
        <img
          src={item.url}
          alt={item.filename}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <label className="cursor-pointer w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors" title="Replace">
            <Upload className="w-4 h-4 text-foreground" />
            <input type="file" accept="image/*" className="hidden" onChange={handleReplace} />
          </label>
          <button
            onClick={() => deleteMediaItem(item.id)}
            className="w-8 h-8 bg-destructive/90 rounded-full flex items-center justify-center hover:bg-destructive transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
      <div className="p-2">
        <p className="text-xs font-medium text-foreground truncate" title={item.filename}>
          {item.filename}
        </p>
        {item.width > 0 && (
          <p className="text-xs text-muted-foreground">
            {item.width} × {item.height}
          </p>
        )}
        {item.usedIn.length > 0 && (
          <p className="text-xs text-muted-foreground truncate">
            Used in: {item.usedIn.join(", ")}
          </p>
        )}

        {/* Tags */}
        <div className="mt-2">
          <button
            onClick={() => setShowTags(!showTags)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Tag className="w-3 h-3" />
            {item.tags.length > 0 ? item.tags.join(", ") : "Add tags"}
          </button>
          {showTags && (
            <div className="mt-1 space-y-1">
              <div className="flex flex-wrap gap-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-0.5 text-xs bg-muted px-1.5 py-0.5 rounded-full"
                  >
                    {tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-destructive">
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-1">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTag()}
                  className="flex-1 text-xs border border-input rounded px-2 py-1 bg-background"
                  placeholder="New tag..."
                />
                <button
                  onClick={addTag}
                  className="text-xs px-2 py-1 bg-gold text-white rounded hover:bg-gold/90 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MediaTile;
