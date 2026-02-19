import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Sparkles, Users, Trophy, BookOpen, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProgressTracker from '../components/ProgressTracker';
import TutorialModal from '../components/TutorialModal';
import Tooltip from '../components/Tooltip';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function GameHome() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const [showTutorial, setShowTutorial] = useState(false);
  const isAuthenticated = identity && !identity.getPrincipal().isAnonymous();

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* Enhanced Hero Section */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-pink-500/20 border-2 border-pink-400/30">
        <img
          src="/assets/generated/hero-banner-enhanced.dim_1920x600.png"
          alt="Anime Quest"
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex items-end">
          <div className="p-10 w-full">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="/assets/generated/logo.dim_512x512.png"
                alt="Logo"
                className="w-20 h-20 rounded-full border-4 border-pink-400 shadow-lg shadow-pink-500/50 animate-float"
              />
              <div>
                <h1 className="text-6xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-2xl tracking-tight">
                  Anime Quest
                </h1>
                <p className="text-pink-300 text-lg font-bold tracking-wide mt-1">
                  Legendary Character Collection
                </p>
              </div>
            </div>
            <p className="text-white text-xl max-w-3xl leading-relaxed font-medium drop-shadow-lg">
              Embark on an epic journey to collect all <span className="text-pink-400 font-bold">20 legendary characters</span>. 
              Solve riddles, unlock mysteries, and discover their unique stories!
            </p>
            <div className="flex gap-4 mt-6">
              <Tooltip content="Learn how to play and unlock characters">
                <Button
                  onClick={() => setShowTutorial(true)}
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold shadow-xl shadow-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  How to Play
                </Button>
              </Tooltip>
              <Tooltip content="Start your collection journey">
                <Button
                  onClick={() => navigate({ to: '/roster' })}
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold shadow-xl shadow-pink-500/30 hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Start Now
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      {!isAuthenticated && (
        <Card className="border-2 border-yellow-400/60 bg-gradient-to-br from-yellow-900/40 to-orange-900/40 shadow-xl shadow-yellow-500/20 hover:shadow-2xl hover:shadow-yellow-500/30 transition-all duration-300">
          <CardContent className="p-8 text-center">
            <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-pulse drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]" />
            <h3 className="text-2xl font-black text-white mb-3 tracking-wide">Sign In to Start Your Journey</h3>
            <p className="text-white/80 mb-2 text-lg leading-relaxed">
              Sign in to save your progress and unlock characters across all your devices
            </p>
            <p className="text-yellow-300 text-sm font-semibold">
              ✨ Your collection will be saved automatically!
            </p>
          </CardContent>
        </Card>
      )}

      <ProgressTracker />

      <div className="grid md:grid-cols-2 gap-8">
        <Tooltip content="Browse all 20 characters and see your collection progress">
          <Card className="border-2 border-purple-400/60 bg-gradient-to-br from-purple-900/60 to-indigo-900/60 hover:border-purple-400 transition-all duration-500 cursor-pointer group shadow-xl shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-105">
            <CardContent className="p-10 text-center" onClick={() => navigate({ to: '/roster' })}>
              <div className="relative inline-block mb-6">
                <Users className="w-20 h-20 text-purple-400 mx-auto group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_16px_rgba(168,85,247,0.8)]" />
                <div className="absolute inset-0 bg-purple-400/20 blur-2xl group-hover:bg-purple-400/40 transition-all rounded-full"></div>
              </div>
              <h3 className="text-3xl font-black text-white mb-3 tracking-wide">Character Roster</h3>
              <p className="text-white/80 mb-6 text-lg leading-relaxed">
                View all 20 characters and track your collection progress
              </p>
              <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 transition-all">
                View Roster
              </Button>
            </CardContent>
          </Card>
        </Tooltip>

        <Tooltip content="Solve riddles to unlock new characters and their stories">
          <Card className="border-2 border-pink-400/60 bg-gradient-to-br from-pink-900/60 to-rose-900/60 hover:border-pink-400 transition-all duration-500 cursor-pointer group shadow-xl shadow-pink-500/20 hover:shadow-2xl hover:shadow-pink-500/40 hover:scale-105">
            <CardContent className="p-10 text-center">
              <div className="relative inline-block mb-6">
                <Trophy className="w-20 h-20 text-pink-400 mx-auto group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_16px_rgba(236,72,153,0.8)]" />
                <div className="absolute inset-0 bg-pink-400/20 blur-2xl group-hover:bg-pink-400/40 transition-all rounded-full"></div>
              </div>
              <h3 className="text-3xl font-black text-white mb-3 tracking-wide">Unlock Challenges</h3>
              <p className="text-white/80 mb-6 text-lg leading-relaxed">
                Solve riddles and puzzles to unlock new characters
              </p>
              <Button
                onClick={() => navigate({ to: '/roster' })}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/50 transition-all"
              >
                Start Challenge
              </Button>
            </CardContent>
          </Card>
        </Tooltip>
      </div>

      <TutorialModal open={showTutorial} onClose={() => setShowTutorial(false)} />
    </div>
  );
}
