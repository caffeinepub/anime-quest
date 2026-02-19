import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles, Lock, Trophy, BookOpen } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TutorialModalProps {
  open: boolean;
  onClose: () => void;
}

const tutorialSteps = [
  {
    title: 'Welcome to Anime Quest!',
    icon: Sparkles,
    content: (
      <div className="space-y-4">
        <div className="flex justify-center">
          <img
            src="/assets/generated/tutorial-icon.dim_128x128.png"
            alt="Tutorial"
            className="w-32 h-32 object-contain animate-float"
          />
        </div>
        <p className="text-white/90 text-lg leading-relaxed">
          Embark on an epic journey to collect all <span className="text-pink-400 font-bold">20 legendary characters</span>! 
          Each character has a unique story waiting to be discovered.
        </p>
        <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30 rounded-lg p-4">
          <p className="text-white/80 text-center">
            ✨ Solve riddles, unlock mysteries, and become a master collector! ✨
          </p>
        </div>
      </div>
    ),
  },
  {
    title: 'Character Collection',
    icon: Trophy,
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-pink-400/50 rounded-lg p-4 text-center">
            <Sparkles className="w-12 h-12 text-pink-400 mx-auto mb-2" />
            <p className="text-white font-bold">Unlocked</p>
            <p className="text-white/60 text-sm">Character revealed</p>
          </div>
          <div className="bg-gradient-to-br from-gray-700/30 to-gray-800/30 border-2 border-gray-600/50 rounded-lg p-4 text-center">
            <Lock className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-400 font-bold">Locked</p>
            <p className="text-gray-500 text-sm">Mystery awaits</p>
          </div>
        </div>
        <p className="text-white/90 leading-relaxed">
          Browse the <span className="text-pink-400 font-semibold">Character Roster</span> to see all 20 characters. 
          Locked characters appear as mysteries - click on them to begin your unlock challenge!
        </p>
        <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-3">
          <p className="text-yellow-200 text-sm">
            💡 <span className="font-semibold">Tip:</span> Your progress is automatically saved when you sign in!
          </p>
        </div>
      </div>
    ),
  },
  {
    title: 'Riddle Challenges',
    icon: Lock,
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-2 border-pink-400/50 rounded-lg p-6">
          <div className="text-center mb-4">
            <Lock className="w-16 h-16 text-pink-400 mx-auto mb-3" />
            <p className="text-white/90 text-lg font-medium italic">
              "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?"
            </p>
          </div>
          <div className="bg-black/30 rounded-lg p-3 mb-3">
            <input
              type="text"
              placeholder="Enter your answer..."
              className="w-full bg-transparent text-white placeholder:text-white/40 outline-none"
              disabled
            />
          </div>
          <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500" disabled>
            Submit Answer
          </Button>
        </div>
        <p className="text-white/90 leading-relaxed">
          Each locked character has a <span className="text-pink-400 font-semibold">unique riddle</span>. 
          Solve it correctly to unlock the character and reveal their story!
        </p>
        <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-3">
          <p className="text-red-200 text-sm">
            ⚠️ <span className="font-semibold">Note:</span> Incorrect answers won't lock you out - keep trying!
          </p>
        </div>
      </div>
    ),
  },
  {
    title: 'Character Stories',
    icon: BookOpen,
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-2 border-indigo-400/50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-indigo-400" />
            <h4 className="text-xl font-bold text-white">Background Story</h4>
          </div>
          <div className="bg-black/30 rounded-lg p-4">
            <p className="text-white/80 leading-relaxed">
              Once unlocked, each character reveals their unique background story, 
              filled with adventure, mystery, and personality. Discover what makes 
              each character special!
            </p>
          </div>
        </div>
        <p className="text-white/90 leading-relaxed">
          After unlocking a character, their <span className="text-indigo-400 font-semibold">background story</span> becomes 
          available. Learn about their origins, abilities, and what makes them legendary!
        </p>
        <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-3">
          <p className="text-green-200 text-sm">
            ✅ <span className="font-semibold">Collect them all</span> to complete your legendary roster!
          </p>
        </div>
      </div>
    ),
  },
  {
    title: 'Progress Tracking',
    icon: Trophy,
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-2 border-pink-400/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <h4 className="text-lg font-bold text-white">Collection Progress</h4>
            </div>
            <div className="flex items-center gap-1 text-xl font-bold text-pink-400">
              <Sparkles className="w-5 h-5 fill-pink-400" />
              5/20
            </div>
          </div>
          <div className="h-3 bg-gray-700/50 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 w-1/4 rounded-full"></div>
          </div>
          <p className="text-white/60 text-sm mt-2 text-center">
            75% remaining to complete your collection
          </p>
        </div>
        <p className="text-white/90 leading-relaxed">
          Track your collection progress with the <span className="text-pink-400 font-semibold">Progress Tracker</span>. 
          See how many characters you've unlocked and how close you are to completing your collection!
        </p>
        <div className="bg-purple-500/10 border border-purple-400/30 rounded-lg p-3">
          <p className="text-purple-200 text-sm">
            🎯 <span className="font-semibold">Goal:</span> Unlock all 20 characters to achieve 100% completion!
          </p>
        </div>
      </div>
    ),
  },
];

export default function TutorialModal({ open, onClose }: TutorialModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    onClose();
  };

  const step = tutorialSteps[currentStep];
  const Icon = step.icon;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl border-2 border-pink-400/50 bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent flex items-center gap-3">
              <Icon className="w-8 h-8 text-pink-400" />
              {step.title}
            </DialogTitle>
            <button
              onClick={handleClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </DialogHeader>

        <div className="py-6">
          {step.content}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex gap-2">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'w-8 bg-gradient-to-r from-pink-500 to-purple-500'
                    : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="border-pink-400/50 text-white hover:bg-pink-500/20"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            {currentStep < tutorialSteps.length - 1 ? (
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={handleClose}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              >
                Start Playing!
                <Sparkles className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>

        <div className="text-center">
          <Badge variant="outline" className="border-pink-400/50 text-pink-300">
            Step {currentStep + 1} of {tutorialSteps.length}
          </Badge>
        </div>
      </DialogContent>
    </Dialog>
  );
}
