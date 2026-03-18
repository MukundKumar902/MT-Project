'use client';

import { Card } from '@/components/ui/card';
import { Smartphone } from 'lucide-react';

export default function ScannerPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">QR Scanner</h1>

        <Card className="bg-card border-primary/30 p-8 text-center">
          <Smartphone className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-4">QR Code Scanner</h2>
          <p className="text-muted-foreground mb-6">
            Scan QR codes using your device's camera to get instant information
          </p>
          <div className="bg-secondary rounded-lg p-8 mb-6">
            <p className="text-muted-foreground">Camera access required</p>
          </div>
          <p className="text-sm text-muted-foreground">
            This feature requires camera permissions to function
          </p>
        </Card>
      </div>
    </div>
  );
}
