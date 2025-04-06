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
  monthlyDeposit: number;
  interestRate: number;
  tenure: number;
  compoundingFrequency: string;
  taxRate: number;
  inflationRate: number;
  bankType: string;
  depositType: string;
}

interface DepositData {
  maturityAmount: number;
  totalDeposits: number;
  totalInterest: number;
  taxAmount: number;
  netAmount: number;
  inflationAdjustedAmount: number;
  effectiveRate: number;
  monthlyData: {
    month: number;
    deposit: number;
    interest: number;
    value: number;
  }[];
}

interface BankData {
  type: string;
  avgRate: number;
  minDeposit: number;
  maxDeposit: number;
  tenureRange: string;
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

const RecurringDepositCalculator: React.FC = () => {
  const { toast } = useToast();
  const resultRef = useRef<HTMLDivElement>(null);
  
  const [values, setValues] = useState<CalculatorValues>({
    monthlyDeposit: 5000,
    interestRate: 7.5,
    tenure: 5,
    compoundingFrequency: 'Quarterly',
    taxRate: 10,
    inflationRate: 6,
    bankType: 'Public',
    depositType: 'Regular'
  });
  
  const [depositData, setDepositData] = useState<DepositData>({
    maturityAmount: 0,
    totalDeposits: 0,
    totalInterest: 0,
    taxAmount: 0,
    netAmount: 0,
    inflationAdjustedAmount: 0,
    effectiveRate: 0,
    monthlyData: []
  });
  
  const [bankData, setBankData] = useState<BankData[]>([
    { type: 'Public', avgRate: 7.5, minDeposit: 100, maxDeposit: 100000, tenureRange: '6 months - 10 years', category: 'Government' },
    { type: 'Private', avgRate: 8.0, minDeposit: 500, maxDeposit: 200000, tenureRange: '6 months - 10 years', category: 'Commercial' },
    { type: 'Small Finance', avgRate: 8.5, minDeposit: 100, maxDeposit: 100000, tenureRange: '6 months - 10 years', category: 'Specialized' },
    { type: 'Cooperative', avgRate: 7.0, minDeposit: 100, maxDeposit: 50000, tenureRange: '6 months - 10 years', category: 'Local' }
  ]);
  
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    calculateResults();
  }, [values]);
  
  const calculateResults = () => {
    const monthlyData = [];
    let totalDeposits = 0;
    let totalInterest = 0;
    let maturityAmount = 0;
    
    // Calculate compounding frequency
    let n = 1;
    switch (values.compoundingFrequency) {
      case 'Monthly':
        n = 12;
        break;
      case 'Quarterly':
        n = 4;
        break;
      case 'Half-Yearly':
        n = 2;
        break;
      case 'Yearly':
        n = 1;
        break;
    }
    
    // Calculate RD maturity amount
    const r = values.interestRate / 100;
    const t = values.tenure;
    const P = values.monthlyDeposit;
    
    // Formula: M = P * (1 + r/n)^(n*t) + P * (1 + r/n)^(n*t - 1) + ... + P
    for (let month = 1; month <= t * 12; month++) {
      const monthsRemaining = t * 12 - month + 1;
      const monthlyMaturity = P * Math.pow(1 + (r / n), (n * monthsRemaining) / 12);
      maturityAmount += monthlyMaturity;
      totalDeposits += P;
      
      const monthlyInterest = monthlyMaturity - P;
      totalInterest += monthlyInterest;
      
      monthlyData.push({
        month,
        deposit: P,
        interest: monthlyInterest,
        value: maturityAmount
      });
    }
    
    // Calculate tax amount
    const taxAmount = totalInterest * (values.taxRate / 100);
    
    // Calculate net amount
    const netAmount = maturityAmount - taxAmount;
    
    // Calculate inflation adjusted amount
    const inflationAdjustedAmount = netAmount / Math.pow(1 + (values.inflationRate / 100), t);
    
    // Calculate effective rate
    const effectiveRate = (Math.pow(netAmount / totalDeposits, 1 / t) - 1) * 100;
    
    setDepositData({
      maturityAmount,
      totalDeposits,
      totalInterest,
      taxAmount,
      netAmount,
      inflationAdjustedAmount,
      effectiveRate,
      monthlyData
    });
    
    // Prepare chart data
    setChartData([
      { name: 'Total Deposits', value: totalDeposits, fill: '#4F46E5' },
      { name: 'Total Interest', value: totalInterest, fill: '#10B981' },
      { name: 'Tax', value: taxAmount, fill: '#F59E0B' }
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
        scale: 2, // Type assertion added
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
      pdf.text('Recurring Deposit Analysis Report', 105, 40, { align: 'center' });
      
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
      
      pdf.save('recurring-deposit-analysis.pdf');
      
      toast({
        title: "PDF Downloaded Successfully",
        description: "Your recurring deposit analysis has been downloaded.",
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
      title="Recurring Deposit Calculator"
      description="Calculate and analyze your recurring deposit investments"
      icon={<Calculator className="h-6 w-6" />}
      activeTab="investment"
      >
    <div className="w-full max-w-6xl mx-auto p-4 animate-fade-in">
      <Card className="calculator-card">
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="monthlyDeposit" className="text-sm font-medium mb-1 block">
                Monthly Deposit (₹)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        id="monthlyDeposit"
                        name="monthlyDeposit"
                        type="number"
                        value={values.monthlyDeposit}
                        onChange={handleInputChange}
                        className="w-full border-gray-300"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Monthly deposit amount</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div>
              <Label htmlFor="interestRate" className="text-sm font-medium mb-1 block">
                Interest Rate (%)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        id="interestRate"
                        name="interestRate"
                        type="number"
                        value={values.interestRate}
                        onChange={handleInputChange}
                        className="w-full border-gray-300"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Annual interest rate</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div>
              <Label htmlFor="tenure" className="text-sm font-medium mb-1 block">
                Tenure (years)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        id="tenure"
                        name="tenure"
                        type="number"
                        value={values.tenure}
                        onChange={handleInputChange}
                        className="w-full border-gray-300"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Duration of deposit in years</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div>
              <Label htmlFor="compoundingFrequency" className="text-sm font-medium mb-1 block">
                Compounding Frequency
              </Label>
              <select
                id="compoundingFrequency"
                name="compoundingFrequency"
                value={values.compoundingFrequency}
                onChange={handleSelectChange}
                className="w-full border-gray-300 rounded-md p-2"
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Half-Yearly">Half-Yearly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="taxRate" className="text-sm font-medium mb-1 block">
                Tax Rate (%)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        id="taxRate"
                        name="taxRate"
                        type="number"
                        value={values.taxRate}
                        onChange={handleInputChange}
                        className="w-full border-gray-300"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Tax rate on interest income</p>
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
              <Label htmlFor="bankType" className="text-sm font-medium mb-1 block">
                Bank Type
              </Label>
              <select
                id="bankType"
                name="bankType"
                value={values.bankType}
                onChange={handleSelectChange}
                className="w-full border-gray-300 rounded-md p-2"
              >
                {bankData.map((bank) => (
                  <option key={bank.type} value={bank.type}>
                    {bank.type}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <Label htmlFor="depositType" className="text-sm font-medium mb-1 block">
                Deposit Type
              </Label>
              <select
                id="depositType"
                name="depositType"
                value={values.depositType}
                onChange={handleSelectChange}
                className="w-full border-gray-300 rounded-md p-2"
              >
                <option value="Regular">Regular</option>
                <option value="Senior Citizen">Senior Citizen</option>
                <option value="Tax Saver">Tax Saver</option>
                <option value="Flexible">Flexible</option>
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
                  <p className="text-3xl font-bold text-blue-700">{formatCurrency(depositData.maturityAmount)}</p>
                  <p className="text-sm text-blue-600 mt-2">Total value at maturity</p>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Percent className="h-5 w-5 text-purple-700" />
                    <h3 className="text-lg font-semibold text-purple-800">Effective Rate</h3>
                  </div>
                  <p className="text-3xl font-bold text-purple-700">{formatPercentage(depositData.effectiveRate)}</p>
                  <p className="text-sm text-purple-600 mt-2">After tax and inflation</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Deposit Breakdown</h3>
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
              <h3 className="text-lg font-semibold">Deposit Growth</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={depositData.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartTooltip 
                      formatter={(value: any) => {
                        return [formatCurrency(value), 'Value'];
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#4F46E5" name="Deposit Value" />
                    <Line type="monotone" dataKey="deposit" stroke="#10B981" name="Monthly Deposit" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Recurring Deposit Analysis Summary</h3>
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
                      <td className="px-6 py-4 whitespace-nowrap">Total Deposits</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(depositData.totalDeposits)}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Total Interest</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(depositData.totalInterest)}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Tax Amount</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(depositData.taxAmount)}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Inflation Adjusted Amount</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(depositData.inflationAdjustedAmount)}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Net Amount</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(depositData.netAmount)}</td>
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

export default RecurringDepositCalculator;