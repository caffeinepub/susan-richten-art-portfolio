import { useState } from "react";
import { useCMS } from "../../contexts/CMSContext";

export default function HeroEditor() {
  const { siteSettings, updateSiteSettings } = useCMS();
  const [form, setForm] = useState({
    heroArtistName: siteSettings.heroArtistName || "Susan Richten",
    heroTagline: siteSettings.heroTagline || "Fine Art & Commissions",
    heroIntroText: siteSettings.heroIntroText || "",
    artistIntro: siteSettings.heroIntroText || "",
  });
  const [saved, setSaved] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSave = () => {
    updateSiteSettings({
      heroArtistName: form.heroArtistName,
      heroTagline: form.heroTagline,
      heroIntroText: form.heroIntroText,
    });
    setIsDirty(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-charcoal mb-1">
          Hero Section
        </h2>
        <p className="text-sm text-charcoal/60">
          Edit the homepage hero content.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="hero-artist-name"
            className="block text-sm font-medium text-charcoal mb-1"
          >
            Artist Name
          </label>
          <input
            id="hero-artist-name"
            type="text"
            value={form.heroArtistName}
            onChange={(e) => handleChange("heroArtistName", e.target.value)}
            placeholder="Susan Richten"
            className="w-full border border-stone/30 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>

        <div>
          <label
            htmlFor="hero-tagline"
            className="block text-sm font-medium text-charcoal mb-1"
          >
            Tagline
          </label>
          <input
            id="hero-tagline"
            type="text"
            value={form.heroTagline}
            onChange={(e) => handleChange("heroTagline", e.target.value)}
            placeholder="Fine Art & Commissions"
            className="w-full border border-stone/30 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>

        <div>
          <label
            htmlFor="hero-intro-text"
            className="block text-sm font-medium text-charcoal mb-1"
          >
            Intro Text
          </label>
          <textarea
            id="hero-intro-text"
            value={form.heroIntroText}
            onChange={(e) => handleChange("heroIntroText", e.target.value)}
            rows={3}
            placeholder="Welcome to my studio..."
            className="w-full border border-stone/30 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold resize-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isDirty && (
          <span className="text-xs text-amber-600 flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
            Unsaved changes
          </span>
        )}
        <button
          type="button"
          onClick={handleSave}
          data-ocid="hero.save_button"
          className="bg-gold text-white px-4 py-2 rounded text-sm font-medium hover:bg-gold/90 transition-colors"
        >
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
