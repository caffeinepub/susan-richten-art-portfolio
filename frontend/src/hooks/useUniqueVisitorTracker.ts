import { useEffect } from 'react';
import { useAddUniqueVisitor, useUniqueVisitorCount } from './useQueries';

const VISITOR_ID_KEY = 'visitor_id';

function getOrCreateVisitorId(): string {
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  if (!visitorId) {
    visitorId = 'visitor_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }
  return visitorId;
}

export function useUniqueVisitorTracker() {
  const addUniqueVisitor = useAddUniqueVisitor();
  const { data: uniqueVisitorCount } = useUniqueVisitorCount();

  useEffect(() => {
    const visitorId = getOrCreateVisitorId();
    addUniqueVisitor.mutate(visitorId);
  }, []);

  return { uniqueVisitorCount };
}
