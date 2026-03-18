'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const words = ['javascript', 'programming', 'hangman', 'developer', 'computer', 'internet'];

export default function HangmanPage() {
  const [word] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guessed, setGuessed] = useState<string[]>([]);
  const [wrong, setWrong] = useState(0);
  const [won, setWon] = useState(false);

  const handleGuess = (letter: string) => {
    if (guessed.includes(letter)) return;
    setGuessed([...guessed, letter]);

    if (!word.includes(letter)) {
      setWrong(wrong + 1);
    }

    if (word.split('').every((l) => guessed.includes(l))) {
      setWon(true);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Hangman</h1>

        <Card className="bg-card border-primary/30 p-8">
          <div className="text-center mb-8">
            <p className="text-2xl font-bold text-primary">Wrong Guesses: {wrong}/6</p>
            <p className="text-5xl font-bold text-primary my-6">
              {word.split('').map((l) => (guessed.includes(l) ? l : '_')).join(' ')}
            </p>
            {won && <p className="text-2xl font-bold text-green-500">You Won!</p>}
            {wrong >= 6 && !won && <p className="text-2xl font-bold text-destructive">Game Over!</p>}
          </div>

          <div className="grid grid-cols-7 gap-2 mb-6">
            {('abcdefghijklmnopqrstuvwxyz'.split('') as const).map((letter) => (
              <Button
                key={letter}
                onClick={() => handleGuess(letter)}
                disabled={guessed.includes(letter) || wrong >= 6 || won}
                className={`h-10 ${
                  guessed.includes(letter)
                    ? 'bg-muted text-muted-foreground'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {letter.toUpperCase()}
              </Button>
            ))}
          </div>

          {(won || wrong >= 6) && (
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              New Game
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
}
