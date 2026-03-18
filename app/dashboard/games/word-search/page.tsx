'use client';

import { Card } from '@/components/ui/card';

export default function WordSearchPage() {
  const grid = [
    ['C', 'A', 'T', 'D', 'O', 'G'],
    ['R', 'A', 'B', 'B', 'I', 'T'],
    ['B', 'E', 'A', 'R', 'L', 'I'],
    ['F', 'O', 'X', 'E', 'L', 'K'],
    ['D', 'U', 'C', 'K', 'S', 'T'],
    ['S', 'N', 'A', 'K', 'E', 'Z'],
  ];

  const words = ['CAT', 'DOG', 'RABBIT', 'BEAR', 'FOX', 'DUCK', 'SNAKE'];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Word Search</h1>

        <Card className="bg-card border-primary/30 p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Find the words:</h2>
            <div className="flex flex-wrap gap-3 mb-6">
              {words.map((word) => (
                <span key={word} className="px-3 py-1 bg-secondary rounded-full text-sm text-muted-foreground">
                  {word}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-2">
                {row.map((letter, colIndex) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    className="w-10 h-10 bg-secondary border border-primary/30 rounded-lg font-bold text-primary hover:border-primary hover:bg-primary/20 transition-all"
                  >
                    {letter}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
