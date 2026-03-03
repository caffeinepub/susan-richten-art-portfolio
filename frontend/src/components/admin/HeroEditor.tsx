import React, { useState } from 'react';
import { useCMS } from '../../contexts/CMSContext';
import { toast } from 'sonner';

export function HeroEditor() {
  const { homepageSettings, setHomepageSettings } = useCMS();
  const [form, setForm] = useState({ ...homepageSettings });

  const handleSave = () => {
    setHomepageSettings(form);
    toast.success('Homepage hero updated');
  };

  const inputClass = 'w-full px-3 py-2 font-body text-sm border border-beige-dark bg-white text-charcoal focus:outline-none focus:border-charcoal transition-colors';

  return (
    <div className="space-y-4">
      <h3 className="font-heading text-xl text-charcoal">Homepage Hero</h3>
      <div>
        <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Artist Name</label>
        <input
          type="text"
          value={form.heroArtistName}
          onChange={e => setForm(f => ({ ...f, heroArtistName: e.target.value }))}
          className={inputClass}
        />
      </div>
      <div>
        <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Tagline</label>
        <input
          type="text"
          value={form.heroTagline}
          onChange={e => setForm(f => ({ ...f, heroTagline: e.target.value }))}
          className={inputClass}
          placeholder="Artist needs to enter info here"
        />
      </div>
      <div>
        <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Artist Intro (Homepage)</label>
        <textarea
          value={form.artistIntro}
          onChange={e => setForm(f => ({ ...f, artistIntro: e.target.value }))}
          rows={3}
          className={inputClass}
          placeholder="Brief introduction paragraph..."
        />
      </div>
      <div>
        <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Hero Image Upload</label>
        <input
          type="file"
          accept="image/*"
          className="w-full font-body text-xs text-charcoal-light file:mr-3 file:py-1.5 file:px-3 file:border-0 file:bg-beige-dark file:text-charcoal file:font-body file:text-xs file:cursor-pointer"
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) setForm(f => ({ ...f, heroImage: URL.createObjectURL(file) }));
          }}
        />
        {form.heroImage && (
          <div className="mt-2 w-24 h-16 overflow-hidden rounded border border-beige-dark">
            <img src={form.heroImage} alt="Hero preview" className="w-full h-full object-cover" />
          </div>
        )}
      </div>
      <button
        onClick={handleSave}
        className="px-6 py-2.5 bg-charcoal text-beige font-body text-sm tracking-wide hover:bg-charcoal-light transition-colors"
      >
        Save Hero Content
      </button>
    </div>
  );
}

export default HeroEditor;
