'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
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
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function WelcomePage() {
  const features = [
    {
      icon: BookOpen,
      title: 'E-Books',
      description: 'Access thousands of e-books and reading materials',
    },
    {
      icon: Newspaper,
      title: 'News',
      description: 'Stay updated with the latest news from around the world',
    },
    {
      icon: Cloud,
      title: 'Weather',
      description: 'Check real-time weather information for any location',
    },
    {
      icon: Calculator,
      title: 'Calculator',
      description: 'Powerful calculator for complex calculations',
    },
    {
      icon: Heart,
      title: 'Health Tracker',
      description: 'Monitor and track your daily health metrics',
    },
    {
      icon: Plane,
      title: 'Travel Planner',
      description: 'Plan your trips with detailed travel guides',
    },
    {
      icon: Image,
      title: 'Photo Editor',
      description: 'Edit and enhance your photos with advanced tools',
    },
    {
      icon: Zap,
      title: 'Speed Test',
      description: 'Test your internet connection speed',
    },
    {
      icon: Smartphone,
      title: 'QR Scanner',
      description: 'Scan and decode QR codes instantly',
    },
    {
      icon: Music,
      title: 'Music Player',
      description: 'Stream and enjoy your favorite music',
    },
    {
      icon: QrCode,
      title: 'QR Generator',
      description: 'Create custom QR codes for your content',
    },
    {
      icon: Monitor,
      title: 'Website Monitor',
      description: 'Monitor website status and uptime',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="mb-6 flex justify-center">
            <div className="p-4 rounded-full bg-primary/20 border border-primary/30">
              <Sparkles className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">
            Everything You Need,
            <span className="text-primary"> All in One Place</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Multi-Tasking is your ultimate all-in-one platform featuring productivity tools, entertainment, and games. 
            From managing your health to playing exciting games, we've got you covered.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/register">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            12+ Powerful Tools
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to boost productivity and have fun
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-card border border-primary/30 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              <div className="mb-4">
                <div className="p-3 rounded-lg bg-primary/20 w-fit">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Games Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-br from-card to-secondary border border-primary/50 rounded-lg p-12 text-center">
          <Gamepad2 className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-foreground mb-4">
            12+ Exciting Games
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Challenge yourself with our collection of fun and engaging games. 
            Compete with others on our leaderboard and show your skills!
          </p>
          <Link href="/register">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
              Play Games Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold text-foreground mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          Join thousands of users enjoying Multi-Tasking today. Free to use, no credit card required.
        </p>
        <Link href="/register">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
            Sign Up Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/20 py-8 text-center text-muted-foreground">
        <p>&copy; 2024 Multi-Tasking. All rights reserved.</p>
      </footer>
    </div>
  );
}
