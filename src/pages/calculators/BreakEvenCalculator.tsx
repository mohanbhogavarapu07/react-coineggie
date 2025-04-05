import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RefreshCw, DollarSign, TrendingUp, Percent, Target, Calculator, BarChart3 } from 'lucide-react';
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

interface BreakEvenData {
  units: number;
  revenue: number;
  totalCost: number;
  profit: number;
}

const BreakEvenCalculator = () => {
  const [fixedCosts, setFixedCosts] = useState(1000000);
  const [variableCost, setVariableCost] = useState(500);
  const [sellingPrice, setSellingPrice] = useState(1200);
  const [result, setResult] = useState({
    breakEvenUnits: 0,
    breakEvenRevenue: 0,
    contributionMargin: 0,
    contributionPerUnit: 0,
  });
  const [chartData, setChartData] = useState<BreakEvenData[]>([]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const calculateBreakEven = () => {
    if (sellingPrice <= variableCost) {
      setResult({
        breakEvenUnits: 0,
        breakEvenRevenue: 0,
        contributionMargin: 0,
        contributionPerUnit: 0,
      });
      setChartData([]);
      return;
    }

    // Calculate break-even point in units
    const breakEvenUnits = Math.ceil(fixedCosts / (sellingPrice - variableCost));
    
    // Calculate break-even point in revenue
    const breakEvenRevenue = breakEvenUnits * sellingPrice;
    
    // Calculate contribution margin ratio
    const contributionPerUnit = sellingPrice - variableCost;
    const contributionMargin = (contributionPerUnit / sellingPrice) * 100;

    // Generate chart data
    const maxUnits = Math.ceil(breakEvenUnits * 2);
    const step = Math.max(1, Math.floor(maxUnits / 10));
    
    const data: BreakEvenData[] = [];
    
    for (let units = 0; units <= maxUnits; units += step) {
      const revenue = units * sellingPrice;
      const totalCost = fixedCosts + (units * variableCost);
      const profit = revenue - totalCost;
      
      data.push({
        units,
        revenue,
        totalCost,
        profit
      });
    }

    setResult({
      breakEvenUnits,
      breakEvenRevenue,
      contributionMargin,
      contributionPerUnit,
    });

    setChartData(data);
  };

  useEffect(() => {
    calculateBreakEven();
  }, [fixedCosts, variableCost, sellingPrice]);

  const handleReset = () => {
    setFixedCosts(1000000);
    setVariableCost(500);
    setSellingPrice(1200);
  };

  const calculatorContent = (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Fixed Costs</label>
              <span className="text-sm font-bold">{formatCurrency(fixedCosts)}</span>
            </div>
            <Slider 
              value={[fixedCosts]} 
              min={0} 
              max={5000000} 
              step={100000}
              onValueChange={(value) => setFixedCosts(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={fixedCosts}
              onChange={(e) => setFixedCosts(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Variable Cost per Unit</label>
              <span className="text-sm font-bold">{formatCurrency(variableCost)}</span>
            </div>
            <Slider 
              value={[variableCost]} 
              min={0} 
              max={2000} 
              step={10}
              onValueChange={(value) => setVariableCost(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={variableCost}
              onChange={(e) => setVariableCost(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Selling Price per Unit</label>
              <span className="text-sm font-bold">{formatCurrency(sellingPrice)}</span>
            </div>
            <Slider 
              value={[sellingPrice]} 
              min={0} 
              max={5000} 
              step={50}
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

          <Button onClick={handleReset} variant="outline" className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset Values
          </Button>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Break-Even Point (Units)</div>
                <div className="text-2xl font-bold text-purple-600">
                  {result.breakEvenUnits.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Break-Even Revenue</div>
                  <div className="text-lg font-bold text-purple-600">
                    {formatCurrency(result.breakEvenRevenue)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Contribution Margin</div>
                  <div className="text-lg font-bold text-green-600">
                    {result.contributionMargin.toFixed(1)}%
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="rounded-md border p-4 h-64">
            <h3 className="text-sm font-medium mb-2">Revenue & Costs Analysis</h3>
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
                  dataKey="units" 
                  label={{ value: 'Units', position: 'insideBottom', offset: -5 }} 
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
                  dataKey="totalCost" 
                  name="Total Cost" 
                  stroke="#e9c46a" 
                  strokeWidth={3}
                  dot={{ r: 0 }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  name="Profit/Loss" 
                  stroke="#245e4f" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 0 }}
                  activeDot={{ r: 6 }}
                />
                <ReferenceLine 
                  x={result.breakEvenUnits} 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  label={{ value: 'Break-Even', position: 'top', fill: '#ef4444' }} 
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
      <h3 className="text-lg font-medium text-amber-800">Understanding Break-Even Analysis</h3>
      <p className="text-sm text-amber-700">
        Break-even analysis helps you determine when your business will start making a profit. 
        Enter your fixed costs (rent, salaries, etc.), variable costs per unit (materials, labor, etc.), 
        and selling price per unit. The calculator will show you how many units you need to sell to 
        break even and the corresponding revenue. The chart visualizes where your costs and revenue intersect.
      </p>
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-amber-800">Key Components:</h4>
        <ul className="list-disc pl-5 text-sm text-amber-700">
          <li><strong>Fixed Costs:</strong> Expenses that remain constant regardless of production volume</li>
          <li><strong>Variable Costs:</strong> Expenses that change directly with production volume</li>
          <li><strong>Contribution Margin:</strong> The difference between selling price and variable cost</li>
        </ul>
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="Break-even Calculator"
      description="Calculate your business's break-even point and analyze profitability."
      icon={<BarChart3 className="h-6 w-6" />}
      calculatorContent={calculatorContent}
      aboutContent={aboutContent}
      showSeparateAboutSection={true}
      activeTab="business"
      activeSubTab="finance"
    />
  );
};

export default BreakEvenCalculator; 