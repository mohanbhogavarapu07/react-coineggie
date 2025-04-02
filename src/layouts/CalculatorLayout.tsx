import { MainLayout } from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Mail, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface CalculatorLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  icon: React.ReactNode;
  showSeparateAboutSection?: boolean; // Control visibility of separate about section
}

export const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  children,
  title,
  description,
  icon,
  showSeparateAboutSection = false // Default to false
}) => {
  const navigate = useNavigate();
  
  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your calculation results are being prepared for download",
    });
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
          className="h-10 px-4 py-2 mb-6" 
          onClick={() => navigate('/calculators')}
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
                
                {/* <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    className="h-10 px-4 py-2"
                    onClick={handleEmail}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                  <Button 
                    className="h-10 px-4 py-2"
                    onClick={handleDownload}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div> */}
              </div>
              
              {children}
              
              {/* First About section (merged in main layout with how-to-use styling) */}
              {/* <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-md">
                <h3 className="text-lg font-medium text-amber-800 mb-2">About this calculator</h3>
                <p className="text-sm text-amber-700">
                  {description}
                </p>
              </div> */}
            </Card>


            <Card className="p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4">About this calculator</h3>
                <div className="text-muted-foreground">
                  <p>{description}</p>
                </div>
            </Card>

            
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

