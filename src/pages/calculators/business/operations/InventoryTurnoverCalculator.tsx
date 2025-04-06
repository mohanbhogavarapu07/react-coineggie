import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RefreshCw, Package, DollarSign, Calendar, Calculator, Target } from 'lucide-react';
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
  BarChart,
  Bar,
} from 'recharts';
import { CalculatorLayout } from '@/layouts/CalculatorLayout';

interface InventoryData {
  costOfGoodsSold: number;
  beginningInventory: number;
  endingInventory: number;
  averageInventory: number;
}

interface BenchmarkData {
  name: string;
  value: number;
}

const InventoryTurnoverCalculator = () => {
  const [costOfGoodsSold, setCostOfGoodsSold] = useState(1000000);
  const [beginningInventory, setBeginningInventory] = useState(250000);
  const [endingInventory, setEndingInventory] = useState(150000);
  const [averageInventory, setAverageInventory] = useState(200000);
  const [result, setResult] = useState({
    turnoverRatio: 0,
    daysToSell: 0,
    averageInventory: 0,
  });
  const [benchmarkData, setBenchmarkData] = useState<BenchmarkData[]>([
    { name: 'Apparel', value: 4.5 },
    { name: 'Electronics', value: 5.2 },
    { name: 'Grocery', value: 12.8 },
    { name: 'Furniture', value: 2.3 },
    { name: 'General Retail', value: 3.8 },
  ]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculateResults = () => {
    // Calculate average inventory
    const avgInventory = (beginningInventory + endingInventory) / 2;
    setAverageInventory(avgInventory);

    // Calculate turnover ratio
    const turnoverRatio = costOfGoodsSold / avgInventory;
    
    // Calculate days to sell
    const daysToSell = 365 / turnoverRatio;

    setResult({
      turnoverRatio,
      daysToSell,
      averageInventory: avgInventory,
    });
  };

  useEffect(() => {
    calculateResults();
  }, [costOfGoodsSold, beginningInventory, endingInventory]);

  const handleReset = () => {
    setCostOfGoodsSold(1000000);
    setBeginningInventory(250000);
    setEndingInventory(150000);
    setAverageInventory(200000);
  };

  const calculatorContent = (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Cost of Goods Sold</label>
              <span className="text-sm font-bold">{formatCurrency(costOfGoodsSold)}</span>
            </div>
            <Slider 
              value={[costOfGoodsSold]} 
              min={0} 
              max={5000000} 
              step={50000}
              onValueChange={(value) => setCostOfGoodsSold(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={costOfGoodsSold}
              onChange={(e) => setCostOfGoodsSold(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Beginning Inventory</label>
              <span className="text-sm font-bold">{formatCurrency(beginningInventory)}</span>
            </div>
            <Slider 
              value={[beginningInventory]} 
              min={0} 
              max={1000000} 
              step={10000}
              onValueChange={(value) => setBeginningInventory(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={beginningInventory}
              onChange={(e) => setBeginningInventory(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Ending Inventory</label>
              <span className="text-sm font-bold">{formatCurrency(endingInventory)}</span>
            </div>
            <Slider 
              value={[endingInventory]} 
              min={0} 
              max={1000000} 
              step={10000}
              onValueChange={(value) => setEndingInventory(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={endingInventory}
              onChange={(e) => setEndingInventory(Number(e.target.value))}
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
                <div className="text-sm text-gray-500">Inventory Turnover Ratio</div>
                <div className="text-2xl font-bold text-purple-600">
                  {result.turnoverRatio.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500 mt-1">times per year</div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Days to Sell</div>
                  <div className="text-lg font-bold text-green-600">
                    {result.daysToSell.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">days</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Average Inventory</div>
                  <div className="text-lg font-bold text-blue-600">
                    {formatCurrency(result.averageInventory)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="rounded-md border p-4 h-64">
            <h3 className="text-sm font-medium mb-2">Industry Benchmarks</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={benchmarkData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="value" 
                  name="Turnover Ratio" 
                  fill="#245e4f"
                />
                <ReferenceLine 
                  y={result.turnoverRatio} 
                  stroke="#e9c46a" 
                  strokeWidth={2}
                  label={{ value: `Your Ratio: ${result.turnoverRatio.toFixed(2)}`, position: 'top', fill: '#e9c46a' }} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const aboutContent = (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-amber-800">Understanding Inventory Turnover</h3>
      <p className="text-sm text-amber-700">
        Inventory turnover ratio measures how many times a company's inventory is sold and replaced over a period. 
        A higher ratio indicates efficient inventory management and strong sales, while a lower ratio may suggest 
        overstocking or weak sales.
      </p>
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-amber-800">Key Components:</h4>
        <ul className="list-disc pl-5 text-sm text-amber-700">
          <li><strong>Cost of Goods Sold:</strong> Total cost of inventory sold during the period</li>
          <li><strong>Beginning Inventory:</strong> Value of inventory at the start of the period</li>
          <li><strong>Ending Inventory:</strong> Value of inventory at the end of the period</li>
          <li><strong>Average Inventory:</strong> (Beginning + Ending) / 2</li>
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="font-medium text-amber-800">Inventory Turnover Formula:</h4>
        <div className="bg-amber-50 p-4 rounded-lg mt-2">
          <p className="text-sm text-amber-700">Turnover Ratio = Cost of Goods Sold / Average Inventory</p>
          <p className="text-xs text-amber-600 mt-1">
            Days to Sell = 365 / Turnover Ratio
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="Inventory Turnover Calculator"
      description="Calculate your inventory turnover ratio and compare it with industry benchmarks."
      icon={<Package className="h-6 w-6" />}
      calculatorContent={calculatorContent}
      
      showSeparateAboutSection={true}
      activeTab="business"
      activeSubTab="operations"
    />
  );
};

export default InventoryTurnoverCalculator; 