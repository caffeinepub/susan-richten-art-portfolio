import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useCMS, ProcessStep, FAQItem } from '../../contexts/CMSContext';
import { toast } from 'sonner';

export function CommissionsPageEditor() {
  const { commissionsPageContent, setCommissionsPageContent } = useCMS();
  const [form, setForm] = useState({ ...commissionsPageContent });

  const handleSave = () => {
    setCommissionsPageContent(form);
    toast.success('Commissions page updated');
  };

  const addStep = () => {
    const next = form.processSteps.length + 1;
    const newStep: ProcessStep = { id: `ps-${Date.now()}`, stepNumber: next, title: '', description: '' };
    setForm(f => ({
      ...f,
      processSteps: [...f.processSteps, newStep],
    }));
  };

  const removeStep = (id: string) => {
    setForm(f => ({ ...f, processSteps: f.processSteps.filter(s => s.id !== id) }));
  };

  const updateStep = (id: string, field: keyof ProcessStep, value: string | number) => {
    setForm(f => ({ ...f, processSteps: f.processSteps.map(s => s.id === id ? { ...s, [field]: value } : s) }));
  };

  const addFAQ = () => {
    setForm(f => ({
      ...f,
      faqItems: [...f.faqItems, { id: `faq-${Date.now()}`, question: '', answer: '' }],
    }));
  };

  const removeFAQ = (id: string) => {
    setForm(f => ({ ...f, faqItems: f.faqItems.filter(q => q.id !== id) }));
  };

  const updateFAQ = (id: string, field: keyof FAQItem, value: string) => {
    setForm(f => ({ ...f, faqItems: f.faqItems.map(q => q.id === id ? { ...q, [field]: value } : q) }));
  };

  const inputClass = 'w-full px-3 py-2 font-body text-sm border border-beige-dark bg-white text-charcoal focus:outline-none focus:border-charcoal transition-colors';

  return (
    <div className="space-y-6">
      <h3 className="font-heading text-xl text-charcoal">Commissions Page</h3>

      <div>
        <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Hero Text</label>
        <textarea value={form.heroText} onChange={e => setForm(f => ({ ...f, heroText: e.target.value }))} rows={3} className={inputClass} placeholder="Artist needs to enter info here" />
      </div>

      <div>
        <label className="block font-body text-xs tracking-widest uppercase text-charcoal-muted mb-1">Pricing Text</label>
        <textarea value={form.pricingText} onChange={e => setForm(f => ({ ...f, pricingText: e.target.value }))} rows={4} className={inputClass} placeholder="Artist needs to enter info here" />
      </div>

      {/* Process Steps */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-body text-xs tracking-widest uppercase text-charcoal-muted">Process Steps</label>
          <button onClick={addStep} className="flex items-center gap-1 text-xs text-charcoal-muted hover:text-charcoal transition-colors font-body">
            <Plus size={12} /> Add Step
          </button>
        </div>
        <div className="space-y-3">
          {form.processSteps.map(step => (
            <div key={step.id} className="border border-beige-dark p-3 space-y-2">
              <div className="flex gap-2 items-center">
                <span className="font-heading text-lg text-gold w-6">{step.stepNumber}</span>
                <input type="text" value={step.title} onChange={e => updateStep(step.id, 'title', e.target.value)} className="flex-1 px-3 py-1.5 font-body text-sm border border-beige-dark bg-white text-charcoal focus:outline-none focus:border-charcoal" placeholder="Step title" />
                <button onClick={() => removeStep(step.id)} className="p-1.5 text-charcoal-muted hover:text-red-500 transition-colors shrink-0">
                  <Trash2 size={14} />
                </button>
              </div>
              <textarea value={step.description} onChange={e => updateStep(step.id, 'description', e.target.value)} rows={2} className="w-full px-3 py-1.5 font-body text-sm border border-beige-dark bg-white text-charcoal focus:outline-none focus:border-charcoal" placeholder="Step description..." />
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Items */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-body text-xs tracking-widest uppercase text-charcoal-muted">FAQ Items</label>
          <button onClick={addFAQ} className="flex items-center gap-1 text-xs text-charcoal-muted hover:text-charcoal transition-colors font-body">
            <Plus size={12} /> Add FAQ
          </button>
        </div>
        <div className="space-y-3">
          {form.faqItems.map(faq => (
            <div key={faq.id} className="border border-beige-dark p-3 space-y-2">
              <div className="flex gap-2">
                <input type="text" value={faq.question} onChange={e => updateFAQ(faq.id, 'question', e.target.value)} className="flex-1 px-3 py-1.5 font-body text-sm border border-beige-dark bg-white text-charcoal focus:outline-none focus:border-charcoal" placeholder="Question" />
                <button onClick={() => removeFAQ(faq.id)} className="p-1.5 text-charcoal-muted hover:text-red-500 transition-colors shrink-0">
                  <Trash2 size={14} />
                </button>
              </div>
              <textarea value={faq.answer} onChange={e => updateFAQ(faq.id, 'answer', e.target.value)} rows={2} className="w-full px-3 py-1.5 font-body text-sm border border-beige-dark bg-white text-charcoal focus:outline-none focus:border-charcoal" placeholder="Answer..." />
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleSave} className="px-6 py-2.5 bg-charcoal text-beige font-body text-sm tracking-wide hover:bg-charcoal-light transition-colors">
        Save Commissions Page
      </button>
    </div>
  );
}

export default CommissionsPageEditor;
