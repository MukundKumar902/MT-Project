'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RotateCw } from 'lucide-react';

type Choice = 'rock' | 'paper' | 'scissors' | null;

export default function RPSPage() {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ player: 0, computer: 0, draws: 0 });

  const getComputerChoice = (): Choice => {
    const choices: Choice[] = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
  };

  const determineWinner = (player: Choice, computer: Choice) => {
    if (player === computer) return 'draw';
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'win';
    }
    return 'lose';
  };

  const play = (choice: Choice) => {
    const computer = getComputerChoice();
    setPlayerChoice(choice);
    setComputerChoice(computer);

    const outcome = determineWinner(choice, computer);

    if (outcome === 'win') {
      setResult('🎉 You Won!');
      setScore((prev) => ({ ...prev, player: prev.player + 1 }));
    } else if (outcome === 'lose') {
      setResult('😞 You Lost!');
      setScore((prev) => ({ ...prev, computer: prev.computer + 1 }));
    } else {
      setResult('🤝 Draw!');
      setScore((prev) => ({ ...prev, draws: prev.draws + 1 }));
    }
  };

  const reset = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
  };

  const resetScore = () => {
    setScore({ player: 0, computer: 0, draws: 0 });
    reset();
  };

  const getEmoji = (choice: Choice) => {
    switch (choice) {
      case 'rock':
        return '🪨';
      case 'paper':
        return '📄';
      case 'scissors':
        return '✂️';
      default:
        return '❓';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Rock Paper Scissors</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Game */}
          <Card className="md:col-span-2 bg-gradient-to-br from-card to-secondary border-primary/50 p-8">
            {/* Result */}
            {result && (
              <div className="text-center mb-8">
                <p className="text-5xl mb-4">{result}</p>
                <p className="text-lg text-muted-foreground">
                  You chose <span className="text-primary font-bold">{playerChoice}</span> and
                  computer chose <span className="text-primary font-bold">{computerChoice}</span>
                </p>
              </div>
            )}

            {/* Choices Display */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Your Choice</p>
                <p className="text-6xl mb-2">{getEmoji(playerChoice)}</p>
                <p className="text-lg font-semibold text-foreground">
                  {playerChoice ? playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1) : '-'}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Computer's Choice</p>
                <p className="text-6xl mb-2">{getEmoji(computerChoice)}</p>
                <p className="text-lg font-semibold text-foreground">
                  {computerChoice
                    ? computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
                    : '-'}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {(['rock', 'paper', 'scissors'] as const).map((choice) => (
                  <Button
                    key={choice}
                    onClick={() => play(choice)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6"
                  >
                    {getEmoji(choice as Choice)} {choice}
                  </Button>
                ))}
              </div>

              {result && (
                <Button
                  onClick={reset}
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/10"
                >
                  <RotateCw className="w-4 h-4 mr-2" />
                  Play Again
                </Button>
              )}
            </div>
          </Card>

          {/* Score */}
          <Card className="bg-card border-primary/30 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Score</h3>
            <div className="space-y-3 mb-6">
              <div className="bg-green-500/20 border border-green-500 rounded-lg p-3">
                <p className="text-sm text-green-500 mb-1">Wins</p>
                <p className="text-3xl font-bold text-green-500">{score.player}</p>
              </div>
              <div className="bg-destructive/20 border border-destructive rounded-lg p-3">
                <p className="text-sm text-destructive mb-1">Losses</p>
                <p className="text-3xl font-bold text-destructive">{score.computer}</p>
              </div>
              <div className="bg-primary/20 border border-primary rounded-lg p-3">
                <p className="text-sm text-primary mb-1">Draws</p>
                <p className="text-3xl font-bold text-primary">{score.draws}</p>
              </div>
            </div>

            <Button
              onClick={resetScore}
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary/10"
            >
              Reset Score
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
