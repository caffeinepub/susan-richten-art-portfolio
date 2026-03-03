import { useState } from 'react';
import { useCMS } from '../../contexts/CMSContext';
import type { CareerMilestone, PressMention } from '../../contexts/CMSContext';

export default function AboutPageEditor() {
  const {
    siteSettings,
    updateSiteSettings,
    careerMilestones,
    updateCareerMilestones,
    pressMentions,
    setPressMentions,
  } = useCMS();

  const [bio, setBio] = useState(siteSettings.aboutBio || '');
  const [artistStatement, setArtistStatement] = useState(siteSettings.artistStatement || '');
  const [saved, setSaved] = useState(false);

  const [newMilestone, setNewMilestone] = useState({ year: '', event: '' });
  const [newPressLink, setNewPressLink] = useState({ publication: '', date: '', headline: '', url: '', excerpt: '' });

  const handleSave = () => {
    updateSiteSettings({ aboutBio: bio, artistStatement });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addMilestone = () => {
    if (!newMilestone.year || !newMilestone.event) return;
    const nextId = careerMilestones.length > 0 ? Math.max(...careerMilestones.map(m => m.id)) + 1 : 1;
    const updated: CareerMilestone[] = [
      ...careerMilestones,
      { id: nextId, year: newMilestone.year, event: newMilestone.event },
    ];
    updateCareerMilestones(updated);
    setNewMilestone({ year: '', event: '' });
  };

  const deleteMilestone = (id: number) => {
    updateCareerMilestones(careerMilestones.filter(m => m.id !== id));
  };

  const addPressLink = () => {
    if (!newPressLink.publication) return;
    const nextId = pressMentions.length > 0 ? Math.max(...pressMentions.map(p => p.id)) + 1 : 1;
    const updated: PressMention[] = [
      ...pressMentions,
      {
        id: nextId,
        publication: newPressLink.publication,
        date: newPressLink.date,
        headline: newPressLink.headline,
        url: newPressLink.url,
        excerpt: newPressLink.excerpt,
      },
    ];
    setPressMentions(updated);
    setNewPressLink({ publication: '', date: '', headline: '', url: '', excerpt: '' });
  };

  const deletePressLink = (id: number) => {
    setPressMentions(pressMentions.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-charcoal mb-1">About Page</h2>
        <p className="text-sm text-charcoal/60">Edit the About page content.</p>
      </div>

      {/* Bio */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wide">Artist Bio</h3>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Bio</label>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows={5}
            placeholder="Susan Richten is a contemporary fine artist..."
            className="w-full border border-stone/30 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Artist Statement</label>
          <textarea
            value={artistStatement}
            onChange={e => setArtistStatement(e.target.value)}
            rows={4}
            placeholder="My work is an exploration..."
            className="w-full border border-stone/30 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold resize-none"
          />
        </div>
        <button
          onClick={handleSave}
          className="bg-gold text-white px-4 py-2 rounded text-sm font-medium hover:bg-gold/90 transition-colors"
        >
          {saved ? 'Saved!' : 'Save Bio & Statement'}
        </button>
      </div>

      {/* Career Milestones */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wide">Career Milestones</h3>
        <ul className="space-y-2">
          {careerMilestones.map(m => (
            <li key={m.id} className="flex items-center justify-between bg-stone/10 rounded px-3 py-2 text-sm">
              <span><strong>{m.year}</strong> — {m.event}</span>
              <button
                onClick={() => deleteMilestone(m.id)}
                className="text-red-400 hover:text-red-600 text-xs ml-2"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <input
            type="text"
            value={newMilestone.year}
            onChange={e => setNewMilestone(p => ({ ...p, year: e.target.value }))}
            placeholder="Year"
            className="w-20 border border-stone/30 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <input
            type="text"
            value={newMilestone.event}
            onChange={e => setNewMilestone(p => ({ ...p, event: e.target.value }))}
            placeholder="Event description"
            className="flex-1 border border-stone/30 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <button
            onClick={addMilestone}
            className="bg-charcoal text-white px-3 py-1.5 rounded text-sm hover:bg-charcoal/80 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Press Links */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wide">Press Mentions</h3>
        <ul className="space-y-2">
          {pressMentions.map(m => (
            <li key={m.id} className="flex items-center justify-between bg-stone/10 rounded px-3 py-2 text-sm">
              <span><strong>{m.publication}</strong> — {m.headline || m.date}</span>
              <button
                onClick={() => deletePressLink(m.id)}
                className="text-red-400 hover:text-red-600 text-xs ml-2"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={newPressLink.publication}
            onChange={e => setNewPressLink(p => ({ ...p, publication: e.target.value }))}
            placeholder="Publication"
            className="border border-stone/30 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <input
            type="text"
            value={newPressLink.headline}
            onChange={e => setNewPressLink(p => ({ ...p, headline: e.target.value }))}
            placeholder="Headline"
            className="border border-stone/30 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <input
            type="text"
            value={newPressLink.date}
            onChange={e => setNewPressLink(p => ({ ...p, date: e.target.value }))}
            placeholder="Date (e.g. 2023-09)"
            className="border border-stone/30 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <input
            type="text"
            value={newPressLink.url}
            onChange={e => setNewPressLink(p => ({ ...p, url: e.target.value }))}
            placeholder="URL"
            className="border border-stone/30 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <textarea
            value={newPressLink.excerpt}
            onChange={e => setNewPressLink(p => ({ ...p, excerpt: e.target.value }))}
            placeholder="Excerpt"
            rows={2}
            className="col-span-2 border border-stone/30 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold resize-none"
          />
        </div>
        <button
          onClick={addPressLink}
          className="bg-charcoal text-white px-3 py-1.5 rounded text-sm hover:bg-charcoal/80 transition-colors"
        >
          Add Press Mention
        </button>
      </div>
    </div>
  );
}
