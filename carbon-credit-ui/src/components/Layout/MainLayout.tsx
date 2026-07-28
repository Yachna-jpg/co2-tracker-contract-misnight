import React from 'react';
import TopNav from './TopNav';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <TopNav />
      <main className="flex-1 w-full max-w-[1440px] mx-auto p-8">{children}</main>
    </div>
  );
};

export default MainLayout;
