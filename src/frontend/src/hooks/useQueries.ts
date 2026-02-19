import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Character } from '../backend';

export function useGetAllCharacters() {
  const { actor, isFetching } = useActor();

  return useQuery<Character[]>({
    queryKey: ['characters'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCharacters();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCharacter(characterId: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<Character>({
    queryKey: ['character', characterId.toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getCharacter(characterId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetUnlockedCharacters() {
  const { actor, isFetching } = useActor();

  return useQuery<Character[]>({
    queryKey: ['unlockedCharacters'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUnlockedCharacters();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUnlockCharacter() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ characterId, answer }: { characterId: bigint; answer: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.unlockCharacter(characterId, answer);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['unlockedCharacters'] });
      queryClient.invalidateQueries({ queryKey: ['characters'] });
    },
  });
}
