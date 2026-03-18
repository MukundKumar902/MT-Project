'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Gamepad2,
  Grid3X3,
  Zap,
  Flame,
  Cpu,
  Dices,
  Hand,
  Volume2,
  Trophy,
  Heart,
  Wind,
  Search,
  ArrowRight,
} from 'lucide-react';

const games = [
  {
    icon: Grid3X3,
    name: 'Tic Tac Toe',
    description: 'Classic strategy game',
    href: '/dashboard/games/tictactoe',
    color: 'from-cyan-500',
  },
  {
    icon: Zap,
    name: '2048',
    description: 'Merge numbers puzzle',
    href: '/dashboard/games/2048',
    color: 'from-yellow-500',
  },
  {
    icon: Flame,
    name: 'Snake',
    description: 'Retro arcade game',
    href: '/dashboard/games/snake',
    color: 'from-green-500',
  },
  {
    icon: Heart,
    name: 'Memory Match',
    description: 'Test your memory',
    href: '/dashboard/games/memory',
    color: 'from-pink-500',
  },
  {
    icon: Dices,
    name: 'Number Guessing',
    description: 'Guess the number',
    href: '/dashboard/games/number-guess',
    color: 'from-purple-500',
  },
  {
    icon: Hand,
    name: 'Rock Paper Scissors',
    description: 'Challenge AI',
    href: '/dashboard/games/rps',
    color: 'from-orange-500',
  },
  {
    icon: Volume2,
    name: 'Hangman',
    description: 'Guess the word',
    href: '/dashboard/games/hangman',
    color: 'from-red-500',
  },
  {
    icon: Wind,
    name: 'Flappy Bird',
    description: 'Tap to fly',
    href: '/dashboard/games/flappy',
    color: 'from-blue-500',
  },
  {
    icon: Trophy,
    name: 'Whack-a-Mole',
    description: 'Click the moles',
    href: '/dashboard/games/whack',
    color: 'from-indigo-500',
  },
  {
    icon: Cpu,
    name: 'Simon Says',
    description: 'Repeat the sequence',
    href: '/dashboard/games/simon',
    color: 'from-violet-500',
  },
  {
    icon: Search,
    name: 'Word Search',
    description: 'Find hidden words',
    href: '/dashboard/games/word-search',
    color: 'from-lime-500',
  },
  {
    icon: Flame,
    name: 'Brick Breaker',
    description: 'Break the blocks',
    href: '/dashboard/games/brick',
    color: 'from-rose-500',
  },
];

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Gamepad2 className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold text-primary">Game Center</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Play 12+ exciting games and compete on the leaderboard
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {games.map((game) => (
            <Link key={game.href} href={game.href}>
              <Card className="bg-gradient-to-br from-card to-secondary border-primary/30 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all cursor-pointer h-full p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${game.color} to-primary/30`}>
                    <game.icon className="w-6 h-6 text-primary" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-1">{game.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{game.description}</p>

                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm">
                  Play Now
                </Button>
              </Card>
            </Link>
          ))}
        </div>

        {/* Leaderboard Info */}
        <Card className="bg-gradient-to-br from-card to-secondary border-primary/50 p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Compete & Climb the Leaderboard</h2>
          <p className="text-muted-foreground mb-6">
            Every game you play earns you points. Climb the global leaderboard and compete with other players worldwide!
          </p>
          <Link href="/dashboard/leaderboard">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              View Leaderboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
