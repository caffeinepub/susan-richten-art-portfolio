import React, { useState } from 'react';
import { useCMS } from '../../contexts/CMSContext';
import { Mail, MailOpen, CheckCircle, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

type FilterTab = 'all' | 'unread' | 'responded';

export default function MessagesInbox() {
  const { notifications, updateNotificationStatus, deleteNotification } = useCMS();
  const [filter, setFilter] = useState<FilterTab>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filtered = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return n.status === 'unread';
    if (filter === 'responded') return n.status === 'responded';
    return true;
  });

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  const sourceBadge = (sourceType: string) => {
    switch (sourceType) {
      case 'commission': return 'bg-purple-100 text-purple-700';
      case 'contact': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-amber-100 text-amber-700';
      case 'read': return 'bg-gray-100 text-gray-600';
      case 'responded': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  };

  const handleDelete = (id: string) => {
    if (confirmDeleteId === id) {
      deleteNotification(id);
      setConfirmDeleteId(null);
    } else {
      setConfirmDeleteId(id);
    }
  };

  const filterLabels: Record<FilterTab, string> = {
    all: 'All',
    unread: 'Unread',
    responded: 'Responded',
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-4xl text-charcoal mb-1">Messages Inbox</h1>
        <p className="font-body text-sm text-charcoal-muted">
          {notifications.length} total · {unreadCount} unread
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-0 border-b border-beige-dark mb-6">
        {(Object.keys(filterLabels) as FilterTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-5 py-3 font-body text-xs tracking-widest uppercase border-b-2 transition-all ${
              filter === tab
                ? 'border-charcoal text-charcoal'
                : 'border-transparent text-charcoal-muted hover:text-charcoal'
            }`}
          >
            {filterLabels[tab]}
            {tab === 'unread' && unreadCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white p-12 text-center shadow-xs">
          <p className="font-body text-charcoal-muted italic">No messages in this category.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered
            .slice()
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(notification => (
              <div
                key={notification.id}
                className={`bg-white shadow-xs overflow-hidden border-l-4 transition-colors ${
                  notification.status === 'unread'
                    ? 'border-amber-400 bg-amber-50/30'
                    : 'border-transparent'
                }`}
              >
                {/* Row header */}
                <div
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-beige/30 transition-colors"
                  onClick={() => {
                    setExpandedId(expandedId === notification.id ? null : notification.id);
                    if (notification.status === 'unread') {
                      updateNotificationStatus(notification.id, 'read');
                    }
                  }}
                >
                  <div className="shrink-0 text-charcoal-muted">
                    {notification.status === 'unread'
                      ? <Mail size={16} className="text-amber-500" />
                      : <MailOpen size={16} />
                    }
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="font-body text-sm font-semibold text-charcoal">{notification.submitterName}</span>
                      <span className="font-body text-xs text-charcoal-muted">{notification.submitterEmail}</span>
                      <span className={`px-2 py-0.5 rounded-sm text-xs font-medium ${sourceBadge(notification.sourceType)}`}>
                        {notification.sourceType}
                      </span>
                      <span className={`px-2 py-0.5 rounded-sm text-xs font-medium ${statusBadge(notification.status)}`}>
                        {notification.status}
                      </span>
                    </div>
                    <p className="font-body text-xs text-charcoal-muted truncate">{notification.messagePreview}</p>
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    <span className="font-body text-xs text-charcoal-muted hidden sm:block">{formatDate(notification.timestamp)}</span>
                    {expandedId === notification.id
                      ? <ChevronUp size={16} className="text-charcoal-muted" />
                      : <ChevronDown size={16} className="text-charcoal-muted" />
                    }
                  </div>
                </div>

                {/* Expanded content */}
                {expandedId === notification.id && (
                  <div className="px-5 pb-5 border-t border-beige-dark">
                    <div className="pt-4 mb-4">
                      <p className="font-body text-sm text-charcoal-light leading-relaxed whitespace-pre-wrap">
                        {notification.fullPayload || notification.messagePreview}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      {notification.status !== 'read' && (
                        <button
                          onClick={() => updateNotificationStatus(notification.id, 'read')}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-body border border-beige-dark text-charcoal-muted hover:text-charcoal hover:border-charcoal transition-colors rounded-sm"
                        >
                          <MailOpen size={13} />
                          Mark as Read
                        </button>
                      )}
                      {notification.status !== 'responded' && (
                        <button
                          onClick={() => updateNotificationStatus(notification.id, 'responded')}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-body border border-green-300 text-green-700 hover:bg-green-50 transition-colors rounded-sm"
                        >
                          <CheckCircle size={13} />
                          Mark as Responded
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-body border transition-colors rounded-sm ${
                          confirmDeleteId === notification.id
                            ? 'border-red-400 bg-red-50 text-red-600'
                            : 'border-beige-dark text-charcoal-muted hover:text-red-500 hover:border-red-300'
                        }`}
                      >
                        <Trash2 size={13} />
                        {confirmDeleteId === notification.id ? 'Confirm Delete' : 'Delete'}
                      </button>
                      {confirmDeleteId === notification.id && (
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="text-xs font-body text-charcoal-muted hover:text-charcoal transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
