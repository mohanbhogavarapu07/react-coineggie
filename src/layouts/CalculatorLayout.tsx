
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Mail, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface CalculatorLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  children,
  title,
  description,
  icon
}) => {
  const navigate = useNavigate();
  
  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your calculation results are being prepared for download",
    });
    // Download functionality would be implemented here
  };
  
  const handleEmail = () => {
    toast({
      title: "Email option",
      description: "Email sharing will be available once you create an account",
      variant: "default",
    });
  };
  
  return (
    <MainLayout>
      <div className="container py-8 md:py-12">
        <Button 
          variant="outline" 
          size="sm" 
          className="mb-6" 
          onClick={() => navigate('/calculators')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Calculators
        </Button>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-finance-green/10 text-finance-green">
            {icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-md">
              {children}
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4">About this calculator</h3>
              <div className="prose text-sm text-muted-foreground">
                <p>{description}</p>
              </div>
            </Card>
            
            <Card className="p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4">Share Results</h3>
              <div className="flex flex-col gap-4">
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={handleEmail}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email Results
                </Button>
                <Button 
                  className="w-full" 
                  onClick={handleDownload}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Results
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
