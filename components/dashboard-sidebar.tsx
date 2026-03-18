'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import {
  Home,
  BookOpen,
  Newspaper,
  Cloud,
  Calculator,
  Heart,
  Plane,
  Image,
  Zap,
  Smartphone,
  Music,
  QrCode,
  Monitor,
  Gamepad2,
  Settings,
  LogOut,
  Menu,
  X,
  User,
} from 'lucide-react';

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toolsMenu = [
    { icon: BookOpen, label: 'E-Books', href: '/dashboard/ebooks' },
    { icon: Newspaper, label: 'News', href: '/dashboard/news' },
    { icon: Cloud, label: 'Weather', href: '/dashboard/weather' },
    { icon: Calculator, label: 'Calculator', href: '/dashboard/calculator' },
    { icon: Heart, label: 'Health Tracker', href: '/dashboard/health' },
    { icon: Plane, label: 'Travel Planner', href: '/dashboard/travel' },
    { icon: Image, label: 'Photo Editor', href: '/dashboard/photo-editor' },
    { icon: Zap, label: 'Speed Test', href: '/dashboard/speed-test' },
    { icon: Smartphone, label: 'QR Scanner', href: '/dashboard/scanner' },
    { icon: Music, label: 'Music Player', href: '/dashboard/music' },
    { icon: QrCode, label: 'QR Generator', href: '/dashboard/qr-codes' },
    { icon: Monitor, label: 'Website Monitor', href: '/dashboard/website-monitor' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 z-40 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-2xl font-bold text-sidebar-primary">Multi-Tasking</h1>
          <p className="text-xs text-sidebar-foreground/60 mt-1">All-in-One Platform</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* Main */}
          <Link href="/dashboard">
            <Button
              variant={isActive('/dashboard') ? 'default' : 'ghost'}
              className={`w-full justify-start ${
                isActive('/dashboard')
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/20'
              }`}
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>

          {/* Divider */}
          <div className="my-4 px-2">
            <h3 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">Tools</h3>
          </div>

          {/* Tools */}
          {toolsMenu.map((tool) => (
            <Link key={tool.href} href={tool.href}>
              <Button
                variant={isActive(tool.href) ? 'default' : 'ghost'}
                className={`w-full justify-start text-sm ${
                  isActive(tool.href)
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/20'
                }`}
              >
                <tool.icon className="w-4 h-4 mr-2" />
                {tool.label}
              </Button>
            </Link>
          ))}

          {/* Divider */}
          <div className="my-4 px-2">
            <h3 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">Other</h3>
          </div>

          {/* Games */}
          <Link href="/dashboard/games">
            <Button
              variant={isActive('/dashboard/games') ? 'default' : 'ghost'}
              className={`w-full justify-start ${
                isActive('/dashboard/games')
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/20'
              }`}
            >
              <Gamepad2 className="w-4 h-4 mr-2" />
              Games
            </Button>
          </Link>

          {/* Settings */}
          <Link href="/dashboard/settings">
            <Button
              variant={isActive('/dashboard/settings') ? 'default' : 'ghost'}
              className={`w-full justify-start ${
                isActive('/dashboard/settings')
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/20'
              }`}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </Link>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border space-y-3">
          <div className="px-2 py-2 bg-sidebar-accent/10 rounded-lg">
            <p className="text-xs text-sidebar-foreground/60 mb-1">Logged in as</p>
            <p className="text-sm font-semibold text-sidebar-foreground truncate">{user?.displayName || user?.email}</p>
          </div>

          <Button
            onClick={logout}
            variant="ghost"
            className="w-full justify-start text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}
    </>
  );
}
