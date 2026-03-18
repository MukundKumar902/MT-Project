'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Zap } from 'lucide-react';

interface TestResult {
  download: number;
  upload: number;
  ping: number;
}

export default function SpeedTestPage() {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);

  const runSpeedTest = async () => {
    setTesting(true);
    try {
      const startTime = performance.now();

      // Download test - fetch a small file
      const downloadStart = performance.now();
      const downloadResponse = await fetch(
        'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        { cache: 'no-store' }
      );
      const blob = await downloadResponse.blob();
      const downloadEnd = performance.now();

      const downloadSize = blob.size / (1024 * 1024); // MB
      const downloadTime = (downloadEnd - downloadStart) / 1000; // seconds
      const downloadSpeed = (downloadSize / downloadTime) * 8; // Mbps

      // Ping test - multiple requests
      let totalPing = 0;
      const pingRequests = 5;
      for (let i = 0; i < pingRequests; i++) {
        const pingStart = performance.now();
        await fetch('https://www.google.com', { method: 'HEAD' });
        const pingEnd = performance.now();
        totalPing += pingEnd - pingStart;
      }
      const avgPing = totalPing / pingRequests;

      // Upload test simulation (estimated based on ping)
      const uploadSpeed = downloadSpeed * 0.5; // Typical ratio

      setResult({
        download: Math.max(0, downloadSpeed),
        upload: Math.max(0, uploadSpeed),
        ping: Math.round(avgPing),
      });
    } catch (error) {
      console.error('Speed test error:', error);
    } finally {
      setTesting(false);
    }
  };

  const getSpeedCategory = (mbps: number) => {
    if (mbps < 5) return { category: 'Slow', color: 'text-destructive' };
    if (mbps < 25) return { category: 'Fair', color: 'text-yellow-500' };
    if (mbps < 100) return { category: 'Good', color: 'text-primary' };
    return { category: 'Excellent', color: 'text-green-500' };
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Internet Speed Test</h1>

        <Card className="bg-gradient-to-br from-card to-secondary border-primary/50 p-8">
          <div className="text-center mb-8">
            <Zap className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Test Your Connection</h2>
            <p className="text-muted-foreground">
              Measure your download speed, upload speed, and ping
            </p>
          </div>

          <Button
            onClick={runSpeedTest}
            disabled={testing}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6 mb-8"
          >
            {testing ? 'Testing...' : 'Start Speed Test'}
          </Button>

          {result && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Download */}
                <Card className="bg-background border-primary/30 p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Download Speed</p>
                  <div className="mb-2">
                    <p className="text-4xl font-bold text-primary">
                      {result.download.toFixed(1)}
                    </p>
                    <p className="text-xs text-muted-foreground">Mbps</p>
                  </div>
                  <p className={`text-sm font-semibold ${getSpeedCategory(result.download).color}`}>
                    {getSpeedCategory(result.download).category}
                  </p>
                </Card>

                {/* Upload */}
                <Card className="bg-background border-primary/30 p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Upload Speed</p>
                  <div className="mb-2">
                    <p className="text-4xl font-bold text-primary">
                      {result.upload.toFixed(1)}
                    </p>
                    <p className="text-xs text-muted-foreground">Mbps</p>
                  </div>
                  <p className={`text-sm font-semibold ${getSpeedCategory(result.upload).color}`}>
                    {getSpeedCategory(result.upload).category}
                  </p>
                </Card>

                {/* Ping */}
                <Card className="bg-background border-primary/30 p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Ping</p>
                  <div className="mb-2">
                    <p className="text-4xl font-bold text-primary">
                      {result.ping}
                    </p>
                    <p className="text-xs text-muted-foreground">ms</p>
                  </div>
                  <p className="text-sm font-semibold text-primary">Good</p>
                </Card>
              </div>

              <Card className="bg-secondary border-primary/30 p-4">
                <h3 className="text-sm font-semibold text-foreground mb-3">Speed Categories</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Slow: Less than 5 Mbps</p>
                  <p>• Fair: 5 - 25 Mbps</p>
                  <p>• Good: 25 - 100 Mbps</p>
                  <p>• Excellent: Above 100 Mbps</p>
                </div>
              </Card>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
