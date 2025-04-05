import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartTooltip, Legend } from 'recharts';
import { Calculator, Download, Mail, TrendingUp, DollarSign, Percent, BarChart2 } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { CalculatorLayout } from '@/layouts/CalculatorLayout';

interface CalculatorValues {
  revenue: number;
  ebitda: number;
  netIncome: number;
  industry: string;
  growthRate: number;
}

interface IndustryMultiples {
  [key: string]: {
    revenue: number;
    ebitda: number;
    earnings: number;
  };
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

const industryMultiples: IndustryMultiples = {
  'SaaS': { revenue: 8, ebitda: 20, earnings: 25 },
  'E-commerce': { revenue: 2, ebitda: 12, earnings: 15 },
  'FinTech': { revenue: 6, ebitda: 18, earnings: 22 },
  'Healthcare': { revenue: 4, ebitda: 15, earnings: 18 },
  'Manufacturing': { revenue: 1.5, ebitda: 8, earnings: 10 },
  'Retail': { revenue: 1, ebitda: 6, earnings: 8 },
};

const ValuationMultiplesCalculator = () => {
  const { toast } = useToast();
  const resultRef = useRef<HTMLDivElement>(null);
  
  const [values, setValues] = useState<CalculatorValues>({
    revenue: 10000000,
    ebitda: 2000000,
    netIncome: 1500000,
    industry: 'SaaS',
    growthRate: 30
  });
  
  const [valuation, setValuation] = useState<{
    revenueBased: number;
    ebitdaBased: number;
    earningsBased: number;
  }>({
    revenueBased: 0,
    ebitdaBased: 0,
    earningsBased: 0
  });
  
  const [comparisonData, setComparisonData] = useState<any[]>([]);
  
  useEffect(() => {
    calculateResults();
  }, [values]);
  
  const calculateResults = () => {
    const multiples = industryMultiples[values.industry];
    
    // Calculate valuations
    const revenueBased = values.revenue * multiples.revenue;
    const ebitdaBased = values.ebitda * multiples.ebitda;
    const earningsBased = values.netIncome * multiples.earnings;
    
    setValuation({
      revenueBased,
      ebitdaBased,
      earningsBased
    });
    
    // Prepare comparison data
    const data = Object.entries(industryMultiples).map(([industry, mults]) => ({
      industry,
      revenue: values.revenue * mults.revenue,
      ebitda: values.ebitda * mults.ebitda,
      earnings: values.netIncome * mults.earnings
    }));
    
    setComparisonData(data);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: parseFloat(value) || 0
    });
  };
  
  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValues({
      ...values,
      industry: e.target.value
    });
  };

  const calculatorContent = (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="revenue" className="text-sm font-medium mb-1 block">
            Annual Revenue (₹)
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Input
                    id="revenue"
                    name="revenue"
                    type="number"
                    value={values.revenue}
                    onChange={handleInputChange}
                    className="w-full border-gray-300"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Total annual revenue</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div>
          <Label htmlFor="ebitda" className="text-sm font-medium mb-1 block">
            EBITDA (₹)
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Input
                    id="ebitda"
                    name="ebitda"
                    type="number"
                    value={values.ebitda}
                    onChange={handleInputChange}
                    className="w-full border-gray-300"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Earnings Before Interest, Taxes, Depreciation, and Amortization</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div>
          <Label htmlFor="netIncome" className="text-sm font-medium mb-1 block">
            Net Income (₹)
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Input
                    id="netIncome"
                    name="netIncome"
                    type="number"
                    value={values.netIncome}
                    onChange={handleInputChange}
                    className="w-full border-gray-300"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Net profit after all expenses and taxes</p>
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
            onChange={handleIndustryChange}
            className="w-full border-gray-300 rounded-md p-2"
          >
            {Object.keys(industryMultiples).map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <Label htmlFor="growthRate" className="text-sm font-medium mb-1 block">
            Growth Rate (%)
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Input
                    id="growthRate"
                    name="growthRate"
                    type="number"
                    value={values.growthRate}
                    onChange={handleInputChange}
                    className="w-full border-gray-300"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Expected annual growth rate</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div ref={resultRef} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-green-700" />
                <h3 className="text-lg font-semibold text-green-800">Revenue-Based</h3>
              </div>
              <p className="text-3xl font-bold text-green-700">{formatCurrency(valuation.revenueBased)}</p>
              <p className="text-sm text-green-600 mt-2">Based on {industryMultiples[values.industry].revenue}x multiple</p>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <BarChart2 className="h-5 w-5 text-blue-700" />
                <h3 className="text-lg font-semibold text-blue-800">EBITDA-Based</h3>
              </div>
              <p className="text-3xl font-bold text-blue-700">{formatCurrency(valuation.ebitdaBased)}</p>
              <p className="text-sm text-blue-600 mt-2">Based on {industryMultiples[values.industry].ebitda}x multiple</p>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-purple-700" />
                <h3 className="text-lg font-semibold text-purple-800">Earnings-Based</h3>
              </div>
              <p className="text-3xl font-bold text-purple-700">{formatCurrency(valuation.earningsBased)}</p>
              <p className="text-sm text-purple-600 mt-2">Based on {industryMultiples[values.industry].earnings}x multiple</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Industry Comparison</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="industry" />
                <YAxis />
                <RechartTooltip 
                  formatter={(value: any) => {
                    return [formatCurrency(value), 'Valuation'];
                  }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#4F46E5" name="Revenue-Based" />
                <Bar dataKey="ebitda" fill="#10B981" name="EBITDA-Based" />
                <Bar dataKey="earnings" fill="#F59E0B" name="Earnings-Based" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const aboutContent = (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-amber-800">Understanding Valuation Multiples</h3>
      <p className="text-sm text-amber-700">
        Valuation multiples are ratios used to determine a company's value by comparing it to similar companies in the same industry.
        They provide a quick way to estimate a company's worth based on its financial metrics.
      </p>
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-amber-800">Key Multiples:</h4>
        <ul className="list-disc pl-5 text-sm text-amber-700">
          <li><strong>Revenue Multiple:</strong> Company value based on annual revenue</li>
          <li><strong>EBITDA Multiple:</strong> Company value based on earnings before interest, taxes, depreciation, and amortization</li>
          <li><strong>Earnings Multiple:</strong> Company value based on net income</li>
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="font-medium text-amber-800">Calculation Formulas:</h4>
        <div className="bg-amber-50 p-4 rounded-lg mt-2">
          <p className="text-sm text-amber-700">Revenue-Based Valuation = Annual Revenue × Industry Revenue Multiple</p>
          <p className="text-sm text-amber-700">EBITDA-Based Valuation = EBITDA × Industry EBITDA Multiple</p>
          <p className="text-sm text-amber-700">Earnings-Based Valuation = Net Income × Industry Earnings Multiple</p>
        </div>
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="Valuation Multiples Calculator"
      description="Calculate your company's valuation using industry-standard multiples based on revenue, EBITDA, and earnings."
      icon={<BarChart2 className="h-6 w-6" />}
      calculatorContent={calculatorContent}
      aboutContent={aboutContent}
      showSeparateAboutSection={true}
      activeTab="business"
      activeSubTab="valuation"
    />
  );
};

export default ValuationMultiplesCalculator;