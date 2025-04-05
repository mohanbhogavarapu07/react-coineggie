import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { BarChart3, RefreshCw, DollarSign, TrendingUp, Percent } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  Cell
} from 'recharts';
import { CalculatorLayout } from '@/layouts/CalculatorLayout';

const SalesForecastCalculator = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(100000);
  const [growthRate, setGrowthRate] = useState(10);
  const [months, setMonths] = useState(12);
  const [profitMargin, setProfitMargin] = useState(20);
  const [result, setResult] = useState({
    totalRevenue: 0,
    totalProfit: 0,
    averageMonthlyRevenue: 0,
    averageMonthlyProfit: 0,
  });
  const [chartData, setChartData] = useState<any[]>([]);
  const [profitChartData, setProfitChartData] = useState<any[]>([]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculateSales = () => {
    const monthlyGrowthRate = growthRate / 100 / 12;
    let totalRevenue = 0;
    let totalProfit = 0;
    const revenueData = [];
    const profitData = [];
    
    let currentRevenue = monthlyRevenue;
    
    for (let i = 0; i < months; i++) {
      // Calculate revenue for this month
      const monthRevenue = currentRevenue;
      const monthProfit = monthRevenue * (profitMargin / 100);
      
      // Add to totals
      totalRevenue += monthRevenue;
      totalProfit += monthProfit;
      
      // Add to chart data
      revenueData.push({
        month: i + 1,
        revenue: Math.round(monthRevenue),
        profit: Math.round(monthProfit),
      });
      
      profitData.push({
        month: i + 1,
        profitMargin: profitMargin,
        profit: Math.round(monthProfit),
      });
      
      // Calculate next month's revenue with growth
      currentRevenue = currentRevenue * (1 + monthlyGrowthRate);
    }
    
    setResult({
      totalRevenue,
      totalProfit,
      averageMonthlyRevenue: totalRevenue / months,
      averageMonthlyProfit: totalProfit / months,
    });
    
    setChartData(revenueData);
    setProfitChartData(profitData);
  };

  useEffect(() => {
    calculateSales();
  }, [monthlyRevenue, growthRate, months, profitMargin]);

  const handleReset = () => {
    setMonthlyRevenue(100000);
    setGrowthRate(10);
    setMonths(12);
    setProfitMargin(20);
  };

  const calculatorContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Initial Monthly Revenue</label>
            <span className="text-sm font-bold">{formatCurrency(monthlyRevenue)}</span>
          </div>
          <Slider 
            value={[monthlyRevenue]} 
            min={10000} 
            max={1000000} 
            step={10000}
            onValueChange={(value) => setMonthlyRevenue(value[0])}
            className="bg-blue-100"
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
            <label className="text-sm font-medium">Monthly Growth Rate (%)</label>
            <span className="text-sm font-bold">{growthRate}%</span>
          </div>
          <Slider 
            value={[growthRate]} 
            min={0} 
            max={50} 
            step={0.5}
            onValueChange={(value) => setGrowthRate(value[0])}
            className="bg-blue-100"
          />
          <Input
            type="number"
            value={growthRate}
            onChange={(e) => setGrowthRate(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Forecast Period (Months)</label>
            <span className="text-sm font-bold">{months} months</span>
          </div>
          <Slider 
            value={[months]} 
            min={1} 
            max={60} 
            step={1}
            onValueChange={(value) => setMonths(value[0])}
            className="bg-blue-100"
          />
          <Input
            type="number"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Profit Margin (%)</label>
            <span className="text-sm font-bold">{profitMargin}%</span>
          </div>
          <Slider 
            value={[profitMargin]} 
            min={0} 
            max={100} 
            step={1}
            onValueChange={(value) => setProfitMargin(value[0])}
            className="bg-blue-100"
          />
          <Input
            type="number"
            value={profitMargin}
            onChange={(e) => setProfitMargin(Number(e.target.value))}
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
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="text-sm text-gray-500">Total Revenue</div>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(result.totalRevenue)}
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
                <div className="text-sm text-gray-500">Avg. Monthly Profit</div>
                <div className="text-lg font-bold text-green-600">
                  {formatCurrency(result.averageMonthlyProfit)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="rounded-md border p-4 h-64">
          <h3 className="text-sm font-medium mb-2">Revenue & Profit Forecast</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottom', offset: -5 }} />
              <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stackId="1" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                name="Revenue"
              />
              <Area 
                type="monotone" 
                dataKey="profit" 
                stackId="1" 
                stroke="#10b981" 
                fill="#10b981" 
                name="Profit"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-md border p-4 h-64">
          <h3 className="text-sm font-medium mb-2">Profit Margin Analysis</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={profitChartData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottom', offset: -5 }} />
              <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Bar 
                dataKey="profit" 
                fill="#10b981" 
                name="Profit"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const aboutContent = (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-amber-800">About Sales Forecast Calculator</h3>
      <p className="text-sm text-amber-700">
        The Sales Forecast Calculator is a powerful tool designed to help businesses predict their future revenue and profit growth. By analyzing key metrics like initial revenue, growth rate, and profit margins, this calculator provides valuable insights for business planning and decision-making.
      </p>
      
      <h4 className="text-md font-medium text-amber-800 mt-4">How to Use</h4>
      <ol className="list-decimal list-inside text-sm text-amber-700 space-y-2">
        <li>Enter your initial monthly revenue - this is your current or starting monthly income</li>
        <li>Set your expected monthly growth rate - this represents the percentage increase you expect in revenue each month</li>
        <li>Choose your forecast period - how many months into the future you want to project</li>
        <li>Input your target profit margin - the percentage of revenue you expect to keep as profit</li>
        <li>Review the generated charts and metrics to understand your business's growth potential</li>
      </ol>

      <h4 className="text-md font-medium text-amber-800 mt-4">Key Features</h4>
      <ul className="list-disc list-inside text-sm text-amber-700 space-y-2">
        <li>Interactive revenue and profit forecasting</li>
        <li>Visual representation through area and bar charts</li>
        <li>Detailed breakdown of total revenue and profit</li>
        <li>Average monthly revenue and profit calculations</li>
        <li>Easy-to-use sliders for quick adjustments</li>
      </ul>
    </div>
  );

  return (
    <CalculatorLayout
      title="Sales Forecast Calculator"
      description="Forecast your business revenue and profit with our comprehensive sales calculator."
      icon={<BarChart3 className="h-6 w-6" />}
      calculatorContent={calculatorContent}
      aboutContent={aboutContent}
      showSeparateAboutSection={true}
      activeTab="business"
      activeSubTab="sales"
    />
  );
};

export default SalesForecastCalculator; 