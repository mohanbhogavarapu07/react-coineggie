import React, { useState, useEffect } from 'react';
import { CalculatorLayout } from '@/layouts/CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Calculator, RefreshCw, TrendingUp, DollarSign, Percent } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

interface GrossMarginResults {
  revenue: number;
  cogs: number;
  grossProfit: number;
  grossMargin: number;
  contributionMargin: number;
  markup: number;
}

const INITIAL_RESULTS: GrossMarginResults = {
  revenue: 0,
  cogs: 0,
  grossProfit: 0,
  grossMargin: 0,
  contributionMargin: 0,
  markup: 0
};

const GrossMarginCalculator = () => {
  const [revenue, setRevenue] = useState(100000);
  const [cogs, setCogs] = useState(60000);
  const [result, setResult] = useState<GrossMarginResults>(INITIAL_RESULTS);
  const [chartData, setChartData] = useState<any[]>([]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculateGrossMargin = () => {
    const grossProfit = revenue - cogs;
    const grossMargin = (grossProfit / revenue) * 100;
    const contributionMargin = (grossProfit / revenue) * 100;
    const markup = (grossProfit / cogs) * 100;

    setResult({
      revenue,
      cogs,
      grossProfit,
      grossMargin,
      contributionMargin,
      markup
    });

    generateChartData(revenue, cogs);
  };

  const generateChartData = (revenue: number, cogs: number) => {
    const data = [];
    const steps = 12; // Monthly data points
    
    for (let i = 0; i <= steps; i++) {
      const monthRevenue = revenue * (i / steps);
      const monthCogs = cogs * (i / steps);
      const monthGrossProfit = monthRevenue - monthCogs;
      const monthGrossMargin = (monthGrossProfit / monthRevenue) * 100;
      
      data.push({
        month: i,
        revenue: Math.round(monthRevenue),
        cogs: Math.round(monthCogs),
        grossProfit: Math.round(monthGrossProfit),
        grossMargin: Math.round(monthGrossMargin)
      });
    }
    
    setChartData(data);
  };

  useEffect(() => {
    calculateGrossMargin();
  }, [revenue, cogs]);

  const handleReset = () => {
    setRevenue(100000);
    setCogs(60000);
  };

  const calculatorContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Total Revenue</label>
            <span className="text-sm font-bold">{formatCurrency(revenue)}</span>
          </div>
          <Slider 
            value={[revenue]} 
            min={0} 
            max={1000000} 
            step={10000}
            onValueChange={(value) => setRevenue(value[0])}
            className="bg-finance-green/10"
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
            <label className="text-sm font-medium">Cost of Goods Sold (COGS)</label>
            <span className="text-sm font-bold">{formatCurrency(cogs)}</span>
          </div>
          <Slider 
            value={[cogs]} 
            min={0} 
            max={revenue} 
            step={10000}
            onValueChange={(value) => setCogs(value[0])}
            className="bg-finance-green/10"
          />
          <Input
            type="number"
            value={cogs}
            onChange={(e) => setCogs(Number(e.target.value))}
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
          <Card className="bg-finance-green/5 border-finance-green/20">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Gross Profit Margin</div>
              <div className="text-2xl font-bold text-finance-green">
                {result.grossMargin.toFixed(1)}%
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Gross Profit</div>
                <div className="text-lg font-bold">
                  {formatCurrency(result.grossProfit)}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Markup</div>
                <div className="text-lg font-bold text-finance-green">
                  {result.markup.toFixed(1)}%
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Contribution Margin</div>
                <div className="text-lg font-bold">
                  {result.contributionMargin.toFixed(1)}%
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">COGS Ratio</div>
                <div className="text-lg font-bold text-finance-green">
                  {((cogs / revenue) * 100).toFixed(1)}%
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="rounded-md border p-4 h-64">
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
                stroke="#8884d8" 
                fill="#8884d8" 
                name="Revenue"
              />
              <Area 
                type="monotone" 
                dataKey="cogs" 
                stackId="1" 
                stroke="#ff8042" 
                fill="#ff8042" 
                name="COGS"
              />
              <Area 
                type="monotone" 
                dataKey="grossProfit" 
                stackId="1" 
                stroke="#245e4f" 
                fill="#245e4f" 
                name="Gross Profit"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const aboutContent = (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-amber-800">Understanding Gross Profit Margin</h3>
      <p className="text-sm text-amber-700">
        Gross Profit Margin is a key financial metric that measures the percentage of revenue that exceeds the cost of goods sold (COGS). 
        It indicates how efficiently a company is using its resources to produce goods or services. A higher gross margin indicates better 
        efficiency and profitability at the production level.
      </p>
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-amber-800">Key Components:</h4>
        <ul className="list-disc pl-5 text-sm text-amber-700">
          <li><strong>Revenue:</strong> Total income from sales</li>
          <li><strong>COGS:</strong> Direct costs of producing goods/services</li>
          <li><strong>Gross Profit:</strong> Revenue minus COGS</li>
          <li><strong>Gross Margin:</strong> Gross profit as a percentage of revenue</li>
          <li><strong>Markup:</strong> Gross profit as a percentage of COGS</li>
          <li><strong>Contribution Margin:</strong> Gross profit as a percentage of revenue</li>
        </ul>
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="Gross Profit Margin Calculator"
      description="Calculate and analyze your gross profit margin and related metrics"
      icon={<Calculator className="h-6 w-6" />}
      calculatorContent={calculatorContent}
      aboutContent={aboutContent}
      showSeparateAboutSection={true}
    />
  );
};

export default GrossMarginCalculator; 