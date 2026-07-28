import React from 'react';
import { NavLink } from 'react-router-dom';
import { Wallet, Activity, User, Home, PackageSearch, Award, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TopNav = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-[1440px] items-center px-4">
        {/* Logo */}
        <div className="mr-8 flex items-center space-x-2">
          <Activity className="h-6 w-6 text-foreground" />
          <span className="text-lg font-bold">Midnight</span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors hover:text-foreground/80 ${isActive ? 'text-foreground' : 'text-foreground/60'}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/marketplace"
            className={({ isActive }) =>
              `transition-colors hover:text-foreground/80 ${isActive ? 'text-foreground' : 'text-foreground/60'}`
            }
          >
            Marketplace
          </NavLink>
          <NavLink
            to="/certificates"
            className={({ isActive }) =>
              `transition-colors hover:text-foreground/80 ${isActive ? 'text-foreground' : 'text-foreground/60'}`
            }
          >
            Certificates
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `transition-colors hover:text-foreground/80 ${isActive ? 'text-foreground' : 'text-foreground/60'}`
            }
          >
            Analytics
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `transition-colors hover:text-foreground/80 ${isActive ? 'text-foreground' : 'text-foreground/60'}`
            }
          >
            Projects
          </NavLink>
          <a href="#" className="text-foreground/60 transition-colors hover:text-foreground/80">
            Documentation
          </a>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="h-7 border-border px-3 text-xs text-foreground/80">
            <span className="mr-1.5 flex h-2 w-2 rounded-full bg-success"></span>
            Midnight Testnet
          </Badge>

          <Button variant="outline" size="sm" className="h-9 gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">0x7a3b...8f21</span>
          </Button>

          <Button size="sm" className="h-9">
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
