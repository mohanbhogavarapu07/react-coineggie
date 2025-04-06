import React, { useState, useEffect } from 'react';
import { CalculatorLayout } from '@/layouts/CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RefreshCw, DollarSign, TrendingUp, Percent, Calculator, Target, BarChart } from 'lucide-react';
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

interface DealData {
  month: number;
  totalDeals: number;
  totalRevenue: number;
  averageDealSize: number;
  dealConversionRate: number;
  salesCycleLength: number;
}

const AverageDealSizeCalculator = () => {
  const [totalDeals, setTotalDeals] = useState(50);
  const [totalRevenue, setTotalRevenue] = useState(500000);
  const [dealConversionRate, setDealConversionRate] = useState(20);
  const [salesCycleLength, setSalesCycleLength] = useState(90);
  const [result, setResult] = useState({
    averageDealSize: 0,
    monthlyDeals: 0,
    monthlyRevenue: 0,
    dealVelocity: 0,
    revenuePerDeal: 0,
    totalDeals: 0,
  });
  const [chartData, setChartData] = useState<DealData[]>([]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const calculateDealMetrics = () => {
    // Calculate monthly metrics
    const monthlyDeals = totalDeals / 12;
    const monthlyRevenue = totalRevenue / 12;
    const averageDealSize = totalRevenue / totalDeals;
    const dealVelocity = salesCycleLength / 30; // Convert to months
    const revenuePerDeal = averageDealSize;
    
    // Generate chart data for 12 months
    const data: DealData[] = [];
    let currentDeals = 0;
    let currentRevenue = 0;
    
    for (let month = 1; month <= 12; month++) {
      const monthDeals = monthlyDeals;
      const monthRevenue = monthlyRevenue;
      const monthAverageDealSize = monthRevenue / monthDeals;
      
      data.push({
        month,
        totalDeals: currentDeals + monthDeals,
        totalRevenue: currentRevenue + monthRevenue,
        averageDealSize: monthAverageDealSize,
        dealConversionRate,
        salesCycleLength,
      });
      
      currentDeals += monthDeals;
      currentRevenue += monthRevenue;
    }

    setResult({
      averageDealSize,
      monthlyDeals,
      monthlyRevenue,
      dealVelocity,
      revenuePerDeal,
      totalDeals,
    });

    setChartData(data);
  };

  useEffect(() => {
    calculateDealMetrics();
  }, [totalDeals, totalRevenue, dealConversionRate, salesCycleLength]);

  const handleReset = () => {
    setTotalDeals(50);
    setTotalRevenue(500000);
    setDealConversionRate(20);
    setSalesCycleLength(90);
  };

  const calculatorContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Total Deals (Annual)</label>
            <span className="text-sm font-bold">{totalDeals.toLocaleString()}</span>
          </div>
          <Slider 
            value={[totalDeals]} 
            min={0} 
            max={1000} 
            step={10}
            onValueChange={(value) => setTotalDeals(value[0])}
            className="bg-purple-100"
          />
          <Input
            type="number"
            value={totalDeals}
            onChange={(e) => setTotalDeals(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Total Revenue (Annual)</label>
            <span className="text-sm font-bold">{formatCurrency(totalRevenue)}</span>
          </div>
          <Slider 
            value={[totalRevenue]} 
            min={0} 
            max={10000000} 
            step={100000}
            onValueChange={(value) => setTotalRevenue(value[0])}
            className="bg-purple-100"
          />
          <Input
            type="number"
            value={totalRevenue}
            onChange={(e) => setTotalRevenue(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Deal Conversion Rate (%)</label>
            <span className="text-sm font-bold">{dealConversionRate}%</span>
          </div>
          <Slider 
            value={[dealConversionRate]} 
            min={0} 
            max={100} 
            step={1}
            onValueChange={(value) => setDealConversionRate(value[0])}
            className="bg-purple-100"
          />
          <Input
            type="number"
            value={dealConversionRate}
            onChange={(e) => setDealConversionRate(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Sales Cycle Length (Days)</label>
            <span className="text-sm font-bold">{salesCycleLength}</span>
          </div>
          <Slider 
            value={[salesCycleLength]} 
            min={0} 
            max={365} 
            step={5}
            onValueChange={(value) => setSalesCycleLength(value[0])}
            className="bg-purple-100"
          />
          <Input
            type="number"
            value={salesCycleLength}
            onChange={(e) => setSalesCycleLength(Number(e.target.value))}
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
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4">
              <div className="text-sm text-gray-500">Average Deal Size</div>
              <div className="text-2xl font-bold text-purple-600">
                {formatCurrency(result.averageDealSize)}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Monthly Deals</div>
                <div className="text-lg font-bold text-green-600">
                  {result.monthlyDeals.toFixed(1)}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Deal Velocity (Months)</div>
                <div className="text-lg font-bold text-blue-600">
                  {result.dealVelocity.toFixed(1)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="rounded-md border p-4 h-64">
          <h3 className="text-sm font-medium mb-2">Deal Size Analysis</h3>
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
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="averageDealSize" 
                name="Average Deal Size" 
                stroke="#7ac9a7" 
                strokeWidth={3}
                dot={{ r: 0 }}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="totalRevenue" 
                name="Cumulative Revenue" 
                stroke="#e9c46a" 
                strokeWidth={3}
                dot={{ r: 0 }}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="totalDeals" 
                name="Cumulative Deals" 
                stroke="#245e4f" 
                strokeWidth={2}
                dot={{ r: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const aboutContent = (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-amber-800">Understanding Average Deal Size</h3>
      <p className="text-sm text-amber-700">
        Average Deal Size is a key metric that measures the typical value of your sales transactions. 
        It helps in understanding your sales performance, revenue potential, and customer value. 
        A higher average deal size often indicates better sales efficiency and customer value.
      </p>
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-amber-800">Key Components:</h4>
        <ul className="list-disc pl-5 text-sm text-amber-700">
          <li><strong>Total Deals:</strong> Number of closed deals in a period</li>
          <li><strong>Total Revenue:</strong> Total revenue from all deals</li>
          <li><strong>Conversion Rate:</strong> Percentage of leads that become deals</li>
          <li><strong>Sales Cycle Length:</strong> Average time to close a deal</li>
          <li><strong>Deal Velocity:</strong> Speed at which deals move through pipeline</li>
          <li><strong>Monthly Deals:</strong> Average number of deals closed per month</li>
        </ul>
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="Average Deal Size Calculator"
      description="Calculate and optimize your Average Deal Size and Sales Performance Metrics"
      icon={<BarChart className="h-6 w-6" />}
      calculatorContent={calculatorContent}
      
      showSeparateAboutSection={true}
      activeTab="business"
      activeSubTab="sales"
    />
  );
};

export default AverageDealSizeCalculator; 