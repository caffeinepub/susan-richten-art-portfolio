import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { CMSProvider } from './contexts/CMSContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Commissions from './pages/Commissions';
import Contact from './pages/Contact';
import Testimonials from './pages/Testimonials';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import GalleryManager from './pages/admin/GalleryManager';
import BlogManager from './pages/admin/BlogManager';
import CommissionsManager from './pages/admin/CommissionsManager';
import MediaLibrary from './pages/admin/MediaLibrary';
import MessagesInbox from './pages/admin/MessagesInbox';
import PagesEditor from './pages/admin/PagesEditor';
import Settings from './pages/admin/Settings';
import AdminLayout from './components/admin/AdminLayout';
import { usePageViewTracker } from './hooks/usePageViewTracker';
import { useUniqueVisitorTracker } from './hooks/useUniqueVisitorTracker';

const queryClient = new QueryClient();

// Layout component for public pages
function PublicLayout() {
  usePageViewTracker();
  useUniqueVisitorTracker();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Public layout route
const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public-layout',
  component: PublicLayout,
});

// Public routes
const homeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/',
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/about',
  component: About,
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

// Admin routes
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/login',
  component: AdminLogin,
});

const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminLayout,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/',
  component: Dashboard,
});

const adminGalleryRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/gallery',
  component: GalleryManager,
});

const adminBlogRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/blog',
  component: BlogManager,
});

const adminCommissionsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/commissions',
  component: CommissionsManager,
});

const adminMediaRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/media',
  component: MediaLibrary,
});

const adminMessagesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/messages',
  component: MessagesInbox,
});

const adminPagesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/pages',
  component: PagesEditor,
});

const adminSettingsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/settings',
  component: Settings,
});

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([
    homeRoute,
    aboutRoute,
    galleryRoute,
    commissionsRoute,
    contactRoute,
    testimonialsRoute,
  ]),
  adminLoginRoute,
  adminLayoutRoute.addChildren([
    adminDashboardRoute,
    adminGalleryRoute,
    adminBlogRoute,
    adminCommissionsRoute,
    adminMediaRoute,
    adminMessagesRoute,
    adminPagesRoute,
    adminSettingsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <CMSProvider>
          <AuthProvider>
            <RouterProvider router={router} />
            <Toaster />
          </AuthProvider>
        </CMSProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
