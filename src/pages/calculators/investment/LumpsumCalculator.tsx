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
  expectedReturn: number;
  investmentPeriod: number;
  inflationRate: number;
  taxRate: number;
  investmentType: string;
  frequency: string;
}

interface InvestmentData {
  totalInvestment: number;
  totalReturns: number;
  maturityAmount: number;
  inflationAdjustedAmount: number;
  taxAmount: number;
  netAmount: number;
  annualizedReturn: number;
  monthlyReturns: { month: number; value: number; }[];
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

const LumpsumCalculator: React.FC = () => {
  const { toast } = useToast();
  const resultRef = useRef<HTMLDivElement>(null);
  
  const [values, setValues] = useState<CalculatorValues>({
    investmentAmount: 1000000,
    expectedReturn: 12,
    investmentPeriod: 10,
    inflationRate: 6,
    taxRate: 10,
    investmentType: 'Equity',
    frequency: 'Annual'
  });
  
  const [investmentData, setInvestmentData] = useState<InvestmentData>({
    totalInvestment: 0,
    totalReturns: 0,
    maturityAmount: 0,
    inflationAdjustedAmount: 0,
    taxAmount: 0,
    netAmount: 0,
    annualizedReturn: 0,
    monthlyReturns: []
  });
  
  const [assetData, setAssetData] = useState<AssetData[]>([
    { type: 'Equity', avgReturn: 12, riskLevel: 'High', minInvestment: 5000 },
    { type: 'Debt', avgReturn: 7, riskLevel: 'Low', minInvestment: 1000 },
    { type: 'Gold', avgReturn: 8, riskLevel: 'Medium', minInvestment: 1000 },
    { type: 'Real Estate', avgReturn: 10, riskLevel: 'Medium', minInvestment: 1000000 }
  ]);
  
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    calculateResults();
  }, [values]);
  
  const calculateResults = () => {
    // Calculate total investment
    const totalInvestment = values.investmentAmount;
    
    // Calculate maturity amount
    const maturityAmount = totalInvestment * Math.pow(1 + (values.expectedReturn / 100), values.investmentPeriod);
    
    // Calculate total returns
    const totalReturns = maturityAmount - totalInvestment;
    
    // Calculate inflation adjusted amount
    const inflationAdjustedAmount = maturityAmount / Math.pow(1 + (values.inflationRate / 100), values.investmentPeriod);
    
    // Calculate tax amount
    const taxAmount = totalReturns * (values.taxRate / 100);
    
    // Calculate net amount
    const netAmount = maturityAmount - taxAmount;
    
    // Calculate annualized return
    const annualizedReturn = (Math.pow(maturityAmount / totalInvestment, 1 / values.investmentPeriod) - 1) * 100;
    
    // Calculate monthly returns
    const monthlyReturns = Array.from({ length: values.investmentPeriod * 12 }, (_, i) => {
      const month = i + 1;
      return {
        month,
        value: totalInvestment * Math.pow(1 + (values.expectedReturn / 100), month / 12)
      };
    });
    
    setInvestmentData({
      totalInvestment,
      totalReturns,
      maturityAmount,
      inflationAdjustedAmount,
      taxAmount,
      netAmount,
      annualizedReturn,
      monthlyReturns
    });
    
    // Prepare chart data
    setChartData([
      { name: 'Investment', value: totalInvestment, fill: '#4F46E5' },
      { name: 'Returns', value: totalReturns, fill: '#10B981' },
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
      pdf.text('Lumpsum Investment Analysis', 105, 40, { align: 'center' });
      
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
      
      pdf.save('lumpsum-investment-analysis.pdf');
      
      toast({
        title: "PDF Downloaded Successfully",
        description: "Your lumpsum investment analysis has been downloaded.",
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
              <Label htmlFor="investmentAmount" className="text-sm font-medium mb-1 block">
                Investment Amount (₹)
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
              <Label htmlFor="investmentType" className="text-sm font-medium mb-1 block">
                Investment Type
              </Label>
              <select
                id="investmentType"
                name="investmentType"
                value={values.investmentType}
                onChange={handleSelectChange}
                className="w-full border-gray-300 rounded-md p-2"
              >
                {assetData.map((asset) => (
                  <option key={asset.type} value={asset.type}>
                    {asset.type}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <Label htmlFor="frequency" className="text-sm font-medium mb-1 block">
                Return Frequency
              </Label>
              <select
                id="frequency"
                name="frequency"
                value={values.frequency}
                onChange={handleSelectChange}
                className="w-full border-gray-300 rounded-md p-2"
              >
                <option value="Annual">Annual</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
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
                  <LineChart data={investmentData.monthlyReturns}>
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
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Investment Analysis Summary</h3>
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
                      <td className="px-6 py-4 whitespace-nowrap">Tax Amount</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(investmentData.taxAmount)}</td>
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
      title="Lumpsum Calculator"
      description="Calculate returns on your one-time investments"
      icon={<DollarSign className="h-6 w-6" />}
      calculatorContent={calculatorContent}
      activeTab="investment"
      
    />
  );
};

export default LumpsumCalculator; 