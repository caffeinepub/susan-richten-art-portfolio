import { useEffect } from 'react';
import { useIncrementPageView, usePageViewCount } from './useQueries';

export function usePageViewTracker() {
  const incrementPageView = useIncrementPageView();
  const { data: pageViewCount } = usePageViewCount();

  useEffect(() => {
    incrementPageView.mutate();
  }, []);

  return { pageViewCount };
}
