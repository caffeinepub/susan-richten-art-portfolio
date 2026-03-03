import React, { useState } from 'react';
import { useCMS, SiteSettings } from '../../contexts/CMSContext';
import { toast } from 'sonner';

export function Settings() {
  const { siteSettings, setSiteSettings } = useCMS();
  const [form, setForm] = useState<SiteSettings>({ ...siteSettings });

  const handleSave = () => {
    setSiteSettings(form);
    toast.success('Settings saved successfully');
  };

  const inputClass = 'w-full px-3 py-2 font-body text-sm border border-beige-dark bg-white text-charcoal focus:outline-none focus:border-charcoal transition-colors';

  const updateSeo = (page: keyof SiteSettings['seo'], field: 'title' | 'description', value: string) => {
    setForm(f => ({
      ...f,
      seo: { ...f.seo, [page]: { ...f.seo[page], [field]: value } },
    }));
  };

  const seoPages: Array<keyof SiteSettings['seo']> = ['home', 'gallery', 'commissions', 'about', 'contact', 'testimonials'];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-4xl text-charcoal mb-1">Settings</h1>
        <p className="font-body text-sm text-charcoal-muted">Site-wide configuration</p>
      </div>

      <div className="space-y-8 max-w-3xl">
        {/* General */}
        <div className="bg-white p-6 shadow-xs">
          <h2 className="font-heading text-2xl text-charcoal mb-4">General</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Site Title</label>
              <input type="text" value={form.siteTitle} onChange={e => setForm(f => ({ ...f, siteTitle: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Site Tagline</label>
              <input type="text" value={form.siteTagline} onChange={e => setForm(f => ({ ...f, siteTagline: e.target.value }))} className={inputClass} placeholder="Artist needs to enter info here" />
            </div>
            <div>
              <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Google Analytics ID</label>
              <input type="text" value={form.googleAnalyticsId} onChange={e => setForm(f => ({ ...f, googleAnalyticsId: e.target.value }))} className={inputClass} placeholder="G-XXXXXXXXXX" />
            </div>
            <div>
              <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Newsletter Integration</label>
              <input type="text" value={form.newsletterIntegration} onChange={e => setForm(f => ({ ...f, newsletterIntegration: e.target.value }))} className={inputClass} placeholder="Mailchimp API key or embed code..." />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white p-6 shadow-xs">
          <h2 className="font-heading text-2xl text-charcoal mb-4">Social Media</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Instagram URL</label>
              <input type="url" value={form.socialInstagram} onChange={e => setForm(f => ({ ...f, socialInstagram: e.target.value }))} className={inputClass} placeholder="https://instagram.com/..." />
            </div>
            <div>
              <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Facebook URL</label>
              <input type="url" value={form.socialFacebook} onChange={e => setForm(f => ({ ...f, socialFacebook: e.target.value }))} className={inputClass} placeholder="https://facebook.com/..." />
            </div>
            <div>
              <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Pinterest URL</label>
              <input type="url" value={form.socialPinterest} onChange={e => setForm(f => ({ ...f, socialPinterest: e.target.value }))} className={inputClass} placeholder="https://pinterest.com/..." />
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white p-6 shadow-xs">
          <h2 className="font-heading text-2xl text-charcoal mb-4">SEO — Per Page</h2>
          <div className="space-y-6">
            {seoPages.map(page => (
              <div key={String(page)}>
                <h3 className="font-body text-xs tracking-widest uppercase text-charcoal-muted mb-2">{String(page)}</h3>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={form.seo[page].title}
                    onChange={e => updateSeo(page, 'title', e.target.value)}
                    className={inputClass}
                    placeholder="Meta title"
                  />
                  <textarea
                    value={form.seo[page].description}
                    onChange={e => updateSeo(page, 'description', e.target.value)}
                    rows={2}
                    className={inputClass}
                    placeholder="Meta description"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="px-8 py-3 bg-charcoal text-beige font-body text-sm tracking-widest uppercase hover:bg-charcoal-light transition-colors"
        >
          Save All Settings
        </button>
      </div>
    </div>
  );
}

export default Settings;
