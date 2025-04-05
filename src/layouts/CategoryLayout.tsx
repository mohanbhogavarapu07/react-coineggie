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
    <div>
        <div className={cn("py-8 sm:py-10 md:py-12", bgColor, textColor)}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">{title}</h1>
          {description && (
            <p className="text-base sm:text-lg max-w-3xl opacity-90">{description}</p>
          )}
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="overflow-x-auto">
          {children}
        </div>
      </div>
      </div>
  );
};
