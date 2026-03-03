import React, { useState } from 'react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center animate-fade-in">
        <p className="font-body text-sm text-beige/80">
          Thank you for subscribing! You'll hear from us soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 px-4 py-3 font-body text-sm bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-gold text-white font-body text-sm tracking-widest uppercase hover:bg-gold/90 transition-colors whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
}

export default NewsletterSignup;
