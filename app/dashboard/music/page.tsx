'use client';

import { Card } from '@/components/ui/card';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const playlist = [
  { id: 1, title: 'Song 1', artist: 'Artist Name', duration: '3:45' },
  { id: 2, title: 'Song 2', artist: 'Artist Name', duration: '4:12' },
  { id: 3, title: 'Song 3', artist: 'Artist Name', duration: '3:28' },
  { id: 4, title: 'Song 4', artist: 'Artist Name', duration: '3:55' },
];

export default function MusicPage() {
  const [playing, setPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Music Player</h1>

        {/* Player */}
        <Card className="bg-gradient-to-br from-card to-secondary border-primary/50 p-8 mb-6">
          <div className="flex items-center justify-center mb-8">
            <div className="w-32 h-32 bg-primary/20 rounded-lg flex items-center justify-center">
              <Music className="w-16 h-16 text-primary" />
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {playlist[currentTrack].title}
            </h2>
            <p className="text-muted-foreground">{playlist[currentTrack].artist}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="w-full bg-secondary rounded-full h-2 mb-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '35%' }} />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1:18</span>
              <span>{playlist[currentTrack].duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => setCurrentTrack(Math.max(0, currentTrack - 1))}
              className="text-primary hover:bg-primary/10"
            >
              <SkipBack className="w-6 h-6" />
            </Button>
            <Button
              onClick={() => setPlaying(!playing)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-12 h-12 rounded-full"
            >
              {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setCurrentTrack(Math.min(playlist.length - 1, currentTrack + 1))}
              className="text-primary hover:bg-primary/10"
            >
              <SkipForward className="w-6 h-6" />
            </Button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            <input type="range" min="0" max="100" defaultValue="70" className="flex-1" />
          </div>
        </Card>

        {/* Playlist */}
        <Card className="bg-card border-primary/30 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Playlist</h3>
          <div className="space-y-2">
            {playlist.map((song, index) => (
              <div
                key={song.id}
                onClick={() => setCurrentTrack(index)}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  index === currentTrack
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-secondary/80 text-foreground'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{song.title}</p>
                    <p className="text-sm opacity-75">{song.artist}</p>
                  </div>
                  <p className="text-sm">{song.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
