
import React, { useState, useEffect } from 'react';
import { CalculatorLayout } from '@/layouts/CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Home, RefreshCw, PieChart } from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart as RechartPieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

const HomeLoanEMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(3000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [result, setResult] = useState({
    emi: 0,
    totalInterest: 0,
    totalPayment: 0,
  });
  const [yearlyData, setYearlyData] = useState<any[]>([]);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculateEMI = () => {
    const principal = loanAmount;
    const ratePerMonth = interestRate / 100 / 12;
    const timeInMonths = loanTerm * 12;
    
    // EMI formula: P × r × (1 + r)^n / ((1 + r)^n - 1)
    const emi = principal * ratePerMonth * Math.pow(1 + ratePerMonth, timeInMonths) / 
      (Math.pow(1 + ratePerMonth, timeInMonths) - 1);
      
    const totalPayment = emi * timeInMonths;
    const totalInterest = totalPayment - principal;
    
    setResult({
      emi,
      totalInterest,
      totalPayment,
    });
    
    generateYearlyData(principal, ratePerMonth, timeInMonths, emi);
  };

  const generateYearlyData = (
    principal: number, 
    ratePerMonth: number, 
    timeInMonths: number, 
    emi: number
  ) => {
    let yearlyData = [];
    let remainingPrincipal = principal;
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;
    
    for (let year = 1; year <= Math.ceil(timeInMonths / 12); year++) {
      yearlyPrincipal = 0;
      yearlyInterest = 0;
      
      // Calculate for each month in the year
      const monthsInYear = year === Math.ceil(timeInMonths / 12) 
        ? timeInMonths % 12 || 12 
        : 12;
      
      for (let month = 1; month <= monthsInYear; month++) {
        const interestForMonth = remainingPrincipal * ratePerMonth;
        const principalForMonth = emi - interestForMonth;
        
        yearlyPrincipal += principalForMonth;
        yearlyInterest += interestForMonth;
        remainingPrincipal -= principalForMonth;
      }
      
      yearlyData.push({
        year,
        principal: Math.round(yearlyPrincipal),
        interest: Math.round(yearlyInterest),
        balance: Math.max(0, Math.round(remainingPrincipal)),
      });
    }
    
    setYearlyData(yearlyData);
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTerm]);

  const handleReset = () => {
    setLoanAmount(3000000);
    setInterestRate(8.5);
    setLoanTerm(20);
  };

  // Calculate breakdown for pie chart
  const pieData = [
    { name: 'Principal', value: loanAmount, color: '#4A8FE7' },
    { name: 'Interest', value: result.totalInterest, color: '#245E4F' },
  ];

  return (
    <CalculatorLayout
      title="Home Loan EMI Calculator"
      description="Calculate and visualize your home loan EMI and total payments"
      icon={<Home className="h-6 w-6" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Loan Amount</label>
              <span className="text-sm font-bold">₹{loanAmount.toLocaleString()}</span>
            </div>
            <Slider 
              value={[loanAmount]} 
              min={100000} 
              max={20000000} 
              step={100000}
              onValueChange={(value) => setLoanAmount(value[0])}
              className="bg-finance-green/10"
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
              <label className="text-sm font-medium">Interest Rate (%)</label>
              <span className="text-sm font-bold">{interestRate}%</span>
            </div>
            <Slider 
              value={[interestRate]} 
              min={5} 
              max={15} 
              step={0.1}
              onValueChange={(value) => setInterestRate(value[0])}
              className="bg-finance-green/10"
            />
            <Input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full"
              step="0.1"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Loan Term (Years)</label>
              <span className="text-sm font-bold">{loanTerm} years</span>
            </div>
            <Slider 
              value={[loanTerm]} 
              min={1} 
              max={30} 
              step={1}
              onValueChange={(value) => setLoanTerm(value[0])}
              className="bg-finance-green/10"
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
            <Card className="bg-finance-green/5 border-finance-green/20">
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Monthly EMI</div>
                <div className="text-2xl font-bold text-finance-green">
                  {formatCurrency(result.emi)}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Total Principal</div>
                  <div className="text-lg font-bold">
                    {formatCurrency(loanAmount)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Total Interest</div>
                  <div className="text-lg font-bold text-finance-green">
                    {formatCurrency(result.totalInterest)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="rounded-md border p-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartPieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
              </RechartPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Year-wise Breakdown */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Year-wise Loan Amortization</h3>
        <div className="border rounded-md overflow-hidden" style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={yearlyData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
              <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Bar dataKey="principal" stackId="a" name="Principal Paid" fill="#4A8FE7" />
              <Bar dataKey="interest" stackId="a" name="Interest Paid" fill="#245E4F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-md">
        <h3 className="text-lg font-medium text-amber-800 mb-2">How to use this calculator?</h3>
        <p className="text-sm text-amber-700">
          This Home Loan EMI calculator helps you estimate your monthly EMI (Equated Monthly Installment) 
          for your home loan. Simply enter your loan amount, interest rate, and tenure to calculate your 
          monthly payment. The pie chart shows the proportion of principal to interest in your total payment, 
          while the bar chart provides a year-by-year breakdown of how your loan gets paid off.
        </p>
      </div>
    </CalculatorLayout>
  );
};

export default HomeLoanEMICalculator;
