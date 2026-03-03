interface Milestone {
  id: string;
  year: string;
  event: string;
}

interface CareerTimelineProps {
  milestones: Milestone[];
}

export default function CareerTimeline({ milestones }: CareerTimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-16 top-0 bottom-0 w-px bg-border" />
      <div className="space-y-6">
        {milestones.map((milestone, index) => (
          <div key={milestone.id} className="flex items-start gap-6">
            {/* Year */}
            <div className="w-12 shrink-0 text-right">
              <span className="text-sm font-semibold text-primary">{milestone.year}</span>
            </div>
            {/* Dot */}
            <div className="relative shrink-0 mt-1.5">
              <div className="w-3 h-3 rounded-full bg-primary border-2 border-background ring-2 ring-primary/30" />
            </div>
            {/* Event */}
            <div className="flex-1 pb-2">
              <p className="text-sm text-foreground leading-relaxed">{milestone.event}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
