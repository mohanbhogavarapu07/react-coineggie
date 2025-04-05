import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartTooltip, Legend, LineChart, Line } from 'recharts';
import { Calculator, Download, Mail, TrendingUp, DollarSign, Percent, Users, PieChart, Briefcase, Clock, AlertTriangle, Scale } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CalculatorLayout } from '@/layouts/CalculatorLayout';

interface CalculatorValues {
  annualSalary: number;
  turnoverRate: number;
  employees: number;
  recruitmentCost: number;
  trainingCost: number;
  onboardingTime: number;
  productivityLoss: number;
  industry: string;
  companySize: string;
}

interface TurnoverData {
  directCosts: number;
  indirectCosts: number;
  totalCost: number;
  costPerEmployee: number;
  annualImpact: number;
  industryBenchmark: number;
}

interface BenchmarkData {
  industry: string;
  companySize: string;
  turnoverRate: number;
  costPerEmployee: number;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(value);
};

const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
};

const EmployeeTurnoverCostCalculator: React.FC = () => {
  const { toast } = useToast();
  const resultRef = useRef<HTMLDivElement>(null);
  
  const [values, setValues] = useState<CalculatorValues>({
    annualSalary: 1000000,
    turnoverRate: 15,
    employees: 100,
    recruitmentCost: 50000,
    trainingCost: 75000,
    onboardingTime: 3,
    productivityLoss: 25,
    industry: 'Technology',
    companySize: 'Large'
  });
  
  const [turnoverData, setTurnoverData] = useState<TurnoverData>({
    directCosts: 0,
    indirectCosts: 0,
    totalCost: 0,
    costPerEmployee: 0,
    annualImpact: 0,
    industryBenchmark: 0
  });
  
  const [benchmarkData, setBenchmarkData] = useState<BenchmarkData[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    calculateResults();
  }, [values]);
  
  const calculateResults = () => {
    // Calculate direct costs
    const directCosts = values.recruitmentCost + values.trainingCost;
    
    // Calculate indirect costs (productivity loss)
    const monthlySalary = values.annualSalary / 12;
    const productivityLossCost = (monthlySalary * values.productivityLoss / 100) * values.onboardingTime;
    
    // Calculate total cost per employee
    const costPerEmployee = directCosts + productivityLossCost;
    
    // Calculate annual impact
    const employeesLeaving = Math.round(values.employees * values.turnoverRate / 100);
    const annualImpact = costPerEmployee * employeesLeaving;
    
    // Simulated industry benchmarks
    const industryBenchmarks = {
      'Technology': {
        'Small': { turnoverRate: 20, costPerEmployee: 150000 },
        'Medium': { turnoverRate: 18, costPerEmployee: 175000 },
        'Large': { turnoverRate: 15, costPerEmployee: 200000 }
      },
      'Finance': {
        'Small': { turnoverRate: 18, costPerEmployee: 180000 },
        'Medium': { turnoverRate: 16, costPerEmployee: 200000 },
        'Large': { turnoverRate: 14, costPerEmployee: 220000 }
      }
    };
    
    const benchmark = industryBenchmarks[values.industry]?.[values.companySize] || { turnoverRate: 15, costPerEmployee: 150000 };
    
    setTurnoverData({
      directCosts,
      indirectCosts: productivityLossCost,
      totalCost: costPerEmployee,
      costPerEmployee,
      annualImpact,
      industryBenchmark: benchmark.costPerEmployee
    });
    
    // Prepare benchmark data
    const benchmarks = [
      { industry: 'Technology', companySize: 'Small', turnoverRate: 20, costPerEmployee: 150000 },
      { industry: 'Technology', companySize: 'Medium', turnoverRate: 18, costPerEmployee: 175000 },
      { industry: 'Technology', companySize: 'Large', turnoverRate: 15, costPerEmployee: 200000 },
      { industry: 'Finance', companySize: 'Small', turnoverRate: 18, costPerEmployee: 180000 },
      { industry: 'Finance', companySize: 'Medium', turnoverRate: 16, costPerEmployee: 200000 },
      { industry: 'Finance', companySize: 'Large', turnoverRate: 14, costPerEmployee: 220000 }
    ];
    setBenchmarkData(benchmarks);
    
    // Prepare chart data
    setChartData([
      { name: 'Direct Costs', value: directCosts, fill: '#4F46E5' },
      { name: 'Indirect Costs', value: productivityLossCost, fill: '#10B981' },
      { name: 'Industry Benchmark', value: benchmark.costPerEmployee, fill: '#F59E0B' }
    ]);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: parseFloat(value) || 0
    });
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };
  
  const generatePDF = async () => {
    if (!resultRef.current) return;
    
    try {
      toast({
        title: "Preparing your PDF...",
        description: "Please wait while we generate your report.",
      });
      
      const canvas = await html2canvas(resultRef.current, {
        width: resultRef.current.scrollWidth * 2,
        height: resultRef.current.scrollHeight * 2,
        logging: false,
        useCORS: true,
        background: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Add branded header
      pdf.setFillColor(36, 94, 79); // dark green
      pdf.rect(0, 0, 210, 25, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.text('Retail Insights Visualizer', 105, 15, { align: 'center' });
      
      // Add report title
      pdf.setTextColor(36, 94, 79);
      pdf.setFontSize(20);
      pdf.text('Employee Turnover Cost Analysis', 105, 40, { align: 'center' });
      
      // Add date
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, 105, 50, { align: 'center' });
      
      // Add image of results
      const imgWidth = 180;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 15, 60, imgWidth, imgHeight);
      
      // Add footer
      pdf.setFillColor(36, 94, 79);
      pdf.rect(0, 282, 210, 15, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(10);
      pdf.text('© 2023 Retail Insights Visualizer | www.retailinsights.com', 105, 290, { align: 'center' });
      
      pdf.save('turnover-cost-analysis.pdf');
      
      toast({
        title: "PDF Downloaded Successfully",
        description: "Your turnover cost analysis has been downloaded.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "There was an error generating your PDF. Please try again.",
      });
    }
  };
  
  const sendEmail = () => {
    toast({
      title: "Email Feature",
      description: "This would integrate with your email service to send the report. For now, please use the download option.",
    });
  };

  return (
    <CalculatorLayout
      title="Employee Turnover Cost Calculator"
      description="Calculate and analyze the costs associated with employee turnover"
      activeTab="hr-people-ops"
      activeSubTab="employee-turnover"
      icon={<Users className="h-6 w-6" />}
    >
      <div className="w-full max-w-6xl mx-auto p-4 animate-fade-in">
        <Card className="calculator-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="annualSalary" className="text-sm font-medium mb-1 block flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-finance-green" />
                  Average Annual Salary (₹)
                </Label>
                <Input
                  id="annualSalary"
                  name="annualSalary"
                  type="number"
                  value={values.annualSalary}
                  onChange={handleInputChange}
                  className="w-full border-gray-300"
                />
              </div>
              
              <div>
                <Label htmlFor="turnoverRate" className="text-sm font-medium mb-1 block flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-finance-green" />
                  Annual Turnover Rate (%)
                </Label>
                <Input
                  id="turnoverRate"
                  name="turnoverRate"
                  type="number"
                  value={values.turnoverRate}
                  onChange={handleInputChange}
                  className="w-full border-gray-300"
                />
              </div>
              
              <div>
                <Label htmlFor="employees" className="text-sm font-medium mb-1 block flex items-center gap-2">
                  <Users className="h-4 w-4 text-finance-green" />
                  Number of Employees
                </Label>
                <Input
                  id="employees"
                  name="employees"
                  type="number"
                  value={values.employees}
                  onChange={handleInputChange}
                  className="w-full border-gray-300"
                />
              </div>
              
              <div>
                <Label htmlFor="recruitmentCost" className="text-sm font-medium mb-1 block">
                  Recruitment Cost (₹)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <Input
                          id="recruitmentCost"
                          name="recruitmentCost"
                          type="number"
                          value={values.recruitmentCost}
                          onChange={handleInputChange}
                          className="w-full border-gray-300"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Cost to recruit a new employee</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div>
                <Label htmlFor="trainingCost" className="text-sm font-medium mb-1 block">
                  Training Cost (₹)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <Input
                          id="trainingCost"
                          name="trainingCost"
                          type="number"
                          value={values.trainingCost}
                          onChange={handleInputChange}
                          className="w-full border-gray-300"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Cost to train a new employee</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div>
                <Label htmlFor="onboardingTime" className="text-sm font-medium mb-1 block">
                  Onboarding Time (months)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <Input
                          id="onboardingTime"
                          name="onboardingTime"
                          type="number"
                          value={values.onboardingTime}
                          onChange={handleInputChange}
                          className="w-full border-gray-300"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">months</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Time taken for a new employee to become fully productive</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div>
                <Label htmlFor="productivityLoss" className="text-sm font-medium mb-1 block">
                  Productivity Loss (%)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <Input
                          id="productivityLoss"
                          name="productivityLoss"
                          type="number"
                          value={values.productivityLoss}
                          onChange={handleInputChange}
                          className="w-full border-gray-300"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Percentage of productivity lost during onboarding</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div>
                <Label htmlFor="industry" className="text-sm font-medium mb-1 block">
                  Industry
                </Label>
                <select
                  id="industry"
                  name="industry"
                  value={values.industry}
                  onChange={handleSelectChange}
                  className="w-full border-gray-300 rounded-md p-2"
                >
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Retail">Retail</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="companySize" className="text-sm font-medium mb-1 block">
                  Company Size
                </Label>
                <select
                  id="companySize"
                  name="companySize"
                  value={values.companySize}
                  onChange={handleSelectChange}
                  className="w-full border-gray-300 rounded-md p-2"
                >
                  <option value="Small">Small (1-50)</option>
                  <option value="Medium">Medium (51-500)</option>
                  <option value="Large">Large (500+)</option>
                </select>
              </div>
            </div>
            
            <div ref={resultRef} className="mt-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-red-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-red-700" />
                      <h3 className="text-lg font-semibold text-red-800">Total Turnover Cost</h3>
                    </div>
                    <p className="text-3xl font-bold text-red-700">{formatCurrency(turnoverData.totalCost)}</p>
                    <p className="text-sm text-red-600 mt-2">Annual cost of employee turnover</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-purple-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Scale className="h-5 w-5 text-purple-700" />
                      <h3 className="text-lg font-semibold text-purple-800">Cost per Employee</h3>
                    </div>
                    <p className="text-3xl font-bold text-purple-700">{formatCurrency(turnoverData.costPerEmployee)}</p>
                    <p className="text-sm text-purple-600 mt-2">Average cost per employee</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Cost Breakdown</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartTooltip 
                        formatter={(value: any) => {
                          return [formatCurrency(value), 'Cost'];
                        }}
                      />
                      <Legend />
                      <Bar dataKey="value" fill="#4F46E5" name="Cost" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Industry Benchmarks</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={benchmarkData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="companySize" />
                      <YAxis />
                      <RechartTooltip 
                        formatter={(value: any) => {
                          return [formatCurrency(value), 'Cost'];
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="costPerEmployee" stroke="#4F46E5" name="Cost Per Employee" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Turnover Analysis Summary</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Direct Costs</td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(turnoverData.directCosts)}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Indirect Costs</td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(turnoverData.indirectCosts)}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Total Cost Per Employee</td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(turnoverData.totalCost)}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Annual Impact</td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(turnoverData.annualImpact)}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Industry Benchmark</td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(turnoverData.industryBenchmark)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="p-6 bg-gray-50 rounded-b-xl">
            <div className="flex gap-4">
              <Button onClick={generatePDF} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
              <Button onClick={sendEmail} variant="outline" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Report
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default EmployeeTurnoverCostCalculator; 