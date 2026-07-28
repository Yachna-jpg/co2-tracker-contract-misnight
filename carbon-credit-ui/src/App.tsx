import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import { DeployedBoardProvider } from './contexts';
import { logger } from './main';
import Dashboard from './features/dashboard/Dashboard';
import Marketplace from './features/marketplace/Marketplace';
import Certificates from './features/certificates/Certificates';
import Analytics from './features/analytics/Analytics';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/projects" element={<div className="p-8">Projects Page (Coming Soon)</div>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
