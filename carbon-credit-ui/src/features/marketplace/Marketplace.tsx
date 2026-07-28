import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Filter, Leaf, Wind, Sun, Droplets, MapPin, CheckCircle2 } from 'lucide-react';

// Mock data for the marketplace
const mockProjects = [
  {
    id: 'PRJ-001',
    name: 'Amazon Rainforest Restoration',
    location: 'Brazil',
    type: 'Nature Based',
    creditsAvailable: 1000,
    price: 12.5,
    verified: true,
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=400&h=250',
    icon: <Leaf className="h-4 w-4" />,
  },
  {
    id: 'PRJ-002',
    name: 'Wind Energy Project India',
    location: 'India',
    type: 'Renewable Energy',
    creditsAvailable: 750,
    price: 10.2,
    verified: true,
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=400&h=250',
    icon: <Wind className="h-4 w-4" />,
  },
  {
    id: 'PRJ-003',
    name: 'Solar Power Initiative',
    location: 'Kenya',
    type: 'Technology',
    creditsAvailable: 500,
    price: 8.8,
    verified: true,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=400&h=250',
    icon: <Sun className="h-4 w-4" />,
  },
  {
    id: 'PRJ-004',
    name: 'Blue Ocean Conservation',
    location: 'Global',
    type: 'Nature Based',
    creditsAvailable: 1250,
    price: 15.0,
    verified: true,
    image: 'https://images.unsplash.com/photo-1582967265549-0d355ef8eb4e?auto=format&fit=crop&q=80&w=400&h=250',
    icon: <Droplets className="h-4 w-4" />,
  },
];

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border pb-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground">Discover and trade verified carbon credits securely as NFTs.</p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-[250px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="h-9 gap-2">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockProjects.map((project) => (
          <Card
            key={project.id}
            className="overflow-hidden group flex flex-col hover:border-primary/30 transition-colors"
          >
            <div className="relative h-40 overflow-hidden bg-muted">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 flex gap-2">
                {project.verified && (
                  <Badge
                    variant="secondary"
                    className="bg-background/80 backdrop-blur-sm border-none shadow-sm gap-1 font-medium text-xs"
                  >
                    <CheckCircle2 className="h-3 w-3 text-success" />
                    Verified
                  </Badge>
                )}
                <Badge
                  variant="secondary"
                  className="bg-background/80 backdrop-blur-sm border-none shadow-sm font-medium text-xs"
                >
                  NFT
                </Badge>
              </div>
            </div>

            <CardHeader className="p-4 pb-0 flex-grow">
              <h3 className="font-semibold text-lg line-clamp-2 leading-tight mb-1">{project.name}</h3>
              <div className="flex items-center text-xs text-muted-foreground mb-4">
                <MapPin className="mr-1 h-3 w-3" />
                {project.location}
              </div>
            </CardHeader>

            <CardContent className="p-4 pt-2 border-t border-border/50">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-xl font-bold">{project.creditsAvailable.toLocaleString()}</span>
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                    tCO₂ Available
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xl font-bold">${project.price.toFixed(2)}</span>
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">/ tCO₂</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button className="w-full">Buy Credits</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
