import { CommissionInquiry } from '../../contexts/CMSContext';

interface InquiryRowProps {
  inquiry: CommissionInquiry;
  onStatusChange: (id: number, status: string) => void;
}

const statusColors: Record<string, string> = {
  'new': 'bg-amber-100 text-amber-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  'completed': 'bg-green-100 text-green-800',
  'declined': 'bg-red-100 text-red-800',
};

const nextStatus: Record<string, string> = {
  'new': 'in-progress',
  'in-progress': 'completed',
  'completed': 'declined',
  'declined': 'new',
};

const statusLabels: Record<string, string> = {
  'new': 'New',
  'in-progress': 'In Progress',
  'completed': 'Completed',
  'declined': 'Declined',
};

export default function InquiryRow({ inquiry, onStatusChange }: InquiryRowProps) {
  const date = new Date(inquiry.timestamp).toLocaleDateString();
  const colorClass = statusColors[inquiry.status] ?? 'bg-gray-100 text-gray-700';
  const label = statusLabels[inquiry.status] ?? inquiry.status;
  const next = nextStatus[inquiry.status] ?? 'new';

  return (
    <tr className={`border-b border-sand/30 ${inquiry.status === 'new' ? 'bg-amber-50/50' : ''}`}>
      <td className="py-3 px-4">
        <div className="font-medium text-charcoal text-sm">{inquiry.name}</div>
        <div className="text-xs text-charcoal-muted">{inquiry.email}</div>
      </td>
      <td className="py-3 px-4 text-sm text-charcoal-muted hidden md:table-cell">
        {inquiry.projectType || '—'}
      </td>
      <td className="py-3 px-4 text-sm text-charcoal-muted hidden lg:table-cell">
        {inquiry.budgetRange || inquiry.budget || '—'}
      </td>
      <td className="py-3 px-4 text-xs text-charcoal-muted hidden lg:table-cell shrink-0">
        {date}
      </td>
      <td className="py-3 px-4">
        <button
          onClick={() => onStatusChange(inquiry.id, next)}
          className={`px-2 py-1 rounded-sm text-xs font-medium transition-colors ${colorClass}`}
        >
          {label}
        </button>
      </td>
      <td className="py-3 px-4 text-sm text-charcoal-muted max-w-xs hidden xl:table-cell">
        <p className="truncate">{inquiry.projectDescription || inquiry.description}</p>
      </td>
    </tr>
  );
}
