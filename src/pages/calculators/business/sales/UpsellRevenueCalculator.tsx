import React, { useState, useEffect } from 'react';
import { CalculatorLayout } from '@/layouts/CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RefreshCw, DollarSign, TrendingUp, Percent, Calculator, Target, ArrowUpRight } from 'lucide-react';
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

interface UpsellData {
  month: number;
  baseRevenue: number;
  upsellRevenue: number;
  totalRevenue: number;
  upsellRate: number;
  averageUpsellValue: number;
  customerCount: number;
}

const UpsellRevenueCalculator = () => {
  const [baseRevenue, setBaseRevenue] = useState(100000);
  const [upsellRate, setUpsellRate] = useState(20);
  const [averageUpsellValue, setAverageUpsellValue] = useState(500);
  const [customerCount, setCustomerCount] = useState(100);
  const [result, setResult] = useState({
    monthlyUpsellRevenue: 0,
    monthlyTotalRevenue: 0,
    upsellPercentage: 0,
    averageCustomerValue: 0,
    totalUpsellRevenue: 0,
    totalRevenue: 0,
  });
  const [chartData, setChartData] = useState<UpsellData[]>([]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const calculateUpsellRevenue = () => {
    // Calculate monthly metrics
    const monthlyBaseRevenue = baseRevenue;
    const monthlyUpsellRevenue = (customerCount * (upsellRate / 100) * averageUpsellValue);
    const monthlyTotalRevenue = monthlyBaseRevenue + monthlyUpsellRevenue;
    const upsellPercentage = (monthlyUpsellRevenue / monthlyTotalRevenue) * 100;
    const averageCustomerValue = monthlyTotalRevenue / customerCount;
    
    // Generate chart data for 12 months
    const data: UpsellData[] = [];
    let currentCustomers = customerCount;
    let totalUpsellRevenue = 0;
    let totalRevenue = 0;
    
    for (let month = 1; month <= 12; month++) {
      const monthCustomers = currentCustomers;
      const monthBaseRevenue = monthlyBaseRevenue;
      const monthUpsellRevenue = (monthCustomers * (upsellRate / 100) * averageUpsellValue);
      const monthTotalRevenue = monthBaseRevenue + monthUpsellRevenue;
      
      data.push({
        month,
        baseRevenue: monthBaseRevenue,
        upsellRevenue: monthUpsellRevenue,
        totalRevenue: monthTotalRevenue,
        upsellRate,
        averageUpsellValue,
        customerCount: monthCustomers,
      });
      
      currentCustomers = Math.floor(currentCustomers * 1.05); // 5% growth
      totalUpsellRevenue += monthUpsellRevenue;
      totalRevenue += monthTotalRevenue;
    }

    setResult({
      monthlyUpsellRevenue,
      monthlyTotalRevenue,
      upsellPercentage,
      averageCustomerValue,
      totalUpsellRevenue,
      totalRevenue,
    });

    setChartData(data);
  };

  useEffect(() => {
    calculateUpsellRevenue();
  }, [baseRevenue, upsellRate, averageUpsellValue, customerCount]);

  const handleReset = () => {
    setBaseRevenue(100000);
    setUpsellRate(20);
    setAverageUpsellValue(500);
    setCustomerCount(100);
  };

  const calculatorContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Base Monthly Revenue</label>
            <span className="text-sm font-bold">{formatCurrency(baseRevenue)}</span>
          </div>
          <Slider 
            value={[baseRevenue]} 
            min={0} 
            max={1000000} 
            step={10000}
            onValueChange={(value) => setBaseRevenue(value[0])}
            className="bg-purple-100"
          />
          <Input
            type="number"
            value={baseRevenue}
            onChange={(e) => setBaseRevenue(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Upsell Rate (%)</label>
            <span className="text-sm font-bold">{upsellRate}%</span>
          </div>
          <Slider 
            value={[upsellRate]} 
            min={0} 
            max={100} 
            step={1}
            onValueChange={(value) => setUpsellRate(value[0])}
            className="bg-purple-100"
          />
          <Input
            type="number"
            value={upsellRate}
            onChange={(e) => setUpsellRate(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Average Upsell Value</label>
            <span className="text-sm font-bold">{formatCurrency(averageUpsellValue)}</span>
          </div>
          <Slider 
            value={[averageUpsellValue]} 
            min={0} 
            max={10000} 
            step={100}
            onValueChange={(value) => setAverageUpsellValue(value[0])}
            className="bg-purple-100"
          />
          <Input
            type="number"
            value={averageUpsellValue}
            onChange={(e) => setAverageUpsellValue(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Customer Count</label>
            <span className="text-sm font-bold">{customerCount.toLocaleString()}</span>
          </div>
          <Slider 
            value={[customerCount]} 
            min={0} 
            max={1000} 
            step={10}
            onValueChange={(value) => setCustomerCount(value[0])}
            className="bg-purple-100"
          />
          <Input
            type="number"
            value={customerCount}
            onChange={(e) => setCustomerCount(Number(e.target.value))}
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
              <div className="text-sm text-gray-500">Upsell Revenue %</div>
              <div className="text-2xl font-bold text-purple-600">
                {result.upsellPercentage.toFixed(1)}%
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Monthly Upsell Revenue</div>
                <div className="text-lg font-bold text-green-600">
                  {formatCurrency(result.monthlyUpsellRevenue)}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Average Customer Value</div>
                <div className="text-lg font-bold text-blue-600">
                  {formatCurrency(result.averageCustomerValue)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="rounded-md border p-4 h-64">
          <h3 className="text-sm font-medium mb-2">Revenue Analysis</h3>
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
                dataKey="totalRevenue" 
                name="Total Revenue" 
                stroke="#7ac9a7" 
                strokeWidth={3}
                dot={{ r: 0 }}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="baseRevenue" 
                name="Base Revenue" 
                stroke="#e9c46a" 
                strokeWidth={3}
                dot={{ r: 0 }}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="upsellRevenue" 
                name="Upsell Revenue" 
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
      <h3 className="text-lg font-medium text-amber-800">Understanding Upsell Revenue</h3>
      <p className="text-sm text-amber-700">
        Upsell revenue is additional revenue generated by selling premium or complementary 
        products/services to existing customers. It's a key metric for measuring customer 
        lifetime value and business growth potential.
      </p>
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-amber-800">Key Components:</h4>
        <ul className="list-disc pl-5 text-sm text-amber-700">
          <li><strong>Base Revenue:</strong> Regular revenue from primary products/services</li>
          <li><strong>Upsell Rate:</strong> Percentage of customers who purchase upsells</li>
          <li><strong>Average Upsell Value:</strong> Revenue per upsell transaction</li>
          <li><strong>Customer Count:</strong> Total number of active customers</li>
          <li><strong>Upsell Revenue:</strong> Additional revenue from upsell activities</li>
          <li><strong>Customer Value:</strong> Average revenue per customer</li>
        </ul>
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="Upsell Revenue Calculator"
      description="Calculate and optimize your Upsell Revenue and Customer Lifetime Value"
      icon={<ArrowUpRight className="h-6 w-6" />}
      calculatorContent={calculatorContent}
      
      showSeparateAboutSection={true}
      activeTab="business"
      activeSubTab="sales"
    />
  );
};

export default UpsellRevenueCalculator; 