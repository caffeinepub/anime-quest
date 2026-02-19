import { useState } from 'react';
import { Outlet, useNavigate } from '@tanstack/react-router';
import { Sparkles, Users, Home, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthButton from './AuthButton';
import TutorialModal from './TutorialModal';
import Tooltip from './Tooltip';

export default function Layout() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-950 via-pink-950 to-indigo-950 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20 animate-pulse"></div>

      {/* Gradient orbs for depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <header className="relative z-10 border-b border-white/10 bg-black/30 backdrop-blur-xl shadow-2xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate({ to: '/' })}
                className="flex items-center gap-3 group"
              >
                <div className="relative">
                  <Sparkles className="w-9 h-9 text-pink-400 group-hover:text-pink-300 transition-all duration-300 group-hover:rotate-12 drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]" />
                  <div className="absolute inset-0 bg-pink-400/20 blur-xl group-hover:bg-pink-400/40 transition-all rounded-full"></div>
                </div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
                  Anime Quest
                </h1>
              </button>

              <nav className="hidden md:flex items-center gap-2">
                <Tooltip content="Return to home page">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate({ to: '/' })}
                    className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 font-semibold"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </Tooltip>
                <Tooltip content="View all 20 characters">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate({ to: '/roster' })}
                    className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 font-semibold"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Roster
                  </Button>
                </Tooltip>
                <Tooltip content="Learn how to play">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowTutorial(true)}
                    className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 font-semibold"
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Tutorial
                  </Button>
                </Tooltip>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile tutorial button */}
              <div className="md:hidden">
                <Tooltip content="Tutorial">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowTutorial(true)}
                    className="text-white/80 hover:text-white hover:bg-white/10"
                  >
                    <HelpCircle className="w-5 h-5" />
                  </Button>
                </Tooltip>
              </div>
              <AuthButton />
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-xl py-8 shadow-2xl">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-pink-400 fill-pink-400 animate-pulse" />
            <p className="text-white/90 font-bold text-lg tracking-wide">
              Anime Quest
            </p>
            <Sparkles className="w-5 h-5 text-purple-400 fill-purple-400 animate-pulse" />
          </div>
          <p className="text-white/60 text-sm">
            © {currentYear} Anime Quest. Built with{' '}
            <span className="text-pink-400 animate-pulse">♥</span> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'anime-quest'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300 transition-colors font-semibold underline decoration-pink-400/30 hover:decoration-pink-400"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      <TutorialModal open={showTutorial} onClose={() => setShowTutorial(false)} />
    </div>
  );
}
