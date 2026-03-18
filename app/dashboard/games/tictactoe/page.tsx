'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RotateCw } from 'lucide-react';

type CellValue = 'X' | 'O' | null;

export default function TicTacToePage() {
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [score, setScore] = useState({ x: 0, o: 0, draws: 0 });

  const calculateWinner = (squares: CellValue[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isBoardFull = board.every((cell) => cell !== null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setScore((prev) => ({
        ...prev,
        [gameWinner.toLowerCase()]: prev[gameWinner.toLowerCase() as keyof typeof prev] + 1,
      }));
    } else if (isBoardFull) {
      setScore((prev) => ({ ...prev, draws: prev.draws + 1 }));
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const resetScore = () => {
    setScore({ x: 0, o: 0, draws: 0 });
    resetGame();
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Tic Tac Toe</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Game Board */}
          <Card className="md:col-span-2 bg-card border-primary/30 p-8">
            <div className="mb-6">
              <p className="text-muted-foreground mb-2">Current Player</p>
              <p className="text-3xl font-bold text-primary">{isXNext ? 'X' : 'O'}</p>
              {winner && (
                <p className="text-2xl font-bold text-green-500 mt-2">Player {winner} Won!</p>
              )}
              {isBoardFull && !winner && (
                <p className="text-2xl font-bold text-yellow-500 mt-2">It's a Draw!</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {board.map((value, index) => (
                <button
                  key={index}
                  onClick={() => handleClick(index)}
                  className="aspect-square bg-secondary border-2 border-primary/30 rounded-lg text-4xl font-bold text-primary hover:border-primary transition-all"
                >
                  {value}
                </button>
              ))}
            </div>

            <Button
              onClick={resetGame}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <RotateCw className="w-4 h-4 mr-2" />
              New Game
            </Button>
          </Card>

          {/* Score */}
          <Card className="bg-card border-primary/30 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Score</h3>
            <div className="space-y-3 mb-6">
              <div className="bg-secondary rounded-lg p-3">
                <p className="text-sm text-muted-foreground">X Wins</p>
                <p className="text-3xl font-bold text-primary">{score.x}</p>
              </div>
              <div className="bg-secondary rounded-lg p-3">
                <p className="text-sm text-muted-foreground">O Wins</p>
                <p className="text-3xl font-bold text-primary">{score.o}</p>
              </div>
              <div className="bg-secondary rounded-lg p-3">
                <p className="text-sm text-muted-foreground">Draws</p>
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
