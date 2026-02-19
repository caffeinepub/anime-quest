import { Sparkles, Users } from 'lucide-react';
import CharacterGrid from '../components/CharacterGrid';
import Tooltip from '../components/Tooltip';

export default function CharacterRoster() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4">
          <img
            src="/assets/generated/logo.dim_512x512.png"
            alt="Logo"
            className="w-16 h-16 rounded-full border-4 border-pink-400 shadow-xl shadow-pink-500/50 animate-float"
          />
          <h1 className="text-5xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent tracking-tight drop-shadow-2xl">
            Character Roster
          </h1>
          <Sparkles className="w-10 h-10 text-pink-400 fill-pink-400 animate-pulse drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]" />
        </div>
        <p className="text-white/80 text-xl max-w-3xl mx-auto leading-relaxed font-medium">
          Discover and unlock all <span className="text-pink-400 font-bold">20 legendary characters</span>. 
          Click on any character to view details and unlock challenges.
        </p>
        <Tooltip content="Click on locked characters to solve riddles and unlock them">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30 rounded-full px-6 py-3 mt-2">
            <Users className="w-5 h-5 text-pink-400" />
            <p className="text-white/90 font-semibold">
              Click any card to begin your journey
            </p>
          </div>
        </Tooltip>
      </div>

      <CharacterGrid />
    </div>
  );
}
