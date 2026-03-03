import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '../contexts/CMSContext';

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {items.map(item => (
        <div key={item.id} className="border border-beige-dark bg-white">
          <button
            className="w-full flex items-center justify-between px-6 py-4 text-left"
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            aria-expanded={openId === item.id}
          >
            <span className="font-heading text-lg text-charcoal pr-4">{item.question}</span>
            <ChevronDown
              size={18}
              className={`shrink-0 text-charcoal-light transition-transform duration-200 ${
                openId === item.id ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openId === item.id ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="px-6 pb-5">
              <p className="font-body text-sm text-charcoal-light leading-relaxed">{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
