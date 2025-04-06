import React, { useState, useEffect } from 'react';
import { CalculatorLayout } from '@/layouts/CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RefreshCw, DollarSign, TrendingUp, Percent, Calculator, Target, Package } from 'lucide-react';
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

interface COGSData {
  month: number;
  revenue: number;
  cogs: number;
  grossProfit: number;
  grossMargin: number;
  unitCost: number;
  unitsSold: number;
}

const COGSCalculator = () => {
  const [revenue, setRevenue] = useState(1000000);
  const [unitCost, setUnitCost] = useState(100);
  const [unitsSold, setUnitsSold] = useState(10000);
  const [fixedCosts, setFixedCosts] = useState(50000);
  const [variableCosts, setVariableCosts] = useState(20);
  const [result, setResult] = useState({
    totalCOGS: 0,
    grossProfit: 0,
    grossMargin: 0,
    monthlyRevenue: 0,
    monthlyCOGS: 0,
    monthlyProfit: 0,
  });
  const [chartData, setChartData] = useState<COGSData[]>([]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const calculateCOGS = () => {
    // Calculate monthly metrics
    const monthlyRevenue = revenue / 12;
    const variableCOGS = unitsSold * (unitCost + variableCosts);
    const totalCOGS = variableCOGS + fixedCosts;
    const grossProfit = revenue - totalCOGS;
    const grossMargin = (grossProfit / revenue) * 100;
    const monthlyCOGS = totalCOGS / 12;
    const monthlyProfit = monthlyRevenue - monthlyCOGS;
    
    // Generate chart data for 12 months
    const data: COGSData[] = [];
    let currentRevenue = 0;
    let currentCOGS = 0;
    
    for (let month = 1; month <= 12; month++) {
      const monthRevenue = monthlyRevenue;
      const monthCOGS = monthlyCOGS;
      const monthProfit = monthRevenue - monthCOGS;
      const monthMargin = (monthProfit / monthRevenue) * 100;
      
      data.push({
        month,
        revenue: currentRevenue + monthRevenue,
        cogs: currentCOGS + monthCOGS,
        grossProfit: (currentRevenue + monthRevenue) - (currentCOGS + monthCOGS),
        grossMargin: monthMargin,
        unitCost,
        unitsSold: unitsSold / 12,
      });
      
      currentRevenue += monthRevenue;
      currentCOGS += monthCOGS;
    }

    setResult({
      totalCOGS,
      grossProfit,
      grossMargin,
      monthlyRevenue,
      monthlyCOGS,
      monthlyProfit,
    });

    setChartData(data);
  };

  useEffect(() => {
    calculateCOGS();
  }, [revenue, unitCost, unitsSold, fixedCosts, variableCosts]);

  const handleReset = () => {
    setRevenue(1000000);
    setUnitCost(100);
    setUnitsSold(10000);
    setFixedCosts(50000);
    setVariableCosts(20);
  };

  const calculatorContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Annual Revenue</label>
            <span className="text-sm font-bold">{formatCurrency(revenue)}</span>
          </div>
          <Slider 
            value={[revenue]} 
            min={0} 
            max={10000000} 
            step={100000}
            onValueChange={(value) => setRevenue(value[0])}
            className="bg-purple-100"
          />
          <Input
            type="number"
            value={revenue}
            onChange={(e) => setRevenue(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Unit Cost</label>
            <span className="text-sm font-bold">{formatCurrency(unitCost)}</span>
          </div>
          <Slider 
            value={[unitCost]} 
            min={0} 
            max={1000} 
            step={10}
            onValueChange={(value) => setUnitCost(value[0])}
            className="bg-purple-100"
          />
          <Input
            type="number"
            value={unitCost}
            onChange={(e) => setUnitCost(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Units Sold (Annual)</label>
            <span className="text-sm font-bold">{unitsSold.toLocaleString()}</span>
          </div>
          <Slider 
            value={[unitsSold]} 
            min={0} 
            max={100000} 
            step={1000}
            onValueChange={(value) => setUnitsSold(value[0])}
            className="bg-purple-100"
          />
          <Input
            type="number"
            value={unitsSold}
            onChange={(e) => setUnitsSold(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Fixed Costs (Annual)</label>
            <span className="text-sm font-bold">{formatCurrency(fixedCosts)}</span>
          </div>
          <Slider 
            value={[fixedCosts]} 
            min={0} 
            max={1000000} 
            step={10000}
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
            <label className="text-sm font-medium">Variable Costs per Unit</label>
            <span className="text-sm font-bold">{formatCurrency(variableCosts)}</span>
          </div>
          <Slider 
            value={[variableCosts]} 
            min={0} 
            max={500} 
            step={5}
            onValueChange={(value) => setVariableCosts(value[0])}
            className="bg-purple-100"
          />
          <Input
            type="number"
            value={variableCosts}
            onChange={(e) => setVariableCosts(Number(e.target.value))}
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
              <div className="text-sm text-gray-500">Gross Margin</div>
              <div className="text-2xl font-bold text-purple-600">
                {result.grossMargin.toFixed(1)}%
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Monthly COGS</div>
                <div className="text-lg font-bold text-green-600">
                  {formatCurrency(result.monthlyCOGS)}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Monthly Profit</div>
                <div className="text-lg font-bold text-blue-600">
                  {formatCurrency(result.monthlyProfit)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="rounded-md border p-4 h-64">
          <h3 className="text-sm font-medium mb-2">COGS Analysis</h3>
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
                dataKey="revenue" 
                name="Revenue" 
                stroke="#7ac9a7" 
                strokeWidth={3}
                dot={{ r: 0 }}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="cogs" 
                name="COGS" 
                stroke="#e9c46a" 
                strokeWidth={3}
                dot={{ r: 0 }}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="grossProfit" 
                name="Gross Profit" 
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
      <h3 className="text-lg font-medium text-amber-800">Understanding COGS</h3>
      <p className="text-sm text-amber-700">
        Cost of Goods Sold (COGS) represents the direct costs of producing goods or services. 
        It includes both fixed and variable costs associated with production. Understanding COGS 
        is crucial for pricing decisions, profitability analysis, and business optimization.
      </p>
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-amber-800">Key Components:</h4>
        <ul className="list-disc pl-5 text-sm text-amber-700">
          <li><strong>Unit Cost:</strong> Direct cost per unit of product</li>
          <li><strong>Units Sold:</strong> Total number of units sold</li>
          <li><strong>Fixed Costs:</strong> Overhead costs that don't vary with production</li>
          <li><strong>Variable Costs:</strong> Costs that change with production volume</li>
          <li><strong>Gross Profit:</strong> Revenue minus COGS</li>
          <li><strong>Gross Margin:</strong> Gross profit as a percentage of revenue</li>
        </ul>
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="COGS Calculator"
      description="Calculate your Cost of Goods Sold (COGS) to optimize product costs and pricing."
      icon={<Calculator className="h-6 w-6" />}
      calculatorContent={calculatorContent}
      
      showSeparateAboutSection={true}
      activeTab="business"
      activeSubTab="operations"
    />
  );
};

export default COGSCalculator; 