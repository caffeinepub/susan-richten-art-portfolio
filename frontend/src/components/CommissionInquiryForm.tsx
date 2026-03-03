import React, { useState } from 'react';
import { useCMS, CommissionInquiry } from '../contexts/CMSContext';

export function CommissionInquiryForm() {
  const { addCommissionInquiry } = useCMS();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    size: '',
    location: '',
    budgetRange: '',
    timeline: '',
    description: '',
    referenceFiles: [] as string[],
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.projectType) e.projectType = 'Project type is required';
    if (!form.description.trim()) e.description = 'Description is required';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const inquiry: CommissionInquiry = {
      id: `ci-${Date.now()}`,
      name: form.name,
      email: form.email,
      projectDescription: form.description,
      projectType: form.projectType,
      budgetRange: form.budgetRange,
      budget: form.budgetRange,
      timeline: form.timeline,
      description: form.description,
      submittedAt: new Date().toISOString(),
      status: 'unread',
    };
    addCommissionInquiry(inquiry);
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', projectType: '', size: '', location: '', budgetRange: '', timeline: '', description: '', referenceFiles: [] });
    setErrors({});
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    setErrors(er => ({ ...er, [field]: '' }));
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 font-body text-sm border bg-white text-charcoal placeholder:text-charcoal-muted focus:outline-none transition-colors ${
      errors[field] ? 'border-red-400' : 'border-beige-dark focus:border-charcoal'
    }`;

  if (submitted) {
    return (
      <div className="bg-white p-8 text-center animate-fade-in">
        <div className="text-4xl mb-4">✉</div>
        <h3 className="font-heading text-2xl text-charcoal mb-2">Thank You!</h3>
        <p className="font-body text-charcoal-light">
          Your inquiry has been received. You'll receive a confirmation within 24–48 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 font-body text-sm text-charcoal-light underline hover:text-charcoal transition-colors"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Name *</label>
          <input type="text" value={form.name} onChange={set('name')} className={inputClass('name')} placeholder="Your full name" />
          {errors.name && <p className="text-red-500 text-xs mt-1 font-body">{errors.name}</p>}
        </div>
        <div>
          <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Email *</label>
          <input type="email" value={form.email} onChange={set('email')} className={inputClass('email')} placeholder="your@email.com" />
          {errors.email && <p className="text-red-500 text-xs mt-1 font-body">{errors.email}</p>}
        </div>
        <div>
          <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Phone</label>
          <input type="tel" value={form.phone} onChange={set('phone')} className={inputClass('phone')} placeholder="(optional)" />
        </div>
        <div>
          <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Project Type *</label>
          <select value={form.projectType} onChange={set('projectType')} className={inputClass('projectType')}>
            <option value="">Select type...</option>
            <option value="Mural">Mural</option>
            <option value="Mosaic">Mosaic</option>
            <option value="Installation">Installation</option>
            <option value="Canvas">Canvas</option>
            <option value="Other">Other</option>
          </select>
          {errors.projectType && <p className="text-red-500 text-xs mt-1 font-body">{errors.projectType}</p>}
        </div>
        <div>
          <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Size</label>
          <input type="text" value={form.size} onChange={set('size')} className={inputClass('size')} placeholder="e.g. 10ft × 15ft" />
        </div>
        <div>
          <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Location</label>
          <input type="text" value={form.location} onChange={set('location')} className={inputClass('location')} placeholder="City, State" />
        </div>
        <div>
          <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Budget Range</label>
          <select value={form.budgetRange} onChange={set('budgetRange')} className={inputClass('budgetRange')}>
            <option value="">Select range...</option>
            <option value="Under $5,000">Under $5,000</option>
            <option value="$5,000 – $15,000">$5,000 – $15,000</option>
            <option value="$15,000 – $30,000">$15,000 – $30,000</option>
            <option value="$30,000 – $60,000">$30,000 – $60,000</option>
            <option value="$60,000+">$60,000+</option>
          </select>
        </div>
        <div>
          <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Timeline</label>
          <input type="text" value={form.timeline} onChange={set('timeline')} className={inputClass('timeline')} placeholder="e.g. 3 months, by June 2025" />
        </div>
      </div>

      <div>
        <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Project Description *</label>
        <textarea
          value={form.description}
          onChange={set('description')}
          rows={5}
          className={inputClass('description')}
          placeholder="Tell us about your vision, the space, and what you hope the artwork will convey..."
        />
        {errors.description && <p className="text-red-500 text-xs mt-1 font-body">{errors.description}</p>}
      </div>

      <div>
        <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Reference Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full font-body text-sm text-charcoal-light file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-beige-dark file:text-charcoal file:font-body file:text-xs file:cursor-pointer"
          onChange={e => {
            const files = Array.from(e.target.files || []).map(f => f.name);
            setForm(f => ({ ...f, referenceFiles: files }));
          }}
        />
        <p className="font-body text-xs text-charcoal-muted mt-1">Upload inspiration images (optional)</p>
      </div>

      <button
        type="submit"
        className="w-full md:w-auto px-10 py-4 bg-charcoal text-beige font-body text-sm tracking-widest uppercase hover:bg-charcoal-light transition-colors"
      >
        Submit Inquiry
      </button>

      <p className="font-body text-xs text-charcoal-muted italic">
        * You'll receive a confirmation within 24–48 hours.
      </p>
    </form>
  );
}

export default CommissionInquiryForm;
