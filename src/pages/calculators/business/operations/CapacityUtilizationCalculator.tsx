import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calculator, ArrowRight, ArrowDown, Copy, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import jsPDF from 'jspdf';
import { CalculatorLayout } from '@/layouts/CalculatorLayout';

// Types
interface UtilizationData {
  maxCapacity: number;
  actualProduction: number;
  utilizationRate: number;
}

interface ChartDataPoint {
  name: string;
  value: number;
}

interface PDFData {
  maxCapacity: number;
  actualProduction: number;
  utilizationRate: number;
  recommendations: string[];
}

// Utility Functions
const formatCurrency = (value: number): string => {
  return value.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR'
  });
};

const formatPercentage = (value: number): string => {
  return value.toFixed(1) + '%';
};

// Main Component
export default function CapacityUtilizationCalculator() {
  // State
  const [maxCapacity, setMaxCapacity] = useState<number>(1000);
  const [actualProduction, setActualProduction] = useState<number>(700);
  const [capacityUtilization, setCapacityUtilization] = useState<number | null>(70);
  const [downtime, setDowntime] = useState<number | null>(300);
  const [potentialRevenue, setPotentialRevenue] = useState<number | null>(null);
  const [revenuePerUnit, setRevenuePerUnit] = useState<number>(100);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const { toast } = useToast();

  // Calculate capacity utilization
  const calculateUtilization = () => {
    if (maxCapacity <= 0) {
      toast({
        title: "Invalid Input",
        description: "Maximum capacity must be greater than zero.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const utilizationRate = (actualProduction / maxCapacity) * 100;
      setCapacityUtilization(Number(utilizationRate.toFixed(2)));
      
      // Calculate downtime
      const unusedCapacity = maxCapacity - actualProduction;
      setDowntime(Number(unusedCapacity.toFixed(2)));
      
      // Calculate potential revenue
      if (revenuePerUnit > 0) {
        const potential = unusedCapacity * revenuePerUnit;
        setPotentialRevenue(Number(potential.toFixed(2)));
      }
      
      // Store data in sessionStorage
      sessionStorage.setItem('maxCapacity', maxCapacity.toString());
      sessionStorage.setItem('actualProduction', actualProduction.toString());
      sessionStorage.setItem('utilizationRate', utilizationRate.toString());
      
      setIsLoading(false);
      
      toast({
        title: "Calculation Complete",
        description: "Your capacity utilization metrics have been updated."
      });
    }, 800);
  };

  // Reset form
  const handleReset = () => {
    setMaxCapacity(1000);
    setActualProduction(700);
    setRevenuePerUnit(100);
    setCapacityUtilization(70);
    setDowntime(300);
    setPotentialRevenue(30000);
  };

  // Get utilization data
  const getUtilizationData = (): UtilizationData => {
    const storedMaxCapacity = sessionStorage.getItem('maxCapacity');
    const storedActualProduction = sessionStorage.getItem('actualProduction');
    const storedUtilizationRate = sessionStorage.getItem('utilizationRate');
    
    const maxCapacity = storedMaxCapacity ? Number(storedMaxCapacity) : 1000;
    const actualProduction = storedActualProduction ? Number(storedActualProduction) : 700;
    const utilizationRate = storedUtilizationRate ? Number(storedUtilizationRate) : 70;
    
    return { maxCapacity, actualProduction, utilizationRate };
  };

  // Get recommendations based on utilization rate
  const getRecommendations = (utilizationRate: number): string[] => {
    if (utilizationRate < 60) {
      return [
        "Implement marketing campaigns to increase demand for your products",
        "Explore new market segments to expand your customer base",
        "Consider temporarily reducing capacity to align with current demand"
      ];
    } else if (utilizationRate < 80) {
      return [
        "Fine-tune production scheduling to improve resource allocation",
        "Analyze and remove bottlenecks in your production process",
        "Investigate opportunities to increase sales in existing markets"
      ];
    } else if (utilizationRate < 95) {
      return [
        "Maintain current operations while monitoring for potential bottlenecks",
        "Consider selective capacity expansion for high-demand products",
        "Optimize maintenance schedules to minimize planned downtime"
      ];
    } else {
      return [
        "Consider capacity expansion to meet high demand",
        "Implement premium pricing strategies to maximize profitability",
        "Review quality control processes to ensure standards are maintained at high production rates"
      ];
    }
  };

  // Copy report to clipboard
  const copyReportToClipboard = async () => {
    try {
      const utilizationData = getUtilizationData();
      const recommendations = getRecommendations(utilizationData.utilizationRate);
      
      const reportText = `CAPACITY UTILIZATION REPORT
      
Date: ${new Date().toLocaleDateString('en-IN')}

ANALYSIS RESULTS:
- Maximum Production Capacity: ${utilizationData.maxCapacity.toLocaleString('en-IN')} units
- Actual Production: ${utilizationData.actualProduction.toLocaleString('en-IN')} units
- Capacity Utilization Rate: ${utilizationData.utilizationRate.toFixed(1)}%
- Unused Capacity: ${(utilizationData.maxCapacity - utilizationData.actualProduction).toLocaleString('en-IN')} units

RECOMMENDATIONS:
• ${recommendations[0]}
• ${recommendations[1]}
• ${recommendations[2]}

Generated by Capacity Compass Calculator Pro
www.capacitycompass.com`;
      
      await navigator.clipboard.writeText(reportText);
      setCopySuccess(true);
      
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
      
      toast({
        title: "Report Copied",
        description: "The report has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy the report to clipboard.",
        variant: "destructive"
      });
    }
  };

  // Calculate initial values
  useEffect(() => {
    calculateUtilization();
  }, []);

  // Chart data
  const { maxCapacity: chartMaxCapacity, actualProduction: chartActualProduction, utilizationRate: chartUtilizationRate } = getUtilizationData();
  const unusedCapacity = chartMaxCapacity - chartActualProduction;
  
  const pieData = [
    { name: 'Utilized Capacity', value: chartActualProduction },
    { name: 'Unused Capacity', value: unusedCapacity }
  ];
  
  const COLORS = ['#245e4f', '#7ac9a7'];
  
  const industryData = [
    { name: 'Your Company', utilization: chartUtilizationRate },
    { name: 'Industry Avg', utilization: 75 },
    { name: 'Top Performers', utilization: 90 },
    { name: 'Low Performers', utilization: 60 },
  ];
  
  const trendData = [
    { month: 'Jan', utilization: chartUtilizationRate - Math.random() * 10 },
    { month: 'Feb', utilization: chartUtilizationRate - Math.random() * 5 },
    { month: 'Mar', utilization: chartUtilizationRate - Math.random() * 2 },
    { month: 'Apr', utilization: chartUtilizationRate },
    { month: 'May', utilization: chartUtilizationRate + Math.random() * 3 },
    { month: 'Jun', utilization: chartUtilizationRate + Math.random() * 5 }
  ];

  return (
    <CalculatorLayout
      title="Capacity Utilization Calculator"
      description="Calculate and analyze your production capacity utilization"
      icon={<Calculator className="h-5 w-5 text-marketing-blue" />}
      activeTab="business"
      activeSubTab="operations"
    >
      <div className="space-y-8 p-6">
        {/* Input Form */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-primary">Capacity Utilization Calculator</h2>
          <p className="text-charcoal">Calculate and analyze your production capacity utilization</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="maxCapacity" className="text-charcoal">
                Maximum Production Capacity (Units)
              </Label>
              <div className="flex items-center">
                <Input 
                  id="maxCapacity" 
                  type="number" 
                  min="0"
                  className="border-secondary focus:border-primary"
                  value={maxCapacity || ''}
                  onChange={(e) => setMaxCapacity(Number(e.target.value))}
                  placeholder="Enter maximum capacity"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="actualProduction" className="text-charcoal">
                Actual Production (Units)
              </Label>
              <div className="flex items-center">
                <Input 
                  id="actualProduction" 
                  type="number"
                  min="0"
                  max={maxCapacity || undefined}
                  className="border-secondary focus:border-primary"
                  value={actualProduction || ''}
                  onChange={(e) => setActualProduction(Number(e.target.value))}
                  placeholder="Enter actual production"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="revenuePerUnit" className="text-charcoal">
                Revenue Per Unit (₹)
              </Label>
              <div className="flex items-center">
                <Input 
                  id="revenuePerUnit" 
                  type="number"
                  min="0"
                  className="border-secondary focus:border-primary"
                  value={revenuePerUnit || ''}
                  onChange={(e) => setRevenuePerUnit(Number(e.target.value))}
                  placeholder="Enter revenue per unit"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              onClick={calculateUtilization}
              className="bg-gold hover:bg-gold/80 text-charcoal"
              disabled={isLoading}
            >
              <Calculator className="mr-2 h-4 w-4" />
              {isLoading ? 'Calculating...' : 'Calculate Utilization'}
            </Button>
            
            <Button 
              onClick={handleReset}
              variant="outline"
              className="border-secondary text-primary hover:bg-secondary/20"
              disabled={isLoading}
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-8 animate-fade-in">
          <Separator className="bg-secondary/50" />
          
          <h3 className="text-xl font-semibold text-primary text-center">Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 bg-primary text-white">
              <div className="flex flex-col items-center">
                <h4 className="text-sm font-medium opacity-80">Capacity Utilization</h4>
                <p className="text-3xl font-bold mt-2">{capacityUtilization}%</p>
                <div className="text-xs mt-1 opacity-70">
                  {capacityUtilization && capacityUtilization < 70 ? "Below Optimal" : 
                   capacityUtilization && capacityUtilization < 90 ? "Optimal Range" : "Near Maximum"}
                </div>
              </div>
            </Card>
            
            <Card className="p-4 bg-secondary text-black">
              <div className="flex flex-col items-center">
                <h4 className="text-sm font-medium opacity-80">Unused Capacity</h4>
                <p className="text-3xl font-bold mt-2">{downtime} Units</p>
                <div className="text-xs mt-1 opacity-70">
                  {capacityUtilization && capacityUtilization < 70 ? "Significant Opportunity" : 
                   capacityUtilization && capacityUtilization < 90 ? "Moderate Buffer" : "Minimal Slack"}
                </div>
              </div>
            </Card>
            
            {potentialRevenue !== null && (
              <Card className="p-4 bg-gold text-charcoal">
                <div className="flex flex-col items-center">
                  <h4 className="text-sm font-medium opacity-80">Lost Revenue Opportunity</h4>
                  <p className="text-3xl font-bold mt-2">{formatCurrency(potentialRevenue)}</p>
                  <div className="text-xs mt-1 opacity-70">
                    {potentialRevenue > 100000 ? "High Impact" : 
                     potentialRevenue > 10000 ? "Medium Impact" : "Low Impact"}
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Charts Section */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-6 bg-cream col-span-1">
                <h3 className="text-lg font-medium text-primary mb-2">Capacity Utilization Rate</h3>
                <div className="text-4xl font-bold text-charcoal">{formatPercentage(capacityUtilization || 0)}</div>
                <div className="mt-1 text-sm flex items-center">
                  <span className="inline-block h-3 w-3 rounded-full mr-2" 
                        style={{ backgroundColor: capacityUtilization && capacityUtilization < 60 ? '#e74c3c' : 
                                                      capacityUtilization && capacityUtilization < 80 ? '#f39c12' : 
                                                      capacityUtilization && capacityUtilization < 95 ? '#27ae60' : '#2980b9' }}>
                  </span>
                  <span className="font-medium">
                    {capacityUtilization && capacityUtilization < 60 ? 'Low' : 
                     capacityUtilization && capacityUtilization < 80 ? 'Moderate' : 
                     capacityUtilization && capacityUtilization < 95 ? 'Optimal' : 'Maximum'}:
                  </span>
                  <span className="ml-1 text-gray-600">
                    {capacityUtilization && capacityUtilization < 60 ? 'Significant unused capacity' : 
                     capacityUtilization && capacityUtilization < 80 ? 'Room for improvement' : 
                     capacityUtilization && capacityUtilization < 95 ? 'Balanced capacity usage' : 'Near full capacity'}
                  </span>
                </div>
              </Card>
              
              <Card className="p-6 col-span-2">
                <h3 className="text-lg font-medium text-primary mb-4">Production Capacity Breakdown</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value} units`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
            
            <Tabs defaultValue="industry" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="industry">Industry Comparison</TabsTrigger>
                <TabsTrigger value="trend">Utilization Trend</TabsTrigger>
              </TabsList>
              <TabsContent value="industry" className="py-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={industryData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                      <Bar dataKey="utilization" name="Utilization Rate (%)" fill="#245e4f" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Compare your capacity utilization to industry benchmarks and see where you stand.
                </p>
              </TabsContent>
              <TabsContent value="trend" className="py-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={trendData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                      <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="utilization"
                        name="Utilization Rate (%)"
                        stroke="#245e4f"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Track how your capacity utilization has changed over the past 6 months.
                </p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Analysis & Recommendations */}
          <div className="bg-primary/5 p-6 rounded-lg">
            <h3 className="font-medium text-primary mb-3">Analysis & Recommendations</h3>
            
            <div className="space-y-3 text-charcoal">
              <p>
                Your current capacity utilization is <span className="font-semibold">{formatPercentage(capacityUtilization || 0)}</span>, which indicates 
                {capacityUtilization && capacityUtilization < 60 ? ' significant room for improvement.' : 
                 capacityUtilization && capacityUtilization < 80 ? ' a moderate utilization level with opportunity for growth.' :
                 capacityUtilization && capacityUtilization < 95 ? ' healthy utilization with some flexibility for unexpected demand.' :
                 ' you are operating near maximum capacity and may need expansion.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h4 className="font-medium text-primary">Potential Actions:</h4>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                    {capacityUtilization && capacityUtilization < 80 ? (
                      <>
                        <li>Consider marketing initiatives to increase demand</li>
                        <li>Evaluate pricing strategies to attract more customers</li>
                        <li>Explore new market segments or product offerings</li>
                      </>
                    ) : (
                      <>
                        <li>Optimize production processes to increase efficiency</li>
                        <li>Consider capacity expansion for future growth</li>
                        <li>Review maintenance schedules to minimize downtime</li>
                      </>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-primary">Business Impact:</h4>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                    <li>Increasing utilization by just 5% could significantly improve profitability</li>
                    <li>Balanced utilization leads to optimal resource allocation</li>
                    <li>Regular monitoring helps identify seasonal trends and adjust accordingly</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
} 