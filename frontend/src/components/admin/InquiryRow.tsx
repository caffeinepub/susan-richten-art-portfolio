import { CommissionInquiry } from '../../contexts/CMSContext';

interface InquiryRowProps {
  inquiry: CommissionInquiry;
  onStatusChange: (id: string, status: CommissionInquiry['status']) => void;
}

const statusColors: Record<CommissionInquiry['status'], string> = {
  'new': 'bg-amber-100 text-amber-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  'completed': 'bg-green-100 text-green-800',
  'declined': 'bg-red-100 text-red-800',
};

const nextStatus: Record<CommissionInquiry['status'], CommissionInquiry['status']> = {
  'new': 'in-progress',
  'in-progress': 'completed',
  'completed': 'declined',
  'declined': 'new',
};

const statusLabels: Record<CommissionInquiry['status'], string> = {
  'new': 'New',
  'in-progress': 'In Progress',
  'completed': 'Completed',
  'declined': 'Declined',
};

export default function InquiryRow({ inquiry, onStatusChange }: InquiryRowProps) {
  const date = new Date(inquiry.timestamp).toLocaleDateString();

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
          onClick={() => onStatusChange(inquiry.id, nextStatus[inquiry.status])}
          className={`px-2 py-1 rounded-sm text-xs font-medium transition-colors ${statusColors[inquiry.status]}`}
        >
          {statusLabels[inquiry.status]}
        </button>
      </td>
      <td className="py-3 px-4 text-sm text-charcoal-muted max-w-xs hidden xl:table-cell">
        <p className="truncate">{inquiry.projectDescription || inquiry.description}</p>
      </td>
    </tr>
  );
}
