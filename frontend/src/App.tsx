import React from 'react';
import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CMSProvider } from './contexts/CMSContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Gallery } from './pages/Gallery';
import { Commissions } from './pages/Commissions';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Testimonials } from './pages/Testimonials';
import { AdminLogin } from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import { GalleryManager } from './pages/admin/GalleryManager';
import { MediaLibrary } from './pages/admin/MediaLibrary';
import { PagesEditor } from './pages/admin/PagesEditor';
import { CommissionsManager } from './pages/admin/CommissionsManager';
import { BlogManager } from './pages/admin/BlogManager';
import { Settings } from './pages/admin/Settings';
import { Toaster } from './components/ui/sonner';
import { usePageViewTracker } from './hooks/usePageViewTracker';
import { useUniqueVisitorTracker } from './hooks/useUniqueVisitorTracker';

const queryClient = new QueryClient();

function PublicLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <AdminLogin />;
  }
  return <>{children}</>;
}

function AppTrackers() {
  usePageViewTracker();
  useUniqueVisitorTracker();
  return null;
}

const rootRoute = createRootRoute({
  component: () => (
    <>
      <AppTrackers />
      <Outlet />
    </>
  ),
});

const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public',
  component: PublicLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/',
  component: Home,
});

const galleryRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/gallery',
  component: Gallery,
});

const commissionsRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/commissions',
  component: Commissions,
});

const aboutRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/about',
  component: About,
});

const contactRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/contact',
  component: Contact,
});

const testimonialsRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/testimonials',
  component: Testimonials,
});

const adminRootRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => (
    <AdminGuard>
      <AdminLayout />
    </AdminGuard>
  ),
});

const adminIndexRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/',
  component: Dashboard,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/dashboard',
  component: Dashboard,
});

const adminGalleryRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/gallery',
  component: GalleryManager,
});

const adminMediaRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/media',
  component: MediaLibrary,
});

const adminPagesRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/pages',
  component: PagesEditor,
});

const adminCommissionsRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/commissions',
  component: CommissionsManager,
});

const adminBlogRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/blog',
  component: BlogManager,
});

const adminSettingsRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/settings',
  component: Settings,
});

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([
    homeRoute,
    galleryRoute,
    commissionsRoute,
    aboutRoute,
    contactRoute,
    testimonialsRoute,
  ]),
  adminRootRoute.addChildren([
    adminIndexRoute,
    adminDashboardRoute,
    adminGalleryRoute,
    adminMediaRoute,
    adminPagesRoute,
    adminCommissionsRoute,
    adminBlogRoute,
    adminSettingsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CMSProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster />
        </AuthProvider>
      </CMSProvider>
    </QueryClientProvider>
  );
}
