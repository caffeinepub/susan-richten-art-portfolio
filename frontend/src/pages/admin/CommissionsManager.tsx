import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { useCMS, CommissionInquiry } from '../../contexts/CMSContext';
import InquiryRow from '../../components/admin/InquiryRow';
import { Skeleton } from '@/components/ui/skeleton';

type Filter = 'all' | 'new' | 'in-progress' | 'completed' | 'declined';

function exportToCSV(inquiries: CommissionInquiry[]) {
  const headers = ['Name', 'Email', 'Project Type', 'Budget', 'Description', 'Status', 'Date Submitted'];
  const rows = inquiries.map(i => [
    i.name,
    i.email,
    i.projectType || '',
    i.budget || i.budgetRange || '',
    (i.description || i.projectDescription || '').replace(/"/g, '""'),
    i.status,
    new Date(i.timestamp).toLocaleDateString(),
  ]);

  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'commission-inquiries.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function CommissionsManager() {
  const { commissionInquiries, updateCommissionInquiry, isLoading } = useCMS();
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = commissionInquiries.filter(i => {
    if (filter === 'all') return true;
    return i.status === filter;
  });

  const newCount = commissionInquiries.filter(i => i.status === 'new').length;

  const filterLabels: Record<Filter, string> = {
    all: 'All',
    new: 'New',
    'in-progress': 'In Progress',
    completed: 'Completed',
    declined: 'Declined',
  };

  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-4xl text-charcoal mb-1">Commissions</h1>
          <p className="font-body text-sm text-charcoal-muted">
            {commissionInquiries.length} total · {newCount} new
          </p>
        </div>
        <button
          onClick={() => exportToCSV(filtered)}
          className="flex items-center gap-2 px-4 py-2.5 bg-charcoal text-beige font-body text-xs tracking-widest uppercase hover:bg-charcoal-light transition-colors shrink-0"
        >
          <Download size={14} />
          Export CSV
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-0 border-b border-beige-dark mb-6 overflow-x-auto">
        {(Object.keys(filterLabels) as Filter[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-3 font-body text-xs tracking-widest uppercase border-b-2 transition-all whitespace-nowrap ${
              filter === f
                ? 'border-charcoal text-charcoal'
                : 'border-transparent text-charcoal-muted hover:text-charcoal'
            }`}
          >
            {filterLabels[f]}
            {f === 'new' && newCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold">
                {newCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="bg-white shadow-xs overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-beige-dark">
                <th className="px-4 py-3 text-left font-body text-xs tracking-widest uppercase text-charcoal-muted">Client</th>
                <th className="px-4 py-3 text-left font-body text-xs tracking-widest uppercase text-charcoal-muted hidden md:table-cell">Type</th>
                <th className="px-4 py-3 text-left font-body text-xs tracking-widest uppercase text-charcoal-muted hidden lg:table-cell">Budget</th>
                <th className="px-4 py-3 text-left font-body text-xs tracking-widest uppercase text-charcoal-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="border-b border-beige-dark">
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-28" />
                      <Skeleton className="h-3 w-36" />
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell"><Skeleton className="h-3 w-20" /></td>
                  <td className="px-4 py-3 hidden lg:table-cell"><Skeleton className="h-3 w-24" /></td>
                  <td className="px-4 py-3"><Skeleton className="h-6 w-20 rounded-full" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white p-12 text-center shadow-xs">
          <p className="font-body text-charcoal-muted italic">No inquiries in this category.</p>
        </div>
      ) : (
        <div className="bg-white shadow-xs overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-beige-dark">
                <th className="px-4 py-3 text-left font-body text-xs tracking-widest uppercase text-charcoal-muted">Client</th>
                <th className="px-4 py-3 text-left font-body text-xs tracking-widest uppercase text-charcoal-muted hidden md:table-cell">Type</th>
                <th className="px-4 py-3 text-left font-body text-xs tracking-widest uppercase text-charcoal-muted hidden lg:table-cell">Budget</th>
                <th className="px-4 py-3 text-left font-body text-xs tracking-widest uppercase text-charcoal-muted hidden lg:table-cell">Date</th>
                <th className="px-4 py-3 text-left font-body text-xs tracking-widest uppercase text-charcoal-muted">Status</th>
                <th className="px-4 py-3 text-left font-body text-xs tracking-widest uppercase text-charcoal-muted hidden xl:table-cell">Description</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(inquiry => (
                <InquiryRow
                  key={inquiry.id}
                  inquiry={inquiry}
                  onStatusChange={(id, status) => updateCommissionInquiry(id, { status })}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
