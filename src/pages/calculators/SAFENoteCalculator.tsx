import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RefreshCw, DollarSign, Percent, TrendingUp, Calculator, Target } from 'lucide-react';
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

interface SAFEData {
  investmentAmount: number;
  valuationCap: number;
  discountRate: number;
  futureValuation: number;
}

interface BenchmarkData {
  name: string;
  value: number;
}

const SAFENoteCalculator = () => {
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [valuationCap, setValuationCap] = useState(5000000);
  const [discountRate, setDiscountRate] = useState(20);
  const [futureValuation, setFutureValuation] = useState(10000000);
  const [result, setResult] = useState({
    effectivePrice: 0,
    sharesIssued: 0,
    ownershipPercentage: 0,
    conversionPrice: 0,
    discountPrice: 0,
  });
  const [benchmarkData, setBenchmarkData] = useState<BenchmarkData[]>([
    { name: 'Seed', value: 20 },
    { name: 'Series A', value: 25 },
    { name: 'Series B', value: 30 },
    { name: 'Series C', value: 35 },
    { name: 'Growth', value: 40 },
  ]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculateResults = () => {
    // Calculate conversion price (lower of valuation cap or discounted price)
    const discountedPrice = futureValuation * (1 - discountRate / 100);
    const conversionPrice = Math.min(valuationCap, discountedPrice);
    
    // Calculate shares issued
    const sharesIssued = investmentAmount / conversionPrice;
    
    // Calculate ownership percentage
    const ownershipPercentage = (sharesIssued / (sharesIssued + 1000000)) * 100; // Assuming 1M shares outstanding
    
    // Calculate effective price per share
    const effectivePrice = investmentAmount / sharesIssued;

    setResult({
      effectivePrice,
      sharesIssued,
      ownershipPercentage,
      conversionPrice,
      discountPrice: discountedPrice,
    });
  };

  useEffect(() => {
    calculateResults();
  }, [investmentAmount, valuationCap, discountRate, futureValuation]);

  const handleReset = () => {
    setInvestmentAmount(100000);
    setValuationCap(5000000);
    setDiscountRate(20);
    setFutureValuation(10000000);
  };

  const calculatorContent = (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Investment Amount</label>
              <span className="text-sm font-bold">{formatCurrency(investmentAmount)}</span>
            </div>
            <Slider 
              value={[investmentAmount]} 
              min={0} 
              max={1000000} 
              step={10000}
              onValueChange={(value) => setInvestmentAmount(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Valuation Cap</label>
              <span className="text-sm font-bold">{formatCurrency(valuationCap)}</span>
            </div>
            <Slider 
              value={[valuationCap]} 
              min={0} 
              max={20000000} 
              step={100000}
              onValueChange={(value) => setValuationCap(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={valuationCap}
              onChange={(e) => setValuationCap(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Discount Rate</label>
              <span className="text-sm font-bold">{discountRate}%</span>
            </div>
            <Slider 
              value={[discountRate]} 
              min={0} 
              max={50} 
              step={1}
              onValueChange={(value) => setDiscountRate(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={discountRate}
              onChange={(e) => setDiscountRate(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Future Valuation</label>
              <span className="text-sm font-bold">{formatCurrency(futureValuation)}</span>
            </div>
            <Slider 
              value={[futureValuation]} 
              min={0} 
              max={50000000} 
              step={500000}
              onValueChange={(value) => setFutureValuation(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={futureValuation}
              onChange={(e) => setFutureValuation(Number(e.target.value))}
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
                <div className="text-sm text-gray-500">Effective Price per Share</div>
                <div className="text-2xl font-bold text-purple-600">
                  {formatCurrency(result.effectivePrice)}
                </div>
                <div className="text-sm text-gray-500 mt-1">per share</div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Shares Issued</div>
                  <div className="text-lg font-bold text-green-600">
                    {result.sharesIssued.toFixed(0)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Ownership %</div>
                  <div className="text-lg font-bold text-blue-600">
                    {result.ownershipPercentage.toFixed(2)}%
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
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Bar 
                  dataKey="value" 
                  name="Typical Discount Rate" 
                  fill="#245e4f"
                />
                <ReferenceLine 
                  y={discountRate} 
                  stroke="#e9c46a" 
                  strokeWidth={2}
                  label={{ value: `Your Rate: ${discountRate}%`, position: 'top', fill: '#e9c46a' }} 
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
      <h3 className="text-lg font-medium text-amber-800">Understanding SAFE Notes</h3>
      <p className="text-sm text-amber-700">
        A SAFE (Simple Agreement for Future Equity) is an investment contract that provides rights to obtain equity in a future priced round. 
        It's a popular instrument for early-stage startups to raise capital without immediately determining a valuation.
      </p>
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-amber-800">Key Components:</h4>
        <ul className="list-disc pl-5 text-sm text-amber-700">
          <li><strong>Investment Amount:</strong> The amount being invested in the SAFE</li>
          <li><strong>Valuation Cap:</strong> Maximum valuation at which the SAFE will convert</li>
          <li><strong>Discount Rate:</strong> Percentage discount on the future round's price</li>
          <li><strong>Future Valuation:</strong> The company's valuation in the next funding round</li>
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="font-medium text-amber-800">Conversion Formulas:</h4>
        <div className="bg-amber-50 p-4 rounded-lg mt-2">
          <p className="text-sm text-amber-700">Conversion Price = Min(Valuation Cap, Future Valuation × (1 - Discount Rate))</p>
          <p className="text-sm text-amber-700">Shares Issued = Investment Amount / Conversion Price</p>
          <p className="text-sm text-amber-700">Ownership % = Shares Issued / (Shares Issued + Outstanding Shares)</p>
        </div>
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="SAFE Note Calculator"
      description="Calculate and analyze SAFE note conversions to understand potential equity outcomes."
      icon={<DollarSign className="h-6 w-6" />}
      calculatorContent={calculatorContent}
      aboutContent={aboutContent}
      showSeparateAboutSection={true}
      activeTab="business"
      activeSubTab="valuation"
    />
  );
};

export default SAFENoteCalculator; 