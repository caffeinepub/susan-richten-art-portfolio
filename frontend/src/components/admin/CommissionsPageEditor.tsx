import { useState } from 'react';
import { useCMS } from '../../contexts/CMSContext';
import type { ProcessStep, FAQItem } from '../../contexts/CMSContext';

export default function CommissionsPageEditor() {
  const {
    siteSettings,
    updateSiteSettings,
    processSteps,
    updateProcessSteps,
    faqItems,
    updateFAQItems,
  } = useCMS();

  const [heroText, setHeroText] = useState(siteSettings.commissionHeroText || '');
  const [pricingText, setPricingText] = useState(siteSettings.commissionPricingText || '');
  const [saved, setSaved] = useState(false);

  const [newStep, setNewStep] = useState({ title: '', description: '' });
  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '' });

  const handleSave = () => {
    updateSiteSettings({ commissionHeroText: heroText, commissionPricingText: pricingText });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addStep = () => {
    if (!newStep.title) return;
    const nextStepNumber = processSteps.length + 1;
    const nextId = processSteps.length > 0 ? Math.max(...processSteps.map(s => s.id)) + 1 : 1;
    const updated: ProcessStep[] = [
      ...processSteps,
      {
        id: nextId,
        stepNumber: nextStepNumber,
        title: newStep.title,
        description: newStep.description,
      },
    ];
    updateProcessSteps(updated);
    setNewStep({ title: '', description: '' });
  };

  const deleteStep = (id: number) => {
    updateProcessSteps(processSteps.filter(s => s.id !== id));
  };

  const addFAQ = () => {
    if (!newFAQ.question) return;
    const nextId = faqItems.length > 0 ? Math.max(...faqItems.map(f => f.id)) + 1 : 1;
    const updated: FAQItem[] = [
      ...faqItems,
      { id: nextId, question: newFAQ.question, answer: newFAQ.answer },
    ];
    updateFAQItems(updated);
    setNewFAQ({ question: '', answer: '' });
  };

  const deleteFAQ = (id: number) => {
    updateFAQItems(faqItems.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-charcoal mb-1">Commissions Page</h2>
        <p className="text-sm text-charcoal/60">Edit the Commissions page content.</p>
      </div>

      {/* Hero & Pricing Text */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wide">Hero & Pricing</h3>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Hero Text</label>
          <textarea
            value={heroText}
            onChange={e => setHeroText(e.target.value)}
            rows={3}
            placeholder="Every commission is a collaboration..."
            className="w-full border border-stone/30 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Pricing Text</label>
          <textarea
            value={pricingText}
            onChange={e => setPricingText(e.target.value)}
            rows={4}
            placeholder="Pricing varies based on size..."
            className="w-full border border-stone/30 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold resize-none"
          />
        </div>
        <button
          onClick={handleSave}
          className="bg-gold text-white px-4 py-2 rounded text-sm font-medium hover:bg-gold/90 transition-colors"
        >
          {saved ? 'Saved!' : 'Save Text'}
        </button>
      </div>

      {/* Process Steps */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wide">Process Steps</h3>
        <ul className="space-y-2">
          {[...processSteps]
            .sort((a, b) => a.stepNumber - b.stepNumber)
            .map(step => (
              <li
                key={step.id}
                className="flex items-center justify-between bg-stone/10 rounded px-3 py-2 text-sm"
              >
                <span>
                  <strong>Step {step.stepNumber}:</strong> {step.title}
                </span>
                <button
                  onClick={() => deleteStep(step.id)}
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
            value={newStep.title}
            onChange={e => setNewStep(p => ({ ...p, title: e.target.value }))}
            placeholder="Step title"
            className="flex-1 border border-stone/30 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <input
            type="text"
            value={newStep.description}
            onChange={e => setNewStep(p => ({ ...p, description: e.target.value }))}
            placeholder="Description"
            className="flex-1 border border-stone/30 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <button
            onClick={addStep}
            className="bg-charcoal text-white px-3 py-1.5 rounded text-sm hover:bg-charcoal/80 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wide">FAQ Items</h3>
        <ul className="space-y-2">
          {faqItems.map(faq => (
            <li
              key={faq.id}
              className="flex items-center justify-between bg-stone/10 rounded px-3 py-2 text-sm"
            >
              <span className="truncate flex-1">{faq.question}</span>
              <button
                onClick={() => deleteFAQ(faq.id)}
                className="text-red-400 hover:text-red-600 text-xs ml-2 shrink-0"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="space-y-2">
          <input
            type="text"
            value={newFAQ.question}
            onChange={e => setNewFAQ(p => ({ ...p, question: e.target.value }))}
            placeholder="Question"
            className="w-full border border-stone/30 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold"
          />
          <textarea
            value={newFAQ.answer}
            onChange={e => setNewFAQ(p => ({ ...p, answer: e.target.value }))}
            placeholder="Answer"
            rows={2}
            className="w-full border border-stone/30 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gold resize-none"
          />
          <button
            onClick={addFAQ}
            className="bg-charcoal text-white px-3 py-1.5 rounded text-sm hover:bg-charcoal/80 transition-colors"
          >
            Add FAQ
          </button>
        </div>
      </div>
    </div>
  );
}
