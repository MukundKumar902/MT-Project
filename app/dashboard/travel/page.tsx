'use client';

import { Card } from '@/components/ui/card';
import { Plane, MapPin, Heart } from 'lucide-react';

const destinations = [
  { name: 'Paris, France', description: 'City of Light', image: 'https://via.placeholder.com/300x200?text=Paris' },
  { name: 'Tokyo, Japan', description: 'Modern & Traditional', image: 'https://via.placeholder.com/300x200?text=Tokyo' },
  { name: 'New York, USA', description: 'The Big Apple', image: 'https://via.placeholder.com/300x200?text=New+York' },
  { name: 'Barcelona, Spain', description: 'Coastal Beauty', image: 'https://via.placeholder.com/300x200?text=Barcelona' },
  { name: 'Dubai, UAE', description: 'Luxury & Innovation', image: 'https://via.placeholder.com/300x200?text=Dubai' },
  { name: 'Sydney, Australia', description: 'Harbor City', image: 'https://via.placeholder.com/300x200?text=Sydney' },
];

export default function TravelPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2">Travel Planner</h1>
        <p className="text-muted-foreground mb-8">Discover amazing destinations and plan your next trip</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <Card key={index} className="bg-card border-primary/30 overflow-hidden hover:border-primary transition-all cursor-pointer">
              <div className="relative h-40">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                <button className="absolute top-3 right-3 p-2 bg-primary/20 rounded-full hover:bg-primary/30">
                  <Heart className="w-5 h-5 text-destructive" />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-foreground">{dest.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{dest.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
