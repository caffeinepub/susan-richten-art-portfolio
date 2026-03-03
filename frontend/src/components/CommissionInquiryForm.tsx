import { useState } from 'react';
import { useCMS } from '../contexts/CMSContext';

const PROJECT_TYPES = ['Portrait', 'Landscape', 'Seascape', 'Still Life', 'Abstract', 'Other'];
const BUDGET_RANGES = ['$800–$1,500', '$1,500–$3,000', '$3,000–$5,000', '$5,000–$8,000', '$8,000+'];

export default function CommissionInquiryForm() {
  const { addCommissionInquiry } = useCMS();
  const [form, setForm] = useState({
    name: '',
    email: '',
    projectType: '',
    budgetRange: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.projectType) errs.projectType = 'Please select a project type';
    if (!form.budgetRange) errs.budgetRange = 'Please select a budget range';
    if (!form.description.trim()) errs.description = 'Please describe your project';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    addCommissionInquiry({
      name: form.name,
      email: form.email,
      projectType: form.projectType,
      budgetRange: form.budgetRange,
      budget: form.budgetRange,
      description: form.description,
      projectDescription: form.description,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <p className="text-foreground font-medium text-lg">Inquiry submitted!</p>
        <p className="text-sm text-muted-foreground mt-2">Thank you for your interest. I'll review your project and be in touch within 2–3 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            className="w-full px-4 py-2.5 border border-border rounded-sm bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Your name"
          />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            className="w-full px-4 py-2.5 border border-border rounded-sm bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Project Type</label>
        <select
          value={form.projectType}
          onChange={e => setForm(p => ({ ...p, projectType: e.target.value }))}
          className="w-full px-4 py-2.5 border border-border rounded-sm bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="">Select a type...</option>
          {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        {errors.projectType && <p className="text-xs text-destructive mt-1">{errors.projectType}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Budget Range</label>
        <select
          value={form.budgetRange}
          onChange={e => setForm(p => ({ ...p, budgetRange: e.target.value }))}
          className="w-full px-4 py-2.5 border border-border rounded-sm bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="">Select a range...</option>
          {BUDGET_RANGES.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        {errors.budgetRange && <p className="text-xs text-destructive mt-1">{errors.budgetRange}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Project Description</label>
        <textarea
          value={form.description}
          onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
          rows={4}
          className="w-full px-4 py-2.5 border border-border rounded-sm bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          placeholder="Describe your vision, subject matter, intended location, and any specific requirements..."
        />
        {errors.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-primary/90 transition-colors"
      >
        Submit Inquiry
      </button>
    </form>
  );
}
