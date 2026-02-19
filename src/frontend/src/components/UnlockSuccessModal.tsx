import { Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Character } from '../backend';

interface UnlockSuccessModalProps {
  character: Character | null;
  open: boolean;
  onClose: () => void;
}

export default function UnlockSuccessModal({ character, open, onClose }: UnlockSuccessModalProps) {
  if (!character) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="border-2 border-pink-400 bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <img
              src="/assets/generated/unlock-success.dim_400x400.png"
              alt="Success"
              className="w-32 h-32 object-contain"
            />
          </div>
          
          <DialogTitle className="text-3xl text-center bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Character Unlocked!
          </DialogTitle>
          
          <DialogDescription className="text-white/80 text-center text-lg">
            Congratulations! You've unlocked <span className="text-pink-400 font-bold">{character.name}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-center gap-2 text-yellow-400">
            <Sparkles className="w-6 h-6 fill-yellow-400" />
            <Sparkles className="w-8 h-8 fill-yellow-400" />
            <Sparkles className="w-6 h-6 fill-yellow-400" />
          </div>
          
          <p className="text-white/70 text-center">
            {character.appearance}
          </p>
          
          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold"
          >
            View Character Story
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
