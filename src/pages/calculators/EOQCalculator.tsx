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
} from 'recharts';
import { CalculatorLayout } from '@/layouts/CalculatorLayout';
import { calculateEOQ, generateEOQCostData, formatIndianRupees } from '@/utils/eoqCalculator';

interface EOQData {
  orderQuantity: number;
  holdingCost: number;
  orderCost: number;
  totalCost: number;
}

const EOQCalculator = () => {
  const [annualDemand, setAnnualDemand] = useState(1000);
  const [orderCost, setOrderCost] = useState(200);
  const [holdingCost, setHoldingCost] = useState(20);
  const [unitCost, setUnitCost] = useState(100);
  const [result, setResult] = useState({
    eoq: 0,
    totalAnnualCost: 0,
    orderCyclesPerYear: 0,
    daysBetweenOrders: 0,
    annualHoldingCost: 0,
    annualOrderCost: 0,
    totalInventoryCost: 0,
  });
  const [chartData, setChartData] = useState<EOQData[]>([]);

  const calculateResults = () => {
    const inputs = {
      annualDemand,
      orderCost,
      holdingCost,
      unitCost,
    };

    const calculatedResults = calculateEOQ(inputs);
    setResult(calculatedResults);

    const costData = generateEOQCostData(inputs);
    setChartData(costData);
  };

  useEffect(() => {
    calculateResults();
  }, [annualDemand, orderCost, holdingCost, unitCost]);

  const handleReset = () => {
    setAnnualDemand(1000);
    setOrderCost(200);
    setHoldingCost(20);
    setUnitCost(100);
  };

  const calculatorContent = (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Annual Demand</label>
              <span className="text-sm font-bold">{annualDemand} units</span>
            </div>
            <Slider 
              value={[annualDemand]} 
              min={1} 
              max={10000} 
              step={100}
              onValueChange={(value) => setAnnualDemand(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={annualDemand}
              onChange={(e) => setAnnualDemand(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Order Cost</label>
              <span className="text-sm font-bold">{formatIndianRupees(orderCost)}</span>
            </div>
            <Slider 
              value={[orderCost]} 
              min={0} 
              max={1000} 
              step={10}
              onValueChange={(value) => setOrderCost(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={orderCost}
              onChange={(e) => setOrderCost(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Holding Cost</label>
              <span className="text-sm font-bold">{formatIndianRupees(holdingCost)}</span>
            </div>
            <Slider 
              value={[holdingCost]} 
              min={0} 
              max={100} 
              step={1}
              onValueChange={(value) => setHoldingCost(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={holdingCost}
              onChange={(e) => setHoldingCost(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Unit Cost</label>
              <span className="text-sm font-bold">{formatIndianRupees(unitCost)}</span>
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

          <Button onClick={handleReset} variant="outline" className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset Values
          </Button>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Economic Order Quantity</div>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(result.eoq)} units
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Total Annual Cost</div>
                  <div className="text-lg font-bold text-green-600">
                    {formatIndianRupees(result.totalAnnualCost)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Order Cycles/Year</div>
                  <div className="text-lg font-bold text-blue-600">
                    {result.orderCyclesPerYear.toFixed(1)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="rounded-md border p-4 h-64">
            <h3 className="text-sm font-medium mb-2">Cost Analysis</h3>
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
                  dataKey="orderQuantity" 
                  label={{ value: 'Order Quantity', position: 'insideBottom', offset: -5 }} 
                />
                <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
                <Tooltip formatter={(value) => formatIndianRupees(Number(value))} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="totalCost" 
                  name="Total Cost" 
                  stroke="#245e4f" 
                  strokeWidth={3}
                  dot={{ r: 0 }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="holdingCost" 
                  name="Holding Cost" 
                  stroke="#7ac9a7" 
                  strokeWidth={2}
                  dot={{ r: 0 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="orderCost" 
                  name="Order Cost" 
                  stroke="#e9c46a" 
                  strokeWidth={2}
                  dot={{ r: 0 }}
                />
                <ReferenceLine 
                  x={result.eoq} 
                  stroke="#245e4f" 
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  label={{ value: `EOQ: ${Math.round(result.eoq)}`, position: 'top', fill: '#245e4f' }} 
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
      <h3 className="text-lg font-medium text-amber-800">Understanding EOQ</h3>
      <p className="text-sm text-amber-700">
        The Economic Order Quantity (EOQ) model helps businesses determine the optimal order quantity 
        that minimizes total inventory costs, including both ordering costs and holding costs.
      </p>
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-amber-800">Key Components:</h4>
        <ul className="list-disc pl-5 text-sm text-amber-700">
          <li><strong>Annual Demand:</strong> Total units needed per year</li>
          <li><strong>Order Cost:</strong> Fixed cost per order</li>
          <li><strong>Holding Cost:</strong> Cost to hold one unit for a year</li>
          <li><strong>Unit Cost:</strong> Cost per unit of inventory</li>
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="font-medium text-amber-800">EOQ Formula:</h4>
        <div className="bg-amber-50 p-4 rounded-lg mt-2">
          <p className="text-sm text-amber-700">EOQ = √(2DS/H)</p>
          <p className="text-xs text-amber-600 mt-1">
            Where:<br />
            D = Annual Demand<br />
            S = Order Cost<br />
            H = Holding Cost
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="Economic Order Quantity Calculator"
      description="Calculate the optimal order quantity to minimize inventory costs."
      icon={<Package className="h-6 w-6" />}
      calculatorContent={calculatorContent}
      aboutContent={aboutContent}
      showSeparateAboutSection={true}
      activeTab="business"
      activeSubTab="operations"
    />
  );
};

export default EOQCalculator; 