import { Trophy, Star, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Tooltip from './Tooltip';
import { useGetAllCharacters, useGetUnlockedCharacters } from '../hooks/useQueries';

export default function ProgressTracker() {
  const { data: allCharacters } = useGetAllCharacters();
  const { data: unlockedCharacters } = useGetUnlockedCharacters();

  const total = allCharacters?.length || 20;
  const unlocked = unlockedCharacters?.length || 0;
  const percentage = (unlocked / total) * 100;

  return (
    <Tooltip content="Track your collection progress and see how many characters you've unlocked">
      <Card className="border-2 border-pink-400/60 bg-gradient-to-br from-purple-900/60 to-pink-900/60 backdrop-blur-sm shadow-xl shadow-pink-500/20 hover:shadow-2xl hover:shadow-pink-500/30 transition-all duration-300 hover:scale-102">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Trophy className="w-8 h-8 text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]" />
                <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full"></div>
              </div>
              <h3 className="text-2xl font-black text-white tracking-wide">Collection Progress</h3>
            </div>
            <div className="flex items-center gap-2 text-3xl font-black text-pink-400 drop-shadow-lg">
              <Star className="w-7 h-7 fill-pink-400 animate-pulse" />
              {unlocked}/{total}
            </div>
          </div>

          <div className="relative">
            <Progress
              value={percentage}
              className="h-4 bg-gray-700/50 shadow-inner"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full pointer-events-none"></div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-white/70 text-sm font-semibold">
              {percentage === 100 ? (
                <span className="text-yellow-400 flex items-center gap-2">
                  <Trophy className="w-5 h-5 fill-yellow-400" />
                  🎉 Collection Complete!
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-pink-400" />
                  {(100 - percentage).toFixed(0)}% remaining
                </span>
              )}
            </p>
            <p className="text-pink-400 text-sm font-bold">
              {percentage.toFixed(0)}% Complete
            </p>
          </div>
        </CardContent>
      </Card>
    </Tooltip>
  );
}
