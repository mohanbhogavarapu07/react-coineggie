import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
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
import { DownloadIcon, Mail } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalculatorLayout } from '@/layouts/CalculatorLayout';
// Types
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

// Utility Functions
const formatIndianCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

const formatIndianNumber = (value: number): string => {
  return new Intl.NumberFormat('en-IN').format(value);
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
  
  // For each year of investment
  for (let year = 1; year <= investmentDuration; year++) {
    // For each month in the year
    for (let month = 1; month <= 12; month++) {
      // Calculate current month's investment
      if (year > 1 && month === 1) {
        // Apply the step-up at the beginning of each new year (except first year)
        currentMonthlyInvestment = currentMonthlyInvestment * (1 + annualStepUpPercentage / 100);
      }
      
      // Add the current month's investment
      totalInvestment += currentMonthlyInvestment;
      
      // Calculate the growth for this month
      accumulatedWealth = (accumulatedWealth + currentMonthlyInvestment) * (1 + monthlyRateOfReturn);
    }
    
    // Record data for this year
    yearlyData.push({
      year,
      yearlyInvestment: year === 1 ? initialInvestment * 12 : currentMonthlyInvestment * 12,
      totalInvestment: totalInvestment,
      wealth: accumulatedWealth,
      returns: accumulatedWealth - totalInvestment,
    });
  }
  
  // Calculate summary
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

// Main Component
const StepUpSipCalculator: React.FC = () => {
  const { toast } = useToast();
  const [initialInvestment, setInitialInvestment] = useState(5000);
  const [annualStepUpPercentage, setAnnualStepUpPercentage] = useState(10);
  const [expectedRateOfReturn, setExpectedRateOfReturn] = useState(12);
  const [investmentDuration, setInvestmentDuration] = useState(15);
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null); // Ensure this state is declared
  const [showAllYears, setShowAllYears] = useState(false);
  
  // Calculate on initial load and when any input changes
  useEffect(() => {
    calculateResults();
  }, [initialInvestment, annualStepUpPercentage, expectedRateOfReturn, investmentDuration]);
  
  const calculateResults = () => {
    const result = calculateStepUpSIP(
      initialInvestment,
      annualStepUpPercentage,
      expectedRateOfReturn,
      investmentDuration
    );
    setCalculationResult(result);
  };
  
  const handleEmailResults = () => {
    toast({
      title: "Email feature",
      description: "This feature will be implemented soon. The email will contain a professional report of your calculation results.",
    });
  };
  
  const handleDownloadPDF = () => {
    toast({
      title: "Preparing PDF",
      description: "Your calculation results are being prepared for download.",
    });
  };
  
  // Format data for chart
  const getChartData = () => {
    if (!calculationResult) return [];
    
    return calculationResult.yearlyData.map((data) => ({
      name: `Year ${data.year}`,
      'Total Investment': data.totalInvestment,
      'Accumulated Wealth': data.wealth,
      'Returns': data.returns,
    }));
  };
  
  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-md">
          <p className="font-medium text-sm text-charcoal-DEFAULT">{label}</p>
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
              <span className="inline-block w-3 h-3 bg-gold-DEFAULT mr-2"></span>
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
      icon={<DownloadIcon size={24} />} >
    <div className="w-full">
      <Card className="bg-cream-DEFAULT">
        
        
        <CardContent className="p-6 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="initialInvestment" className="text-charcoal-DEFAULT">
                    Initial Monthly Investment (₹)
                  </Label>
                  <span className="text-sm font-medium">{formatIndianNumber(initialInvestment)}</span>
                </div>
                <Input
                  id="initialInvestment"
                  type="number"
                  min="500"
                  max="500000"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                  className="border-secondary"
                />
                <Slider
                  value={[initialInvestment]}
                  min={500}
                  max={100000}
                  step={500}
                  onValueChange={(value) => setInitialInvestment(value[0])}
                  className="mt-2"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="annualStepUp" className="text-charcoal-DEFAULT">
                    Annual Step-up Percentage (%)
                  </Label>
                  <span className="text-sm font-medium">{annualStepUpPercentage}%</span>
                </div>
                <Input
                  id="annualStepUp"
                  type="number"
                  min="1"
                  max="100"
                  value={annualStepUpPercentage}
                  onChange={(e) => setAnnualStepUpPercentage(Number(e.target.value))}
                  className="border-secondary"
                />
                <Slider
                  value={[annualStepUpPercentage]}
                  min={1}
                  max={50}
                  step={1}
                  onValueChange={(value) => setAnnualStepUpPercentage(value[0])}
                  className="mt-2"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="expectedReturn" className="text-charcoal-DEFAULT">
                    Expected Rate of Return (%)
                  </Label>
                  <span className="text-sm font-medium">{expectedRateOfReturn}%</span>
                </div>
                <Input
                  id="expectedReturn"
                  type="number"
                  min="1"
                  max="30"
                  value={expectedRateOfReturn}
                  onChange={(e) => setExpectedRateOfReturn(Number(e.target.value))}
                  className="border-secondary"
                />
                <Slider
                  value={[expectedRateOfReturn]}
                  min={1}
                  max={30}
                  step={0.5}
                  onValueChange={(value) => setExpectedRateOfReturn(value[0])}
                  className="mt-2"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="investmentDuration" className="text-charcoal-DEFAULT">
                    Investment Duration (Years)
                  </Label>
                  <span className="text-sm font-medium">{investmentDuration} Years</span>
                </div>
                <Input
                  id="investmentDuration"
                  type="number"
                  min="1"
                  max="40"
                  value={investmentDuration}
                  onChange={(e) => setInvestmentDuration(Number(e.target.value))}
                  className="border-secondary"
                />
                <Slider
                  value={[investmentDuration]}
                  min={1}
                  max={40}
                  step={1}
                  onValueChange={(value) => setInvestmentDuration(value[0])}
                  className="mt-2"
                />
              </div>
            </div>
            
            {/* Results & Chart Section */}
            <div className="space-y-6">
              {calculationResult && (
                <>
                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-gradient-to-br from-primary to-primary/90 text-white">
                      <CardContent className="pt-6">
                        <h3 className="text-sm font-medium opacity-80">Total Investment</h3>
                        <p className="text-2xl font-bold mt-1">
                          {formatIndianCurrency(calculationResult.summary.totalInvestment)}
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-secondary to-secondary/90 text-white">
                      <CardContent className="pt-6">
                        <h3 className="text-sm font-medium opacity-80">Accumulated Wealth</h3>
                        <p className="text-2xl font-bold mt-1">
                          {formatIndianCurrency(calculationResult.summary.accumulatedWealth)}
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-gold-DEFAULT to-gold-DEFAULT/90 text-charcoal-DEFAULT">
                      <CardContent className="pt-6">
                        <h3 className="text-sm font-medium opacity-80">Wealth Gain</h3>
                        <p className="text-2xl font-bold mt-1">
                          {formatIndianCurrency(calculationResult.summary.wealthGain)}
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-mint-green to-mint-green/90 text-dark-green">
                      <CardContent className="pt-6">
                        <h3 className="text-sm font-medium opacity-80">Absolute Returns</h3>
                        <p className="text-2xl font-bold mt-1">
                          {formatPercentage(calculationResult.summary.absoluteReturns)}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Chart */}
                  <Card className="bg-white">
                    <CardContent className="pt-6">
                      <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={getChartData()}>
                            <CartesianGrid strokeDasharray="3 3" />
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
                  
                  {/* Yearly Breakdown Table */}
                  <Card className="bg-white">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-charcoal-DEFAULT">Yearly Breakdown</h3>
                        <Button
                          variant="outline"
                          onClick={() => setShowAllYears(!showAllYears)}
                          className="text-sm"
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
                              <TableHead>Accumulated Wealth</TableHead>
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
        </CardContent>
      </Card>
    </div>
    </CalculatorLayout>
  );
};

export default StepUpSipCalculator;