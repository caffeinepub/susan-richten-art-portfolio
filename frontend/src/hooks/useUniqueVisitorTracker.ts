import { useEffect, useRef } from 'react';
import { useAddUniqueVisitor, useGetUniqueVisitorCount } from './useQueries';

const VISITOR_UUID_KEY = 'visitor_uuid';

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback UUID v4 generation
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function useUniqueVisitorTracker() {
  const { mutate: addUniqueVisitor } = useAddUniqueVisitor();
  const uniqueVisitorQuery = useGetUniqueVisitorCount();
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;
    hasTracked.current = true;

    let visitorId = localStorage.getItem(VISITOR_UUID_KEY);
    if (!visitorId) {
      visitorId = generateUUID();
      localStorage.setItem(VISITOR_UUID_KEY, visitorId);
      // New visitor — register with backend
      addUniqueVisitor(visitorId);
    }
    // If visitorId already existed, we don't call addUniqueVisitor again
    // The backend also deduplicates, but we avoid the call entirely for returning visitors
  }, [addUniqueVisitor]);

  return {
    uniqueVisitorCount: uniqueVisitorQuery.data ?? BigInt(0),
    isLoading: uniqueVisitorQuery.isLoading,
  };
}
