import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RefreshCw, DollarSign, TrendingUp, Percent, Calculator, Target, BarChart3 } from 'lucide-react';
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

interface ROASData {
  month: number;
  revenue: number;
  adSpend: number;
  profit: number;
  roas: number;
}

const ROASCalculator = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(1000000);
  const [monthlyAdSpend, setMonthlyAdSpend] = useState(200000);
  const [growthRate, setGrowthRate] = useState(5);
  const [result, setResult] = useState({
    roas: 0,
    totalRevenue: 0,
    totalAdSpend: 0,
    totalProfit: 0,
    profitMargin: 0,
  });
  const [chartData, setChartData] = useState<ROASData[]>([]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const calculateROAS = () => {
    // Calculate ROAS
    const roas = monthlyRevenue / monthlyAdSpend;
    
    // Generate chart data for 12 months
    const data: ROASData[] = [];
    let currentRevenue = monthlyRevenue;
    let totalRevenue = 0;
    let totalAdSpend = 0;
    let totalProfit = 0;
    
    for (let month = 1; month <= 12; month++) {
      const revenue = currentRevenue;
      const adSpend = monthlyAdSpend;
      const profit = revenue - adSpend;
      const monthRoas = revenue / adSpend;
      
      data.push({
        month,
        revenue,
        adSpend,
        profit,
        roas: monthRoas,
      });
      
      currentRevenue *= (1 + growthRate / 100);
      totalRevenue += revenue;
      totalAdSpend += adSpend;
      totalProfit += profit;
    }

    const profitMargin = (totalProfit / totalRevenue) * 100;

    setResult({
      roas,
      totalRevenue,
      totalAdSpend,
      totalProfit,
      profitMargin,
    });

    setChartData(data);
  };

  useEffect(() => {
    calculateROAS();
  }, [monthlyRevenue, monthlyAdSpend, growthRate]);

  const handleReset = () => {
    setMonthlyRevenue(1000000);
    setMonthlyAdSpend(200000);
    setGrowthRate(5);
  };

  const calculatorContent = (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Monthly Revenue</label>
              <span className="text-sm font-bold">{formatCurrency(monthlyRevenue)}</span>
            </div>
            <Slider 
              value={[monthlyRevenue]} 
              min={0} 
              max={10000000} 
              step={100000}
              onValueChange={(value) => setMonthlyRevenue(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={monthlyRevenue}
              onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Monthly Ad Spend</label>
              <span className="text-sm font-bold">{formatCurrency(monthlyAdSpend)}</span>
            </div>
            <Slider 
              value={[monthlyAdSpend]} 
              min={0} 
              max={5000000} 
              step={50000}
              onValueChange={(value) => setMonthlyAdSpend(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={monthlyAdSpend}
              onChange={(e) => setMonthlyAdSpend(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Monthly Growth Rate (%)</label>
              <span className="text-sm font-bold">{growthRate}%</span>
            </div>
            <Slider 
              value={[growthRate]} 
              min={0} 
              max={50} 
              step={1}
              onValueChange={(value) => setGrowthRate(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={growthRate}
              onChange={(e) => setGrowthRate(Number(e.target.value))}
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
                <div className="text-sm text-gray-500">ROAS</div>
                <div className="text-2xl font-bold text-purple-600">
                  {result.roas.toFixed(2)}x
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Total Profit</div>
                  <div className="text-lg font-bold text-green-600">
                    {formatCurrency(result.totalProfit)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Profit Margin</div>
                  <div className="text-lg font-bold text-blue-600">
                    {result.profitMargin.toFixed(1)}%
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="rounded-md border p-4 h-64">
            <h3 className="text-sm font-medium mb-2">Revenue & Ad Spend Analysis</h3>
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
                  dataKey="revenue" 
                  name="Revenue" 
                  stroke="#7ac9a7" 
                  strokeWidth={3}
                  dot={{ r: 0 }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="adSpend" 
                  name="Ad Spend" 
                  stroke="#e9c46a" 
                  strokeWidth={3}
                  dot={{ r: 0 }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  name="Profit" 
                  stroke="#245e4f" 
                  strokeWidth={2}
                  dot={{ r: 0 }}
                  activeDot={{ r: 6 }}
                />
                <ReferenceLine 
                  y={0} 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  label={{ value: 'Zero', position: 'right', fill: '#ef4444' }} 
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
      <h3 className="text-lg font-medium text-amber-800">Understanding ROAS</h3>
      <p className="text-sm text-amber-700">
        Return on Ad Spend (ROAS) is a marketing metric that measures the revenue generated for 
        every rupee spent on advertising. A ROAS of 1x means you're breaking even, while higher 
        values indicate profitable campaigns. This calculator helps you track your marketing 
        performance and optimize your ad spend.
      </p>
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-amber-800">Key Components:</h4>
        <ul className="list-disc pl-5 text-sm text-amber-700">
          <li><strong>ROAS:</strong> Revenue generated per rupee spent on advertising</li>
          <li><strong>Profit Margin:</strong> Percentage of revenue that becomes profit</li>
          <li><strong>Ad Spend:</strong> Total amount spent on advertising</li>
          <li><strong>Growth Rate:</strong> Expected monthly increase in revenue</li>
        </ul>
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="ROAS Calculator"
      description="Calculate your Return on Ad Spend (ROAS) to measure marketing campaign effectiveness."
      icon={<BarChart3 className="h-6 w-6" />}
      calculatorContent={calculatorContent}
      aboutContent={aboutContent}
      showSeparateAboutSection={true}
      activeTab="business"
      activeSubTab="marketing"
    />
  );
};

export default ROASCalculator; 