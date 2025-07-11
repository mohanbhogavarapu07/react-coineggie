import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartTooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calculator, TrendingUp, DollarSign, Percent, Users, PieChart as PieChartIcon, Briefcase, Clock, AlertTriangle, Scale } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CalculatorLayout } from '@/layouts/CalculatorLayout';

interface CalculatorValues {
  maleSalary: number;
  femaleSalary: number;
  maleEmployees: number;
  femaleEmployees: number;
  industry: string;
  companySize: string;
  experienceLevel: string;
  role: string;
  location: string;
}

interface PayGapData {
  groupASalary: number;
  groupBSalary: number;
  groupACount: number;
  groupBCount: number;
  payGap: number;
  adjustedGap: number;
  industryAverage: number;
}

interface BenchmarkData {
  industry: string;
  companySize: string;
  payGap: number;
  adjustedGap: number;
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

const DiversityPayGapCalculator: React.FC = () => {
  const { toast } = useToast();
  const resultRef = useRef<HTMLDivElement>(null);
  
  const [values, setValues] = useState<CalculatorValues>({
    maleSalary: 1200000,
    femaleSalary: 1000000,
    maleEmployees: 60,
    femaleEmployees: 40,
    industry: 'Technology',
    companySize: 'Large',
    experienceLevel: 'Mid',
    role: 'Software Engineer',
    location: 'Metro'
  });
  
  const [payGapData, setPayGapData] = useState<PayGapData>({
    groupASalary: 1000000,
    groupBSalary: 800000,
    groupACount: 50,
    groupBCount: 50,
    payGap: 0,
    adjustedGap: 0,
    industryAverage: 0
  });
  
  const [benchmarkData, setBenchmarkData] = useState<BenchmarkData[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    calculateResults();
  }, [values]);
  
  const calculateResults = () => {
    // Mock calculation logic
    const payGap = ((values.maleSalary - values.femaleSalary) / values.maleSalary) * 100;
    const adjustedGap = payGap * 0.8; // Example adjustment
    const industryAverage = 15; // Example industry average
    
    setPayGapData({
      ...payGapData,
      payGap,
      adjustedGap,
      industryAverage
    });
    
    setChartData([
      { name: 'Male', value: values.maleSalary },
      { name: 'Female', value: values.femaleSalary }
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

  return (
    <CalculatorLayout
      title="Diversity Pay Gap Calculator"
      description="Analyze and compare pay gaps across different groups"
      activeTab="business"
      activeSubTab="hr"
      icon={<Scale className="h-6 w-6" />}
    >
      <div className="w-full max-w-6xl mx-auto p-4 animate-fade-in">
        <Card className="calculator-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="groupASalary" className="text-sm font-medium mb-1 block">
                  Group A Average Salary (₹)
                </Label>
                <Input
                  id="groupASalary"
                  name="groupASalary"
                  type="number"
                  value={values.maleSalary}
                  onChange={handleInputChange}
                  className="w-full border-gray-300"
                />
              </div>
              
              <div>
                <Label htmlFor="groupBSalary" className="text-sm font-medium mb-1 block">
                  Group B Average Salary (₹)
                </Label>
                <Input
                  id="groupBSalary"
                  name="groupBSalary"
                  type="number"
                  value={values.femaleSalary}
                  onChange={handleInputChange}
                  className="w-full border-gray-300"
                />
              </div>
              
              <div>
                <Label htmlFor="groupACount" className="text-sm font-medium mb-1 block">
                  Group A Employee Count
                </Label>
                <Input
                  id="groupACount"
                  name="groupACount"
                  type="number"
                  value={values.maleEmployees}
                  onChange={handleInputChange}
                  className="w-full border-gray-300"
                />
              </div>
              
              <div>
                <Label htmlFor="groupBCount" className="text-sm font-medium mb-1 block">
                  Group B Employee Count
                </Label>
                <Input
                  id="groupBCount"
                  name="groupBCount"
                  type="number"
                  value={values.femaleEmployees}
                  onChange={handleInputChange}
                  className="w-full border-gray-300"
                />
              </div>
            </div>
            
            <div ref={resultRef} className="mt-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-red-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-700" />
                      <h3 className="text-lg font-semibold text-red-800">Pay Gap</h3>
                    </div>
                    <p className="text-3xl font-bold text-red-700">{payGapData.payGap.toFixed(1)}%</p>
                    <p className="text-sm text-red-600 mt-2">Raw pay gap between groups</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-blue-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Scale className="h-5 w-5 text-blue-700" />
                      <h3 className="text-lg font-semibold text-blue-800">Adjusted Gap</h3>
                    </div>
                    <p className="text-3xl font-bold text-blue-700">{payGapData.adjustedGap.toFixed(1)}%</p>
                    <p className="text-sm text-blue-600 mt-2">Gap adjusted for factors</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-purple-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-purple-700" />
                      <h3 className="text-lg font-semibold text-purple-800">Industry Average</h3>
                    </div>
                    <p className="text-3xl font-bold text-purple-700">{payGapData.industryAverage}%</p>
                    <p className="text-sm text-purple-600 mt-2">Industry benchmark</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-finance-green" />
                  Salary Comparison
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartTooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#4F46E5" name="Salary" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default DiversityPayGapCalculator;