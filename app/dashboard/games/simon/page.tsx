'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const colors = ['Red', 'Blue', 'Green', 'Yellow'];

export default function SimonPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Simon Says</h1>

        <Card className="bg-card border-primary/30 p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-6">Repeat the sequence</h2>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="aspect-square bg-red-500 rounded-lg hover:bg-red-600 transition-all" />
            <button className="aspect-square bg-blue-500 rounded-lg hover:bg-blue-600 transition-all" />
            <button className="aspect-square bg-green-500 rounded-lg hover:bg-green-600 transition-all" />
            <button className="aspect-square bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-all" />
          </div>

          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Start Game
          </Button>
        </Card>
      </div>
    </div>
  );
}
