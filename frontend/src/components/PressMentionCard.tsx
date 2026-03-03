import { ExternalLink } from 'lucide-react';

interface PressMentionCardProps {
  publication: string;
  date: string;
  headline: string;
  url: string;
  excerpt: string;
}

export default function PressMentionCard({ publication, date, headline, url, excerpt }: PressMentionCardProps) {
  return (
    <div className="border border-border rounded-sm p-5 hover:border-primary/40 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">{publication}</span>
          <p className="text-xs text-muted-foreground mt-0.5">{date}</p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-muted-foreground hover:text-primary transition-colors mt-0.5"
          aria-label="Read article"
        >
          <ExternalLink size={15} />
        </a>
      </div>
      <h3 className="font-display text-base font-medium text-foreground mb-2">{headline}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed italic">"{excerpt}"</p>
    </div>
  );
}
