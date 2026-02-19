import { useState } from 'react';
import { Lock, Sparkles, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Tooltip from './Tooltip';
import { useParticleEffect } from '../hooks/useParticleEffect';
import type { Character } from '../backend';

interface CharacterCardProps {
  character: Character;
  isUnlocked: boolean;
  onClick: () => void;
}

export default function CharacterCard({ character, isUnlocked, onClick }: CharacterCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const particleCanvasRef = useParticleEffect(isHovered && isUnlocked, 12);

  return (
    <Tooltip
      content={
        isUnlocked
          ? `View ${character.name}'s details and story`
          : 'Click to unlock this character by solving their riddle'
      }
    >
      <Card
        className={`group cursor-pointer transition-all duration-500 overflow-hidden border-2 relative ${
          isUnlocked
            ? 'border-pink-400/60 bg-gradient-to-br from-purple-900/60 to-pink-900/60 hover:border-pink-400 hover:shadow-2xl hover:shadow-pink-500/50 hover:scale-105'
            : 'border-gray-600/50 bg-gradient-to-br from-gray-900/60 to-gray-800/60 hover:border-gray-500 hover:shadow-xl hover:shadow-gray-500/30 hover:scale-102'
        }`}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Premium border frame overlay for unlocked cards */}
        {isUnlocked && (
          <div className="absolute inset-0 pointer-events-none z-10 opacity-40 group-hover:opacity-60 transition-opacity">
            <img
              src="/assets/generated/card-border-premium.dim_400x500.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Particle effect canvas for unlocked cards */}
        {isUnlocked && (
          <canvas
            ref={particleCanvasRef}
            className="absolute inset-0 pointer-events-none z-5"
            style={{ width: '100%', height: '100%' }}
          />
        )}

        <CardContent className="p-0 relative">
          <div className="relative aspect-square">
            {/* Shimmer effect on hover for unlocked cards */}
            {isUnlocked && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-20 pointer-events-none" />
            )}

            {isUnlocked ? (
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-indigo-500/30 flex items-center justify-center">
                <div className="text-center relative z-10">
                  <div className="relative">
                    <Sparkles className="w-16 h-16 mx-auto text-pink-400 mb-2 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
                    {/* Sparkle particles image overlay */}
                    <img
                      src="/assets/generated/sparkle-particles.dim_256x256.png"
                      alt=""
                      className="absolute inset-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 opacity-60 group-hover:opacity-100 transition-opacity animate-pulse-glow pointer-events-none"
                    />
                  </div>
                  <p className="text-white/90 text-sm font-bold tracking-wide drop-shadow-lg">
                    {character.name}
                  </p>
                  <Star className="w-4 h-4 mx-auto mt-1 text-yellow-400 fill-yellow-400 group-hover:animate-spin" />
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/assets/generated/character-locked.dim_256x256.png"
                  alt="Locked Character"
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 flex items-center justify-center">
                  <div className="text-center">
                    <Lock className="w-12 h-12 text-gray-400 group-hover:text-gray-300 transition-colors group-hover:animate-pulse" />
                    <p className="text-gray-500 text-xs mt-2 font-medium">Click to Unlock</p>
                  </div>
                </div>
              </div>
            )}

            <div className="absolute top-2 right-2 z-30">
              <Badge
                variant={isUnlocked ? 'default' : 'secondary'}
                className={`transition-all duration-300 ${
                  isUnlocked
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white border-pink-400 shadow-lg shadow-pink-500/50 group-hover:scale-110'
                    : 'bg-gray-700/90 text-gray-300 border-gray-600 group-hover:bg-gray-600/90'
                }`}
              >
                #{character.id.toString()}
              </Badge>
            </div>

            {/* Glow effect on hover for unlocked cards */}
            {isUnlocked && (
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/0 via-pink-500/0 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            )}
          </div>

          <div className="p-3 bg-gradient-to-b from-black/60 to-black/80 backdrop-blur-sm relative z-10">
            <h3
              className={`font-bold text-center truncate transition-all ${
                isUnlocked
                  ? 'text-white text-shadow-glow group-hover:text-pink-300'
                  : 'text-gray-400 group-hover:text-gray-300'
              }`}
            >
              {isUnlocked ? character.name : '???'}
            </h3>
            {isUnlocked && (
              <p className="text-xs text-center text-pink-400/80 mt-1 font-medium">Unlocked</p>
            )}
          </div>
        </CardContent>
      </Card>
    </Tooltip>
  );
}
