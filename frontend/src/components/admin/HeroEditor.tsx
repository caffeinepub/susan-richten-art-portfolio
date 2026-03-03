import { useState } from 'react';
import { useCMS } from '../../contexts/CMSContext';

export default function HeroEditor() {
  const { siteSettings, updateSiteSettings } = useCMS();
  const [form, setForm] = useState({
    heroArtistName: siteSettings.heroArtistName || 'Susan Richten',
    heroTagline: siteSettings.heroTagline || 'Fine Art & Commissions',
    heroIntroText: siteSettings.heroIntroText || '',
    artistIntro: siteSettings.heroIntroText || '',
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateSiteSettings({
      heroArtistName: form.heroArtistName,
      heroTagline: form.heroTagline,
      heroIntroText: form.heroIntroText,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-charcoal mb-1">Hero Section</h2>
        <p className="text-sm text-charcoal/60">Edit the homepage hero content.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Artist Name</label>
          <input
            type="text"
            value={form.heroArtistName}
            onChange={e => handleChange('heroArtistName', e.target.value)}
            placeholder="Susan Richten"
            className="w-full border border-stone/30 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Tagline</label>
          <input
            type="text"
            value={form.heroTagline}
            onChange={e => handleChange('heroTagline', e.target.value)}
            placeholder="Fine Art & Commissions"
            className="w-full border border-stone/30 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Intro Text</label>
          <textarea
            value={form.heroIntroText}
            onChange={e => handleChange('heroIntroText', e.target.value)}
            rows={3}
            placeholder="Welcome to my studio..."
            className="w-full border border-stone/30 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold resize-none"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="bg-gold text-white px-4 py-2 rounded text-sm font-medium hover:bg-gold/90 transition-colors"
      >
        {saved ? 'Saved!' : 'Save Changes'}
      </button>
    </div>
  );
}
