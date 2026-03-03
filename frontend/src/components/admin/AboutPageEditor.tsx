import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useCMS, TimelineMilestone, PressMention } from '../../contexts/CMSContext';
import { toast } from 'sonner';

export function AboutPageEditor() {
  const { aboutPageContent, setAboutPageContent } = useCMS();
  const [form, setForm] = useState({ ...aboutPageContent });

  const handleSave = () => {
    setAboutPageContent(form);
    toast.success('About page updated');
  };

  const addMilestone = () => {
    setForm(f => ({
      ...f,
      milestones: [...f.milestones, { id: `ml-${Date.now()}`, year: String(new Date().getFullYear()), event: '' }],
    }));
  };

  const removeMilestone = (id: string) => {
    setForm(f => ({ ...f, milestones: f.milestones.filter(m => m.id !== id) }));
  };

  const updateMilestone = (id: string, field: keyof TimelineMilestone, value: string) => {
    setForm(f => ({ ...f, milestones: f.milestones.map(m => m.id === id ? { ...m, [field]: value } : m) }));
  };

  const addPressLink = () => {
    setForm(f => ({
      ...f,
      pressLinks: [...f.pressLinks, { id: `pm-${Date.now()}`, publication: '', date: '', headline: '', excerpt: '', url: '' }],
    }));
  };

  const removePressLink = (id: string) => {
    setForm(f => ({ ...f, pressLinks: f.pressLinks.filter(p => p.id !== id) }));
  };

  const updatePressLink = (id: string, field: keyof PressMention, value: string) => {
    setForm(f => ({ ...f, pressLinks: f.pressLinks.map(p => p.id === id ? { ...p, [field]: value } : p) }));
  };

  const inputClass = 'w-full px-3 py-2 font-body text-sm border border-beige-dark bg-white text-charcoal focus:outline-none focus:border-charcoal transition-colors';

  return (
    <div className="space-y-6">
      <h3 className="font-heading text-xl text-charcoal">About Page</h3>

      <div>
        <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Biography</label>
        <textarea value={form.biography} onChange={e => setForm(f => ({ ...f, biography: e.target.value }))} rows={5} className={inputClass} placeholder="Artist needs to enter info here" />
      </div>

      <div>
        <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Artist Statement</label>
        <textarea value={form.artistStatement} onChange={e => setForm(f => ({ ...f, artistStatement: e.target.value }))} rows={4} className={inputClass} placeholder="Artist needs to enter info here" />
      </div>

      <div>
        <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Portrait Image Upload</label>
        <input
          type="file"
          accept="image/*"
          className="w-full font-body text-xs text-charcoal-light file:mr-3 file:py-1.5 file:px-3 file:border-0 file:bg-beige-dark file:text-charcoal file:font-body file:text-xs file:cursor-pointer"
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) setForm(f => ({ ...f, portraitImage: URL.createObjectURL(file) }));
          }}
        />
        {form.portraitImage && (
          <div className="mt-2 w-16 h-20 overflow-hidden rounded border border-beige-dark">
            <img src={form.portraitImage} alt="Portrait preview" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Milestones */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-body text-xs tracking-widest uppercase text-charcoal-muted">Career Milestones</label>
          <button onClick={addMilestone} className="flex items-center gap-1 text-xs text-charcoal-muted hover:text-charcoal transition-colors font-body">
            <Plus size={12} /> Add
          </button>
        </div>
        <div className="space-y-2">
          {form.milestones.map(m => (
            <div key={m.id} className="flex gap-2 items-start">
              <input type="text" value={m.year} onChange={e => updateMilestone(m.id, 'year', e.target.value)} className="w-20 px-3 py-2 font-body text-sm border border-beige-dark bg-white text-charcoal focus:outline-none focus:border-charcoal" placeholder="Year" />
              <input type="text" value={m.event} onChange={e => updateMilestone(m.id, 'event', e.target.value)} className="flex-1 px-3 py-2 font-body text-sm border border-beige-dark bg-white text-charcoal focus:outline-none focus:border-charcoal" placeholder="Event description..." />
              <button onClick={() => removeMilestone(m.id)} className="p-2 text-charcoal-muted hover:text-red-500 transition-colors shrink-0">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Press Links */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-body text-xs tracking-widest uppercase text-charcoal-muted">Press Links</label>
          <button onClick={addPressLink} className="flex items-center gap-1 text-xs text-charcoal-muted hover:text-charcoal transition-colors font-body">
            <Plus size={12} /> Add
          </button>
        </div>
        <div className="space-y-3">
          {form.pressLinks.map(p => (
            <div key={p.id} className="border border-beige-dark p-3 space-y-2">
              <div className="flex gap-2">
                <input type="text" value={p.publication} onChange={e => updatePressLink(p.id, 'publication', e.target.value)} className="flex-1 px-3 py-1.5 font-body text-sm border border-beige-dark bg-white text-charcoal focus:outline-none focus:border-charcoal" placeholder="Publication" />
                <input type="text" value={p.date} onChange={e => updatePressLink(p.id, 'date', e.target.value)} className="w-32 px-3 py-1.5 font-body text-sm border border-beige-dark bg-white text-charcoal focus:outline-none focus:border-charcoal" placeholder="Date" />
                <button onClick={() => removePressLink(p.id)} className="p-1.5 text-charcoal-muted hover:text-red-500 transition-colors shrink-0">
                  <Trash2 size={14} />
                </button>
              </div>
              <input type="text" value={p.headline} onChange={e => updatePressLink(p.id, 'headline', e.target.value)} className="w-full px-3 py-1.5 font-body text-sm border border-beige-dark bg-white text-charcoal focus:outline-none focus:border-charcoal" placeholder="Headline" />
              <input type="text" value={p.url} onChange={e => updatePressLink(p.id, 'url', e.target.value)} className="w-full px-3 py-1.5 font-body text-sm border border-beige-dark bg-white text-charcoal focus:outline-none focus:border-charcoal" placeholder="URL" />
              <textarea value={p.excerpt} onChange={e => updatePressLink(p.id, 'excerpt', e.target.value)} rows={2} className="w-full px-3 py-1.5 font-body text-sm border border-beige-dark bg-white text-charcoal focus:outline-none focus:border-charcoal" placeholder="Excerpt..." />
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleSave} className="px-6 py-2.5 bg-charcoal text-beige font-body text-sm tracking-wide hover:bg-charcoal-light transition-colors">
        Save About Page
      </button>
    </div>
  );
}

export default AboutPageEditor;
