import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Star, GripVertical } from 'lucide-react';
import { useCMS, Artwork } from '../../contexts/CMSContext';
import { ArtworkForm } from '../../components/admin/ArtworkForm';

export function GalleryManager() {
  const { artworks, updateArtwork, deleteArtwork } = useCMS();
  const [editingArtwork, setEditingArtwork] = useState<Artwork | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);

  const sorted = [...artworks].sort((a, b) => a.order - b.order);

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this artwork? This cannot be undone.')) {
      deleteArtwork(id);
    }
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
                      <img src={artwork.imageUrl} alt={artwork.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-body text-sm text-charcoal font-semibold">{artwork.title}</p>
                      <p className="font-body text-xs text-charcoal-muted">{artwork.year} · {artwork.medium}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="font-body text-xs text-charcoal-muted">{artwork.category}</span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span className={`font-body text-xs px-2 py-1 rounded ${
                    artwork.availability === 'Available' ? 'bg-sage/20 text-sage' : 'bg-charcoal/10 text-charcoal-muted'
                  }`}>
                    {artwork.availability}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateArtwork(artwork.id, { featured: !artwork.featured })}
                      className={`transition-colors ${artwork.featured ? 'text-gold' : 'text-charcoal-muted hover:text-gold'}`}
                      title={artwork.featured ? 'Remove from featured' : 'Add to featured'}
                    >
                      <Star size={16} fill={artwork.featured ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      onClick={() => updateArtwork(artwork.id, { visible: !artwork.visible })}
                      className={`transition-colors ${artwork.visible ? 'text-charcoal' : 'text-charcoal-muted'}`}
                      title={artwork.visible ? 'Hide' : 'Show'}
                    >
                      {artwork.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    <button
                      onClick={() => { setEditingArtwork(artwork); setShowForm(true); }}
                      className="text-charcoal-muted hover:text-charcoal transition-colors"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(artwork.id)}
                      className="text-charcoal-muted hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <ArtworkForm
          artwork={editingArtwork}
          onClose={() => { setShowForm(false); setEditingArtwork(undefined); }}
        />
      )}
    </div>
  );
}

export default GalleryManager;
