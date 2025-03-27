import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};
