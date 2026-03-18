'use client';

import { Card } from '@/components/ui/card';
import { Zap } from 'lucide-react';

export default function Game2048() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">2048</h1>

        <Card className="bg-card border-primary/30 p-8 text-center">
          <Zap className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-4">Combine tiles to reach 2048</h2>
          <p className="text-muted-foreground">Use arrow keys to move tiles. When two tiles with the same number touch, they merge!</p>

          <div className="mt-8 grid grid-cols-4 gap-2">
            {Array(16).fill(0).map((_, i) => (
              <div key={i} className="aspect-square bg-secondary rounded-lg" />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
