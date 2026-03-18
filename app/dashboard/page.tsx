'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
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
  ArrowRight,
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  const featuredTools = [
    { icon: BookOpen, label: 'E-Books', href: '/dashboard/ebooks', color: 'from-primary' },
    { icon: Newspaper, label: 'News', href: '/dashboard/news', color: 'from-cyan-500' },
    { icon: Cloud, label: 'Weather', href: '/dashboard/weather', color: 'from-blue-500' },
    { icon: Calculator, label: 'Calculator', href: '/dashboard/calculator', color: 'from-violet-500' },
    { icon: Heart, label: 'Health', href: '/dashboard/health', color: 'from-pink-500' },
    { icon: Plane, label: 'Travel', href: '/dashboard/travel', color: 'from-orange-500' },
    { icon: Image, label: 'Photo Editor', href: '/dashboard/photo-editor', color: 'from-yellow-500' },
    { icon: Music, label: 'Music', href: '/dashboard/music', color: 'from-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Header */}
      <div className="mb-12 mt-12 md:mt-0">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
          Welcome back, {user?.displayName?.split(' ')[0]}!
        </h1>
        <p className="text-lg text-muted-foreground">
          Choose a tool or game to get started
        </p>
      </div>

      {/* Featured Tools */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Featured Tools</h2>
          <Link href="/dashboard/settings">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredTools.map((tool) => (
            <Link key={tool.href} href={tool.href}>
              <Card className="bg-gradient-to-br from-card to-secondary border-primary/30 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all cursor-pointer h-full p-6">
                <div className="flex flex-col items-start gap-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${tool.color} to-primary/30`}>
                    <tool.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{tool.label}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Tap to open</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Games Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Games</h2>
          <Link href="/dashboard/games">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              View All Games
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <Card className="bg-gradient-to-br from-card to-secondary border-primary/50 p-8 text-center">
          <Gamepad2 className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">12+ Exciting Games</h3>
          <p className="text-muted-foreground mb-6">
            Challenge yourself with our collection of fun and engaging games. Complete challenges and climb the leaderboard!
          </p>
          <Link href="/dashboard/games">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Play Now
            </Button>
          </Link>
        </Card>
      </section>

      {/* Quick Stats */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Your Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-primary/30 p-6">
            <p className="text-muted-foreground text-sm mb-2">Tools Used</p>
            <p className="text-3xl font-bold text-primary">0</p>
          </Card>
          <Card className="bg-card border-primary/30 p-6">
            <p className="text-muted-foreground text-sm mb-2">Games Played</p>
            <p className="text-3xl font-bold text-primary">0</p>
          </Card>
          <Card className="bg-card border-primary/30 p-6">
            <p className="text-muted-foreground text-sm mb-2">Total Score</p>
            <p className="text-3xl font-bold text-primary">0</p>
          </Card>
        </div>
      </section>
    </div>
  );
}
