import { useState } from 'react';
import { useCMS } from '../../contexts/CMSContext';

export default function HeroEditor() {
  const { homepageSettings, updateHomepageSettings } = useCMS();

  const [form, setForm] = useState({
    heroArtistName: homepageSettings.heroArtistName,
    heroTagline: homepageSettings.heroTagline,
    heroImage: homepageSettings.heroImage,
    artistIntro: homepageSettings.artistIntro,
  });

  function handleSave() {
    updateHomepageSettings(form);
  }

  const inputClass = 'w-full px-3 py-2 border border-sand/60 rounded-sm bg-warm-white text-charcoal text-sm focus:outline-none focus:border-gold';
  const labelClass = 'block text-xs font-medium text-charcoal-muted uppercase tracking-wide mb-1';

  return (
    <div className="space-y-5">
      <h3 className="font-serif text-lg text-charcoal">Homepage Hero</h3>

      <div>
        <label className={labelClass}>Artist Name</label>
        <input
          type="text"
          value={form.heroArtistName}
          onChange={e => setForm(f => ({ ...f, heroArtistName: e.target.value }))}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Tagline</label>
        <input
          type="text"
          value={form.heroTagline}
          onChange={e => setForm(f => ({ ...f, heroTagline: e.target.value }))}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Hero Image URL</label>
        <input
          type="text"
          value={form.heroImage}
          onChange={e => setForm(f => ({ ...f, heroImage: e.target.value }))}
          className={inputClass}
          placeholder="/assets/generated/hero-bg.dim_1920x1080.png"
        />
      </div>

      <div>
        <label className={labelClass}>Artist Intro Text</label>
        <textarea
          value={form.artistIntro}
          onChange={e => setForm(f => ({ ...f, artistIntro: e.target.value }))}
          rows={4}
          className={inputClass}
        />
      </div>

      <button
        onClick={handleSave}
        className="px-6 py-2.5 bg-gold text-warm-white text-sm font-medium rounded-sm hover:bg-gold/90 transition-colors"
      >
        Save Hero
      </button>
    </div>
  );
}
