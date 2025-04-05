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
  trainingCost: number;
  employeeCount: number;
  averageSalary: number;
  productivityGain: number;
  errorReduction: number;
  employeeRetention: number;
  trainingDuration: number;
  industry: string;
}

interface ROIData {
  totalCost: number;
  productivitySavings: number;
  errorReductionSavings: number;
  retentionSavings: number;
  totalBenefits: number;
  netBenefits: number;
  roi: number;
  paybackPeriod: number;
}

interface IndustryData {
  industry: string;
  avgProductivityGain: number;
  avgErrorReduction: number;
  avgRetention: number;
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

const TrainingROICalculator: React.FC = (): React.ReactElement => {
  const { toast } = useToast();
  const resultRef = useRef<HTMLDivElement>(null);
  
  const [values, setValues] = useState<CalculatorValues>({
    trainingCost: 50000,
    employeeCount: 50,
    averageSalary: 500000,
    productivityGain: 15,
    errorReduction: 20,
    employeeRetention: 10,
    trainingDuration: 3,
    industry: 'Technology'
  });
  
  const [roiData, setRoiData] = useState<ROIData>({
    totalCost: 0,
    productivitySavings: 0,
    errorReductionSavings: 0,
    retentionSavings: 0,
    totalBenefits: 0,
    netBenefits: 0,
    roi: 0,
    paybackPeriod: 0
  });
  
  const [industryData, setIndustryData] = useState<IndustryData[]>([
    { industry: 'Technology', avgProductivityGain: 20, avgErrorReduction: 25, avgRetention: 15 },
    { industry: 'Finance', avgProductivityGain: 15, avgErrorReduction: 30, avgRetention: 12 },
    { industry: 'Healthcare', avgProductivityGain: 18, avgErrorReduction: 35, avgRetention: 20 },
    { industry: 'Retail', avgProductivityGain: 12, avgErrorReduction: 15, avgRetention: 8 }
  ]);
  
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    calculateResults();
  }, [values]);
  
  const calculateResults = () => {
    // Calculate total training cost
    const totalCost = values.trainingCost * values.employeeCount;
    
    // Calculate productivity savings
    const productivitySavings = (values.averageSalary * (values.productivityGain / 100)) * values.employeeCount;
    
    // Calculate error reduction savings (assuming errors cost 10% of salary)
    const errorCost = values.averageSalary * 0.1;
    const errorReductionSavings = (errorCost * (values.errorReduction / 100)) * values.employeeCount;
    
    // Calculate retention savings (assuming replacement cost is 50% of salary)
    const replacementCost = values.averageSalary * 0.5;
    const retentionSavings = (replacementCost * (values.employeeRetention / 100)) * values.employeeCount;
    
    // Calculate total benefits
    const totalBenefits = productivitySavings + errorReductionSavings + retentionSavings;
    
    // Calculate net benefits
    const netBenefits = totalBenefits - totalCost;
    
    // Calculate ROI
    const roi = (netBenefits / totalCost) * 100;
    
    // Calculate payback period in months
    const paybackPeriod = (totalCost / (totalBenefits / 12));
    
    setRoiData({
      totalCost,
      productivitySavings,
      errorReductionSavings,
      retentionSavings,
      totalBenefits,
      netBenefits,
      roi,
      paybackPeriod
    });
    
    // Prepare chart data
    setChartData([
      { name: 'Productivity', value: productivitySavings, fill: '#4F46E5' },
      { name: 'Error Reduction', value: errorReductionSavings, fill: '#10B981' },
      { name: 'Retention', value: retentionSavings, fill: '#F59E0B' }
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
      pdf.text('Training ROI Analysis', 105, 40, { align: 'center' });
      
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
      
      pdf.save('training-roi-analysis.pdf');
      
      toast({
        title: "PDF Downloaded Successfully",
        description: "Your training ROI analysis has been downloaded.",
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
      title="Training ROI Calculator"
      description="Calculate and analyze the return on investment for your training programs"
      activeTab="hr-people-ops"
      activeSubTab="training-roi"
      icon={<Calculator className="h-6 w-6" />}
    >
      <div className="w-full max-w-6xl mx-auto p-4 animate-fade-in">
        <Card className="calculator-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="trainingCost" className="text-sm font-medium mb-1 block">
                  Training Cost per Employee (₹)
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
                      <p>Cost of training per employee</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div>
                <Label htmlFor="employeeCount" className="text-sm font-medium mb-1 block">
                  Number of Employees
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <Input
                          id="employeeCount"
                          name="employeeCount"
                          type="number"
                          value={values.employeeCount}
                          onChange={handleInputChange}
                          className="w-full border-gray-300"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Number of employees receiving training</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div>
                <Label htmlFor="averageSalary" className="text-sm font-medium mb-1 block">
                  Average Annual Salary (₹)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <Input
                          id="averageSalary"
                          name="averageSalary"
                          type="number"
                          value={values.averageSalary}
                          onChange={handleInputChange}
                          className="w-full border-gray-300"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Average annual salary of trained employees</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div>
                <Label htmlFor="productivityGain" className="text-sm font-medium mb-1 block">
                  Productivity Gain (%)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <Input
                          id="productivityGain"
                          name="productivityGain"
                          type="number"
                          value={values.productivityGain}
                          onChange={handleInputChange}
                          className="w-full border-gray-300"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Expected increase in productivity</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div>
                <Label htmlFor="errorReduction" className="text-sm font-medium mb-1 block">
                  Error Reduction (%)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <Input
                          id="errorReduction"
                          name="errorReduction"
                          type="number"
                          value={values.errorReduction}
                          onChange={handleInputChange}
                          className="w-full border-gray-300"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Expected reduction in errors</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div>
                <Label htmlFor="employeeRetention" className="text-sm font-medium mb-1 block">
                  Employee Retention (%)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <Input
                          id="employeeRetention"
                          name="employeeRetention"
                          type="number"
                          value={values.employeeRetention}
                          onChange={handleInputChange}
                          className="w-full border-gray-300"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Expected improvement in employee retention</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div>
                <Label htmlFor="trainingDuration" className="text-sm font-medium mb-1 block">
                  Training Duration (months)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <Input
                          id="trainingDuration"
                          name="trainingDuration"
                          type="number"
                          value={values.trainingDuration}
                          onChange={handleInputChange}
                          className="w-full border-gray-300"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Duration of the training program</p>
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
                  {industryData.map((industry) => (
                    <option key={industry.industry} value={industry.industry}>
                      {industry.industry}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div ref={resultRef} className="mt-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-blue-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-blue-700" />
                      <h3 className="text-lg font-semibold text-blue-800">ROI</h3>
                    </div>
                    <p className="text-3xl font-bold text-blue-700">{formatPercentage(roiData.roi)}</p>
                    <p className="text-sm text-blue-600 mt-2">Return on investment</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-purple-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-purple-700" />
                      <h3 className="text-lg font-semibold text-purple-800">Payback Period</h3>
                    </div>
                    <p className="text-3xl font-bold text-purple-700">{roiData.paybackPeriod.toFixed(1)} months</p>
                    <p className="text-sm text-purple-600 mt-2">Time to recover investment</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Benefits Breakdown</h3>
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
                <h3 className="text-lg font-semibold">Industry Comparison</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={industryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="industry" />
                      <YAxis />
                      <RechartTooltip />
                      <Legend />
                      <Bar dataKey="avgProductivityGain" fill="#4F46E5" name="Productivity Gain" />
                      <Bar dataKey="avgErrorReduction" fill="#10B981" name="Error Reduction" />
                      <Bar dataKey="avgRetention" fill="#F59E0B" name="Retention" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-finance-green" />
                  ROI Analysis Summary
                </h3>
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
                        <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                          <Calculator className="h-4 w-4 text-finance-green" />
                          Total Training Cost
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(roiData.totalCost)}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-finance-green" />
                          Productivity Savings
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(roiData.productivitySavings)}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-finance-green" />
                          Error Reduction Savings
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(roiData.errorReductionSavings)}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                          <Users className="h-4 w-4 text-finance-green" />
                          Retention Savings
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(roiData.retentionSavings)}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                          <PieChartIcon className="h-4 w-4 text-finance-green" />
                          Total Benefits
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(roiData.totalBenefits)}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                          <Scale className="h-4 w-4 text-finance-green" />
                          Net Benefits
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(roiData.netBenefits)}</td>
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

export default TrainingROICalculator; 