
import React from 'react';
import { MainLayout } from './MainLayout';
import { cn } from '@/lib/utils';

interface CategoryLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  bgColor?: string;
  textColor?: string;
}

export const CategoryLayout: React.FC<CategoryLayoutProps> = ({
  children,
  title,
  description,
  bgColor = 'bg-finance-green',
  textColor = 'text-white'
}) => {
  return (
    <MainLayout>
      <div className={cn("py-12", bgColor, textColor)}>
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          {description && <p className="text-lg max-w-3xl opacity-90">{description}</p>}
        </div>
      </div>
      <div className="container py-12">
        {children}
      </div>
    </MainLayout>
  );
};
