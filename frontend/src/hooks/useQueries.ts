import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useGetPageViewCount() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['pageViewCount'],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getPageViewCount();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useIncrementPageView() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) return;
      await actor.incrementPageView();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pageViewCount'] });
    },
  });
}

export function useGetUniqueVisitorCount() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['uniqueVisitorCount'],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getUniqueVisitorCount();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useAddUniqueVisitor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (visitorId: string) => {
      if (!actor) return false;
      return actor.addUniqueVisitor(visitorId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['uniqueVisitorCount'] });
    },
  });
}
