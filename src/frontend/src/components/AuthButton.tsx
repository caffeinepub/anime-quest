import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, Loader2 } from 'lucide-react';

export default function AuthButton() {
  const { identity, login, clear, isLoggingIn, isInitializing } = useInternetIdentity();

  const isAuthenticated = identity && !identity.getPrincipal().isAnonymous();

  if (isInitializing) {
    return (
      <Button variant="outline" size="sm" disabled className="border-white/20 text-white/60">
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        Loading...
      </Button>
    );
  }

  if (isAuthenticated) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={clear}
        className="border-pink-400/50 text-pink-400 hover:bg-pink-400/10 hover:text-pink-300"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={login}
      disabled={isLoggingIn}
      className="border-pink-400/50 text-pink-400 hover:bg-pink-400/10 hover:text-pink-300"
    >
      {isLoggingIn ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Signing In...
        </>
      ) : (
        <>
          <LogIn className="w-4 h-4 mr-2" />
          Sign In
        </>
      )}
    </Button>
  );
}
