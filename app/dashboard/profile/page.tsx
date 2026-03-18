'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { User, Mail, Calendar, Trophy, Zap, Target } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <Card className="lg:col-span-2 bg-card border-primary/30 p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{user?.displayName || 'User'}</h2>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {user?.email}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setEditing(!editing)}
                variant={editing ? 'destructive' : 'default'}
                className={editing ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary hover:bg-primary/90'}
              >
                {editing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>

            {editing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Display Name</label>
                  <Input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="bg-secondary border-primary/30 text-foreground"
                  />
                </div>
                <Button
                  onClick={() => setEditing(false)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                >
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-5 h-5" />
                  <span>Member since {new Date().getFullYear()}</span>
                </div>
                <div className="bg-secondary rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-3">Account Status</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email Verified</span>
                      <span className="text-green-500">✓ Yes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account Type</span>
                      <span className="text-primary">Standard</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Stats */}
          <div className="space-y-4">
            <Card className="bg-card border-primary/30 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-6 h-6 text-primary" />
                <h3 className="font-semibold text-foreground">Total Wins</h3>
              </div>
              <p className="text-4xl font-bold text-primary">42</p>
            </Card>

            <Card className="bg-card border-primary/30 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-primary" />
                <h3 className="font-semibold text-foreground">Points</h3>
              </div>
              <p className="text-4xl font-bold text-primary">1,280</p>
            </Card>

            <Card className="bg-card border-primary/30 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-primary" />
                <h3 className="font-semibold text-foreground">Level</h3>
              </div>
              <p className="text-4xl font-bold text-primary">5</p>
            </Card>
          </div>
        </div>

        {/* Activity */}
        <Card className="bg-card border-primary/30 p-6 mt-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-primary/20">
              <span className="text-foreground">Won Tic Tac Toe</span>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-primary/20">
              <span className="text-foreground">Completed Snake Game</span>
              <span className="text-xs text-muted-foreground">5 hours ago</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-foreground">Used Weather Tool</span>
              <span className="text-xs text-muted-foreground">1 day ago</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
