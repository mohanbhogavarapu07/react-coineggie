import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartTooltip, Legend, AreaChart, Area } from 'recharts';
import { Calculator, Download, Mail, TrendingUp, Users, DollarSign, Percent } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { CalculatorLayout } from '@/layouts/CalculatorLayout';

interface CalculatorValues {
  monthlyRecurringRevenue: number;
  annualGrowthRate: number;
  churnRate: number;
  customerCount: number;
  averageContractValue: number;
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

const ARRCalculator = () => {
  const { toast } = useToast();
  const resultRef = useRef<HTMLDivElement>(null);
  
  const [values, setValues] = useState<CalculatorValues>({
    monthlyRecurringRevenue: 100000,
    annualGrowthRate: 20,
    churnRate: 5,
    customerCount: 100,
    averageContractValue: 1000
  });
  
  const [arr, setARR] = useState<number>(0);
  const [projectedARR, setProjectedARR] = useState<number[]>([]);
  const [customerProjection, setCustomerProjection] = useState<number[]>([]);
  const [projectionData, setProjectionData] = useState<any[]>([]);
  
  useEffect(() => {
    calculateResults();
  }, [values]);
  
  const calculateResults = () => {
    // Calculate current ARR
    const currentARR = values.monthlyRecurringRevenue * 12;
    setARR(currentARR);
    
    // Calculate 5-year projections
    const years = 5;
    const arrProjection = [];
    const customerProjection = [];
    const projectionData = [];
    
    let currentARRValue = currentARR;
    let currentCustomers = values.customerCount;
    
    for (let i = 0; i < years; i++) {
      // Calculate new customers based on growth rate
      const newCustomers = Math.round(currentCustomers * (values.annualGrowthRate / 100));
      // Calculate churned customers
      const churnedCustomers = Math.round(currentCustomers * (values.churnRate / 100));
      // Update customer count
      currentCustomers = currentCustomers + newCustomers - churnedCustomers;
      
      // Calculate new ARR
      const newARR = newCustomers * values.averageContractValue * 12;
      const churnedARR = churnedCustomers * values.averageContractValue * 12;
      currentARRValue = currentARRValue + newARR - churnedARR;
      
      arrProjection.push(currentARRValue);
      customerProjection.push(currentCustomers);
      
      projectionData.push({
        year: `Year ${i + 1}`,
        arr: currentARRValue,
        customers: currentCustomers,
        newCustomers,
        churnedCustomers
      });
    }
    
    setProjectedARR(arrProjection);
    setCustomerProjection(customerProjection);
    setProjectionData(projectionData);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: parseFloat(value) || 0
    });
  };

  const calculatorContent = (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="monthlyRecurringRevenue" className="text-sm font-medium mb-1 block">
            Monthly Recurring Revenue (₹)
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Input
                    id="monthlyRecurringRevenue"
                    name="monthlyRecurringRevenue"
                    type="number"
                    value={values.monthlyRecurringRevenue}
                    onChange={handleInputChange}
                    className="w-full border-gray-300"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Total monthly recurring revenue from all customers</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div>
          <Label htmlFor="annualGrowthRate" className="text-sm font-medium mb-1 block">
            Annual Growth Rate (%)
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Input
                    id="annualGrowthRate"
                    name="annualGrowthRate"
                    type="number"
                    value={values.annualGrowthRate}
                    onChange={handleInputChange}
                    className="w-full border-gray-300"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Expected annual growth rate of your customer base</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div>
          <Label htmlFor="churnRate" className="text-sm font-medium mb-1 block">
            Churn Rate (%)
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Input
                    id="churnRate"
                    name="churnRate"
                    type="number"
                    value={values.churnRate}
                    onChange={handleInputChange}
                    className="w-full border-gray-300"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Percentage of customers who cancel their subscription annually</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div>
          <Label htmlFor="customerCount" className="text-sm font-medium mb-1 block">
            Current Customer Count
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Input
                  id="customerCount"
                  name="customerCount"
                  type="number"
                  value={values.customerCount}
                  onChange={handleInputChange}
                  className="w-full border-gray-300"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Total number of active customers</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div>
          <Label htmlFor="averageContractValue" className="text-sm font-medium mb-1 block">
            Average Contract Value (₹)
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Input
                    id="averageContractValue"
                    name="averageContractValue"
                    type="number"
                    value={values.averageContractValue}
                    onChange={handleInputChange}
                    className="w-full border-gray-300"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Average annual contract value per customer</p>
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
                <h3 className="text-lg font-semibold text-green-800">Current ARR</h3>
              </div>
              <p className="text-3xl font-bold text-green-700">{formatCurrency(arr)}</p>
              <p className="text-sm text-green-600 mt-2">Annual Recurring Revenue</p>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-blue-700" />
                <h3 className="text-lg font-semibold text-blue-800">Customer Count</h3>
              </div>
              <p className="text-3xl font-bold text-blue-700">{formatNumber(values.customerCount)}</p>
              <p className="text-sm text-blue-600 mt-2">Active Customers</p>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-purple-700" />
                <h3 className="text-lg font-semibold text-purple-800">Growth Rate</h3>
              </div>
              <p className="text-3xl font-bold text-purple-700">{values.annualGrowthRate}%</p>
              <p className="text-sm text-purple-600 mt-2">Annual Growth</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">5-Year ARR Projection</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <RechartTooltip 
                  formatter={(value: any) => {
                    return [formatCurrency(value), 'ARR'];
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="arr" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.3} name="ARR" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Customer Growth Projection</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <RechartTooltip />
                <Legend />
                <Line type="monotone" dataKey="customers" stroke="#4F46E5" name="Total Customers" />
                <Line type="monotone" dataKey="newCustomers" stroke="#10B981" name="New Customers" />
                <Line type="monotone" dataKey="churnedCustomers" stroke="#EF4444" name="Churned Customers" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const aboutContent = (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-amber-800">Understanding Annual Recurring Revenue (ARR)</h3>
      <p className="text-sm text-amber-700">
        ARR is a key metric for subscription-based businesses that measures the annualized value of recurring revenue from customers.
        It helps businesses understand their predictable revenue stream and growth trajectory.
      </p>
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-amber-800">Key Components:</h4>
        <ul className="list-disc pl-5 text-sm text-amber-700">
          <li><strong>Monthly Recurring Revenue (MRR):</strong> Total revenue from all active subscriptions</li>
          <li><strong>Annual Growth Rate:</strong> Expected percentage increase in customer base</li>
          <li><strong>Churn Rate:</strong> Percentage of customers who cancel their subscriptions</li>
          <li><strong>Customer Count:</strong> Total number of active customers</li>
          <li><strong>Average Contract Value:</strong> Average annual revenue per customer</li>
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="font-medium text-amber-800">Calculation Formulas:</h4>
        <div className="bg-amber-50 p-4 rounded-lg mt-2">
          <p className="text-sm text-amber-700">ARR = MRR × 12</p>
          <p className="text-sm text-amber-700">Projected ARR = Current ARR + (New Customers × ACV) - (Churned Customers × ACV)</p>
          <p className="text-sm text-amber-700">Customer Growth = Current Customers × (1 + Growth Rate) - (Current Customers × Churn Rate)</p>
        </div>
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="Annual Recurring Revenue Calculator"
      description="Calculate and project your annual recurring revenue based on current metrics and growth assumptions."
      icon={<DollarSign className="h-6 w-6" />}
      calculatorContent={calculatorContent}
      aboutContent={aboutContent}
      showSeparateAboutSection={true}
      activeTab="business"
      activeSubTab="valuation"
    />
  );
};

export default ARRCalculator; 