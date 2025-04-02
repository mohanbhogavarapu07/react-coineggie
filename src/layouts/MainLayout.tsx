import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full max-w-[100vw] overflow-x-hidden">
        <Header />
        <main className="flex-grow w-full">
          <div className="w-full max-w-[100vw] mx-auto">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </SidebarProvider>
  );
};
