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
  initialInvestment: number;
  monthlyWithdrawal: number;
  expectedReturn: number;
  withdrawalPeriod: number;
  inflationRate: number;
  taxRate: number;
  withdrawalFrequency: string;
  withdrawalType: string;
}

interface WithdrawalData {
  totalWithdrawals: number;
  remainingCorpus: number;
  totalReturns: number;
  inflationAdjustedCorpus: number;
  taxAmount: number;
  netAmount: number;
  monthlyData: {
    month: number;
    withdrawal: number;
    returns: number;
    corpus: number;
  }[];
}

interface AssetData {
  type: string;
  avgReturn: number;
  riskLevel: string;
  minInvestment: number;
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

const SwpCalculator: React.FC = () => {
  const { toast } = useToast();
  const resultRef = useRef<HTMLDivElement>(null);
  
  const [values, setValues] = useState<CalculatorValues>({
    initialInvestment: 1000000,
    monthlyWithdrawal: 10000,
    expectedReturn: 12,
    withdrawalPeriod: 10,
    inflationRate: 6,
    taxRate: 10,
    withdrawalFrequency: 'Monthly',
    withdrawalType: 'Fixed'
  });
  
  const [withdrawalData, setWithdrawalData] = useState<WithdrawalData>({
    totalWithdrawals: 0,
    remainingCorpus: 0,
    totalReturns: 0,
    inflationAdjustedCorpus: 0,
    taxAmount: 0,
    netAmount: 0,
    monthlyData: []
  });
  
  const [assetData, setAssetData] = useState<AssetData[]>([
    { type: 'Equity', avgReturn: 12, riskLevel: 'High', minInvestment: 5000 },
    { type: 'Debt', avgReturn: 7, riskLevel: 'Low', minInvestment: 1000 },
    { type: 'Hybrid', avgReturn: 9, riskLevel: 'Medium', minInvestment: 5000 },
    { type: 'Liquid', avgReturn: 5, riskLevel: 'Low', minInvestment: 1000 }
  ]);
  
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    calculateResults();
  }, [values]);
  
  const calculateResults = () => {
    const monthlyData = [];
    let corpus = values.initialInvestment;
    let totalWithdrawals = 0;
    let totalReturns = 0;
    
    for (let month = 1; month <= values.withdrawalPeriod * 12; month++) {
      // Calculate monthly returns
      const monthlyReturn = corpus * (values.expectedReturn / 100) / 12;
      totalReturns += monthlyReturn;
      
      // Calculate withdrawal amount
      let withdrawal = values.monthlyWithdrawal;
      if (values.withdrawalType === 'Inflation Adjusted') {
        withdrawal = values.monthlyWithdrawal * Math.pow(1 + (values.inflationRate / 100), (month - 1) / 12);
      }
      
      // Update corpus
      corpus = corpus + monthlyReturn - withdrawal;
      totalWithdrawals += withdrawal;
      
      monthlyData.push({
        month,
        withdrawal,
        returns: monthlyReturn,
        corpus
      });
    }
    
    // Calculate tax amount
    const taxAmount = totalReturns * (values.taxRate / 100);
    
    // Calculate net amount
    const netAmount = corpus - taxAmount;
    
    // Calculate inflation adjusted corpus
    const inflationAdjustedCorpus = corpus / Math.pow(1 + (values.inflationRate / 100), values.withdrawalPeriod);
    
    setWithdrawalData({
      totalWithdrawals,
      remainingCorpus: corpus,
      totalReturns,
      inflationAdjustedCorpus,
      taxAmount,
      netAmount,
      monthlyData
    });
    
    // Prepare chart data
    setChartData([
      { name: 'Initial Investment', value: values.initialInvestment, fill: '#4F46E5' },
      { name: 'Total Withdrawals', value: totalWithdrawals, fill: '#10B981' },
      { name: 'Remaining Corpus', value: corpus, fill: '#F59E0B' }
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
        width: resultRef.current.offsetWidth * 2,
        height: resultRef.current.offsetHeight * 2,
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
      pdf.text('SWP Analysis Report', 105, 40, { align: 'center' });
      
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
      
      pdf.save('swp-analysis.pdf');
      
      toast({
        title: "PDF Downloaded Successfully",
        description: "Your SWP analysis has been downloaded.",
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

  const calculatorContent = (
    <div className="w-full max-w-6xl mx-auto p-4 animate-fade-in">
      <Card className="calculator-card">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="initialInvestment" className="text-sm font-medium mb-1 block">
                Initial Investment (₹)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        id="initialInvestment"
                        name="initialInvestment"
                        type="number"
                        value={values.initialInvestment}
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
              <Label htmlFor="monthlyWithdrawal" className="text-sm font-medium mb-1 block">
                Monthly Withdrawal (₹)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        id="monthlyWithdrawal"
                        name="monthlyWithdrawal"
                        type="number"
                        value={values.monthlyWithdrawal}
                        onChange={handleInputChange}
                        className="w-full border-gray-300"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Amount to withdraw monthly</p>
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
              <Label htmlFor="withdrawalPeriod" className="text-sm font-medium mb-1 block">
                Withdrawal Period (years)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        id="withdrawalPeriod"
                        name="withdrawalPeriod"
                        type="number"
                        value={values.withdrawalPeriod}
                        onChange={handleInputChange}
                        className="w-full border-gray-300"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Duration of withdrawal in years</p>
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
                    <p>Tax rate on investment returns</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div>
              <Label htmlFor="withdrawalType" className="text-sm font-medium mb-1 block">
                Withdrawal Type
              </Label>
              <select
                id="withdrawalType"
                name="withdrawalType"
                value={values.withdrawalType}
                onChange={handleSelectChange}
                className="w-full border-gray-300 rounded-md p-2"
              >
                <option value="Fixed">Fixed Amount</option>
                <option value="Inflation Adjusted">Inflation Adjusted</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="withdrawalFrequency" className="text-sm font-medium mb-1 block">
                Withdrawal Frequency
              </Label>
              <select
                id="withdrawalFrequency"
                name="withdrawalFrequency"
                value={values.withdrawalFrequency}
                onChange={handleSelectChange}
                className="w-full border-gray-300 rounded-md p-2"
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Annual">Annual</option>
              </select>
            </div>
          </div>
          
          <div ref={resultRef} className="mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-blue-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-blue-700" />
                    <h3 className="text-lg font-semibold text-blue-800">Remaining Corpus</h3>
                  </div>
                  <p className="text-3xl font-bold text-blue-700">{formatCurrency(withdrawalData.remainingCorpus)}</p>
                  <p className="text-sm text-blue-600 mt-2">Value after withdrawals</p>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-purple-700" />
                    <h3 className="text-lg font-semibold text-purple-800">Total Withdrawals</h3>
                  </div>
                  <p className="text-3xl font-bold text-purple-700">{formatCurrency(withdrawalData.totalWithdrawals)}</p>
                  <p className="text-sm text-purple-600 mt-2">Total amount withdrawn</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Corpus Breakdown</h3>
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
              <h3 className="text-lg font-semibold">Corpus Growth</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={withdrawalData.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartTooltip 
                      formatter={(value: any) => {
                        return [formatCurrency(value), 'Value'];
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="corpus" stroke="#4F46E5" name="Corpus Value" />
                    <Line type="monotone" dataKey="withdrawal" stroke="#10B981" name="Withdrawal" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">SWP Analysis Summary</h3>
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
                      <td className="px-6 py-4 whitespace-nowrap">Initial Investment</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(values.initialInvestment)}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Total Withdrawals</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(withdrawalData.totalWithdrawals)}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Remaining Corpus</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(withdrawalData.remainingCorpus)}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Inflation Adjusted Corpus</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(withdrawalData.inflationAdjustedCorpus)}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Tax Amount</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(withdrawalData.taxAmount)}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Net Amount</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(withdrawalData.netAmount)}</td>
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
  );

  return (
    <CalculatorLayout
      title="SWP Calculator"
      description="Calculate returns on your Systematic Withdrawal Plan"
      icon={<DollarSign className="h-6 w-6" />}
      calculatorContent={calculatorContent}
      activeTab="investment"
      
    />
  );
};

export default SwpCalculator; 