import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Layout from './components/Layout';
import GameHome from './pages/GameHome';
import CharacterRoster from './pages/CharacterRoster';
import CharacterDetail from './pages/CharacterDetail';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: GameHome,
});

const rosterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/roster',
  component: CharacterRoster,
});

const characterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/character/$characterId',
  component: CharacterDetail,
});

const routeTree = rootRoute.addChildren([indexRoute, rosterRoute, characterRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
