'use client';

import { Card } from '@/components/ui/card';

export default function FlappyBirdPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Flappy Bird</h1>

        <Card className="bg-card border-primary/30 p-8 text-center">
          <p className="text-6xl mb-4">🐦</p>
          <h2 className="text-2xl font-bold text-foreground mb-4">Tap to Fly</h2>
          <p className="text-muted-foreground mb-6">Avoid the pipes and fly as far as you can!</p>

          <div className="bg-gradient-to-b from-cyan-400 to-blue-200 h-96 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Game Canvas</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
