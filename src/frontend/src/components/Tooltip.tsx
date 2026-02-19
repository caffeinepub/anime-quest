import { ReactNode } from 'react';
import {
  Tooltip as TooltipPrimitive,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface TooltipProps {
  children: ReactNode;
  content: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  delayDuration?: number;
}

export default function Tooltip({ children, content, side = 'top', delayDuration = 200 }: TooltipProps) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <TooltipPrimitive>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent
          side={side}
          className="bg-gradient-to-br from-purple-900 to-pink-900 border-2 border-pink-400/50 text-white shadow-lg shadow-pink-500/20 animate-in fade-in-0 zoom-in-95"
        >
          <p className="text-sm font-medium">{content}</p>
        </TooltipContent>
      </TooltipPrimitive>
    </TooltipProvider>
  );
}
