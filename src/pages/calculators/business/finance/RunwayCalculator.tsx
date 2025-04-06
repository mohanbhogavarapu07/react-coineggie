import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RefreshCw, DollarSign, TrendingUp, Percent, Calendar, Calculator } from 'lucide-react';
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

interface RunwayData {
  month: number;
  capital: number;
  revenue: number;
  expenses: number;
  netCash: number;
}

const RunwayCalculator = () => {
  const [initialCapital, setInitialCapital] = useState(10000000);
  const [monthlyRevenue, setMonthlyRevenue] = useState(500000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(800000);
  const [growthRate, setGrowthRate] = useState(5);
  const [result, setResult] = useState({
    runwayMonths: 0,
    totalRevenue: 0,
    totalExpenses: 0,
    burnRate: 0,
  });
  const [chartData, setChartData] = useState<RunwayData[]>([]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const calculateRunway = () => {
    if (monthlyExpenses <= monthlyRevenue) {
      setResult({
        runwayMonths: Infinity,
        totalRevenue: 0,
        totalExpenses: 0,
        burnRate: 0,
      });
      setChartData([]);
      return;
    }

    // Calculate monthly burn rate
    const burnRate = monthlyExpenses - monthlyRevenue;
    
    // Calculate runway in months
    const runwayMonths = Math.floor(initialCapital / burnRate);
    
    // Generate chart data for 24 months or until runway ends
    const maxMonths = Math.min(24, runwayMonths);
    const data: RunwayData[] = [];
    
    let currentCapital = initialCapital;
    let currentRevenue = monthlyRevenue;
    let totalRevenue = 0;
    let totalExpenses = 0;
    
    for (let month = 0; month <= maxMonths; month++) {
      const expenses = monthlyExpenses;
      const revenue = currentRevenue;
      const netCash = currentCapital + revenue - expenses;
      
      data.push({
        month,
        capital: currentCapital,
        revenue,
        expenses,
        netCash,
      });
      
      currentCapital = netCash;
      currentRevenue *= (1 + growthRate / 100);
      totalRevenue += revenue;
      totalExpenses += expenses;
      
      if (netCash <= 0) break;
    }

    setResult({
      runwayMonths,
      totalRevenue,
      totalExpenses,
      burnRate,
    });

    setChartData(data);
  };

  useEffect(() => {
    calculateRunway();
  }, [initialCapital, monthlyRevenue, monthlyExpenses, growthRate]);

  const handleReset = () => {
    setInitialCapital(10000000);
    setMonthlyRevenue(500000);
    setMonthlyExpenses(800000);
    setGrowthRate(5);
  };

  const calculatorContent = (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Initial Capital</label>
              <span className="text-sm font-bold">{formatCurrency(initialCapital)}</span>
            </div>
            <Slider 
              value={[initialCapital]} 
              min={0} 
              max={50000000} 
              step={1000000}
              onValueChange={(value) => setInitialCapital(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={initialCapital}
              onChange={(e) => setInitialCapital(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Monthly Revenue</label>
              <span className="text-sm font-bold">{formatCurrency(monthlyRevenue)}</span>
            </div>
            <Slider 
              value={[monthlyRevenue]} 
              min={0} 
              max={5000000} 
              step={50000}
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
              <label className="text-sm font-medium">Monthly Expenses</label>
              <span className="text-sm font-bold">{formatCurrency(monthlyExpenses)}</span>
            </div>
            <Slider 
              value={[monthlyExpenses]} 
              min={0} 
              max={5000000} 
              step={50000}
              onValueChange={(value) => setMonthlyExpenses(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
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
                <div className="text-sm text-gray-500">Runway (Months)</div>
                <div className="text-2xl font-bold text-purple-600">
                  {result.runwayMonths === Infinity ? '∞' : result.runwayMonths.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Monthly Burn Rate</div>
                  <div className="text-lg font-bold text-red-600">
                    {formatCurrency(result.burnRate)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Total Revenue</div>
                  <div className="text-lg font-bold text-green-600">
                    {formatCurrency(result.totalRevenue)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="rounded-md border p-4 h-64">
            <h3 className="text-sm font-medium mb-2">Capital & Expenses Analysis</h3>
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
                  dataKey="capital" 
                  name="Capital" 
                  stroke="#7ac9a7" 
                  strokeWidth={3}
                  dot={{ r: 0 }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  name="Expenses" 
                  stroke="#e9c46a" 
                  strokeWidth={3}
                  dot={{ r: 0 }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  name="Revenue" 
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
      <h3 className="text-lg font-medium text-amber-800">Understanding Runway</h3>
      <p className="text-sm text-amber-700">
        Runway is the amount of time your startup can operate before running out of money. 
        Enter your initial capital, monthly revenue, monthly expenses, and expected growth rate. 
        The calculator will show you how many months your funding will last and your monthly burn rate. 
        The chart visualizes how your capital, revenue, and expenses change over time.
      </p>
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-amber-800">Key Components:</h4>
        <ul className="list-disc pl-5 text-sm text-amber-700">
          <li><strong>Initial Capital:</strong> The total funding available to your startup</li>
          <li><strong>Burn Rate:</strong> The rate at which you're spending money (expenses - revenue)</li>
          <li><strong>Growth Rate:</strong> The expected monthly increase in revenue</li>
        </ul>
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="Runway Calculator"
      description="Calculate how long your startup's funding will last."
      icon={<Calendar className="h-6 w-6" />}
      calculatorContent={calculatorContent}
      
      showSeparateAboutSection={true}
    />
  );
};

export default RunwayCalculator; 