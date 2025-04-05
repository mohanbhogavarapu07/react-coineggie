import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RefreshCw, DollarSign, TrendingUp, Percent, Calculator, Target, Search } from 'lucide-react';
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

interface SEOROIData {
  month: number;
  organicTraffic: number;
  conversionRate: number;
  averageOrderValue: number;
  seoCost: number;
  revenue: number;
  roi: number;
}

const SEOROICalculator = () => {
  const [monthlyOrganicTraffic, setMonthlyOrganicTraffic] = useState(10000);
  const [conversionRate, setConversionRate] = useState(2);
  const [averageOrderValue, setAverageOrderValue] = useState(5000);
  const [monthlySEOCost, setMonthlySEOCost] = useState(50000);
  const [trafficGrowthRate, setTrafficGrowthRate] = useState(10);
  const [result, setResult] = useState({
    monthlyRevenue: 0,
    monthlyROI: 0,
    totalRevenue: 0,
    totalCost: 0,
    totalROI: 0,
  });
  const [chartData, setChartData] = useState<SEOROIData[]>([]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const calculateSEOROI = () => {
    // Calculate initial monthly revenue
    const monthlyRevenue = monthlyOrganicTraffic * (conversionRate / 100) * averageOrderValue;
    const monthlyROI = ((monthlyRevenue - monthlySEOCost) / monthlySEOCost) * 100;
    
    // Generate chart data for 12 months
    const data: SEOROIData[] = [];
    let currentTraffic = monthlyOrganicTraffic;
    let totalRevenue = 0;
    let totalCost = 0;
    
    for (let month = 1; month <= 12; month++) {
      const monthTraffic = currentTraffic;
      const monthRevenue = monthTraffic * (conversionRate / 100) * averageOrderValue;
      const monthCost = monthlySEOCost;
      const monthROI = ((monthRevenue - monthCost) / monthCost) * 100;
      
      data.push({
        month,
        organicTraffic: monthTraffic,
        conversionRate,
        averageOrderValue,
        seoCost: monthCost,
        revenue: monthRevenue,
        roi: monthROI,
      });
      
      currentTraffic = Math.floor(currentTraffic * (1 + trafficGrowthRate / 100));
      totalRevenue += monthRevenue;
      totalCost += monthCost;
    }

    const totalROI = ((totalRevenue - totalCost) / totalCost) * 100;

    setResult({
      monthlyRevenue,
      monthlyROI,
      totalRevenue,
      totalCost,
      totalROI,
    });

    setChartData(data);
  };

  useEffect(() => {
    calculateSEOROI();
  }, [monthlyOrganicTraffic, conversionRate, averageOrderValue, monthlySEOCost, trafficGrowthRate]);

  const handleReset = () => {
    setMonthlyOrganicTraffic(10000);
    setConversionRate(2);
    setAverageOrderValue(5000);
    setMonthlySEOCost(50000);
    setTrafficGrowthRate(10);
  };

  const calculatorContent = (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Monthly Organic Traffic</label>
              <span className="text-sm font-bold">{monthlyOrganicTraffic.toLocaleString()}</span>
            </div>
            <Slider 
              value={[monthlyOrganicTraffic]} 
              min={0} 
              max={100000} 
              step={1000}
              onValueChange={(value) => setMonthlyOrganicTraffic(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={monthlyOrganicTraffic}
              onChange={(e) => setMonthlyOrganicTraffic(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Conversion Rate (%)</label>
              <span className="text-sm font-bold">{conversionRate}%</span>
            </div>
            <Slider 
              value={[conversionRate]} 
              min={0} 
              max={10} 
              step={0.1}
              onValueChange={(value) => setConversionRate(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={conversionRate}
              onChange={(e) => setConversionRate(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Average Order Value</label>
              <span className="text-sm font-bold">{formatCurrency(averageOrderValue)}</span>
            </div>
            <Slider 
              value={[averageOrderValue]} 
              min={0} 
              max={50000} 
              step={1000}
              onValueChange={(value) => setAverageOrderValue(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={averageOrderValue}
              onChange={(e) => setAverageOrderValue(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Monthly SEO Cost</label>
              <span className="text-sm font-bold">{formatCurrency(monthlySEOCost)}</span>
            </div>
            <Slider 
              value={[monthlySEOCost]} 
              min={0} 
              max={200000} 
              step={5000}
              onValueChange={(value) => setMonthlySEOCost(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={monthlySEOCost}
              onChange={(e) => setMonthlySEOCost(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Monthly Traffic Growth Rate (%)</label>
              <span className="text-sm font-bold">{trafficGrowthRate}%</span>
            </div>
            <Slider 
              value={[trafficGrowthRate]} 
              min={0} 
              max={50} 
              step={1}
              onValueChange={(value) => setTrafficGrowthRate(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={trafficGrowthRate}
              onChange={(e) => setTrafficGrowthRate(Number(e.target.value))}
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
                <div className="text-sm text-gray-500">Monthly ROI</div>
                <div className="text-2xl font-bold text-purple-600">
                  {result.monthlyROI.toFixed(1)}%
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Monthly Revenue</div>
                  <div className="text-lg font-bold text-green-600">
                    {formatCurrency(result.monthlyRevenue)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Total ROI (12 months)</div>
                  <div className="text-lg font-bold text-blue-600">
                    {result.totalROI.toFixed(1)}%
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="rounded-md border p-4 h-64">
            <h3 className="text-sm font-medium mb-2">Revenue & ROI Analysis</h3>
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
                  dataKey="seoCost" 
                  name="SEO Cost" 
                  stroke="#e9c46a" 
                  strokeWidth={3}
                  dot={{ r: 0 }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="roi" 
                  name="ROI %" 
                  stroke="#245e4f" 
                  strokeWidth={2}
                  dot={{ r: 0 }}
                  activeDot={{ r: 6 }}
                />
                <ReferenceLine 
                  y={0} 
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
      <h3 className="text-lg font-medium text-amber-800">Understanding SEO ROI</h3>
      <p className="text-sm text-amber-700">
        SEO ROI measures the return on investment from your search engine optimization efforts. 
        It's calculated by comparing the revenue generated from organic traffic against the cost 
        of your SEO activities. A positive ROI indicates that your SEO strategy is profitable.
      </p>
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-amber-800">Key Components:</h4>
        <ul className="list-disc pl-5 text-sm text-amber-700">
          <li><strong>Organic Traffic:</strong> Number of visitors from search engines</li>
          <li><strong>Conversion Rate:</strong> Percentage of visitors who make a purchase</li>
          <li><strong>Average Order Value:</strong> Revenue per conversion</li>
          <li><strong>SEO Cost:</strong> Total investment in SEO activities</li>
          <li><strong>Traffic Growth:</strong> Expected increase in organic traffic</li>
        </ul>
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="SEO ROI Calculator"
      description="Calculate and visualize your SEO Return on Investment (ROI)"
      icon={<Search className="h-6 w-6" />}
      calculatorContent={calculatorContent}
      aboutContent={aboutContent}
      showSeparateAboutSection={true}
    />
  );
};

export default SEOROICalculator; 