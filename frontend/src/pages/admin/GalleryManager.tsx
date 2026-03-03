import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Star, GripVertical, CheckSquare, Square } from 'lucide-react';
import { useCMS, Artwork } from '../../contexts/CMSContext';
import ArtworkForm from '../../components/admin/ArtworkForm';
import { Skeleton } from '@/components/ui/skeleton';

export default function GalleryManager() {
  const { artworks, addArtwork, updateArtwork, deleteArtwork, isLoading } = useCMS();
  const [editingArtwork, setEditingArtwork] = useState<Artwork | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const sorted = [...artworks].sort((a, b) => a.order - b.order);
  const allSelected = sorted.length > 0 && selectedIds.size === sorted.length;

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(sorted.map(a => a.id)));
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this artwork? This cannot be undone.')) {
      deleteArtwork(id);
    }
  };

  function handleSave(data: Omit<Artwork, 'id'> | Artwork) {
    if ('id' in data) {
      updateArtwork(data.id, data);
    } else {
      addArtwork(data);
    }
    setShowForm(false);
    setEditingArtwork(undefined);
  }

  // Bulk actions
  const bulkUpdate = (patch: Partial<Artwork>) => {
    selectedIds.forEach(id => updateArtwork(id, patch));
    setSelectedIds(new Set());
  };

  const bulkDelete = () => {
    selectedIds.forEach(id => deleteArtwork(id));
    setSelectedIds(new Set());
    setShowDeleteConfirm(false);
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-4xl text-charcoal mb-1">Gallery Manager</h1>
          <p className="font-body text-sm text-charcoal-muted">{artworks.length} artworks</p>
        </div>
        <button
          onClick={() => { setEditingArtwork(undefined); setShowForm(true); }}
          className="flex items-center gap-2 px-5 py-3 bg-charcoal text-beige font-body text-sm tracking-wide hover:bg-charcoal-light transition-colors"
        >
          <Plus size={16} />
          Add Artwork
        </button>
      </div>

      {/* Bulk Actions Toolbar */}
      {selectedIds.size > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2 p-3 bg-charcoal text-beige rounded-sm">
          <span className="font-body text-sm mr-2">{selectedIds.size} selected</span>
          <button
            onClick={() => bulkUpdate({ featured: true })}
            className="px-3 py-1.5 bg-gold/20 text-gold font-body text-xs tracking-wide hover:bg-gold/30 transition-colors rounded-sm"
          >
            Mark Featured
          </button>
          <button
            onClick={() => bulkUpdate({ featured: false })}
            className="px-3 py-1.5 bg-beige/10 text-beige font-body text-xs tracking-wide hover:bg-beige/20 transition-colors rounded-sm"
          >
            Remove Featured
          </button>
          <button
            onClick={() => bulkUpdate({ available: false })}
            className="px-3 py-1.5 bg-beige/10 text-beige font-body text-xs tracking-wide hover:bg-beige/20 transition-colors rounded-sm"
          >
            Mark Sold
          </button>
          <button
            onClick={() => bulkUpdate({ available: true })}
            className="px-3 py-1.5 bg-beige/10 text-beige font-body text-xs tracking-wide hover:bg-beige/20 transition-colors rounded-sm"
          >
            Mark Available
          </button>
          <button
            onClick={() => {
              selectedIds.forEach(id => {
                const art = artworks.find(a => a.id === id);
                if (art) updateArtwork(id, { visible: !art.visible });
              });
              setSelectedIds(new Set());
            }}
            className="px-3 py-1.5 bg-beige/10 text-beige font-body text-xs tracking-wide hover:bg-beige/20 transition-colors rounded-sm"
          >
            Toggle Visibility
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-3 py-1.5 bg-red-500/20 text-red-300 font-body text-xs tracking-wide hover:bg-red-500/30 transition-colors rounded-sm"
          >
            Delete Selected
          </button>
          <button
            onClick={() => setSelectedIds(new Set())}
            className="ml-auto px-3 py-1.5 text-beige/60 font-body text-xs hover:text-beige transition-colors"
          >
            Clear
          </button>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-sm flex items-center justify-between gap-4">
          <p className="font-body text-sm text-red-700">
            Delete {selectedIds.size} artwork{selectedIds.size > 1 ? 's' : ''}? This cannot be undone.
          </p>
          <div className="flex gap-2">
            <button
              onClick={bulkDelete}
              className="px-4 py-2 bg-red-500 text-white font-body text-xs tracking-wide hover:bg-red-600 transition-colors rounded-sm"
            >
              Confirm Delete
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-2 border border-charcoal-muted text-charcoal font-body text-xs tracking-wide hover:bg-beige transition-colors rounded-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white shadow-xs overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-beige-dark">
              <th className="px-4 py-3 w-8">
                <button onClick={toggleSelectAll} className="text-charcoal-muted hover:text-charcoal transition-colors">
                  {allSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                </button>
              </th>
              <th className="px-4 py-3 text-left font-body text-xs tracking-widest uppercase text-charcoal-muted w-8"></th>
              <th className="px-4 py-3 text-left font-body text-xs tracking-widest uppercase text-charcoal-muted">Artwork</th>
              <th className="px-4 py-3 text-left font-body text-xs tracking-widest uppercase text-charcoal-muted hidden md:table-cell">Category</th>
              <th className="px-4 py-3 text-left font-body text-xs tracking-widest uppercase text-charcoal-muted hidden lg:table-cell">Status</th>
              <th className="px-4 py-3 text-left font-body text-xs tracking-widest uppercase text-charcoal-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-beige-dark">
                    <td className="px-4 py-3"><Skeleton className="w-4 h-4" /></td>
                    <td className="px-4 py-3"><Skeleton className="w-4 h-4" /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-12 h-10 shrink-0" />
                        <div className="space-y-1">
                          <Skeleton className="h-3 w-32" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell"><Skeleton className="h-3 w-16" /></td>
                    <td className="px-4 py-3 hidden lg:table-cell"><Skeleton className="h-5 w-20" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-6 w-20" /></td>
                  </tr>
                ))
              : sorted.map(artwork => (
                  <tr key={artwork.id} className="border-b border-beige-dark last:border-0 hover:bg-beige/30 transition-colors">
                    <td className="px-4 py-3">
                      <button onClick={() => toggleSelect(artwork.id)} className="text-charcoal-muted hover:text-charcoal transition-colors">
                        {selectedIds.has(artwork.id) ? <CheckSquare size={16} className="text-gold" /> : <Square size={16} />}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <GripVertical size={16} className="text-charcoal-muted cursor-grab" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-10 overflow-hidden shrink-0 bg-beige">
                          <img src={artwork.image} alt={artwork.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-body text-sm font-medium text-charcoal">{artwork.title}</p>
                          <p className="font-body text-xs text-charcoal-muted">{artwork.year} · {artwork.medium}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-body text-sm text-charcoal-muted hidden md:table-cell">
                      {artwork.category}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        {artwork.featured && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gold/10 text-gold text-xs font-body rounded-sm">
                            <Star size={10} /> Featured
                          </span>
                        )}
                        {artwork.available && (
                          <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs font-body rounded-sm">
                            Available
                          </span>
                        )}
                        {!artwork.visible && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-body rounded-sm">
                            Hidden
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateArtwork(artwork.id, { visible: !artwork.visible })}
                          className="p-1.5 text-charcoal-muted hover:text-charcoal transition-colors"
                          title={artwork.visible ? 'Hide' : 'Show'}
                        >
                          {artwork.visible ? <Eye size={15} /> : <EyeOff size={15} />}
                        </button>
                        <button
                          onClick={() => { setEditingArtwork(artwork); setShowForm(true); }}
                          className="p-1.5 text-charcoal-muted hover:text-charcoal transition-colors"
                          title="Edit"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(artwork.id)}
                          className="p-1.5 text-charcoal-muted hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        {!isLoading && artworks.length === 0 && (
          <div className="p-12 text-center">
            <p className="font-body text-charcoal-muted italic">No artworks yet. Add your first artwork above.</p>
          </div>
        )}
      </div>

      {showForm && (
        <ArtworkForm
          artwork={editingArtwork}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditingArtwork(undefined); }}
        />
      )}
    </div>
  );
}
