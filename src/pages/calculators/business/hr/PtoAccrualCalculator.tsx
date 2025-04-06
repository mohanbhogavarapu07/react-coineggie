import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { CalculatorLayout } from '@/layouts/CalculatorLayout';
import { Calculator } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Types and Interfaces
interface CalculationResult {
  annualPTO: number;
  monthlyAccrual: number;
  biweeklyAccrual: number;
  weeklyAccrual: number;
  dailyAccrual: number;
  totalValue: number;
}

// Utility Functions
const formatCurrency = (value: number) => {
  return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
};

const formatDays = (days: number) => {
  return `${days.toFixed(2)} days`;
};

// Results Display Component
const PTOResultsDisplay: React.FC<{ results: CalculationResult; salary: number }> = ({ results, salary }) => {
  const accrualData = [
    { name: 'Annual', value: results.annualPTO, fill: '#245e4f' },
    { name: 'Monthly', value: results.monthlyAccrual, fill: '#7ac9a7' },
    { name: 'Bi-weekly', value: results.biweeklyAccrual, fill: '#e9c46a' },
    { name: 'Weekly', value: results.weeklyAccrual, fill: '#4a8fe7' },
    { name: 'Daily', value: results.dailyAccrual, fill: '#333333' },
  ];

  const salaryVsPTOData = [
    { name: 'Salary', value: salary - results.totalValue },
    { name: 'PTO Value', value: results.totalValue },
  ];
  
  const COLORS = ['#7ac9a7', '#245e4f'];

  return (
    <Card className="p-6 shadow-md bg-white">
      <h2 className="text-2xl font-bold text-primary mb-6">Your PTO Accrual Results</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-charcoal-DEFAULT">Summary</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-cream-DEFAULT p-4 rounded-lg border border-secondary">
              <p className="text-sm text-gray-500">Annual PTO</p>
              <p className="text-2xl font-bold text-primary">{results.annualPTO.toFixed(2)} days</p>
            </div>
            
            <div className="bg-cream-DEFAULT p-4 rounded-lg border border-secondary">
              <p className="text-sm text-gray-500">PTO Value</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(results.totalValue)}</p>
            </div>
            
            <div className="bg-cream-DEFAULT p-4 rounded-lg border border-secondary">
              <p className="text-sm text-gray-500">Monthly Accrual</p>
              <p className="text-xl font-bold text-primary">{results.monthlyAccrual.toFixed(2)} days</p>
            </div>
            
            <div className="bg-cream-DEFAULT p-4 rounded-lg border border-secondary">
              <p className="text-sm text-gray-500">Daily Rate</p>
              <p className="text-xl font-bold text-primary">{formatCurrency(results.totalValue / results.annualPTO)}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-charcoal-DEFAULT mb-4">Accrual Breakdown</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={accrualData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={formatDays} />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toFixed(2)} days`, 'Accrual']}
                    labelStyle={{ color: '#333333' }}
                  />
                  <Bar dataKey="value" name="PTO Accrual">
                    {accrualData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-charcoal-DEFAULT">PTO Value vs. Salary</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salaryVsPTOData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {salaryVsPTOData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [formatCurrency(value), 'Amount']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-cream-DEFAULT p-4 rounded-lg border border-secondary mt-6">
            <h4 className="font-semibold text-primary mb-2">Detailed Accrual Rates</h4>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span className="text-charcoal-DEFAULT">Annual:</span>
                <span className="font-medium">{results.annualPTO.toFixed(2)} days</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-charcoal-DEFAULT">Monthly:</span>
                <span className="font-medium">{results.monthlyAccrual.toFixed(2)} days</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-charcoal-DEFAULT">Bi-weekly:</span>
                <span className="font-medium">{results.biweeklyAccrual.toFixed(2)} days</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-charcoal-DEFAULT">Weekly:</span>
                <span className="font-medium">{results.weeklyAccrual.toFixed(2)} days</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-charcoal-DEFAULT">Daily:</span>
                <span className="font-medium">{results.dailyAccrual.toFixed(2)} days</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Main Calculator Component
const PtoAccrualCalculator = () => {
  const { toast } = useToast();
  const [annualSalary, setAnnualSalary] = useState<string>('500000');
  const [ptoRate, setPtoRate] = useState<string>('15');
  const [workingDays, setWorkingDays] = useState<string>('250');
  const [accrualType, setAccrualType] = useState<string>('days');
  const [calculatedResults, setCalculatedResults] = useState<CalculationResult | null>(null);

  const calculatePTO = () => {
    if (!annualSalary || !ptoRate || !workingDays) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const salary = parseFloat(annualSalary);
    const rate = parseFloat(ptoRate);
    const days = parseFloat(workingDays);

    if (isNaN(salary) || isNaN(rate) || isNaN(days)) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers for all fields.",
        variant: "destructive",
      });
      return;
    }

    let annualPTO: number;
    if (accrualType === 'days') {
      annualPTO = rate;
    } else if (accrualType === 'hours') {
      annualPTO = rate / 8; // assuming 8 hours per day
    } else { // percentage
      annualPTO = (rate / 100) * days;
    }

    const dailyRate = salary / days;
    const results: CalculationResult = {
      annualPTO: annualPTO,
      monthlyAccrual: annualPTO / 12,
      biweeklyAccrual: annualPTO / 26,
      weeklyAccrual: annualPTO / 52,
      dailyAccrual: annualPTO / 365,
      totalValue: annualPTO * dailyRate,
    };

    setCalculatedResults(results);
    
    toast({
      title: "Calculation Complete",
      description: "Your PTO accrual has been calculated successfully.",
    });
  };

  // Calculate initial values
  useEffect(() => {
    calculatePTO();
  }, []);

  return (
    <CalculatorLayout
      title="PTO Accrual Calculator"
      description="Calculate your paid time off accrual and its monetary value"
      icon={<Calculator className="h-5 w-5 text-marketing-blue" />}
     activeTab="business"
      activeSubTab="hr"
    >
      <div className="space-y-8 p-6">
        <Card className="p-6 shadow-md bg-white">
          <h2 className="text-2xl font-bold text-primary mb-6">PTO Accrual Calculator</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="annual-salary">Annual Salary (₹)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                  <Input
                    id="annual-salary"
                    type="number"
                    className="pl-8"
                    value={annualSalary}
                    onChange={(e) => setAnnualSalary(e.target.value)}
                    placeholder="Enter your annual salary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pto-rate">PTO Rate</Label>
                <Input
                  id="pto-rate"
                  type="number"
                  value={ptoRate}
                  onChange={(e) => setPtoRate(e.target.value)}
                  placeholder="Enter PTO rate"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accrual-type">Accrual Type</Label>
                <Select 
                  value={accrualType} 
                  onValueChange={setAccrualType}
                >
                  <SelectTrigger id="accrual-type">
                    <SelectValue placeholder="Select accrual type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="days">Days per Year</SelectItem>
                    <SelectItem value="hours">Hours per Year</SelectItem>
                    <SelectItem value="percentage">Percentage of Working Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="working-days">Working Days per Year</Label>
                <Input
                  id="working-days"
                  type="number"
                  value={workingDays}
                  onChange={(e) => setWorkingDays(e.target.value)}
                  placeholder="Enter number of working days"
                />
              </div>

              <div className="pt-6">
                <Button 
                  onClick={calculatePTO}
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Calculate PTO Accrual
                </Button>
              </div>
            </div>
          </div>
        </Card>
        
        {calculatedResults && (
          <PTOResultsDisplay results={calculatedResults} salary={parseFloat(annualSalary)} />
        )}
      </div>
    </CalculatorLayout>
  );
};

export default PtoAccrualCalculator; 