import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartTooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Download, Mail, PieChartIcon, TrendingUp, Users, Calculator, Scale, Percent } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CalculatorLayout } from '@/layouts/CalculatorLayout';

interface CalculatorValues {
  currentShares: number;
  newInvestment: number;
  preMoneyValuation: number;
  employeePool: number;
  optionPool: number;
  round: string;
  investorType: string;
  antiDilution: string;
}

interface DilutionData {
  postMoneyValuation: number;
  pricePerShare: number;
  newShares: number;
  founderOwnership: number;
  investorOwnership: number;
  employeePoolOwnership: number;
  totalDilution: number;
}

interface RoundData {
  round: string;
  preMoney: number;
  postMoney: number;
  dilution: number;
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

const EquityDilutionCalculator: React.FC = (): React.ReactElement => {
  const { toast } = useToast();
  const resultRef = useRef<HTMLDivElement>(null);
  
  const [values, setValues] = useState<CalculatorValues>({
    currentShares: 10000000,
    newInvestment: 50000000,
    preMoneyValuation: 200000000,
    employeePool: 15,
    optionPool: 10,
    round: 'Series A',
    investorType: 'VC',
    antiDilution: 'None'
  });
  
  const [dilutionData, setDilutionData] = useState<DilutionData>({
    postMoneyValuation: 0,
    pricePerShare: 0,
    newShares: 0,
    founderOwnership: 0,
    investorOwnership: 0,
    employeePoolOwnership: 0,
    totalDilution: 0
  });
  
  const [roundData, setRoundData] = useState<RoundData[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    calculateResults();
  }, [values]);
  
  const calculateResults = () => {
    // Calculate post-money valuation
    const postMoneyValuation = values.preMoneyValuation + values.newInvestment;
    
    // Calculate price per share
    const pricePerShare = values.preMoneyValuation / values.currentShares;
    
    // Calculate new shares to be issued
    const newShares = values.newInvestment / pricePerShare;
    
    // Calculate total shares after round
    const totalShares = values.currentShares + newShares;
    
    // Calculate ownership percentages
    const founderOwnership = (values.currentShares / totalShares) * 100;
    const investorOwnership = (newShares / totalShares) * 100;
    const employeePoolOwnership = (values.employeePool / 100) * totalShares / totalShares * 100;
    
    // Calculate total dilution
    const totalDilution = 100 - founderOwnership;
    
    setDilutionData({
      postMoneyValuation,
      pricePerShare,
      newShares,
      founderOwnership,
      investorOwnership,
      employeePoolOwnership,
      totalDilution
    });
    
    // Prepare round data
    const rounds = [
      { round: 'Seed', preMoney: 50000000, postMoney: 100000000, dilution: 50 },
      { round: 'Series A', preMoney: 200000000, postMoney: 250000000, dilution: 20 },
      { round: 'Series B', preMoney: 500000000, postMoney: 600000000, dilution: 16.7 }
    ];
    setRoundData(rounds);
    
    // Prepare chart data
    setChartData([
      { name: 'Founders', value: founderOwnership, fill: '#4F46E5' },
      { name: 'Investors', value: investorOwnership, fill: '#10B981' },
      { name: 'Employee Pool', value: employeePoolOwnership, fill: '#F59E0B' }
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
      pdf.text('Equity Dilution Analysis', 105, 40, { align: 'center' });
      
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
      
      pdf.save('equity-dilution-analysis.pdf');
      
      toast({
        title: "PDF Downloaded Successfully",
        description: "Your equity dilution analysis has been downloaded.",
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
      title="Equity Dilution Calculator"
      description="Calculate and analyze equity dilution scenarios for your startup"
      activeTab="hr-people-ops"
      activeSubTab="equity-dilution"
      icon={<PieChartIcon className="h-6 w-6" />}
    >
      <div className="w-full max-w-6xl mx-auto p-4 animate-fade-in">
        <Card className="calculator-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="currentShares" className="text-sm font-medium mb-1 block flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-finance-green" />
                  Current Shares
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <Input
                          id="currentShares"
                          name="currentShares"
                          type="number"
                          value={values.currentShares}
                          onChange={handleInputChange}
                          className="w-full border-gray-300"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total number of shares currently outstanding</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div>
                <Label htmlFor="newInvestment" className="text-sm font-medium mb-1 block flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-finance-green" />
                  New Investment (₹)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <Input
                          id="newInvestment"
                          name="newInvestment"
                          type="number"
                          value={values.newInvestment}
                          onChange={handleInputChange}
                          className="w-full border-gray-300"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Amount of new investment being raised</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div>
                <Label htmlFor="preMoneyValuation" className="text-sm font-medium mb-1 block flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-finance-green" />
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
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Company valuation before the new investment</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div>
                <Label htmlFor="employeePool" className="text-sm font-medium mb-1 block flex items-center gap-2">
                  <Percent className="h-4 w-4 text-finance-green" />
                  Employee Pool (%)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <Input
                          id="employeePool"
                          name="employeePool"
                          type="number"
                          value={values.employeePool}
                          onChange={handleInputChange}
                          className="w-full border-gray-300"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Percentage of shares reserved for employees</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div>
                <Label htmlFor="optionPool" className="text-sm font-medium mb-1 block flex items-center gap-2">
                  <Percent className="h-4 w-4 text-finance-green" />
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
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Percentage of shares reserved for future options</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div>
                <Label htmlFor="round" className="text-sm font-medium mb-1 block">
                  Funding Round
                </Label>
                <select
                  id="round"
                  name="round"
                  value={values.round}
                  onChange={handleSelectChange}
                  className="w-full border-gray-300 rounded-md p-2"
                >
                  <option value="Seed">Seed</option>
                  <option value="Series A">Series A</option>
                  <option value="Series B">Series B</option>
                  <option value="Series C">Series C</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="investorType" className="text-sm font-medium mb-1 block">
                  Investor Type
                </Label>
                <select
                  id="investorType"
                  name="investorType"
                  value={values.investorType}
                  onChange={handleSelectChange}
                  className="w-full border-gray-300 rounded-md p-2"
                >
                  <option value="VC">Venture Capital</option>
                  <option value="Angel">Angel Investor</option>
                  <option value="Corporate">Corporate Investor</option>
                </select>
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
                  <option value="None">None</option>
                  <option value="Full Ratchet">Full Ratchet</option>
                  <option value="Weighted Average">Weighted Average</option>
                </select>
              </div>
            </div>
            
            <div ref={resultRef} className="mt-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-blue-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-blue-700" />
                      <h3 className="text-lg font-semibold text-blue-800">Post-Money Valuation</h3>
                    </div>
                    <p className="text-3xl font-bold text-blue-700">{formatCurrency(dilutionData.postMoneyValuation)}</p>
                    <p className="text-sm text-blue-600 mt-2">Company valuation after investment</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-purple-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Percent className="h-5 w-5 text-purple-700" />
                      <h3 className="text-lg font-semibold text-purple-800">Total Dilution</h3>
                    </div>
                    <p className="text-3xl font-bold text-purple-700">{formatPercentage(dilutionData.totalDilution)}</p>
                    <p className="text-sm text-purple-600 mt-2">Founder ownership reduction</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Ownership Distribution</h3>
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
                          return [formatPercentage(value), 'Ownership'];
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Funding Round Comparison</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={roundData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="round" />
                      <YAxis />
                      <RechartTooltip 
                        formatter={(value: any) => {
                          return [formatCurrency(value), 'Valuation'];
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="preMoney" stroke="#4F46E5" name="Pre-Money" />
                      <Line type="monotone" dataKey="postMoney" stroke="#10B981" name="Post-Money" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Dilution Analysis Summary</h3>
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
                        <td className="px-6 py-4 whitespace-nowrap">Post-Money Valuation</td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(dilutionData.postMoneyValuation)}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Price Per Share</td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(dilutionData.pricePerShare)}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">New Shares Issued</td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatNumber(dilutionData.newShares)}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Founder Ownership</td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatPercentage(dilutionData.founderOwnership)}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Investor Ownership</td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatPercentage(dilutionData.investorOwnership)}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Employee Pool Ownership</td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatPercentage(dilutionData.employeePoolOwnership)}</td>
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

export default EquityDilutionCalculator; 