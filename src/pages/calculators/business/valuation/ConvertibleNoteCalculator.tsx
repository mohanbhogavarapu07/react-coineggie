import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartTooltip, Legend } from 'recharts';
import { Calculator, Download, Mail, TrendingUp, DollarSign, Percent, Clock } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { CalculatorLayout } from '@/layouts/CalculatorLayout';

interface CalculatorValues {
  investmentAmount: number;
  valuationCap: number;
  discountRate: number;
  interestRate: number;
  maturityDate: string;
  conversionTrigger: number;
}

interface ConversionScenario {
  preMoneyValuation: number;
  conversionPrice: number;
  sharesReceived: number;
  ownershipPercentage: number;
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

const ConvertibleNoteCalculator = () => {
  const { toast } = useToast();
  const resultRef = useRef<HTMLDivElement>(null);
  
  const [values, setValues] = useState<CalculatorValues>({
    investmentAmount: 1000000,
    valuationCap: 5000000,
    discountRate: 20,
    interestRate: 5,
    maturityDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    conversionTrigger: 10000000
  });
  
  const [results, setResults] = useState<{
    principalPlusInterest: number;
    conversionScenarios: ConversionScenario[];
    chartData: any[];
  }>({
    principalPlusInterest: 0,
    conversionScenarios: [],
    chartData: []
  });
  
  useEffect(() => {
    calculateResults();
  }, [values]);
  
  const calculateResults = () => {
    // Calculate principal plus interest
    const years = (new Date(values.maturityDate).getTime() - Date.now()) / (365 * 24 * 60 * 60 * 1000);
    const principalPlusInterest = values.investmentAmount * Math.pow(1 + values.interestRate / 100, years);
    
    // Calculate conversion scenarios
    const scenarios = [
      { preMoneyValuation: values.valuationCap * 0.5 },
      { preMoneyValuation: values.valuationCap },
      { preMoneyValuation: values.valuationCap * 1.5 },
      { preMoneyValuation: values.valuationCap * 2 }
    ].map(scenario => {
      const conversionPrice = Math.min(
        scenario.preMoneyValuation / 1000000, // Assuming 1M shares outstanding
        values.valuationCap / 1000000 * (1 - values.discountRate / 100)
      );
      const sharesReceived = principalPlusInterest / conversionPrice;
      const ownershipPercentage = (sharesReceived / (1000000 + sharesReceived)) * 100;
      
      return {
        preMoneyValuation: scenario.preMoneyValuation,
        conversionPrice,
        sharesReceived,
        ownershipPercentage
      };
    });
    
    // Prepare chart data
    const chartData = scenarios.map(scenario => ({
      valuation: scenario.preMoneyValuation,
      ownership: scenario.ownershipPercentage,
      shares: scenario.sharesReceived
    }));
    
    setResults({
      principalPlusInterest,
      conversionScenarios: scenarios,
      chartData
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: name === 'maturityDate' ? value : parseFloat(value) || 0
    });
  };

  const calculatorContent = (
    <div className="space-y-8">
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
                <p>Total amount invested in the convertible note</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div>
          <Label htmlFor="valuationCap" className="text-sm font-medium mb-1 block">
            Valuation Cap (₹)
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Input
                    id="valuationCap"
                    name="valuationCap"
                    type="number"
                    value={values.valuationCap}
                    onChange={handleInputChange}
                    className="w-full border-gray-300"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Maximum valuation at which the note can convert</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div>
          <Label htmlFor="discountRate" className="text-sm font-medium mb-1 block">
            Discount Rate (%)
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Input
                    id="discountRate"
                    name="discountRate"
                    type="number"
                    value={values.discountRate}
                    onChange={handleInputChange}
                    className="w-full border-gray-300"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Discount applied to the conversion price</p>
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
                <p>Annual interest rate on the convertible note</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div>
          <Label htmlFor="maturityDate" className="text-sm font-medium mb-1 block">
            Maturity Date
          </Label>
          <Input
            id="maturityDate"
            name="maturityDate"
            type="date"
            value={values.maturityDate}
            onChange={handleInputChange}
            className="w-full border-gray-300"
          />
        </div>
        
        <div>
          <Label htmlFor="conversionTrigger" className="text-sm font-medium mb-1 block">
            Conversion Trigger (₹)
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Input
                    id="conversionTrigger"
                    name="conversionTrigger"
                    type="number"
                    value={values.conversionTrigger}
                    onChange={handleInputChange}
                    className="w-full border-gray-300"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Valuation at which automatic conversion occurs</p>
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
                <h3 className="text-lg font-semibold text-green-800">Principal + Interest</h3>
              </div>
              <p className="text-3xl font-bold text-green-700">{formatCurrency(results.principalPlusInterest)}</p>
              <p className="text-sm text-green-600 mt-2">Total amount including interest at maturity</p>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-blue-700" />
                <h3 className="text-lg font-semibold text-blue-800">Time to Maturity</h3>
              </div>
              <p className="text-3xl font-bold text-blue-700">
                {Math.round((new Date(values.maturityDate).getTime() - Date.now()) / (365 * 24 * 60 * 60 * 1000))} years
              </p>
              <p className="text-sm text-blue-600 mt-2">Until note maturity</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Conversion Scenarios</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pre-Money Valuation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shares Received</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ownership %</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.conversionScenarios.map((scenario, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(scenario.preMoneyValuation)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(scenario.conversionPrice)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatNumber(scenario.sharesReceived)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatPercentage(scenario.ownershipPercentage)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Ownership vs. Valuation</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={results.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="valuation" 
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <YAxis 
                  yAxisId="left"
                  tickFormatter={(value) => formatPercentage(value)}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={(value) => formatNumber(value)}
                />
                <RechartTooltip 
                  formatter={(value: any, name: string) => {
                    if (name === 'ownership') {
                      return [formatPercentage(value), 'Ownership %'];
                    }
                    return [formatNumber(value), 'Shares'];
                  }}
                />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="ownership" 
                  stroke="#4F46E5" 
                  name="Ownership %" 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="shares" 
                  stroke="#10B981" 
                  name="Shares" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const aboutContent = (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-amber-800">Understanding Convertible Notes</h3>
      <p className="text-sm text-amber-700">
        Convertible notes are short-term debt instruments that convert into equity during a future financing round.
        They are commonly used in early-stage funding to defer valuation discussions until the company is more mature.
      </p>
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-amber-800">Key Components:</h4>
        <ul className="list-disc pl-5 text-sm text-amber-700">
          <li><strong>Investment Amount:</strong> The principal amount invested in the note</li>
          <li><strong>Valuation Cap:</strong> Maximum valuation at which the note can convert</li>
          <li><strong>Discount Rate:</strong> Percentage discount on the conversion price</li>
          <li><strong>Interest Rate:</strong> Annual interest accrued on the principal</li>
          <li><strong>Maturity Date:</strong> Date when the note must be repaid or converted</li>
          <li><strong>Conversion Trigger:</strong> Valuation that triggers automatic conversion</li>
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="font-medium text-amber-800">Calculation Formulas:</h4>
        <div className="bg-amber-50 p-4 rounded-lg mt-2">
          <p className="text-sm text-amber-700">Principal + Interest = Investment Amount × (1 + Interest Rate)^Years</p>
          <p className="text-sm text-amber-700">Conversion Price = min(Pre-Money Valuation / Shares Outstanding, Valuation Cap × (1 - Discount Rate))</p>
          <p className="text-sm text-amber-700">Shares Received = (Principal + Interest) / Conversion Price</p>
          <p className="text-sm text-amber-700">Ownership % = Shares Received / (Total Shares + Shares Received)</p>
        </div>
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="Convertible Note Calculator"
      description="Calculate conversion scenarios and potential ownership for convertible notes based on different valuation scenarios."
      icon={<DollarSign className="h-6 w-6" />}
      calculatorContent={calculatorContent}
      
      showSeparateAboutSection={true}
      activeTab="business"
      activeSubTab="valuation"
    />
  );
};

export default ConvertibleNoteCalculator; 