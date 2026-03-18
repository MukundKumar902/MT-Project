'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function NumberGuessingPage() {
  const [secretNumber, setSecretNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('Guess a number between 1 and 100');
  const [attempts, setAttempts] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const handleGuess = () => {
    if (!guess.trim()) return;

    const guessNum = parseInt(guess);
    setAttempts(attempts + 1);

    if (guessNum === secretNumber) {
      setMessage(`Correct! You won in ${attempts + 1} attempts!`);
      setGameWon(true);
    } else if (guessNum < secretNumber) {
      setMessage('Too low! Try again.');
    } else {
      setMessage('Too high! Try again.');
    }

    setGuess('');
  };

  const resetGame = () => {
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('Guess a number between 1 and 100');
    setAttempts(0);
    setGameWon(false);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Number Guessing Game</h1>

        <Card className="bg-gradient-to-br from-card to-secondary border-primary/50 p-8">
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-primary mb-4">?</div>
            <p className="text-xl text-muted-foreground">I'm thinking of a number...</p>
          </div>

          <div className={`p-4 rounded-lg mb-6 text-center font-semibold ${
            gameWon 
              ? 'bg-green-500/20 border border-green-500 text-green-500' 
              : 'bg-primary/20 border border-primary text-primary'
          }`}>
            {message}
          </div>

          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">Attempts: {attempts}</p>
            <div className="flex gap-2">
              <Input
                type="number"
                min="1"
                max="100"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !gameWon && handleGuess()}
                placeholder="Enter your guess..."
                disabled={gameWon}
                className="bg-secondary border-primary/30 text-foreground"
              />
              <Button
                onClick={handleGuess}
                disabled={gameWon}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Guess
              </Button>
            </div>
          </div>

          {gameWon && (
            <Button
              onClick={resetGame}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Play Again
            </Button>
          )}

          <Card className="bg-background border-primary/30 p-4 mt-6">
            <h3 className="font-semibold text-foreground mb-2">Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Listen to the hints carefully</li>
              <li>• Narrow down your search range</li>
              <li>• Use previous attempts to guide you</li>
            </ul>
          </Card>
        </Card>
      </div>
    </div>
  );
}
