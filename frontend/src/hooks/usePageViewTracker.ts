import { useEffect, useRef } from 'react';
import { useIncrementPageView, useGetPageViewCount } from './useQueries';

export function usePageViewTracker() {
  const { mutate: incrementPageView } = useIncrementPageView();
  const pageViewQuery = useGetPageViewCount();
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!hasTracked.current) {
      hasTracked.current = true;
      incrementPageView();
    }
  }, [incrementPageView]);

  return {
    pageViewCount: pageViewQuery.data ?? BigInt(0),
    isLoading: pageViewQuery.isLoading,
  };
}
