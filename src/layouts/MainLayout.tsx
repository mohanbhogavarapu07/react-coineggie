
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </SidebarProvider>
  );
};
