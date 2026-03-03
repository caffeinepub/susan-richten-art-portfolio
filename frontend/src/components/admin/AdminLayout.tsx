import React, { useState } from 'react';
import { Link, useLocation, Outlet } from '@tanstack/react-router';
import {
  LayoutDashboard, Images, FolderOpen, FileEdit,
  ClipboardList, BookOpen, Settings, LogOut, Menu,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AdminLogin from '../../pages/admin/AdminLogin';

export function AdminLayout() {
  const { logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Guard: show login screen if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Gallery Manager', path: '/admin/gallery', icon: Images },
    { label: 'Media Library', path: '/admin/media', icon: FolderOpen },
    { label: 'Pages Editor', path: '/admin/pages', icon: FileEdit },
    { label: 'Commissions', path: '/admin/commissions', icon: ClipboardList },
    { label: 'Blog Manager', path: '/admin/blog', icon: BookOpen },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/admin/dashboard' && (location.pathname === '/admin' || location.pathname === '/admin/')) return true;
    return location.pathname === path;
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="font-heading text-xl text-sidebar-foreground">Admin Panel</h1>
        <p className="font-body text-xs text-sidebar-foreground/60 mt-0.5 tracking-widest uppercase">Content Manager</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded font-body text-sm transition-colors ${
                active
                  ? 'bg-sidebar-accent text-sidebar-foreground font-medium'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded font-body text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-beige overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-sidebar shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-56 bg-sidebar flex flex-col">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Top Bar */}
        <div className="md:hidden flex items-center gap-3 px-4 h-14 bg-white border-b border-beige-dark shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 text-charcoal"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <span className="font-heading text-lg text-charcoal">Admin</span>
        </div>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
