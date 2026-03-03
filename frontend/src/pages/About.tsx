import { useCMS } from '../contexts/CMSContext';
import CareerTimeline from '../components/CareerTimeline';
import PressMentionCard from '../components/PressMentionCard';
import { usePageMeta } from '../hooks/usePageMeta';

export default function About() {
  usePageMeta('about');
  const { siteSettings, careerMilestones, pressMentions } = useCMS();

  const socialIconMap: Record<string, string> = {
    instagram: 'Instagram',
    facebook: 'Facebook',
    pinterest: 'Pinterest',
  };

  return (
    <main className="min-h-screen bg-warm-white">
      {/* Hero */}
      <section className="bg-charcoal text-beige py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            {siteSettings.heroArtistName || 'Susan Richten'}
          </h1>
          <p className="text-beige/70 text-lg">{siteSettings.siteTagline || 'Fine Art & Commissions'}</p>
        </div>
      </section>

      {/* Bio + Portrait */}
      <section className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <img
            src="/assets/generated/artist-portrait.dim_800x1000.png"
            alt={siteSettings.heroArtistName || 'Susan Richten'}
            className="w-full rounded-sm object-cover shadow-md"
          />
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-semibold text-charcoal mb-4">About the Artist</h2>
            <p className="text-charcoal/70 leading-relaxed text-sm">
              {siteSettings.aboutBio || 'Susan Richten is a contemporary fine artist based in New York.'}
            </p>
          </div>

          {/* Social links */}
          {siteSettings.socialPlatforms.length > 0 && (
            <div className="flex gap-3">
              {siteSettings.socialPlatforms.map(platform => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-charcoal/60 hover:text-gold border border-stone/30 hover:border-gold/40 rounded px-3 py-1.5 transition-colors"
                >
                  {socialIconMap[platform.icon.toLowerCase()] ?? platform.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Artist Statement */}
      {siteSettings.artistStatement && (
        <section className="bg-stone/10 py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl font-semibold text-charcoal mb-6">Artist Statement</h2>
            <blockquote className="text-charcoal/70 text-lg leading-relaxed italic">
              "{siteSettings.artistStatement}"
            </blockquote>
          </div>
        </section>
      )}

      {/* Career Timeline */}
      {careerMilestones.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="font-display text-2xl font-semibold text-charcoal mb-8 text-center">Career Highlights</h2>
          <CareerTimeline milestones={careerMilestones} />
        </section>
      )}

      {/* Press Mentions */}
      {pressMentions.length > 0 && (
        <section className="bg-stone/10 py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-2xl font-semibold text-charcoal mb-8 text-center">Press & Recognition</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pressMentions.map(mention => (
                <PressMentionCard
                  key={mention.id}
                  publication={mention.publication}
                  date={mention.date}
                  headline={mention.headline}
                  url={mention.url}
                  excerpt={mention.excerpt}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
