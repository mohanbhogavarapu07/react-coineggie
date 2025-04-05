import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RefreshCw, Users, DollarSign, Clock, Target, TrendingUp } from 'lucide-react';
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

interface ProductivityData {
  totalRevenue: number;
  numberOfEmployees: number;
  totalHoursWorked: number;
  targetOutput: number;
  actualOutput: number;
}

interface BenchmarkData {
  name: string;
  value: number;
}

const EmployeeProductivityCalculator = () => {
  const [totalRevenue, setTotalRevenue] = useState(1000000);
  const [numberOfEmployees, setNumberOfEmployees] = useState(10);
  const [totalHoursWorked, setTotalHoursWorked] = useState(2000);
  const [targetOutput, setTargetOutput] = useState(1000);
  const [actualOutput, setActualOutput] = useState(900);
  const [result, setResult] = useState({
    revenuePerEmployee: 0,
    outputPerHour: 0,
    efficiencyRatio: 0,
    laborCostRatio: 0,
  });
  const [benchmarkData, setBenchmarkData] = useState<BenchmarkData[]>([
    { name: 'Technology', value: 850000 },
    { name: 'Manufacturing', value: 450000 },
    { name: 'Retail', value: 350000 },
    { name: 'Healthcare', value: 550000 },
    { name: 'Finance', value: 950000 },
  ]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculateResults = () => {
    // Calculate revenue per employee
    const revenuePerEmployee = totalRevenue / numberOfEmployees;
    
    // Calculate output per hour
    const outputPerHour = actualOutput / totalHoursWorked;
    
    // Calculate efficiency ratio (actual output / target output)
    const efficiencyRatio = (actualOutput / targetOutput) * 100;
    
    // Calculate labor cost ratio (assuming average hourly rate of ₹500)
    const laborCost = totalHoursWorked * 500;
    const laborCostRatio = (laborCost / totalRevenue) * 100;

    setResult({
      revenuePerEmployee,
      outputPerHour,
      efficiencyRatio,
      laborCostRatio,
    });
  };

  useEffect(() => {
    calculateResults();
  }, [totalRevenue, numberOfEmployees, totalHoursWorked, targetOutput, actualOutput]);

  const handleReset = () => {
    setTotalRevenue(1000000);
    setNumberOfEmployees(10);
    setTotalHoursWorked(2000);
    setTargetOutput(1000);
    setActualOutput(900);
  };

  const calculatorContent = (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Total Revenue</label>
              <span className="text-sm font-bold">{formatCurrency(totalRevenue)}</span>
            </div>
            <Slider 
              value={[totalRevenue]} 
              min={0} 
              max={5000000} 
              step={50000}
              onValueChange={(value) => setTotalRevenue(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={totalRevenue}
              onChange={(e) => setTotalRevenue(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Number of Employees</label>
              <span className="text-sm font-bold">{numberOfEmployees}</span>
            </div>
            <Slider 
              value={[numberOfEmployees]} 
              min={1} 
              max={100} 
              step={1}
              onValueChange={(value) => setNumberOfEmployees(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={numberOfEmployees}
              onChange={(e) => setNumberOfEmployees(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Total Hours Worked</label>
              <span className="text-sm font-bold">{totalHoursWorked}</span>
            </div>
            <Slider 
              value={[totalHoursWorked]} 
              min={0} 
              max={5000} 
              step={100}
              onValueChange={(value) => setTotalHoursWorked(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={totalHoursWorked}
              onChange={(e) => setTotalHoursWorked(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Target Output</label>
              <span className="text-sm font-bold">{targetOutput}</span>
            </div>
            <Slider 
              value={[targetOutput]} 
              min={0} 
              max={5000} 
              step={100}
              onValueChange={(value) => setTargetOutput(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={targetOutput}
              onChange={(e) => setTargetOutput(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Actual Output</label>
              <span className="text-sm font-bold">{actualOutput}</span>
            </div>
            <Slider 
              value={[actualOutput]} 
              min={0} 
              max={5000} 
              step={100}
              onValueChange={(value) => setActualOutput(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={actualOutput}
              onChange={(e) => setActualOutput(Number(e.target.value))}
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
                <div className="text-sm text-gray-500">Revenue per Employee</div>
                <div className="text-2xl font-bold text-purple-600">
                  {formatCurrency(result.revenuePerEmployee)}
                </div>
                <div className="text-sm text-gray-500 mt-1">per employee</div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Output per Hour</div>
                  <div className="text-lg font-bold text-green-600">
                    {result.outputPerHour.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">units/hour</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Efficiency Ratio</div>
                  <div className="text-lg font-bold text-blue-600">
                    {result.efficiencyRatio.toFixed(1)}%
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
                  name="Revenue per Employee" 
                  fill="#245e4f"
                />
                <ReferenceLine 
                  y={result.revenuePerEmployee} 
                  stroke="#e9c46a" 
                  strokeWidth={2}
                  label={{ value: `Your Value: ${formatCurrency(result.revenuePerEmployee)}`, position: 'top', fill: '#e9c46a' }} 
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
      <h3 className="text-lg font-medium text-amber-800">Understanding Employee Productivity</h3>
      <p className="text-sm text-amber-700">
        Employee productivity metrics help businesses measure the efficiency and effectiveness of their workforce. 
        These metrics can be used to identify areas for improvement and track performance over time.
      </p>
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-amber-800">Key Metrics:</h4>
        <ul className="list-disc pl-5 text-sm text-amber-700">
          <li><strong>Revenue per Employee:</strong> Total revenue divided by number of employees</li>
          <li><strong>Output per Hour:</strong> Total output divided by total hours worked</li>
          <li><strong>Efficiency Ratio:</strong> Actual output divided by target output (as percentage)</li>
          <li><strong>Labor Cost Ratio:</strong> Labor costs divided by total revenue (as percentage)</li>
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="font-medium text-amber-800">Productivity Formulas:</h4>
        <div className="bg-amber-50 p-4 rounded-lg mt-2">
          <p className="text-sm text-amber-700">Revenue per Employee = Total Revenue / Number of Employees</p>
          <p className="text-sm text-amber-700">Output per Hour = Actual Output / Total Hours Worked</p>
          <p className="text-sm text-amber-700">Efficiency Ratio = (Actual Output / Target Output) × 100%</p>
          <p className="text-sm text-amber-700">Labor Cost Ratio = (Labor Cost / Total Revenue) × 100%</p>
        </div>
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="Employee Productivity Calculator"
      description="Calculate and analyze your employee productivity metrics to optimize workforce efficiency."
      icon={<Users className="h-6 w-6" />}
      calculatorContent={calculatorContent}
      aboutContent={aboutContent}
      showSeparateAboutSection={true}
      activeTab="business"
      activeSubTab="operations"
    />
  );
};

export default EmployeeProductivityCalculator; 