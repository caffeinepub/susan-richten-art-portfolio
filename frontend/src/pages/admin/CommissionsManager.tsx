import React, { useState } from 'react';
import { useCMS, CommissionInquiry } from '../../contexts/CMSContext';
import InquiryRow from '../../components/admin/InquiryRow';

type Filter = 'all' | 'new' | 'in-progress' | 'completed' | 'declined';

export default function CommissionsManager() {
  const { commissionInquiries, updateCommissionInquiry } = useCMS();
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
      <div className="mb-8">
        <h1 className="font-heading text-4xl text-charcoal mb-1">Commissions</h1>
        <p className="font-body text-sm text-charcoal-muted">
          {commissionInquiries.length} total · {newCount} new
        </p>
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

      {filtered.length === 0 ? (
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
