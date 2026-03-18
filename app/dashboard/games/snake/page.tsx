'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Position {
  x: number;
  y: number;
}

export default function SnakePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const gameState = useRef({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    score: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameLoop = setInterval(() => {
      if (!gameStarted || gameOver) return;

      const state = gameState.current;
      state.direction = state.nextDirection;

      const head = state.snake[0];
      const newHead = {
        x: head.x + state.direction.x,
        y: head.y + state.direction.y,
      };

      if (
        newHead.x < 0 ||
        newHead.x >= 20 ||
        newHead.y < 0 ||
        newHead.y >= 20 ||
        state.snake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)
      ) {
        setGameOver(true);
        setGameStarted(false);
        return;
      }

      state.snake.unshift(newHead);

      if (newHead.x === state.food.x && newHead.y === state.food.y) {
        state.score += 10;
        setScore(state.score);
        if (state.score > highScore) setHighScore(state.score);
        state.food = {
          x: Math.floor(Math.random() * 20),
          y: Math.floor(Math.random() * 20),
        };
      } else {
        state.snake.pop();
      }

      drawGame(ctx, state);
    }, 100);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, highScore]);

  const drawGame = (ctx: CanvasRenderingContext2D, state: any) => {
    const gridSize = 20;
    ctx.fillStyle = '#060d0a';
    ctx.fillRect(0, 0, 400, 400);

    ctx.fillStyle = '#00e896';
    state.snake.forEach((seg: Position) => {
      ctx.fillRect(seg.x * gridSize, seg.y * gridSize, gridSize - 2, gridSize - 2);
    });

    ctx.fillStyle = '#ff4d4d';
    ctx.fillRect(
      state.food.x * gridSize,
      state.food.y * gridSize,
      gridSize - 2,
      gridSize - 2
    );
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    const state = gameState.current;
    switch (e.key) {
      case 'ArrowUp':
        if (state.direction.y === 0) state.nextDirection = { x: 0, y: -1 };
        break;
      case 'ArrowDown':
        if (state.direction.y === 0) state.nextDirection = { x: 0, y: 1 };
        break;
      case 'ArrowLeft':
        if (state.direction.x === 0) state.nextDirection = { x: -1, y: 0 };
        break;
      case 'ArrowRight':
        if (state.direction.x === 0) state.nextDirection = { x: 1, y: 0 };
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    gameState.current = {
      snake: [{ x: 10, y: 10 }],
      food: { x: 15, y: 15 },
      direction: { x: 1, y: 0 },
      nextDirection: { x: 1, y: 0 },
      score: 0,
    };

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) drawGame(ctx, gameState.current);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Snake Game</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 bg-card border-primary/30 p-6">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              className="w-full border-2 border-primary/30 rounded-lg bg-secondary"
            />
          </Card>

          <Card className="bg-card border-primary/30 p-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Score</p>
                <p className="text-4xl font-bold text-primary">{score}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">High Score</p>
                <p className="text-2xl font-bold text-primary">{highScore}</p>
              </div>

              {gameOver && <p className="text-lg font-bold text-destructive">Game Over!</p>}

              <Button
                onClick={startGame}
                disabled={gameStarted}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {gameStarted ? 'Game Running...' : gameOver ? 'Play Again' : 'Start Game'}
              </Button>

              <div className="text-xs text-muted-foreground space-y-1">
                <p>Controls:</p>
                <p>↑ ↓ ← → Arrow Keys</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
