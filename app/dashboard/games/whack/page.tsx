'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function WhackAMolePage() {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [started, setStarted] = useState(false);
  const [moles, setMoles] = useState<boolean[]>(Array(9).fill(false));

  useEffect(() => {
    if (!started || time <= 0) return;

    const timer = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timer);
  }, [time, started]);

  const whackMole = (index: number) => {
    if (moles[index]) {
      setScore(score + 10);
      const newMoles = [...moles];
      newMoles[index] = false;
      setMoles(newMoles);
    }
  };

  useEffect(() => {
    if (!started) return;

    const moleInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 9);
      setMoles((prev) => {
        const newMoles = Array(9).fill(false);
        newMoles[randomIndex] = true;
        return newMoles;
      });
    }, 500);

    return () => clearInterval(moleInterval);
  }, [started]);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Whack-a-Mole</h1>

        <Card className="bg-card border-primary/30 p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Score</p>
              <p className="text-4xl font-bold text-primary">{score}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="text-4xl font-bold text-primary">{time}s</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {moles.map((active, index) => (
              <button
                key={index}
                onClick={() => whackMole(index)}
                disabled={!started || time <= 0}
                className={`aspect-square rounded-lg text-4xl font-bold transition-all ${
                  active
                    ? 'bg-primary text-primary-foreground scale-110'
                    : 'bg-secondary text-foreground'
                }`}
              >
                {active ? '🔨' : '🕳️'}
              </button>
            ))}
          </div>

          {!started ? (
            <Button
              onClick={() => {
                setStarted(true);
                setScore(0);
                setTime(30);
              }}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Start Game
            </Button>
          ) : time <= 0 ? (
            <Button
              onClick={() => {
                setStarted(false);
                setScore(0);
                setTime(30);
              }}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Play Again
            </Button>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
