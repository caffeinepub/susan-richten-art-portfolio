import React, { useState } from 'react';
import { useCMS } from '../../contexts/CMSContext';
import { InquiryRow } from '../../components/admin/InquiryRow';

type Filter = 'all' | 'unread' | 'responded';

export function CommissionsManager() {
  const { commissionInquiries } = useCMS();
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = commissionInquiries.filter(i => {
    if (filter === 'all') return true;
    if (filter === 'unread') return i.status === 'unread';
    if (filter === 'responded') return i.status === 'responded';
    return true;
  });

  const unreadCount = commissionInquiries.filter(i => i.status === 'unread').length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-4xl text-charcoal mb-1">Commissions</h1>
        <p className="font-body text-sm text-charcoal-muted">
          {commissionInquiries.length} total · {unreadCount} unread
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-0 border-b border-beige-dark mb-6">
        {(['all', 'unread', 'responded'] as Filter[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-3 font-body text-xs tracking-widest uppercase border-b-2 transition-all ${
              filter === f
                ? 'border-charcoal text-charcoal'
                : 'border-transparent text-charcoal-muted hover:text-charcoal'
            }`}
          >
            {f}
            {f === 'unread' && unreadCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold">
                {unreadCount}
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
          {filtered.map(inquiry => (
            <InquiryRow key={inquiry.id} inquiry={inquiry} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommissionsManager;
