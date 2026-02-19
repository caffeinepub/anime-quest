import { useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Loader2, Lock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import CharacterStory from '../components/CharacterStory';
import RiddleChallenge from '../components/RiddleChallenge';
import UnlockSuccessModal from '../components/UnlockSuccessModal';
import Tooltip from '../components/Tooltip';
import { useGetCharacter, useGetUnlockedCharacters, useUnlockCharacter } from '../hooks/useQueries';
import { toast } from 'sonner';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function CharacterDetail() {
  const { characterId } = useParams({ from: '/character/$characterId' });
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const isAuthenticated = identity && !identity.getPrincipal().isAnonymous();
  const { data: character, isLoading } = useGetCharacter(BigInt(characterId));
  const { data: unlockedCharacters } = useGetUnlockedCharacters();
  const unlockMutation = useUnlockCharacter();

  const isUnlocked = unlockedCharacters?.some((c) => c.id.toString() === characterId) || false;

  const handleUnlockAttempt = async (answer: string) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to unlock characters');
      return;
    }

    try {
      const success = await unlockMutation.mutateAsync({
        characterId: BigInt(characterId),
        answer,
      });

      if (success) {
        setShowSuccessModal(true);
        toast.success('Character unlocked successfully!');
      } else {
        toast.error('Incorrect answer. Try again!');
      }
    } catch (error) {
      toast.error('Failed to unlock character. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-16 h-16 text-pink-400 animate-spin drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]" />
      </div>
    );
  }

  if (!character) {
    return (
      <div className="max-w-2xl mx-auto">
        <Alert className="border-2 border-red-400/50 bg-red-900/30 shadow-xl">
          <AlertDescription className="text-white/90 text-lg font-semibold">
            Character not found. Please check the character ID.
          </AlertDescription>
        </Alert>
        <Button onClick={() => navigate({ to: '/roster' })} className="mt-6 bg-gradient-to-r from-pink-500 to-purple-500">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Roster
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Tooltip content="Return to character roster">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/roster' })}
          className="text-white/80 hover:text-white hover:bg-white/10 font-semibold"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Roster
        </Button>
      </Tooltip>

      <Card className="border-2 border-pink-400/60 bg-gradient-to-br from-purple-900/60 to-pink-900/60 backdrop-blur-sm shadow-2xl shadow-pink-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-4xl bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent font-black tracking-tight">
              {isUnlocked ? character.name : '???'}
            </CardTitle>
            <Badge
              variant={isUnlocked ? 'default' : 'secondary'}
              className={`text-lg px-4 py-2 font-bold ${
                isUnlocked
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white border-pink-400 shadow-lg shadow-pink-500/50'
                  : 'bg-gray-700 text-gray-300 border-gray-600'
              }`}
            >
              #{character.id.toString()}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            {isUnlocked ? (
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-indigo-500/30 flex items-center justify-center">
                <div className="text-center relative">
                  <Sparkles className="w-32 h-32 mx-auto text-pink-400 mb-6 animate-pulse drop-shadow-[0_0_20px_rgba(236,72,153,0.9)]" />
                  <p className="text-white text-3xl font-black tracking-wide drop-shadow-lg">{character.name}</p>
                  <p className="text-white/80 mt-3 text-xl font-semibold">{character.appearance}</p>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/assets/generated/character-locked.dim_256x256.png"
                  alt="Locked Character"
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80 flex items-center justify-center">
                  <div className="text-center">
                    <Lock className="w-20 h-20 text-gray-400 mx-auto mb-6 animate-pulse" />
                    <p className="text-white/70 text-2xl font-bold">Character Locked</p>
                    <p className="text-white/50 text-lg mt-2">Solve the riddle to unlock</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {!isUnlocked && !isAuthenticated && (
            <Alert className="border-2 border-yellow-400/60 bg-yellow-900/30 shadow-xl">
              <AlertDescription className="text-white/90 text-lg font-semibold text-center">
                ⚠️ Please sign in to unlock characters and save your progress.
              </AlertDescription>
            </Alert>
          )}

          {!isUnlocked && isAuthenticated && (
            <RiddleChallenge
              character={character}
              onSubmit={handleUnlockAttempt}
              isSubmitting={unlockMutation.isPending}
            />
          )}

          <CharacterStory character={character} isUnlocked={isUnlocked} />
        </CardContent>
      </Card>

      <UnlockSuccessModal
        character={character}
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}
