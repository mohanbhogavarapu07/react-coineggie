import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MainLayout } from './MainLayout';

interface CalculatorLayoutProps {
  children?: React.ReactNode;
  title: string;
  description: string;
  icon?: React.ReactNode;
  showSeparateAboutSection?: boolean; // Control visibility of separate about section
  calculatorContent?: React.ReactNode;
  aboutContent?: React.ReactNode;
  activeTab?: string;
  activeSubTab?: string;
}

export const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  children,
  title,
  description,
  icon,
  showSeparateAboutSection = false,
  calculatorContent,
  aboutContent,
  activeTab = 'business',
  activeSubTab = 'finance'
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleBack = () => {
    // Always navigate back to calculators with the correct tab state
    navigate(`/calculators?tab=${activeTab}&subtab=${activeSubTab}`);
  };
  
  return (
    <MainLayout>
      <div className="container py-8 md:py-12">
        <Button 
          variant="outline" 
          className="h-10 px-4 py-2 mb-6" 
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Calculators
        </Button>
        
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Main content */}
          <div className="flex-1 space-y-6">
            <Card className="p-6 shadow-md">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 flex items-center justify-center rounded-full bg-finance-green/10 text-finance-green">
                    {icon}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">{title}</h1>
                    <p className="text-muted-foreground">{description}</p>
                  </div>
                </div>
              </div>
              
              {calculatorContent || children}
            </Card>

            {showSeparateAboutSection && aboutContent && (
              <Card className="p-6 shadow-md">
                {aboutContent}
              </Card>
            )}
          </div>
          
          {/* Right sidebar - space for advertisements */}
          <div className="hidden lg:block lg:w-80">
            <div className="sticky top-4">
              <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Advertisement Space</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

