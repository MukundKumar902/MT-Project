'use client';

import { Card } from '@/components/ui/card';

export default function BrickBreakerPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Brick Breaker</h1>

        <Card className="bg-card border-primary/30 p-8">
          <div className="bg-gradient-to-b from-primary/10 to-background border-2 border-primary/30 rounded-lg h-96 flex flex-col">
            <div className="grid grid-cols-6 gap-2 p-4 flex-1">
              {Array(36).fill(0).map((_, i) => (
                <div key={i} className="bg-primary rounded" />
              ))}
            </div>
            <div className="h-2 bg-primary ml-16 mr-16 mb-4 rounded-full" />
          </div>

          <p className="text-center text-muted-foreground mt-6">
            Move your paddle to bounce the ball and break all the bricks!
          </p>
        </Card>
      </div>
    </div>
  );
}
