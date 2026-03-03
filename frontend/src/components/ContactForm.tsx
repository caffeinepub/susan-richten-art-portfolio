import { useState } from 'react';
import { Clock } from 'lucide-react';
import { useCMS } from '../contexts/CMSContext';

export default function ContactForm() {
  const { addContactInquiry } = useCMS();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    addContactInquiry({
      name: form.name,
      email: form.email,
      message: form.message,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <p className="text-charcoal font-medium text-lg">Message sent!</p>
        <p className="text-sm text-charcoal-muted mt-2">Thank you for reaching out. I'll be in touch soon.</p>
      </div>
    );
  }

  const inputClass = 'w-full px-4 py-2.5 border border-beige-dark bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-colors';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-body tracking-widest uppercase text-charcoal-muted mb-1">Name</label>
        <input
          type="text"
          value={form.name}
          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
          className={inputClass}
          placeholder="Your name"
        />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
      </div>
      <div>
        <label className="block text-xs font-body tracking-widest uppercase text-charcoal-muted mb-1">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
          className={inputClass}
          placeholder="your@email.com"
        />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
      </div>
      <div>
        <label className="block text-xs font-body tracking-widest uppercase text-charcoal-muted mb-1">Message</label>
        <textarea
          value={form.message}
          onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
          rows={5}
          className={`${inputClass} resize-none`}
          placeholder="How can I help you?"
        />
        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
      </div>

      {/* Response time notice */}
      <div className="flex items-center gap-2 py-3 px-4 bg-gold/10 border border-gold/30">
        <Clock size={16} className="text-gold shrink-0" />
        <p className="font-body text-sm text-charcoal">
          We typically respond within <strong>24–48 hours</strong>
        </p>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-charcoal text-beige font-body text-sm tracking-widest uppercase hover:bg-charcoal-light transition-colors"
      >
        Send Message
      </button>
    </form>
  );
}
