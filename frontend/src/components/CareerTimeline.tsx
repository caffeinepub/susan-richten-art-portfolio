import { TimelineMilestone } from '../contexts/CMSContext';

interface CareerTimelineProps {
  milestones: TimelineMilestone[];
}

export function CareerTimeline({ milestones }: CareerTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
      <div className="space-y-8">
        {milestones.map((milestone, index) => (
          <div key={milestone.id} className="relative flex gap-6 pl-12">
            {/* Dot */}
            <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center shrink-0">
              <div className="w-2 h-2 rounded-full bg-gold" />
            </div>
            <div>
              <span className="text-gold font-bold text-sm tracking-wider">
                {milestone.year}
              </span>
              <p className="text-foreground mt-0.5 leading-relaxed">
                {milestone.event}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CareerTimeline;
