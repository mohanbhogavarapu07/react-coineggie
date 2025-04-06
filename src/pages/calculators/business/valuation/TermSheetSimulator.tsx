import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartTooltip, Legend } from 'recharts';
import { Calculator, Download, Mail, TrendingUp, DollarSign, Percent, Users, PieChart } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CalculatorLayout } from '@/layouts/CalculatorLayout';
import { useNavigate } from 'react-router-dom';

interface CalculatorValues {
  preMoneyValuation: number;
  investmentAmount: number;
  optionPool: number;
  liquidationPreference: number;
  participation: boolean;
  antiDilution: string;
  boardSeats: number;
  votingThreshold: number;
}

interface CapTable {
  founders: number;
  investors: number;
  optionPool: number;
  postMoney: number;
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

const TermSheetSimulator: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const resultRef = useRef<HTMLDivElement>(null);
  
  const [values, setValues] = useState<CalculatorValues>({
    preMoneyValuation: 10000000,
    investmentAmount: 2000000,
    optionPool: 15,
    liquidationPreference: 1,
    participation: true,
    antiDilution: 'full-ratchet',
    boardSeats: 1,
    votingThreshold: 75
  });
  
  const [capTable, setCapTable] = useState<CapTable>({
    founders: 0,
    investors: 0,
    optionPool: 0,
    postMoney: 0
  });
  
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    calculateResults();
  }, [values]);
  
  const calculateResults = () => {
    const postMoneyValuation = values.preMoneyValuation + values.investmentAmount;
    const investorOwnership = (values.investmentAmount / postMoneyValuation) * 100;
    const optionPoolShares = (values.optionPool / 100) * postMoneyValuation;
    const foundersOwnership = 100 - investorOwnership - values.optionPool;
    
    setCapTable({
      founders: foundersOwnership,
      investors: investorOwnership,
      optionPool: values.optionPool,
      postMoney: postMoneyValuation
    });
    
    // Prepare chart data
    setChartData([
      { name: 'Founders', value: foundersOwnership, fill: '#4F46E5' },
      { name: 'Investors', value: investorOwnership, fill: '#10B981' },
      { name: 'Option Pool', value: values.optionPool, fill: '#F59E0B' }
    ]);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : parseFloat(value) || 0
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
      pdf.text('Term Sheet Analysis', 105, 40, { align: 'center' });
      
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
      
      pdf.save('term-sheet-analysis.pdf');
      
      toast({
        title: "PDF Downloaded Successfully",
        description: "Your term sheet analysis has been downloaded.",
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

  const handleUseCalculator = () => {
    navigate('/calculators/term-sheet');
  };

  const calculatorContent = (
    <div className="w-full max-w-6xl mx-auto p-4 animate-fade-in">
      <Card className="calculator-card">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="preMoneyValuation" className="text-sm font-medium mb-1 block">
                Pre-Money Valuation (₹)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        id="preMoneyValuation"
                        name="preMoneyValuation"
                        type="number"
                        value={values.preMoneyValuation}
                        onChange={handleInputChange}
                        className="w-full border-gray-300"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Company valuation before investment</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
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
                    <p>Amount being invested in this round</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div>
              <Label htmlFor="optionPool" className="text-sm font-medium mb-1 block">
                Option Pool (%)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        id="optionPool"
                        name="optionPool"
                        type="number"
                        value={values.optionPool}
                        onChange={handleInputChange}
                        className="w-full border-gray-300"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Percentage of shares reserved for employee stock options</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div>
              <Label htmlFor="liquidationPreference" className="text-sm font-medium mb-1 block">
                Liquidation Preference (x)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        id="liquidationPreference"
                        name="liquidationPreference"
                        type="number"
                        value={values.liquidationPreference}
                        onChange={handleInputChange}
                        className="w-full border-gray-300"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">x</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Multiple of investment amount investors get first in liquidation</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div>
              <Label htmlFor="participation" className="text-sm font-medium mb-1 block">
                Participation
              </Label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="participation"
                  name="participation"
                  checked={values.participation}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary border-gray-300 rounded"
                />
                <Label htmlFor="participation" className="ml-2">
                  Participating Preferred
                </Label>
              </div>
            </div>
            
            <div>
              <Label htmlFor="antiDilution" className="text-sm font-medium mb-1 block">
                Anti-Dilution Protection
              </Label>
              <select
                id="antiDilution"
                name="antiDilution"
                value={values.antiDilution}
                onChange={handleSelectChange}
                className="w-full border-gray-300 rounded-md p-2"
              >
                <option value="none">None</option>
                <option value="full-ratchet">Full Ratchet</option>
                <option value="weighted-average">Weighted Average</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="boardSeats" className="text-sm font-medium mb-1 block">
                Board Seats
              </Label>
              <Input
                id="boardSeats"
                name="boardSeats"
                type="number"
                value={values.boardSeats}
                onChange={handleInputChange}
                className="w-full border-gray-300"
              />
            </div>
            
            <div>
              <Label htmlFor="votingThreshold" className="text-sm font-medium mb-1 block">
                Voting Threshold (%)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Input
                        id="votingThreshold"
                        name="votingThreshold"
                        type="number"
                        value={values.votingThreshold}
                        onChange={handleInputChange}
                        className="w-full border-gray-300"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Percentage required for major decisions</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <div ref={resultRef} className="mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-green-700" />
                    <h3 className="text-lg font-semibold text-green-800">Post-Money Valuation</h3>
                  </div>
                  <p className="text-3xl font-bold text-green-700">{formatCurrency(capTable.postMoney)}</p>
                  <p className="text-sm text-green-600 mt-2">Total company valuation after investment</p>
                </CardContent>
              </Card>
              
              <Card className="bg-blue-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-blue-700" />
                    <h3 className="text-lg font-semibold text-blue-800">Investor Ownership</h3>
                  </div>
                  <p className="text-3xl font-bold text-blue-700">{formatPercentage(capTable.investors)}</p>
                  <p className="text-sm text-blue-600 mt-2">Percentage of company owned by investors</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Cap Table Distribution</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartTooltip 
                      formatter={(value: any) => {
                        return [formatPercentage(value), 'Ownership'];
                      }}
                    />
                    <Legend />
                    <Bar dataKey="value" fill="#4F46E5" name="Ownership %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Term Sheet Summary</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Term</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Pre-Money Valuation</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(values.preMoneyValuation)}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Investment Amount</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(values.investmentAmount)}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Liquidation Preference</td>
                      <td className="px-6 py-4 whitespace-nowrap">{values.liquidationPreference}x</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Participation</td>
                      <td className="px-6 py-4 whitespace-nowrap">{values.participation ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Anti-Dilution</td>
                      <td className="px-6 py-4 whitespace-nowrap">{values.antiDilution.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Board Seats</td>
                      <td className="px-6 py-4 whitespace-nowrap">{values.boardSeats}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Voting Threshold</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatPercentage(values.votingThreshold)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
        
        
      </Card>
    </div>
  );

  const aboutContent = (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-amber-800">Understanding Term Sheets</h3>
      <p className="text-sm text-amber-700">
        A term sheet is a non-binding agreement that outlines the basic terms and conditions under which an investment will be made.
        It serves as a template to develop more detailed legal documents.
      </p>
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-amber-800">Key Components:</h4>
        <ul className="list-disc pl-5 text-sm text-amber-700">
          <li><strong>Pre-Money Valuation:</strong> Company's value before investment</li>
          <li><strong>Investment Amount:</strong> Capital being invested in the round</li>
          <li><strong>Option Pool:</strong> Shares reserved for employee stock options</li>
          <li><strong>Liquidation Preference:</strong> Priority in payout during exit</li>
          <li><strong>Anti-Dilution Protection:</strong> Protection against future down rounds</li>
          <li><strong>Board Seats:</strong> Investor representation on the board</li>
          <li><strong>Voting Threshold:</strong> Required approval for major decisions</li>
        </ul>
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="Term Sheet Simulator"
      description="Simulate and analyze term sheet scenarios for your funding round"
      icon={<Calculator className="h-6 w-6" />}
      calculatorContent={calculatorContent}
      
      showSeparateAboutSection={true}
      activeTab="business"
      activeSubTab="valuation"
    />
  );
};

export default TermSheetSimulator; 