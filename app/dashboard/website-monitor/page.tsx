'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Monitor, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface MonitoredSite {
  url: string;
  status: 'online' | 'offline' | 'checking';
  responseTime: number | null;
  lastChecked: string;
}

export default function WebsiteMonitorPage() {
  const [url, setUrl] = useState('https://example.com');
  const [sites, setSites] = useState<MonitoredSite[]>([]);

  const addSite = async () => {
    if (!url.trim()) return;

    setSites((prev) => [
      ...prev,
      {
        url,
        status: 'checking',
        responseTime: null,
        lastChecked: new Date().toLocaleTimeString(),
      },
    ]);

    try {
      const startTime = performance.now();
      const response = await fetch(url, { method: 'HEAD' });
      const endTime = performance.now();

      setSites((prev) =>
        prev.map((site) =>
          site.url === url
            ? {
                ...site,
                status: response.ok ? 'online' : 'offline',
                responseTime: Math.round(endTime - startTime),
                lastChecked: new Date().toLocaleTimeString(),
              }
            : site
        )
      );
    } catch {
      setSites((prev) =>
        prev.map((site) =>
          site.url === url
            ? {
                ...site,
                status: 'offline',
                lastChecked: new Date().toLocaleTimeString(),
              }
            : site
        )
      );
    }

    setUrl('https://example.com');
  };

  const removeSite = (urlToRemove: string) => {
    setSites((prev) => prev.filter((site) => site.url !== urlToRemove));
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Website Monitor</h1>

        {/* Add Website */}
        <Card className="bg-card border-primary/30 p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Monitor a Website</h2>
          <div className="flex gap-2">
            <Input
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSite()}
              className="bg-secondary border-primary/30 text-foreground"
            />
            <Button
              onClick={addSite}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Add
            </Button>
          </div>
        </Card>

        {/* Monitoring List */}
        <div className="space-y-4">
          {sites.length === 0 ? (
            <Card className="bg-secondary border-primary/30 p-8 text-center">
              <Monitor className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Add websites to monitor their status</p>
            </Card>
          ) : (
            sites.map((site) => (
              <Card
                key={site.url}
                className="bg-card border-primary/30 p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-4 flex-1">
                  {site.status === 'checking' && (
                    <Clock className="w-6 h-6 text-yellow-500 animate-spin" />
                  )}
                  {site.status === 'online' && (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                  {site.status === 'offline' && (
                    <AlertCircle className="w-6 h-6 text-destructive" />
                  )}

                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{site.url}</p>
                    <p className="text-sm text-muted-foreground">
                      {site.status === 'checking' && 'Checking...'}
                      {site.status === 'online' && `✓ Online (${site.responseTime}ms)`}
                      {site.status === 'offline' && '✗ Offline'}
                    </p>
                  </div>
                </div>

                <div className="text-right mr-4">
                  <p className="text-xs text-muted-foreground">
                    Last checked: {site.lastChecked}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  onClick={() => removeSite(site.url)}
                  className="text-destructive hover:bg-destructive/10"
                >
                  Remove
                </Button>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
