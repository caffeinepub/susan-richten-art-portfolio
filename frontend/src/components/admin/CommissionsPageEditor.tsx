import { useState } from 'react';
import { useCMS, ProcessStep, FAQItem } from '../../contexts/CMSContext';

export default function CommissionsPageEditor() {
  const { commissionsPageContent, updateCommissionsPageContent, updateFAQItems, updateProcessSteps } = useCMS();

  const [form, setForm] = useState({
    heroText: commissionsPageContent.heroText,
    pricingText: commissionsPageContent.pricingText,
    processSteps: commissionsPageContent.processSteps,
    faqItems: commissionsPageContent.faqItems,
  });

  function addStep() {
    const newStep: ProcessStep = {
      id: Date.now().toString(),
      stepNumber: form.processSteps.length + 1,
      title: '',
      description: '',
    };
    setForm(f => ({ ...f, processSteps: [...f.processSteps, newStep] }));
  }

  function removeStep(id: string) {
    setForm(f => ({ ...f, processSteps: f.processSteps.filter(s => s.id !== id) }));
  }

  function updateStep(id: string, field: keyof ProcessStep, value: string | number) {
    setForm(f => ({
      ...f,
      processSteps: f.processSteps.map(s => s.id === id ? { ...s, [field]: value } : s),
    }));
  }

  function addFAQ() {
    const newFAQ: FAQItem = { id: Date.now().toString(), question: '', answer: '' };
    setForm(f => ({ ...f, faqItems: [...f.faqItems, newFAQ] }));
  }

  function removeFAQ(id: string) {
    setForm(f => ({ ...f, faqItems: f.faqItems.filter(q => q.id !== id) }));
  }

  function updateFAQ(id: string, field: keyof FAQItem, value: string) {
    setForm(f => ({
      ...f,
      faqItems: f.faqItems.map(q => q.id === id ? { ...q, [field]: value } : q),
    }));
  }

  function handleSave() {
    updateCommissionsPageContent({
      heroText: form.heroText,
      pricingText: form.pricingText,
      processSteps: form.processSteps,
      faqItems: form.faqItems,
    });
    updateProcessSteps(form.processSteps);
    updateFAQItems(form.faqItems);
  }

  const inputClass = 'w-full px-3 py-2 border border-sand/60 rounded-sm bg-warm-white text-charcoal text-sm focus:outline-none focus:border-gold';
  const labelClass = 'block text-xs font-medium text-charcoal-muted uppercase tracking-wide mb-1';

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-serif text-lg text-charcoal mb-4">Commissions Page Content</h3>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Hero Text</label>
            <textarea
              value={form.heroText}
              onChange={e => setForm(f => ({ ...f, heroText: e.target.value }))}
              rows={4}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Pricing Text</label>
            <textarea
              value={form.pricingText}
              onChange={e => setForm(f => ({ ...f, pricingText: e.target.value }))}
              rows={4}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-charcoal">Process Steps</h4>
          <button onClick={addStep} className="text-xs text-gold hover:text-gold/80 border border-gold/40 hover:border-gold px-3 py-1 rounded-sm transition-colors">
            + Add Step
          </button>
        </div>
        <div className="space-y-3">
          {form.processSteps.map(step => (
            <div key={step.id} className="p-3 border border-sand/40 rounded-sm space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={step.stepNumber}
                  onChange={e => updateStep(step.id, 'stepNumber', Number(e.target.value))}
                  className="w-16 px-2 py-1.5 border border-sand/60 rounded-sm text-sm bg-warm-white text-charcoal focus:outline-none focus:border-gold"
                  placeholder="#"
                />
                <input
                  type="text"
                  value={step.title}
                  onChange={e => updateStep(step.id, 'title', e.target.value)}
                  className="flex-1 px-2 py-1.5 border border-sand/60 rounded-sm text-sm bg-warm-white text-charcoal focus:outline-none focus:border-gold"
                  placeholder="Step title"
                />
                <button onClick={() => removeStep(step.id)} className="text-red-400 hover:text-red-600 shrink-0 text-xs px-2">✕</button>
              </div>
              <textarea
                value={step.description}
                onChange={e => updateStep(step.id, 'description', e.target.value)}
                rows={2}
                className={inputClass}
                placeholder="Step description..."
              />
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Items */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-charcoal">FAQ Items</h4>
          <button onClick={addFAQ} className="text-xs text-gold hover:text-gold/80 border border-gold/40 hover:border-gold px-3 py-1 rounded-sm transition-colors">
            + Add FAQ
          </button>
        </div>
        <div className="space-y-3">
          {form.faqItems.map(faq => (
            <div key={faq.id} className="p-3 border border-sand/40 rounded-sm space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={faq.question}
                  onChange={e => updateFAQ(faq.id, 'question', e.target.value)}
                  className="flex-1 px-2 py-1.5 border border-sand/60 rounded-sm text-sm bg-warm-white text-charcoal focus:outline-none focus:border-gold"
                  placeholder="Question"
                />
                <button onClick={() => removeFAQ(faq.id)} className="text-red-400 hover:text-red-600 shrink-0 text-xs px-2">✕</button>
              </div>
              <textarea
                value={faq.answer}
                onChange={e => updateFAQ(faq.id, 'answer', e.target.value)}
                rows={2}
                className={inputClass}
                placeholder="Answer..."
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        className="px-6 py-2.5 bg-gold text-warm-white text-sm font-medium rounded-sm hover:bg-gold/90 transition-colors"
      >
        Save Commissions Page
      </button>
    </div>
  );
}
