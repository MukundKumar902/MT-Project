'use client';

import { Card } from '@/components/ui/card';
import { Trophy, Medal } from 'lucide-react';

const leaderboard = [
  { rank: 1, name: 'Pro Gamer', score: 5420, level: 12, badge: '👑' },
  { rank: 2, name: 'Speed Master', score: 4890, level: 11, badge: '🚀' },
  { rank: 3, name: 'Quiz Champion', score: 4320, level: 10, badge: '🧠' },
  { rank: 4, name: 'Game Master', score: 3950, level: 9, badge: '⭐' },
  { rank: 5, name: 'Rising Star', score: 3620, level: 8, badge: '✨' },
  { rank: 6, name: 'Player One', score: 3200, level: 7, badge: '🎮' },
  { rank: 7, name: 'Casual Player', score: 2800, level: 6, badge: '🎯' },
  { rank: 8, name: 'New Player', score: 2100, level: 5, badge: '🆕' },
  { rank: 9, name: 'Beginner', score: 1450, level: 4, badge: '🌱' },
  { rank: 10, name: 'Just Starting', score: 890, level: 3, badge: '👶' },
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2 flex items-center gap-3">
          <Trophy className="w-10 h-10" />
          Global Leaderboard
        </h1>
        <p className="text-muted-foreground mb-8">Compete with players worldwide and climb the ranks</p>

        <Card className="bg-card border-primary/30 p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary/20">
                  <th className="text-left py-4 px-4 text-muted-foreground font-semibold">Rank</th>
                  <th className="text-left py-4 px-4 text-muted-foreground font-semibold">Player</th>
                  <th className="text-left py-4 px-4 text-muted-foreground font-semibold">Level</th>
                  <th className="text-right py-4 px-4 text-muted-foreground font-semibold">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry) => (
                  <tr
                    key={entry.rank}
                    className="border-b border-primary/10 hover:bg-secondary/50 transition-all"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{entry.badge}</span>
                        <span className="font-bold text-foreground"># {entry.rank}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-foreground font-semibold">{entry.name}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-primary font-bold">Level {entry.level}</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="text-primary font-bold text-lg">{entry.score.toLocaleString()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* My Stats */}
        <Card className="bg-gradient-to-br from-card to-secondary border-primary/50 p-6 mt-8">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Medal className="w-5 h-5 text-primary" />
            Your Position
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Your Rank</p>
              <p className="text-4xl font-bold text-primary">#47</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Your Level</p>
              <p className="text-4xl font-bold text-primary">5</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Your Score</p>
              <p className="text-4xl font-bold text-primary">1,280</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Next Rank In</p>
              <p className="text-4xl font-bold text-primary">620 pts</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
