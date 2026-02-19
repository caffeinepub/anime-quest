import { useState } from 'react';
import { Loader2, Send, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Tooltip from './Tooltip';
import type { Character } from '../backend';

interface RiddleChallengeProps {
  character: Character;
  onSubmit: (answer: string) => void;
  isSubmitting: boolean;
}

export default function RiddleChallenge({ character, onSubmit, isSubmitting }: RiddleChallengeProps) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmit(answer.trim());
    }
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-2xl"
      style={{
        backgroundImage: 'url(/assets/generated/riddle-bg.dim_800x600.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/95 via-pink-900/95 to-indigo-900/95 backdrop-blur-md"></div>

      <Card className="relative border-2 border-pink-400/60 bg-black/50 backdrop-blur-xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl text-center bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent font-black tracking-wide">
            Unlock Challenge
          </CardTitle>
          <CardDescription className="text-white/90 text-center text-lg font-semibold">
            Solve the riddle to unlock {character.name}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="p-8 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-2 border-pink-400/40 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400/10 rounded-full blur-3xl"></div>
            <div className="relative flex items-start gap-4">
              <Lightbulb className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
              <p className="text-white text-xl text-center font-semibold leading-relaxed flex-1">
                {character.riddle}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="answer" className="text-white text-lg font-bold flex items-center gap-2">
                Your Answer
                <Tooltip content="Type your answer and press Submit to unlock the character">
                  <span className="text-pink-400 text-sm cursor-help">(case-sensitive)</span>
                </Tooltip>
              </Label>
              <Tooltip content="Enter your answer to the riddle here">
                <Input
                  id="answer"
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter your answer..."
                  disabled={isSubmitting}
                  className="bg-white/10 border-2 border-pink-400/50 text-white placeholder:text-white/40 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50 text-lg py-6 font-semibold"
                />
              </Tooltip>
            </div>

            <Tooltip content={!answer.trim() ? 'Enter an answer first' : 'Submit your answer to unlock the character'}>
              <Button
                type="submit"
                disabled={!answer.trim() || isSubmitting}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-black text-lg py-6 shadow-xl shadow-pink-500/30 hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Checking Answer...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Answer
                  </>
                )}
              </Button>
            </Tooltip>
          </form>

          <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4">
            <p className="text-yellow-200 text-sm text-center font-semibold">
              💡 <span className="font-bold">Hint:</span> Don't worry about wrong answers - you can try as many times as you need!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
