import React, { useState, useEffect } from 'react';
import { CalculatorLayout } from '@/layouts/CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { DownloadIcon, RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Area 
} from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Types and utility functions remain the same as your original code
interface YearlyData {
  year: number;
  yearlyInvestment: number;
  totalInvestment: number;
  wealth: number;
  returns: number;
}

interface CalculationSummary {
  totalInvestment: number;
  accumulatedWealth: number;
  wealthGain: number;
  absoluteReturns: number;
}

interface CalculationResult {
  yearlyData: YearlyData[];
  summary: CalculationSummary;
}

const formatIndianCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

const calculateStepUpSIP = (
  initialInvestment: number,
  annualStepUpPercentage: number,
  expectedRateOfReturn: number,
  investmentDuration: number
): CalculationResult => {
  const monthlyRateOfReturn = expectedRateOfReturn / 12 / 100;
  const yearlyData: YearlyData[] = [];
  
  let totalInvestment = 0;
  let accumulatedWealth = 0;
  let currentMonthlyInvestment = initialInvestment;
  
  for (let year = 1; year <= investmentDuration; year++) {
    for (let month = 1; month <= 12; month++) {
      if (year > 1 && month === 1) {
        currentMonthlyInvestment = currentMonthlyInvestment * (1 + annualStepUpPercentage / 100);
      }
      
      totalInvestment += currentMonthlyInvestment;
      accumulatedWealth = (accumulatedWealth + currentMonthlyInvestment) * (1 + monthlyRateOfReturn);
    }
    
    yearlyData.push({
      year,
      yearlyInvestment: year === 1 ? initialInvestment * 12 : currentMonthlyInvestment * 12,
      totalInvestment: totalInvestment,
      wealth: accumulatedWealth,
      returns: accumulatedWealth - totalInvestment,
    });
  }
  
  const summary: CalculationSummary = {
    totalInvestment,
    accumulatedWealth,
    wealthGain: accumulatedWealth - totalInvestment,
    absoluteReturns: ((accumulatedWealth - totalInvestment) / totalInvestment) * 100,
  };
  
  return {
    yearlyData,
    summary
  };
};

const StepUpSipCalculator: React.FC = () => {
  const { toast } = useToast();
  const [initialInvestment, setInitialInvestment] = useState(5000);
  const [annualStepUpPercentage, setAnnualStepUpPercentage] = useState(10);
  const [expectedRateOfReturn, setExpectedRateOfReturn] = useState(12);
  const [investmentDuration, setInvestmentDuration] = useState(15);
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [showAllYears, setShowAllYears] = useState(false);

  useEffect(() => {
    const result = calculateStepUpSIP(
      initialInvestment,
      annualStepUpPercentage,
      expectedRateOfReturn,
      investmentDuration
    );
    setCalculationResult(result);
  }, [initialInvestment, annualStepUpPercentage, expectedRateOfReturn, investmentDuration]);

  const handleReset = () => {
    setInitialInvestment(5000);
    setAnnualStepUpPercentage(10);
    setExpectedRateOfReturn(12);
    setInvestmentDuration(15);
  };

  const handleDownloadPDF = () => {
    toast({
      title: "Preparing PDF",
      description: "Your calculation results are being prepared for download.",
    });
  };

  const getChartData = () => {
    if (!calculationResult) return [];
    
    return calculationResult.yearlyData.map((data) => ({
      name: `Year ${data.year}`,
      'Total Investment': data.totalInvestment,
      'Accumulated Wealth': data.wealth,
      'Returns': data.returns,
    }));
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-md">
          <p className="font-medium text-sm">{label}</p>
          <div className="space-y-1 mt-2">
            <p className="text-xs">
              <span className="inline-block w-3 h-3 bg-primary mr-2"></span>
              Total Investment: {formatIndianCurrency(payload[0].value)}
            </p>
            <p className="text-xs">
              <span className="inline-block w-3 h-3 bg-secondary mr-2"></span>
              Accumulated Wealth: {formatIndianCurrency(payload[1].value)}
            </p>
            <p className="text-xs">
              <span className="inline-block w-3 h-3 bg-yellow-400 mr-2"></span>
              Returns: {formatIndianCurrency(payload[2].value)}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <CalculatorLayout
      title="Step Up SIP Calculator"
      description="Calculate the potential growth of your Step-up SIP investments over time."
      icon={<DownloadIcon className="h-6 w-6" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Inputs */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Initial Monthly Investment</label>
              <span className="text-sm font-bold">₹{initialInvestment.toLocaleString()}</span>
            </div>
            <Slider 
              value={[initialInvestment]} 
              min={500} 
              max={100000} 
              step={500}
              onValueChange={(value) => setInitialInvestment(value[0])}
              className="bg-finance-green/10"
            />
            <Input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Annual Step-up Percentage</label>
              <span className="text-sm font-bold">{annualStepUpPercentage}%</span>
            </div>
            <Slider 
              value={[annualStepUpPercentage]} 
              min={1} 
              max={50} 
              step={1}
              onValueChange={(value) => setAnnualStepUpPercentage(value[0])}
              className="bg-finance-green/10"
            />
            <Input
              type="number"
              value={annualStepUpPercentage}
              onChange={(e) => setAnnualStepUpPercentage(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Expected Return Rate</label>
              <span className="text-sm font-bold">{expectedRateOfReturn}%</span>
            </div>
            <Slider 
              value={[expectedRateOfReturn]} 
              min={1} 
              max={30} 
              step={0.5}
              onValueChange={(value) => setExpectedRateOfReturn(value[0])}
              className="bg-finance-green/10"
            />
            <Input
              type="number"
              value={expectedRateOfReturn}
              onChange={(e) => setExpectedRateOfReturn(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Investment Duration</label>
              <span className="text-sm font-bold">{investmentDuration} years</span>
            </div>
            <Slider 
              value={[investmentDuration]} 
              min={1} 
              max={40} 
              step={1}
              onValueChange={(value) => setInvestmentDuration(value[0])}
              className="bg-finance-green/10"
            />
            <Input
              type="number"
              value={investmentDuration}
              onChange={(e) => setInvestmentDuration(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex gap-4">
            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset Values
            </Button>
            <Button onClick={handleDownloadPDF} className="w-full">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-8">
          {calculationResult && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-finance-green/5 border-finance-green/20">
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Total Investment</div>
                    <div className="text-2xl font-bold text-finance-green">
                      {formatIndianCurrency(calculationResult.summary.totalInvestment)}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-finance-green/5 border-finance-green/20">
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Accumulated Wealth</div>
                    <div className="text-2xl font-bold text-finance-green">
                      {formatIndianCurrency(calculationResult.summary.accumulatedWealth)}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Wealth Gain</div>
                    <div className="text-lg font-bold text-finance-green">
                      {formatIndianCurrency(calculationResult.summary.wealthGain)}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Absolute Returns</div>
                    <div className="text-lg font-bold text-finance-green">
                      {formatPercentage(calculationResult.summary.absoluteReturns)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={getChartData()}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar 
                          dataKey="Total Investment" 
                          fill="#245e4f" 
                          stackId="a"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="Returns" 
                          fill="#fbbf24" 
                          stroke="#fbbf24" 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="Accumulated Wealth" 
                          stroke="#7ac9a7" 
                          strokeWidth={2}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Yearly Breakdown</h3>
                    <Button
                      variant="outline"
                      onClick={() => setShowAllYears(!showAllYears)}
                      size="sm"
                    >
                      {showAllYears ? 'Show Less' : 'Show All Years'}
                    </Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Year</TableHead>
                          <TableHead>Yearly Investment</TableHead>
                          <TableHead>Total Investment</TableHead>
                          <TableHead>Returns</TableHead>
                          <TableHead>Wealth</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {calculationResult.yearlyData
                          .slice(0, showAllYears ? undefined : 5)
                          .map((data) => (
                            <TableRow key={data.year}>
                              <TableCell>Year {data.year}</TableCell>
                              <TableCell>{formatIndianCurrency(data.yearlyInvestment)}</TableCell>
                              <TableCell>{formatIndianCurrency(data.totalInvestment)}</TableCell>
                              <TableCell>{formatIndianCurrency(data.returns)}</TableCell>
                              <TableCell>{formatIndianCurrency(data.wealth)}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default StepUpSipCalculator;