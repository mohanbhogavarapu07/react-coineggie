import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RefreshCw, DollarSign, TrendingUp, Percent, Calculator, Target, Facebook } from 'lucide-react';
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
  adSpend: number;
  revenue: number;
  profit: number;
  roas: number;
  breakEvenPoint: number;
}

const FacebookAdsBreakEvenROAS = () => {
  const [monthlyAdSpend, setMonthlyAdSpend] = useState(50000);
  const [productCost, setProductCost] = useState(1000);
  const [sellingPrice, setSellingPrice] = useState(2000);
  const [conversionRate, setConversionRate] = useState(2);
  const [result, setResult] = useState({
    breakEvenROAS: 0,
    breakEvenSales: 0,
    monthlyRevenue: 0,
    monthlyProfit: 0,
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

  const calculateBreakEvenROAS = () => {
    // Calculate break-even ROAS
    const profitPerSale = sellingPrice - productCost;
    const breakEvenSales = monthlyAdSpend / profitPerSale;
    const breakEvenROAS = (sellingPrice * breakEvenSales) / monthlyAdSpend;
    
    // Calculate current performance
    const monthlyRevenue = (monthlyAdSpend * conversionRate * sellingPrice) / 100;
    const monthlyProfit = monthlyRevenue - (monthlyAdSpend + (productCost * (monthlyRevenue / sellingPrice)));
    const profitMargin = (monthlyProfit / monthlyRevenue) * 100;
    
    // Generate chart data for 12 months
    const data: ROASData[] = [];
    let currentAdSpend = monthlyAdSpend;
    let totalRevenue = 0;
    let totalProfit = 0;
    
    for (let month = 1; month <= 12; month++) {
      const monthAdSpend = currentAdSpend;
      const monthRevenue = (monthAdSpend * conversionRate * sellingPrice) / 100;
      const monthProfit = monthRevenue - (monthAdSpend + (productCost * (monthRevenue / sellingPrice)));
      const monthROAS = monthRevenue / monthAdSpend;
      
      data.push({
        month,
        adSpend: monthAdSpend,
        revenue: monthRevenue,
        profit: monthProfit,
        roas: monthROAS,
        breakEvenPoint: breakEvenROAS,
      });
      
      currentAdSpend = Math.floor(currentAdSpend * 1.1); // 10% growth
      totalRevenue += monthRevenue;
      totalProfit += monthProfit;
    }

    setResult({
      breakEvenROAS,
      breakEvenSales,
      monthlyRevenue,
      monthlyProfit,
      profitMargin,
    });

    setChartData(data);
  };

  useEffect(() => {
    calculateBreakEvenROAS();
  }, [monthlyAdSpend, productCost, sellingPrice, conversionRate]);

  const handleReset = () => {
    setMonthlyAdSpend(50000);
    setProductCost(1000);
    setSellingPrice(2000);
    setConversionRate(2);
  };

  const calculatorContent = (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Monthly Ad Spend</label>
              <span className="text-sm font-bold">{formatCurrency(monthlyAdSpend)}</span>
            </div>
            <Slider 
              value={[monthlyAdSpend]} 
              min={0} 
              max={500000} 
              step={5000}
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
              <label className="text-sm font-medium">Product Cost</label>
              <span className="text-sm font-bold">{formatCurrency(productCost)}</span>
            </div>
            <Slider 
              value={[productCost]} 
              min={0} 
              max={10000} 
              step={100}
              onValueChange={(value) => setProductCost(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={productCost}
              onChange={(e) => setProductCost(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Selling Price</label>
              <span className="text-sm font-bold">{formatCurrency(sellingPrice)}</span>
            </div>
            <Slider 
              value={[sellingPrice]} 
              min={0} 
              max={20000} 
              step={200}
              onValueChange={(value) => setSellingPrice(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(Number(e.target.value))}
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

          <Button onClick={handleReset} variant="outline" className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset Values
          </Button>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Break-even ROAS</div>
                <div className="text-2xl font-bold text-purple-600">
                  {result.breakEvenROAS.toFixed(2)}x
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Monthly Profit</div>
                  <div className="text-lg font-bold text-green-600">
                    {formatCurrency(result.monthlyProfit)}
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
            <h3 className="text-sm font-medium mb-2">ROAS & Profit Analysis</h3>
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
                <YAxis tickFormatter={(value) => `${value.toFixed(1)}x`} />
                <Tooltip formatter={(value) => `${Number(value).toFixed(2)}x`} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="roas" 
                  name="ROAS" 
                  stroke="#7ac9a7" 
                  strokeWidth={3}
                  dot={{ r: 0 }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="breakEvenPoint" 
                  name="Break-even ROAS" 
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
      <h3 className="text-lg font-medium text-amber-800">Understanding Break-even ROAS</h3>
      <p className="text-sm text-amber-700">
        Break-even ROAS is the minimum Return on Ad Spend needed to cover your costs. 
        It's calculated by considering your product costs, selling price, and ad spend. 
        A ROAS above the break-even point indicates profitable campaigns.
      </p>
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-amber-800">Key Components:</h4>
        <ul className="list-disc pl-5 text-sm text-amber-700">
          <li><strong>Ad Spend:</strong> Total investment in Facebook ads</li>
          <li><strong>Product Cost:</strong> Cost to produce or acquire the product</li>
          <li><strong>Selling Price:</strong> Price at which you sell the product</li>
          <li><strong>Conversion Rate:</strong> Percentage of ad clicks that result in sales</li>
          <li><strong>Break-even ROAS:</strong> Minimum ROAS needed to cover costs</li>
        </ul>
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="Facebook Ads Break-even ROAS Calculator"
      description="Calculate your break-even ROAS and optimize your Facebook ad campaigns"
      icon={<Facebook className="h-6 w-6" />}
      calculatorContent={calculatorContent}
      aboutContent={aboutContent}
      showSeparateAboutSection={true}
    />
  );
};

export default FacebookAdsBreakEvenROAS; 