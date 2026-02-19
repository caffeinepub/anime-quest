import { useNavigate } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import CharacterCard from './CharacterCard';
import { useGetAllCharacters, useGetUnlockedCharacters } from '../hooks/useQueries';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function CharacterGrid() {
  const navigate = useNavigate();
  const { data: allCharacters, isLoading: isLoadingAll } = useGetAllCharacters();
  const { data: unlockedCharacters, isLoading: isLoadingUnlocked } = useGetUnlockedCharacters();

  const isLoading = isLoadingAll || isLoadingUnlocked;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-pink-400 animate-spin" />
      </div>
    );
  }

  if (!allCharacters || allCharacters.length === 0) {
    return (
      <Alert className="border-pink-400/50 bg-pink-900/20">
        <AlertDescription className="text-white/80">
          No characters available yet. Check back soon!
        </AlertDescription>
      </Alert>
    );
  }

  const unlockedIds = new Set(unlockedCharacters?.map((c) => c.id.toString()) || []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {allCharacters.map((character) => (
        <CharacterCard
          key={character.id.toString()}
          character={character}
          isUnlocked={unlockedIds.has(character.id.toString())}
          onClick={() => navigate({ to: '/character/$characterId', params: { characterId: character.id.toString() } })}
        />
      ))}
    </div>
  );
}
