import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {items.map(item => (
        <div key={item.id} className="border border-border rounded-sm overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/50 transition-colors"
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
          >
            <span className="font-medium text-foreground pr-4">{item.question}</span>
            <ChevronDown
              size={18}
              className={`shrink-0 text-muted-foreground transition-transform duration-200 ${
                openId === item.id ? 'rotate-180' : ''
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-200 ${
              openId === item.id ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
