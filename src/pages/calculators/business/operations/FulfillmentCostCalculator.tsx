import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RefreshCw, Package, DollarSign, Truck, Box, ShoppingCart } from 'lucide-react';
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

interface FulfillmentData {
  totalOrders: number;
  laborCost: number;
  packagingCost: number;
  shippingCost: number;
  warehouseCost: number;
  technologyCost: number;
}

interface BenchmarkData {
  name: string;
  value: number;
}

const FulfillmentCostCalculator = () => {
  const [totalOrders, setTotalOrders] = useState(1000);
  const [laborCost, setLaborCost] = useState(50000);
  const [packagingCost, setPackagingCost] = useState(20000);
  const [shippingCost, setShippingCost] = useState(75000);
  const [warehouseCost, setWarehouseCost] = useState(30000);
  const [technologyCost, setTechnologyCost] = useState(15000);
  const [result, setResult] = useState({
    costPerOrder: 0,
    laborCostPerOrder: 0,
    packagingCostPerOrder: 0,
    shippingCostPerOrder: 0,
    warehouseCostPerOrder: 0,
    technologyCostPerOrder: 0,
    totalFulfillmentCost: 0,
  });
  const [benchmarkData, setBenchmarkData] = useState<BenchmarkData[]>([
    { name: 'E-commerce', value: 250 },
    { name: 'Retail', value: 180 },
    { name: 'Electronics', value: 350 },
    { name: 'Fashion', value: 150 },
    { name: 'Food & Beverage', value: 200 },
  ]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculateResults = () => {
    // Calculate costs per order
    const laborCostPerOrder = laborCost / totalOrders;
    const packagingCostPerOrder = packagingCost / totalOrders;
    const shippingCostPerOrder = shippingCost / totalOrders;
    const warehouseCostPerOrder = warehouseCost / totalOrders;
    const technologyCostPerOrder = technologyCost / totalOrders;
    
    // Calculate total fulfillment cost
    const totalFulfillmentCost = laborCost + packagingCost + shippingCost + warehouseCost + technologyCost;
    const costPerOrder = totalFulfillmentCost / totalOrders;

    setResult({
      costPerOrder,
      laborCostPerOrder,
      packagingCostPerOrder,
      shippingCostPerOrder,
      warehouseCostPerOrder,
      technologyCostPerOrder,
      totalFulfillmentCost,
    });
  };

  useEffect(() => {
    calculateResults();
  }, [totalOrders, laborCost, packagingCost, shippingCost, warehouseCost, technologyCost]);

  const handleReset = () => {
    setTotalOrders(1000);
    setLaborCost(50000);
    setPackagingCost(20000);
    setShippingCost(75000);
    setWarehouseCost(30000);
    setTechnologyCost(15000);
  };

  const calculatorContent = (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Total Orders</label>
              <span className="text-sm font-bold">{totalOrders}</span>
            </div>
            <Slider 
              value={[totalOrders]} 
              min={0} 
              max={10000} 
              step={100}
              onValueChange={(value) => setTotalOrders(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={totalOrders}
              onChange={(e) => setTotalOrders(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Labor Cost</label>
              <span className="text-sm font-bold">{formatCurrency(laborCost)}</span>
            </div>
            <Slider 
              value={[laborCost]} 
              min={0} 
              max={500000} 
              step={5000}
              onValueChange={(value) => setLaborCost(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={laborCost}
              onChange={(e) => setLaborCost(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Packaging Cost</label>
              <span className="text-sm font-bold">{formatCurrency(packagingCost)}</span>
            </div>
            <Slider 
              value={[packagingCost]} 
              min={0} 
              max={200000} 
              step={2000}
              onValueChange={(value) => setPackagingCost(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={packagingCost}
              onChange={(e) => setPackagingCost(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Shipping Cost</label>
              <span className="text-sm font-bold">{formatCurrency(shippingCost)}</span>
            </div>
            <Slider 
              value={[shippingCost]} 
              min={0} 
              max={500000} 
              step={5000}
              onValueChange={(value) => setShippingCost(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={shippingCost}
              onChange={(e) => setShippingCost(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Warehouse Cost</label>
              <span className="text-sm font-bold">{formatCurrency(warehouseCost)}</span>
            </div>
            <Slider 
              value={[warehouseCost]} 
              min={0} 
              max={300000} 
              step={3000}
              onValueChange={(value) => setWarehouseCost(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={warehouseCost}
              onChange={(e) => setWarehouseCost(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Technology Cost</label>
              <span className="text-sm font-bold">{formatCurrency(technologyCost)}</span>
            </div>
            <Slider 
              value={[technologyCost]} 
              min={0} 
              max={150000} 
              step={1500}
              onValueChange={(value) => setTechnologyCost(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={technologyCost}
              onChange={(e) => setTechnologyCost(Number(e.target.value))}
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
                <div className="text-sm text-gray-500">Total Fulfillment Cost per Order</div>
                <div className="text-2xl font-bold text-purple-600">
                  {formatCurrency(result.costPerOrder)}
                </div>
                <div className="text-sm text-gray-500 mt-1">per order</div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Labor Cost per Order</div>
                  <div className="text-lg font-bold text-green-600">
                    {formatCurrency(result.laborCostPerOrder)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Shipping Cost per Order</div>
                  <div className="text-lg font-bold text-blue-600">
                    {formatCurrency(result.shippingCostPerOrder)}
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
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Bar 
                  dataKey="value" 
                  name="Cost per Order" 
                  fill="#245e4f"
                />
                <ReferenceLine 
                  y={result.costPerOrder} 
                  stroke="#e9c46a" 
                  strokeWidth={2}
                  label={{ value: `Your Value: ${formatCurrency(result.costPerOrder)}`, position: 'top', fill: '#e9c46a' }} 
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
      <h3 className="text-lg font-medium text-amber-800">Understanding Fulfillment Costs</h3>
      <p className="text-sm text-amber-700">
        Fulfillment costs per order help businesses understand the total cost of processing and delivering orders. 
        This metric is crucial for pricing strategies and identifying areas for cost optimization.
      </p>
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-amber-800">Key Components:</h4>
        <ul className="list-disc pl-5 text-sm text-amber-700">
          <li><strong>Labor Cost:</strong> Wages and benefits for fulfillment staff</li>
          <li><strong>Packaging Cost:</strong> Materials and supplies for order packaging</li>
          <li><strong>Shipping Cost:</strong> Transportation and delivery expenses</li>
          <li><strong>Warehouse Cost:</strong> Storage and facility expenses</li>
          <li><strong>Technology Cost:</strong> Software and systems for order management</li>
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="font-medium text-amber-800">Cost Formulas:</h4>
        <div className="bg-amber-50 p-4 rounded-lg mt-2">
          <p className="text-sm text-amber-700">Cost per Order = Total Fulfillment Cost / Total Orders</p>
          <p className="text-sm text-amber-700">Total Fulfillment Cost = Labor + Packaging + Shipping + Warehouse + Technology</p>
          <p className="text-sm text-amber-700">Individual Cost per Order = Component Cost / Total Orders</p>
        </div>
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="Fulfillment Cost Calculator"
      description="Calculate and analyze your fulfillment costs per order to optimize your order processing operations."
      icon={<Package className="h-6 w-6" />}
      calculatorContent={calculatorContent}
     
      showSeparateAboutSection={true}
      activeTab="business"
      activeSubTab="operations"
    />
  );
};

export default FulfillmentCostCalculator; 