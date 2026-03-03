import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Star, GripVertical } from 'lucide-react';
import { useCMS, Artwork } from '../../contexts/CMSContext';
import ArtworkForm from '../../components/admin/ArtworkForm';

export default function GalleryManager() {
  const { artworks, addArtwork, updateArtwork, deleteArtwork } = useCMS();
  const [editingArtwork, setEditingArtwork] = useState<Artwork | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);

  const sorted = [...artworks].sort((a, b) => a.order - b.order);

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

      <div className="bg-white shadow-xs overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-beige-dark">
              <th className="px-4 py-3 text-left font-body text-xs tracking-widest uppercase text-charcoal-muted w-8"></th>
              <th className="px-4 py-3 text-left font-body text-xs tracking-widest uppercase text-charcoal-muted">Artwork</th>
              <th className="px-4 py-3 text-left font-body text-xs tracking-widest uppercase text-charcoal-muted hidden md:table-cell">Category</th>
              <th className="px-4 py-3 text-left font-body text-xs tracking-widest uppercase text-charcoal-muted hidden lg:table-cell">Status</th>
              <th className="px-4 py-3 text-left font-body text-xs tracking-widest uppercase text-charcoal-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(artwork => (
              <tr key={artwork.id} className="border-b border-beige-dark last:border-0 hover:bg-beige/30 transition-colors">
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
        {artworks.length === 0 && (
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
