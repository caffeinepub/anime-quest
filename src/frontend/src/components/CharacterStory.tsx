import { Lock, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Character } from '../backend';

interface CharacterStoryProps {
  character: Character;
  isUnlocked: boolean;
}

export default function CharacterStory({ character, isUnlocked }: CharacterStoryProps) {
  return (
    <Card className="border-2 border-pink-400/50 bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <BookOpen className="w-5 h-5 text-pink-400" />
          Background Story
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {isUnlocked ? (
          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
              {character.story}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Lock className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-white/60">
              Unlock this character to read their story
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
