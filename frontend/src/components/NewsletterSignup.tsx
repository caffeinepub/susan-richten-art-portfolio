import { useState } from 'react';
import { useCMS } from '../contexts/CMSContext';

export default function NewsletterSignup() {
  const { siteSettings } = useCMS();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-4">
        <p className="text-foreground font-medium">Thank you for subscribing!</p>
        <p className="text-sm text-muted-foreground mt-1">You'll receive studio updates in your inbox.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={siteSettings.newsletterPlaceholder}
        required
        className="flex-1 px-4 py-2.5 border border-border rounded-sm bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
      <button
        type="submit"
        className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-sm hover:bg-primary/90 transition-colors"
      >
        Subscribe
      </button>
    </form>
  );
}
