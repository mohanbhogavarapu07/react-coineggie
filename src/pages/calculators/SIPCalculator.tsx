
import React, { useState, useEffect } from 'react';
import { CalculatorLayout } from '@/layouts/CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { BarChart3, RefreshCw } from 'lucide-react';
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';
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

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [result, setResult] = useState({
    totalInvestment: 0,
    totalValue: 0,
    wealthGained: 0,
  });
  const [chartData, setChartData] = useState<any[]>([]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const months = years * 12;
    const totalInvestment = monthlyInvestment * months;
    
    // A = P × ({[1 + i]^n - 1} / i) × (1 + i)
    const totalValue = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * 
      (1 + monthlyRate);
      
    const wealthGained = totalValue - totalInvestment;
    
    setResult({
      totalInvestment,
      totalValue,
      wealthGained,
    });

    generateChartData(monthlyInvestment, monthlyRate, months);
  };

  const generateChartData = (monthlyAmount: number, rate: number, months: number) => {
    const data = [];
    let runningInvestment = 0;
    let runningValue = 0;

    for (let i = 0; i <= months; i += 12) {
      // For yearly data points
      const currentMonth = i === 0 ? 1 : i;
      runningInvestment = monthlyAmount * currentMonth;
      runningValue = monthlyAmount * 
        ((Math.pow(1 + rate, currentMonth) - 1) / rate) * 
        (1 + rate);
      
      data.push({
        year: Math.floor(i / 12),
        investment: Math.round(runningInvestment),
        value: Math.round(runningValue),
        returns: Math.round(runningValue - runningInvestment),
      });
    }
    
    setChartData(data);
  };

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, years, expectedReturn]);

  const handleReset = () => {
    setMonthlyInvestment(5000);
    setYears(10);
    setExpectedReturn(12);
  };

  return (
    <CalculatorLayout
      title="SIP Calculator"
      description="Calculate returns on your systematic investment plans"
      icon={<BarChart3 className="h-6 w-6" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Monthly Investment</label>
              <span className="text-sm font-bold">₹{monthlyInvestment.toLocaleString()}</span>
            </div>
            <Slider 
              value={[monthlyInvestment]} 
              min={500} 
              max={100000} 
              step={500}
              onValueChange={(value) => setMonthlyInvestment(value[0])}
              className="bg-finance-green/10"
            />
            <Input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Time Period (Years)</label>
              <span className="text-sm font-bold">{years} years</span>
            </div>
            <Slider 
              value={[years]} 
              min={1} 
              max={30} 
              step={1}
              onValueChange={(value) => setYears(value[0])}
              className="bg-finance-green/10"
            />
            <Input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Expected Return Rate (%)</label>
              <span className="text-sm font-bold">{expectedReturn}%</span>
            </div>
            <Slider 
              value={[expectedReturn]} 
              min={1} 
              max={30} 
              step={0.5}
              onValueChange={(value) => setExpectedReturn(value[0])}
              className="bg-finance-green/10"
            />
            <Input
              type="number"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
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
                <div className="text-sm text-muted-foreground">Total Value</div>
                <div className="text-2xl font-bold text-finance-green">
                  {formatCurrency(result.totalValue)}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Total Investment</div>
                  <div className="text-lg font-bold">
                    {formatCurrency(result.totalInvestment)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Wealth Gained</div>
                  <div className="text-lg font-bold text-finance-green">
                    {formatCurrency(result.wealthGained)}
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
                <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
                <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="investment" 
                  stackId="1" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  name="Investment"
                />
                <Area 
                  type="monotone" 
                  dataKey="returns" 
                  stackId="1" 
                  stroke="#245e4f" 
                  fill="#245e4f" 
                  name="Returns"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-md">
        <h3 className="text-lg font-medium text-amber-800 mb-2">How to use this calculator?</h3>
        <p className="text-sm text-amber-700">
          A Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly in mutual funds.
          This calculator helps you estimate the returns on your SIP investments over time based on your monthly 
          contribution, investment period, and expected annual return rate. The graph shows how your wealth 
          can grow with the power of compounding over the years.
        </p>
      </div>
    </CalculatorLayout>
  );
};

export default SIPCalculator;
