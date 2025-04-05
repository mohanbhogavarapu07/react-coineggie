import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RefreshCw, DollarSign, Percent, Calendar, Calculator, TrendingUp } from 'lucide-react';
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

interface LoanData {
  month: number;
  principal: number;
  interest: number;
  balance: number;
  totalPayment: number;
}

const BusinessLoanEMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(10000000);
  const [interestRate, setInterestRate] = useState(10);
  const [loanTerm, setLoanTerm] = useState(60);
  const [result, setResult] = useState({
    monthlyEMI: 0,
    totalInterest: 0,
    totalPayment: 0,
    processingFee: 0,
  });
  const [chartData, setChartData] = useState<LoanData[]>([]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const calculateEMI = () => {
    // Convert annual interest rate to monthly
    const monthlyRate = interestRate / 12 / 100;
    
    // Calculate processing fee (typically 1-2% of loan amount)
    const processingFee = loanAmount * 0.02;
    
    // Calculate monthly EMI using the formula: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
    // Where P = Principal, r = monthly interest rate, n = total number of months
    const monthlyEMI = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm) / 
                       (Math.pow(1 + monthlyRate, loanTerm) - 1);
    
    // Calculate total payment and interest
    const totalPayment = monthlyEMI * loanTerm;
    const totalInterest = totalPayment - loanAmount;
    
    // Generate amortization schedule
    const schedule: LoanData[] = [];
    let balance = loanAmount;
    
    for (let month = 1; month <= loanTerm; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyEMI - interestPayment;
      balance -= principalPayment;
      
      schedule.push({
        month,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
        totalPayment: monthlyEMI,
      });
    }

    setResult({
      monthlyEMI,
      totalInterest,
      totalPayment,
      processingFee,
    });

    setChartData(schedule);
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTerm]);

  const handleReset = () => {
    setLoanAmount(10000000);
    setInterestRate(10);
    setLoanTerm(60);
  };

  const calculatorContent = (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Loan Amount</label>
              <span className="text-sm font-bold">{formatCurrency(loanAmount)}</span>
            </div>
            <Slider 
              value={[loanAmount]} 
              min={100000} 
              max={50000000} 
              step={100000}
              onValueChange={(value) => setLoanAmount(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Interest Rate (% per annum)</label>
              <span className="text-sm font-bold">{interestRate}%</span>
            </div>
            <Slider 
              value={[interestRate]} 
              min={5} 
              max={30} 
              step={0.1}
              onValueChange={(value) => setInterestRate(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Loan Term (Months)</label>
              <span className="text-sm font-bold">{loanTerm}</span>
            </div>
            <Slider 
              value={[loanTerm]} 
              min={12} 
              max={120} 
              step={1}
              onValueChange={(value) => setLoanTerm(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
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
                <div className="text-sm text-gray-500">Monthly EMI</div>
                <div className="text-2xl font-bold text-purple-600">
                  {formatCurrency(result.monthlyEMI)}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Total Interest</div>
                  <div className="text-lg font-bold text-red-600">
                    {formatCurrency(result.totalInterest)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Processing Fee</div>
                  <div className="text-lg font-bold text-amber-600">
                    {formatCurrency(result.processingFee)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="rounded-md border p-4 h-64">
            <h3 className="text-sm font-medium mb-2">Loan Amortization Schedule</h3>
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
                <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="principal" 
                  name="Principal" 
                  stroke="#7ac9a7" 
                  strokeWidth={3}
                  dot={{ r: 0 }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="interest" 
                  name="Interest" 
                  stroke="#e9c46a" 
                  strokeWidth={3}
                  dot={{ r: 0 }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="balance" 
                  name="Balance" 
                  stroke="#245e4f" 
                  strokeWidth={2}
                  dot={{ r: 0 }}
                  activeDot={{ r: 6 }}
                />
                <ReferenceLine 
                  y={0} 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  label={{ value: 'Zero', position: 'right', fill: '#ef4444' }} 
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
      <h3 className="text-lg font-medium text-amber-800">Understanding Business Loan EMI</h3>
      <p className="text-sm text-amber-700">
        A business loan EMI (Equated Monthly Installment) is the fixed amount you need to pay 
        each month to repay your loan. The EMI consists of both principal and interest components. 
        Enter your loan amount, interest rate, and loan term to calculate your monthly EMI and 
        understand the total cost of borrowing.
      </p>
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-amber-800">Key Components:</h4>
        <ul className="list-disc pl-5 text-sm text-amber-700">
          <li><strong>Principal:</strong> The amount you borrow from the lender</li>
          <li><strong>Interest Rate:</strong> The annual rate charged by the lender</li>
          <li><strong>Processing Fee:</strong> A one-time fee charged by the lender (typically 1-2% of loan amount)</li>
          <li><strong>Loan Term:</strong> The duration over which you'll repay the loan</li>
        </ul>
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="Business Loan EMI Calculator"
      description="Calculate your business loan EMI and understand the total cost of borrowing."
      icon={<Calculator className="h-6 w-6" />}
      calculatorContent={calculatorContent}
      aboutContent={aboutContent}
      showSeparateAboutSection={true}
    />
  );
};

export default BusinessLoanEMICalculator; 