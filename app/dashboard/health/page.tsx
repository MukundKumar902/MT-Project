'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Heart, Activity, Droplet, TrendingUp } from 'lucide-react';

interface HealthData {
  weight: number;
  bmi: number;
  dailyCalories: number;
  waterIntake: number;
  steps: number;
  heartRate: number;
}

export default function HealthPage() {
  const [height, setHeight] = useState('180');
  const [weight, setWeight] = useState('75');
  const [calories, setCalories] = useState('2000');
  const [water, setWater] = useState('8');
  const [steps, setSteps] = useState('10000');
  const [heartRate, setHeartRate] = useState('72');
  const [health, setHealth] = useState<HealthData | null>(null);

  const calculateHealth = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    const bmi = w / (h * h);

    setHealth({
      weight: w,
      bmi: parseFloat(bmi.toFixed(1)),
      dailyCalories: parseInt(calories),
      waterIntake: parseInt(water),
      steps: parseInt(steps),
      heartRate: parseInt(heartRate),
    });
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-400' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-500' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-500' };
    return { category: 'Obese', color: 'text-destructive' };
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Health Tracker</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card className="bg-card border-primary/30 p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Your Data</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Height (cm)</label>
                  <Input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="bg-secondary border-primary/30 text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Weight (kg)</label>
                  <Input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="bg-secondary border-primary/30 text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Daily Calories Target</label>
                <Input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  className="bg-secondary border-primary/30 text-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Water Intake (glasses)</label>
                  <Input
                    type="number"
                    value={water}
                    onChange={(e) => setWater(e.target.value)}
                    className="bg-secondary border-primary/30 text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Daily Steps</label>
                  <Input
                    type="number"
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                    className="bg-secondary border-primary/30 text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-2">Heart Rate (bpm)</label>
                <Input
                  type="number"
                  value={heartRate}
                  onChange={(e) => setHeartRate(e.target.value)}
                  className="bg-secondary border-primary/30 text-foreground"
                />
              </div>

              <Button
                onClick={calculateHealth}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Calculate
              </Button>
            </div>
          </Card>

          {/* Results */}
          <div className="space-y-4">
            {health ? (
              <>
                {/* BMI Card */}
                <Card className="bg-card border-primary/30 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">BMI</h3>
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <p className={`text-4xl font-bold mb-2 ${getBMICategory(health.bmi).color}`}>
                    {health.bmi}
                  </p>
                  <p className={`text-sm font-semibold ${getBMICategory(health.bmi).color}`}>
                    {getBMICategory(health.bmi).category}
                  </p>
                </Card>

                {/* Vital Stats */}
                <Card className="bg-card border-primary/30 p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Vital Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-destructive" />
                        <span className="text-muted-foreground">Heart Rate</span>
                      </div>
                      <span className="font-bold text-foreground">{health.heartRate} bpm</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" />
                        <span className="text-muted-foreground">Steps</span>
                      </div>
                      <span className="font-bold text-foreground">{health.steps.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Droplet className="w-5 h-5 text-cyan-400" />
                        <span className="text-muted-foreground">Water Intake</span>
                      </div>
                      <span className="font-bold text-foreground">{health.waterIntake} glasses</span>
                    </div>
                  </div>
                </Card>

                {/* Calories */}
                <Card className="bg-card border-primary/30 p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Daily Calories</h3>
                  <p className="text-4xl font-bold text-primary mb-2">{health.dailyCalories}</p>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: '75%' }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Target reached: 75%</p>
                </Card>
              </>
            ) : (
              <Card className="bg-secondary border-primary/30 p-6 text-center">
                <p className="text-muted-foreground">Enter your data and click Calculate to see results</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
