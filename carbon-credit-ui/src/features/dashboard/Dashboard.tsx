import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDeployedBoardContext } from '../../hooks';
import { type BoardDeployment } from '../../contexts';
import { type Observable } from 'rxjs';
import { Activity, Leaf, FileText, Globe, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import ContractConnection from './ContractConnection';

const Dashboard = () => {
  const boardApiProvider = useDeployedBoardContext();
  const [boardDeployments, setBoardDeployments] = useState<Array<Observable<BoardDeployment>>>([]);

  useEffect(() => {
    const subscription = boardApiProvider.boardDeployments$.subscribe(setBoardDeployments);
    return () => subscription.unsubscribe();
  }, [boardApiProvider]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero / Intro */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Track Carbon Credits Securely</h1>
        <p className="text-muted-foreground">Private carbon accounting powered by Midnight.</p>
      </div>

      {/* Top Stats Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Balance</CardTitle>
            <Leaf className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345,678</div>
            <p className="text-xs text-muted-foreground">CO₂ Saved (tCO₂)</p>
            <div className="mt-2 flex items-center text-xs text-success">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +12.5% this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Credits</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,765</div>
            <p className="text-xs text-muted-foreground">Credits Owned</p>
            <div className="mt-2 flex items-center text-xs text-success">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +8.2% this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NFT Certificates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">Issued Certificates</p>
            <div className="mt-2 flex items-center text-xs text-success">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +15.3% this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23,456</div>
            <p className="text-xs text-muted-foreground">Global Impact</p>
            <div className="mt-2 flex items-center text-xs text-success">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +18.7% this month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Chart Area */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Carbon Savings Overview</CardTitle>
            <CardDescription>Your impact across different projects over time.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
            {/* Recharts chart will go here */}
            <span className="text-sm">Chart Data Loading...</span>
          </CardContent>
        </Card>

        {/* Contract Connection / Recent Activity */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Active Connections</CardTitle>
            <CardDescription>Manage your smart contract connections.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* The Contract Connections from the old Board.tsx */}
            {boardDeployments.map((boardDeployment, idx) => (
              <ContractConnection key={`board-${idx}`} boardDeployment$={boardDeployment} />
            ))}
            <ContractConnection />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
