'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RotateCw } from 'lucide-react';

interface Card {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
}

export default function MemoryPage() {
  const emojis = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎬', '🎤'];
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const initializeGame = () => {
    const gameCards = [...emojis, ...emojis].map((emoji, index) => ({
      id: index,
      value: emoji,
      flipped: false,
      matched: false,
    }));
    setCards(gameCards.sort(() => Math.random() - 0.5));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first].value === cards[second].value) {
        setMatched([...matched, first, second]);
        setFlipped([]);
        setMoves(moves + 1);

        if (matched.length + 2 === cards.length) {
          setGameWon(true);
        }
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
        setMoves(moves + 1);
      }
    }
  }, [flipped, matched, cards, moves]);

  const handleCardClick = (index: number) => {
    if (flipped.includes(index) || matched.includes(index) || flipped.length === 2) return;
    setFlipped([...flipped, index]);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Memory Match</h1>

        <Card className="bg-card border-primary/30 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-sm text-muted-foreground">Moves</p>
              <p className="text-3xl font-bold text-primary">{moves}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Matched</p>
              <p className="text-3xl font-bold text-primary">{matched.length / 2}/8</p>
            </div>
            <Button
              onClick={initializeGame}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <RotateCw className="w-4 h-4 mr-2" />
              New Game
            </Button>
          </div>

          {gameWon && (
            <div className="bg-green-500/20 border border-green-500 text-green-500 p-4 rounded-lg mb-6 font-bold text-center">
              Congratulations! You won in {moves} moves!
            </div>
          )}

          <div className="grid grid-cols-4 gap-3 mb-6">
            {cards.map((card, index) => (
              <button
                key={index}
                onClick={() => handleCardClick(index)}
                className={`aspect-square rounded-lg font-bold text-3xl transition-all ${
                  flipped.includes(index) || matched.includes(index)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-secondary/80 text-secondary'
                }`}
              >
                {flipped.includes(index) || matched.includes(index) ? card.value : '?'}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Click cards to find matching pairs. The fewer moves, the better!
          </p>
        </Card>
      </div>
    </div>
  );
}
