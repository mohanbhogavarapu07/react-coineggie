import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartTooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calculator, Download, Mail, TrendingUp, DollarSign, Percent, Users, PieChart as PieChartIcon, Briefcase, Clock, AlertTriangle, Scale } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CalculatorLayout } from '@/layouts/CalculatorLayout';

interface CalculatorValues {
  investmentAmount: number;
  monthlySIP: number;
  expectedReturn: number;
  investmentPeriod: number;
  inflationRate: number;
  expenseRatio: number;
  fundType: string;
  riskLevel: string;
}

interface InvestmentData {
  totalInvestment: number;
  totalReturns: number;
  maturityAmount: number;
  inflationAdjustedAmount: number;
  expenseAmount: number;
  netAmount: number;
  annualizedReturn: number;
  monthlyData: {
    month: number;
    investment: number;
    returns: number;
    value: number;
  }[];
}

interface FundData {
  type: string;
  avgReturn: number;
  riskLevel: string;
  minInvestment: number;
  expenseRatio: number;
  category: string;
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

const MutualFundsCalculator: React.FC = () => {
  const { toast } = useToast();
  const resultRef = useRef<HTMLDivElement>(null);
  
  const [values, setValues] = useState<CalculatorValues>({
    investmentAmount: 100000,
    monthlySIP: 10000,
    expectedReturn: 12,
    investmentPeriod: 10,
    inflationRate: 6,
    expenseRatio: 1.5,
    fundType: 'Equity',
    riskLevel: 'High'
  });
  
  const [investmentData, setInvestmentData] = useState<InvestmentData>({
    totalInvestment: 0,
    totalReturns: 0,
    maturityAmount: 0,
    inflationAdjustedAmount: 0,
    expenseAmount: 0,
    netAmount: 0,
    annualizedReturn: 0,
    monthlyData: []
  });
  
  const [fundData, setFundData] = useState<FundData[]>([
    { type: 'Equity', avgReturn: 12, riskLevel: 'High', minInvestment: 5000, expenseRatio: 1.5, category: 'Growth' },
    { type: 'Debt', avgReturn: 7, riskLevel: 'Low', minInvestment: 1000, expenseRatio: 0.5, category: 'Income' },
    { type: 'Hybrid', avgReturn: 9, riskLevel: 'Medium', minInvestment: 5000, expenseRatio: 1.0, category: 'Balanced' },
    { type: 'Index', avgReturn: 10, riskLevel: 'Medium', minInvestment: 1000, expenseRatio: 0.2, category: 'Passive' }
  ]);
  
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    calculateResults();
  }, [values]);
  
  const calculateResults = () => {
    const monthlyData = [];
    let totalInvestment = values.investmentAmount;
    let corpus = values.investmentAmount;
    let totalReturns = 0;
    
    for (let month = 1; month <= values.investmentPeriod * 12; month++) {
      // Add monthly SIP
      totalInvestment += values.monthlySIP;
      corpus += values.monthlySIP;
      
      // Calculate monthly returns
      const monthlyReturn = corpus * (values.expectedReturn / 100) / 12;
      totalReturns += monthlyReturn;
      
      // Update corpus
      corpus = corpus + monthlyReturn;
      
      monthlyData.push({
        month,
        investment: totalInvestment,
        returns: monthlyReturn,
        value: corpus
      });
    }
    
    // Calculate expense amount
    const expenseAmount = corpus * (values.expenseRatio / 100) * values.investmentPeriod;
    
    // Calculate net amount
    const netAmount = corpus - expenseAmount;
    
    // Calculate inflation adjusted amount
    const inflationAdjustedAmount = netAmount / Math.pow(1 + (values.inflationRate / 100), values.investmentPeriod);
    
    // Calculate annualized return
    const annualizedReturn = (Math.pow(netAmount / totalInvestment, 1 / values.investmentPeriod) - 1) * 100;
    
    setInvestmentData({
      totalInvestment,
      totalReturns,
      maturityAmount: corpus,
      inflationAdjustedAmount,
      expenseAmount,
      netAmount,
      annualizedReturn,
      monthlyData
    });
    
    // Prepare chart data
    setChartData([
      { name: 'Total Investment', value: totalInvestment, fill: '#4F46E5' },
      { name: 'Total Returns', value: totalReturns, fill: '#10B981' },
      { name: 'Expenses', value: expenseAmount, fill: '#F59E0B' }
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
      
      const canvas = await html2canvas(resultRef.current!, {
        scale: window.devicePixelRatio || 1, // Type assertion added
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff',
      } as any);
      
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
      pdf.text('Mutual Fund Analysis Report', 105, 40, { align: 'center' });
      
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
      
      pdf.save('mutual-fund-analysis.pdf');
      
      toast({
        title: "PDF Downloaded Successfully",
        description: "Your mutual fund analysis has been downloaded.",
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
    <CalculatorLayout title="Mutual Funds Calculator" description="Calculate and analyze your mutual fund investments" icon={<Calculator className="h-6 w-6" />}>
    <div className="w-full max-w-6xl mx-auto p-4 animate-fade-in">
      <Card className="calculator-card">
      
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="investmentAmount" className="text-sm font-medium mb-1 block">
                Initial Investment (₹)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        id="investmentAmount"
                        name="investmentAmount"
                        type="number"
                        value={values.investmentAmount}
                        onChange={handleInputChange}
                        className="w-full border-gray-300"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Initial investment amount</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div>
              <Label htmlFor="monthlySIP" className="text-sm font-medium mb-1 block">
                Monthly SIP (₹)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        id="monthlySIP"
                        name="monthlySIP"
                        type="number"
                        value={values.monthlySIP}
                        onChange={handleInputChange}
                        className="w-full border-gray-300"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Monthly Systematic Investment Plan amount</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div>
              <Label htmlFor="expectedReturn" className="text-sm font-medium mb-1 block">
                Expected Return (%)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        id="expectedReturn"
                        name="expectedReturn"
                        type="number"
                        value={values.expectedReturn}
                        onChange={handleInputChange}
                        className="w-full border-gray-300"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Expected annual return on investment</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div>
              <Label htmlFor="investmentPeriod" className="text-sm font-medium mb-1 block">
                Investment Period (years)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        id="investmentPeriod"
                        name="investmentPeriod"
                        type="number"
                        value={values.investmentPeriod}
                        onChange={handleInputChange}
                        className="w-full border-gray-300"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Duration of investment in years</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div>
              <Label htmlFor="inflationRate" className="text-sm font-medium mb-1 block">
                Inflation Rate (%)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        id="inflationRate"
                        name="inflationRate"
                        type="number"
                        value={values.inflationRate}
                        onChange={handleInputChange}
                        className="w-full border-gray-300"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Expected annual inflation rate</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div>
              <Label htmlFor="expenseRatio" className="text-sm font-medium mb-1 block">
                Expense Ratio (%)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        id="expenseRatio"
                        name="expenseRatio"
                        type="number"
                        value={values.expenseRatio}
                        onChange={handleInputChange}
                        className="w-full border-gray-300"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Annual fund management fee</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div>
              <Label htmlFor="fundType" className="text-sm font-medium mb-1 block">
                Fund Type
              </Label>
              <select
                id="fundType"
                name="fundType"
                value={values.fundType}
                onChange={handleSelectChange}
                className="w-full border-gray-300 rounded-md p-2"
              >
                {fundData.map((fund) => (
                  <option key={fund.type} value={fund.type}>
                    {fund.type}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <Label htmlFor="riskLevel" className="text-sm font-medium mb-1 block">
                Risk Level
              </Label>
              <select
                id="riskLevel"
                name="riskLevel"
                value={values.riskLevel}
                onChange={handleSelectChange}
                className="w-full border-gray-300 rounded-md p-2"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          
          <div ref={resultRef} className="mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-blue-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-blue-700" />
                    <h3 className="text-lg font-semibold text-blue-800">Maturity Amount</h3>
                  </div>
                  <p className="text-3xl font-bold text-blue-700">{formatCurrency(investmentData.maturityAmount)}</p>
                  <p className="text-sm text-blue-600 mt-2">Total value at maturity</p>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Percent className="h-5 w-5 text-purple-700" />
                    <h3 className="text-lg font-semibold text-purple-800">Annualized Return</h3>
                  </div>
                  <p className="text-3xl font-bold text-purple-700">{formatPercentage(investmentData.annualizedReturn)}</p>
                  <p className="text-sm text-purple-600 mt-2">Compounded annual return</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Investment Breakdown</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <RechartTooltip 
                      formatter={(value: any) => {
                        return [formatCurrency(value), 'Value'];
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Investment Growth</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={investmentData.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartTooltip 
                      formatter={(value: any) => {
                        return [formatCurrency(value), 'Value'];
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#4F46E5" name="Investment Value" />
                    <Line type="monotone" dataKey="investment" stroke="#10B981" name="Total Investment" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Mutual Fund Analysis Summary</h3>
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
                      <td className="px-6 py-4 whitespace-nowrap">Total Investment</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(investmentData.totalInvestment)}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Total Returns</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(investmentData.totalReturns)}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Inflation Adjusted Amount</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(investmentData.inflationAdjustedAmount)}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Expense Amount</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(investmentData.expenseAmount)}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Net Amount</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(investmentData.netAmount)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
        
        
      </Card>
    </div>
    </CalculatorLayout>
  );
};

export default MutualFundsCalculator;