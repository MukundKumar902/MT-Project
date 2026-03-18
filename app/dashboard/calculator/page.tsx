'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Delete } from 'lucide-react';

export default function CalculatorPage() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setWaitingForNewValue(false);
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(result.toString());
      setPreviousValue(result);
    }

    setOperation(op);
    setWaitingForNewValue(true);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '*':
        return prev * current;
      case '/':
        return prev / current;
      case '%':
        return prev % current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = calculate(previousValue, parseFloat(display), operation);
      setDisplay(result.toString());
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Calculator</h1>

        <Card className="bg-card border-primary/30 p-6">
          {/* Display */}
          <div className="bg-secondary rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-2">Display</p>
            <p className="text-5xl font-bold text-primary text-right break-words">
              {display}
            </p>
          </div>

          {/* Control Buttons */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Button
              onClick={handleClear}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold text-lg"
            >
              C
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-primary/50 text-primary hover:bg-primary/60 font-bold text-lg"
            >
              <Delete className="w-5 h-5" />
            </Button>
          </div>

          {/* Number and Operation Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {buttons.map((row) =>
              row.map((btn) => (
                <Button
                  key={btn}
                  onClick={() => {
                    if (btn === '=') handleEquals();
                    else if (['+', '-', '*', '/', '%'].includes(btn)) handleOperation(btn);
                    else if (btn === '.') handleDecimal();
                    else handleNumber(btn);
                  }}
                  className={`font-bold text-lg py-6 ${
                    btn === '='
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : ['+', '-', '*', '/', '%'].includes(btn)
                      ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {btn}
                </Button>
              ))
            )}
          </div>

          {/* Additional Operations */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button
              onClick={() => handleOperation('%')}
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
            >
              MOD
            </Button>
            <Button
              onClick={() => {
                setDisplay((parseFloat(display) * -1).toString());
              }}
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold"
            >
              +/-
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
