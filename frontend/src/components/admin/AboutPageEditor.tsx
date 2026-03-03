import { useState } from 'react';
import { useCMS, CareerMilestone, PressMention } from '../../contexts/CMSContext';

export default function AboutPageEditor() {
  const { aboutPageContent, updateAboutPageContent, updateCareerMilestones } = useCMS();

  const [form, setForm] = useState({
    bio: aboutPageContent.bio,
    artistStatement: aboutPageContent.artistStatement,
    portraitImage: aboutPageContent.portraitImage,
    careerMilestones: aboutPageContent.careerMilestones,
    pressLinks: aboutPageContent.pressLinks,
  });

  const [newPressLink, setNewPressLink] = useState<Omit<PressMention, 'id'>>({
    publication: '',
    date: '',
    headline: '',
    url: '',
    excerpt: '',
  });

  function addMilestone() {
    setForm(f => ({
      ...f,
      careerMilestones: [
        ...f.careerMilestones,
        { id: `ml-${Date.now()}`, year: String(new Date().getFullYear()), event: '' },
      ],
    }));
  }

  function removeMilestone(id: string) {
    setForm(f => ({ ...f, careerMilestones: f.careerMilestones.filter(m => m.id !== id) }));
  }

  function updateMilestone(id: string, field: keyof CareerMilestone, value: string) {
    setForm(f => ({
      ...f,
      careerMilestones: f.careerMilestones.map(m => m.id === id ? { ...m, [field]: value } : m),
    }));
  }

  function handleSave() {
    updateAboutPageContent({
      bio: form.bio,
      artistStatement: form.artistStatement,
      portraitImage: form.portraitImage,
      careerMilestones: form.careerMilestones,
      pressLinks: form.pressLinks,
    });
    updateCareerMilestones(form.careerMilestones);
  }

  function addPressLink() {
    if (!newPressLink.publication || !newPressLink.headline) return;
    const link: PressMention = { ...newPressLink, id: Date.now().toString() };
    setForm(f => ({ ...f, pressLinks: [...f.pressLinks, link] }));
    setNewPressLink({ publication: '', date: '', headline: '', url: '', excerpt: '' });
  }

  function removePressLink(id: string) {
    setForm(f => ({ ...f, pressLinks: f.pressLinks.filter(p => p.id !== id) }));
  }

  const inputClass = 'w-full px-3 py-2 border border-sand/60 rounded-sm bg-warm-white text-charcoal text-sm focus:outline-none focus:border-gold';
  const labelClass = 'block text-xs font-medium text-charcoal-muted uppercase tracking-wide mb-1';

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-serif text-lg text-charcoal mb-4">About Page Content</h3>

        <div className="space-y-4">
          <div>
            <label className={labelClass}>Biography</label>
            <textarea
              value={form.bio}
              onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
              rows={5}
              className={inputClass}
              placeholder="Artist biography..."
            />
          </div>

          <div>
            <label className={labelClass}>Artist Statement</label>
            <textarea
              value={form.artistStatement}
              onChange={e => setForm(f => ({ ...f, artistStatement: e.target.value }))}
              rows={5}
              className={inputClass}
              placeholder="Artist statement..."
            />
          </div>

          <div>
            <label className={labelClass}>Portrait Image URL</label>
            <input
              type="text"
              value={form.portraitImage}
              onChange={e => setForm(f => ({ ...f, portraitImage: e.target.value }))}
              className={inputClass}
              placeholder="/assets/generated/artist-portrait.dim_800x1000.png"
            />
          </div>
        </div>
      </div>

      {/* Career Milestones */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-charcoal">Career Milestones</h4>
          <button
            onClick={addMilestone}
            className="text-xs text-gold hover:text-gold/80 border border-gold/40 hover:border-gold px-3 py-1 rounded-sm transition-colors"
          >
            + Add Milestone
          </button>
        </div>
        <div className="space-y-2">
          {form.careerMilestones.map(m => (
            <div key={m.id} className="flex gap-2 items-center">
              <input
                type="text"
                value={m.year}
                onChange={e => updateMilestone(m.id, 'year', e.target.value)}
                className="w-20 px-2 py-1.5 border border-sand/60 rounded-sm text-sm bg-warm-white text-charcoal focus:outline-none focus:border-gold"
                placeholder="Year"
              />
              <input
                type="text"
                value={m.event}
                onChange={e => updateMilestone(m.id, 'event', e.target.value)}
                className="flex-1 px-2 py-1.5 border border-sand/60 rounded-sm text-sm bg-warm-white text-charcoal focus:outline-none focus:border-gold"
                placeholder="Event description"
              />
              <button
                onClick={() => removeMilestone(m.id)}
                className="text-red-400 hover:text-red-600 text-xs px-2 py-1 shrink-0"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Press Links */}
      <div>
        <h4 className="font-medium text-charcoal mb-3">Press Links</h4>
        <div className="space-y-2 mb-4">
          {form.pressLinks.map(p => (
            <div key={p.id} className="flex items-center gap-2 p-2 bg-sand/20 rounded-sm text-sm">
              <span className="flex-1 text-charcoal">{p.publication} — {p.headline}</span>
              <button onClick={() => removePressLink(p.id)} className="text-red-400 hover:text-red-600 shrink-0">✕</button>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <input
            type="text"
            value={newPressLink.publication}
            onChange={e => setNewPressLink(p => ({ ...p, publication: e.target.value }))}
            className={inputClass}
            placeholder="Publication"
          />
          <input
            type="text"
            value={newPressLink.headline}
            onChange={e => setNewPressLink(p => ({ ...p, headline: e.target.value }))}
            className={inputClass}
            placeholder="Headline"
          />
          <input
            type="text"
            value={newPressLink.date}
            onChange={e => setNewPressLink(p => ({ ...p, date: e.target.value }))}
            className={inputClass}
            placeholder="Date (YYYY-MM-DD)"
          />
          <input
            type="url"
            value={newPressLink.url}
            onChange={e => setNewPressLink(p => ({ ...p, url: e.target.value }))}
            className={inputClass}
            placeholder="URL"
          />
        </div>
        <textarea
          value={newPressLink.excerpt}
          onChange={e => setNewPressLink(p => ({ ...p, excerpt: e.target.value }))}
          rows={2}
          className={inputClass}
          placeholder="Excerpt..."
        />
        <button
          onClick={addPressLink}
          className="mt-2 text-xs text-gold hover:text-gold/80 border border-gold/40 hover:border-gold px-3 py-1 rounded-sm transition-colors"
        >
          + Add Press Link
        </button>
      </div>

      <button
        onClick={handleSave}
        className="px-6 py-2.5 bg-gold text-warm-white text-sm font-medium rounded-sm hover:bg-gold/90 transition-colors"
      >
        Save About Page
      </button>
    </div>
  );
}
