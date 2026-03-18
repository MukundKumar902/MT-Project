'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Settings, Bell, Lock, Moon, Volume2, Trash2 } from 'lucide-react';

export default function SettingsPage() {
  const { logout } = useAuth();
  const [settings, setSettings] = useState({
    notifications: true,
    sound: true,
    darkMode: true,
    emailUpdates: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure? This action cannot be undone. All your data will be permanently deleted.')) {
      // Handle account deletion
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Settings</h1>

        {/* Preferences */}
        <Card className="bg-card border-primary/30 p-6 mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Preferences
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-primary" />
                <span className="text-foreground">Enable Notifications</span>
              </div>
              <button
                onClick={() => toggleSetting('notifications')}
                className={`w-12 h-6 rounded-full transition-all ${
                  settings.notifications ? 'bg-primary' : 'bg-secondary'
                }`}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-primary" />
                <span className="text-foreground">Game Sounds</span>
              </div>
              <button
                onClick={() => toggleSetting('sound')}
                className={`w-12 h-6 rounded-full transition-all ${
                  settings.sound ? 'bg-primary' : 'bg-secondary'
                }`}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-primary" />
                <span className="text-foreground">Dark Mode</span>
              </div>
              <button
                onClick={() => toggleSetting('darkMode')}
                className={`w-12 h-6 rounded-full transition-all ${
                  settings.darkMode ? 'bg-primary' : 'bg-secondary'
                }`}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-foreground">Email Updates</span>
              <button
                onClick={() => toggleSetting('emailUpdates')}
                className={`w-12 h-6 rounded-full transition-all ${
                  settings.emailUpdates ? 'bg-primary' : 'bg-secondary'
                }`}
              />
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card className="bg-card border-primary/30 p-6 mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Security
          </h2>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start border-primary text-primary hover:bg-primary/10"
            >
              Change Password
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-primary text-primary hover:bg-primary/10"
            >
              Two-Factor Authentication
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-primary text-primary hover:bg-primary/10"
            >
              Active Sessions
            </Button>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="bg-card border-destructive/30 p-6 mb-6">
          <h2 className="text-xl font-semibold text-destructive mb-6">Danger Zone</h2>

          <div className="space-y-3">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start border-destructive text-destructive hover:bg-destructive/10"
            >
              Logout
            </Button>
            <Button
              onClick={handleDeleteAccount}
              variant="destructive"
              className="w-full justify-start bg-destructive hover:bg-destructive/90"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </Card>

        {/* Info */}
        <Card className="bg-secondary border-primary/30 p-6">
          <h3 className="font-semibold text-foreground mb-3">About Multi-Tasking</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>Version: 1.0.0</p>
            <p>Build: {new Date().getFullYear()}</p>
            <p>
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
              {' | '}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>
              {' | '}
              <a href="#" className="text-primary hover:underline">
                Contact Support
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
