import React, { useState } from 'react';
import { Upload, Search } from 'lucide-react';
import { useCMS, MediaItem } from '../../contexts/CMSContext';
import { MediaTile } from '../../components/admin/MediaTile';

export function MediaLibrary() {
  const { mediaLibrary, addMediaItem } = useCMS();
  const [search, setSearch] = useState('');

  const filtered = mediaLibrary.filter(item =>
    item.filename.toLowerCase().includes(search.toLowerCase()) ||
    item.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    files.forEach(file => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const item: MediaItem = {
          id: `media-${Date.now()}-${Math.random()}`,
          url,
          filename: file.name,
          width: img.naturalWidth,
          height: img.naturalHeight,
          tags: [],
          usedIn: [],
          uploadedAt: new Date().toISOString(),
        };
        addMediaItem(item);
      };
      img.src = url;
    });
    e.target.value = '';
  };

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-4xl text-charcoal mb-1">Media Library</h1>
          <p className="font-body text-sm text-charcoal-muted">{mediaLibrary.length} items</p>
        </div>
        <label className="flex items-center gap-2 px-5 py-3 bg-charcoal text-beige font-body text-sm tracking-wide hover:bg-charcoal-light transition-colors cursor-pointer">
          <Upload size={16} />
          Upload Images
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
        </label>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by filename or tag..."
          className="w-full pl-9 pr-4 py-2.5 font-body text-sm border border-beige-dark bg-white text-charcoal focus:outline-none focus:border-charcoal transition-colors"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white p-12 text-center shadow-xs">
          <p className="font-body text-charcoal-muted italic">
            {mediaLibrary.length === 0 ? 'No images uploaded yet.' : 'No results found.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(item => (
            <MediaTile key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MediaLibrary;
