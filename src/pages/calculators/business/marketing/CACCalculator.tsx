import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RefreshCw, DollarSign, Users, TrendingUp, Percent, Calculator, Target } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { CalculatorLayout } from '@/layouts/CalculatorLayout';

interface CACData {
  month: number;
  marketingSpend: number;
  salesSpend: number;
  newCustomers: number;
  cac: number;
  ltv: number;
  ltvCacRatio: number;
}

const CACCalculator = () => {
  const [marketingSpend, setMarketingSpend] = useState(500000);
  const [salesSpend, setSalesSpend] = useState(300000);
  const [newCustomers, setNewCustomers] = useState(100);
  const [customerLifetimeValue, setCustomerLifetimeValue] = useState(15000);
  const [result, setResult] = useState({
    cac: 0,
    ltvCacRatio: 0,
    totalSpend: 0,
    totalCustomers: 0,
    averageCAC: 0,
  });
  const [chartData, setChartData] = useState<CACData[]>([]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const calculateCAC = () => {
    // Calculate CAC
    const totalSpend = marketingSpend + salesSpend;
    const cac = totalSpend / newCustomers;
    const ltvCacRatio = customerLifetimeValue / cac;
    
    // Generate chart data for 12 months
    const data: CACData[] = [];
    let currentCustomers = newCustomers;
    let totalCustomers = 0;
    let totalMarketingSpend = 0;
    let totalSalesSpend = 0;
    
    for (let month = 1; month <= 12; month++) {
      const monthMarketingSpend = marketingSpend;
      const monthSalesSpend = salesSpend;
      const monthCustomers = currentCustomers;
      const monthCAC = (monthMarketingSpend + monthSalesSpend) / monthCustomers;
      const monthLTV = customerLifetimeValue;
      const monthLTVCACRatio = monthLTV / monthCAC;
      
      data.push({
        month,
        marketingSpend: monthMarketingSpend,
        salesSpend: monthSalesSpend,
        newCustomers: monthCustomers,
        cac: monthCAC,
        ltv: monthLTV,
        ltvCacRatio: monthLTVCACRatio,
      });
      
      currentCustomers = Math.floor(currentCustomers * 1.1); // 10% growth
      totalCustomers += monthCustomers;
      totalMarketingSpend += monthMarketingSpend;
      totalSalesSpend += monthSalesSpend;
    }

    const averageCAC = (totalMarketingSpend + totalSalesSpend) / totalCustomers;

    setResult({
      cac,
      ltvCacRatio,
      totalSpend,
      totalCustomers,
      averageCAC,
    });

    setChartData(data);
  };

  useEffect(() => {
    calculateCAC();
  }, [marketingSpend, salesSpend, newCustomers, customerLifetimeValue]);

  const handleReset = () => {
    setMarketingSpend(500000);
    setSalesSpend(300000);
    setNewCustomers(100);
    setCustomerLifetimeValue(15000);
  };

  const calculatorContent = (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Marketing Spend</label>
              <span className="text-sm font-bold">{formatCurrency(marketingSpend)}</span>
            </div>
            <Slider 
              value={[marketingSpend]} 
              min={0} 
              max={2000000} 
              step={50000}
              onValueChange={(value) => setMarketingSpend(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={marketingSpend}
              onChange={(e) => setMarketingSpend(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Sales Spend</label>
              <span className="text-sm font-bold">{formatCurrency(salesSpend)}</span>
            </div>
            <Slider 
              value={[salesSpend]} 
              min={0} 
              max={1000000} 
              step={25000}
              onValueChange={(value) => setSalesSpend(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={salesSpend}
              onChange={(e) => setSalesSpend(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">New Customers</label>
              <span className="text-sm font-bold">{newCustomers}</span>
            </div>
            <Slider 
              value={[newCustomers]} 
              min={1} 
              max={1000} 
              step={10}
              onValueChange={(value) => setNewCustomers(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={newCustomers}
              onChange={(e) => setNewCustomers(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Customer Lifetime Value</label>
              <span className="text-sm font-bold">{formatCurrency(customerLifetimeValue)}</span>
            </div>
            <Slider 
              value={[customerLifetimeValue]} 
              min={0} 
              max={50000} 
              step={1000}
              onValueChange={(value) => setCustomerLifetimeValue(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={customerLifetimeValue}
              onChange={(e) => setCustomerLifetimeValue(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <Button onClick={handleReset} variant="outline" className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset Values
          </Button>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Customer Acquisition Cost</div>
                <div className="text-2xl font-bold text-purple-600">
                  {formatCurrency(result.cac)}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">LTV/CAC Ratio</div>
                  <div className="text-lg font-bold text-green-600">
                    {result.ltvCacRatio.toFixed(2)}x
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Average CAC</div>
                  <div className="text-lg font-bold text-blue-600">
                    {formatCurrency(result.averageCAC)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="rounded-md border p-4 h-64">
            <h3 className="text-sm font-medium mb-2">CAC & LTV Analysis</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis 
                  dataKey="month" 
                  label={{ value: 'Months', position: 'insideBottom', offset: -5 }} 
                />
                <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="cac" 
                  name="CAC" 
                  stroke="#7ac9a7" 
                  strokeWidth={3}
                  dot={{ r: 0 }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="ltv" 
                  name="LTV" 
                  stroke="#e9c46a" 
                  strokeWidth={3}
                  dot={{ r: 0 }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="ltvCacRatio" 
                  name="LTV/CAC Ratio" 
                  stroke="#245e4f" 
                  strokeWidth={2}
                  dot={{ r: 0 }}
                  activeDot={{ r: 6 }}
                />
                <ReferenceLine 
                  y={1} 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  label={{ value: 'Break Even', position: 'right', fill: '#ef4444' }} 
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
      <h3 className="text-lg font-medium text-amber-800">Understanding CAC</h3>
      <p className="text-sm text-amber-700">
        Customer Acquisition Cost (CAC) is the total cost of acquiring a new customer, including 
        marketing and sales expenses. The LTV/CAC ratio helps determine if your customer 
        acquisition strategy is profitable. A ratio greater than 1 indicates profitable customer 
        acquisition.
      </p>
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-amber-800">Key Components:</h4>
        <ul className="list-disc pl-5 text-sm text-amber-700">
          <li><strong>CAC:</strong> Total cost to acquire a new customer</li>
          <li><strong>LTV:</strong> Customer Lifetime Value</li>
          <li><strong>LTV/CAC Ratio:</strong> Revenue generated per rupee spent on acquisition</li>
          <li><strong>Marketing & Sales Spend:</strong> Total expenses on customer acquisition</li>
        </ul>
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="Customer Acquisition Cost Calculator"
      description="Calculate and optimize your Customer Acquisition Cost (CAC) and LTV/CAC ratio."
      icon={<Users className="h-6 w-6" />}
      calculatorContent={calculatorContent}
      
      showSeparateAboutSection={true}
       activeTab="business"
      activeSubTab="marketing"
    />
  );
};

export default CACCalculator; 