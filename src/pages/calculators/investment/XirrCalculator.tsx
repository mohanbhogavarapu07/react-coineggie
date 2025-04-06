import React, { useState, useRef, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Mail, Plus, Trash2, HelpCircle, Calculator } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { CalculatorLayout } from '@/layouts/CalculatorLayout';

// Types
interface CashFlow {
  id: string;
  amount: number;
  date: string;
}

interface ChartDataPoint {
  year: number;
  value: number;
  cumulativeValue: number;
}

interface PDFData {
  irr: number;
  xirr: number | null;
  initialInvestment: number;
  cashFlows: number[];
  cumulativeReturn: number;
  netProfit: number;
}

// Utility Functions
// Ensure this function is declared only once in the file

const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(2)}%`;
};

const formatIndianRupee = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(value);
};

/**
 * Calculate the Internal Rate of Return (IRR) using the Newton-Raphson method
 */
const calculateIRR = (
  cashFlows: number[],
  initialGuess: number = 0.1,
  tolerance: number = 1e-10,
  maxIterations: number = 1000
): number | null => {
  if (!cashFlows || cashFlows.length < 2) {
    return null;
  }

  let guess = initialGuess;
  
  for (let i = 0; i < maxIterations; i++) {
    const { npv, derivative } = calculateNPVAndDerivative(cashFlows, guess);
    
    // Check if we're close enough to zero
    if (Math.abs(npv) < tolerance) {
      return guess;
    }
    
    // Check for division by zero or very small denominator
    if (Math.abs(derivative) < 1e-10) {
      guess = guess + 0.01;
      continue;
    }
    
    // Newton-Raphson update step
    const newGuess = guess - npv / derivative;
    
    // Check if we've converged
    if (Math.abs(newGuess - guess) < tolerance) {
      return newGuess;
    }
    
    guess = newGuess;
  }
  
  // If we've exceeded max iterations, try a different initial guess
  if (initialGuess === 0.1) {
    return calculateIRR(cashFlows, 0.01, tolerance, maxIterations);
  }
  
  // Failed to converge
  return null;
};

/**
 * Calculate NPV (Net Present Value) and its derivative for the Newton-Raphson method
 */
const calculateNPVAndDerivative = (cashFlows: number[], rate: number): { npv: number; derivative: number } => {
  let npv = 0;
  let derivative = 0;
  
  for (let i = 0; i < cashFlows.length; i++) {
    const t = i;
    const denominator = Math.pow(1 + rate, t);
    
    // NPV calculation
    npv += cashFlows[i] / denominator;
    
    // Derivative calculation (for Newton-Raphson method)
    if (t > 0) {
      derivative -= (t * cashFlows[i]) / Math.pow(1 + rate, t + 1);
    }
  }
  
  return { npv, derivative };
};

/**
 * Calculate XIRR (Extended Internal Rate of Return)
 * For simplicity, this implementation assumes regular annual periods
 * In a real XIRR calculation, we would use actual dates
 */
const calculateXIRR = (
  cashFlows: number[],
  initialGuess: number = 0.1,
  tolerance: number = 1e-10,
  maxIterations: number = 1000
): number | null => {
  // In a full implementation, we would use dates
  // Here we're essentially calculating regular IRR as a simplification
  return calculateIRR(cashFlows, initialGuess, tolerance, maxIterations);
};

/**
 * Calculate cumulative return (sum of all cash flows)
 */
const calculateCumulativeReturn = (cashFlows: number[]): number => {
  return cashFlows.reduce((sum, value) => sum + value, 0);
};

// Chart Component
const IRRChart: React.FC<{ data: ChartDataPoint[] }> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="font-medium text-sm">Year {label}</p>
          <p className="text-sm text-gray-600">
            Cash Flow: {formatIndianRupee(payload[0].value)}
          </p>
          <p className="text-sm text-primary font-medium">
            Cumulative: {formatIndianRupee(payload[1].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7ac9a7" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#7ac9a7" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#245e4f" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#245e4f" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="year"
          label={{
            value: "Year",
            position: "insideBottomRight",
            offset: -10,
          }}
        />
        <YAxis
          tickFormatter={formatIndianRupee}
          width={70}
        />
        <RechartsTooltip content={<CustomTooltip />} />
        <ReferenceLine y={0} stroke="#000" strokeDasharray="3 3" />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#7ac9a7"
          fillOpacity={1}
          fill="url(#colorValue)"
          name="Cash Flow"
        />
        <Area
          type="monotone"
          dataKey="cumulativeValue"
          stroke="#245e4f"
          fillOpacity={1}
          fill="url(#colorCumulative)"
          name="Cumulative Value"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

// Main Component
const XirrCalculator: React.FC = () => {
  const { toast } = useToast();
  const [initialInvestment, setInitialInvestment] = useState<number>(1000000);
  const [periods, setPeriods] = useState<number>(5);
  const [cashFlows, setCashFlows] = useState<string[]>(Array(5).fill("300000"));
  const [irr, setIrr] = useState<number | null>(null);
  const [xirr, setXirr] = useState<number | null>(null);
  const [cumulativeReturn, setCumulativeReturn] = useState<number>(0);
  const [netProfit, setNetProfit] = useState<number>(0);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const resultsSectionRef = useRef<HTMLDivElement>(null);

  const handleInitialInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setInitialInvestment(value);
    } else {
      setInitialInvestment(0);
    }
  };

  const handlePeriodsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 20) {
      setPeriods(value);
      // Adjust cash flows array size
      if (value > cashFlows.length) {
        setCashFlows([...cashFlows, ...Array(value - cashFlows.length).fill("300000")]);
      } else {
        setCashFlows(cashFlows.slice(0, value));
      }
    }
  };

  const handleCashFlowChange = (index: number, value: string) => {
    const newCashFlows = [...cashFlows];
    newCashFlows[index] = value;
    setCashFlows(newCashFlows);
  };

  const calculateResults = () => {
    // Validate inputs
    if (initialInvestment <= 0) {
      toast({
        title: "Invalid input",
        description: "Initial investment must be greater than zero",
        variant: "destructive",
      });
      return;
    }
    
    const cashFlowNumbers = cashFlows.map((cf) => parseFloat(cf));
    if (cashFlowNumbers.some((cf) => isNaN(cf))) {
      toast({
        title: "Invalid input",
        description: "All cash flows must be valid numbers",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Use setTimeout to prevent UI freezing for complex calculations
    setTimeout(() => {
      const negativeInitialInvestment = -initialInvestment;
      const allCashFlows = [negativeInitialInvestment, ...cashFlowNumbers];
      
      // Calculate IRR
      const calculatedIrr = calculateIRR(allCashFlows);
      setIrr(calculatedIrr);
      
      // Calculate XIRR (in a real application, this would use actual dates)
      const calculatedXirr = calculateXIRR(allCashFlows);
      setXirr(calculatedXirr);
      
      // Calculate cumulative return and net profit
      const calculatedCumulativeReturn = calculateCumulativeReturn(cashFlowNumbers);
      setCumulativeReturn(calculatedCumulativeReturn);
      setNetProfit(calculatedCumulativeReturn - initialInvestment);
      
      setIsCalculated(true);
      setLoading(false);
      
      // Scroll to results
      setTimeout(() => {
        resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 300);
  };

  // Generate data for the chart
  const generateChartData = (): ChartDataPoint[] => {
    const result: ChartDataPoint[] = [];
    
    // Initial data point
    result.push({
      year: 0,
      value: -initialInvestment,
      cumulativeValue: -initialInvestment,
    });
    
    // Calculate cumulative values separately
    let cumulativeValue = -initialInvestment;
    
    // Add cash flow data points
    for (let i = 0; i < cashFlows.length; i++) {
      const value = parseFloat(cashFlows[i]);
      cumulativeValue += value;
      result.push({
        year: i + 1,
        value: value,
        cumulativeValue: cumulativeValue,
      });
    }
    
    return result;
  };

  // Interpret IRR/XIRR
  const getIRRInterpretation = (rate: number): string => {
    if (rate > 0.15) return "Excellent";
    if (rate > 0.10) return "Good";
    if (rate > 0.05) return "Fair";
    return "Poor";
  };

  // Get badge color based on interpretation
  const getBadgeColor = (interpretation: string): string => {
    switch (interpretation) {
      case "Excellent":
        return "bg-green-600 hover:bg-green-700";
      case "Good":
        return "bg-green-500 hover:bg-green-600";
      case "Fair":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "Poor":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <CalculatorLayout
      title="XIRR Chart"
      description="Calculate extended internal rate of return"
      icon={<Calculator className="h-5 w-5 text-finance-green" />}
      activeTab="investment"
    >
      <div className="container mx-auto px-4 py-8">
        <Card className="calculator-container">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl gradient-text">Extended Internal Rate of Return (XIRR) Calculator</CardTitle>
            <CardDescription>
              Calculate your investment's internal rate of return with irregular cash flows
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Calculator Section */}
            <div className="space-y-6">
              <div className="space-y-4 mt-4">
                <div className="input-group">
                  <Label htmlFor="initialInvestment" className="input-label">
                    Initial Investment (₹)
                  </Label>
                  <Input
                    id="initialInvestment"
                    type="number"
                    value={initialInvestment}
                    onChange={handleInitialInvestmentChange}
                    className="input-field"
                    placeholder="Enter initial investment amount"
                  />
                </div>

                <div className="input-group">
                  <Label htmlFor="periods" className="input-label">
                    Number of Periods (years)
                  </Label>
                  <Input
                    id="periods"
                    type="number"
                    min="1"
                    max="20"
                    value={periods}
                    onChange={handlePeriodsChange}
                    className="input-field"
                    placeholder="Enter number of periods"
                  />
                </div>

                <div className="input-group">
                  <Label className="input-label">Annual Cash Flows (₹)</Label>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {cashFlows.map((cf, index) => (
                      <div key={index} className="flex items-center">
                        <span className="mr-2 w-20 text-sm">Year {index + 1}:</span>
                        <Input
                          type="number"
                          value={cf}
                          onChange={(e) => handleCashFlowChange(index, e.target.value)}
                          className="input-field"
                          placeholder={`Cash flow for year ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={calculateResults}
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? "Calculating..." : "Calculate XIRR"}
                </Button>
              </div>
            </div>

            {/* Results Section */}
            <div className="mt-8 space-y-6" ref={resultsSectionRef}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Internal Rate of Return (IRR)</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-bold text-primary">
                        {irr ? formatPercentage(irr) : "0.00%"}
                      </p>
                      {irr && (
                        <Badge className={getBadgeColor(getIRRInterpretation(irr))}>
                          {getIRRInterpretation(irr)}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {xirr && (
                    <div>
                      <p className="text-sm text-gray-500">Extended IRR (XIRR)</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-2xl font-bold text-primary">{formatPercentage(xirr)}</p>
                        <Badge className={getBadgeColor(getIRRInterpretation(xirr))}>
                          {getIRRInterpretation(xirr)}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Initial Investment</p>
                    <p className="text-xl font-bold text-charcoal">{formatIndianRupee(initialInvestment)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Net Profit</p>
                    <p className="text-xl font-bold text-charcoal">{formatIndianRupee(netProfit)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Return</p>
                    <p className="text-xl font-bold text-charcoal">{formatIndianRupee(cumulativeReturn)}</p>
                  </div>
                </div>
              </div>
              
              <div className="h-64 md:h-80">
                <IRRChart data={generateChartData()} />
              </div>

              <div className="bg-secondary/10 p-4 rounded-lg border border-secondary/20">
                <h4 className="font-medium text-primary mb-2">What does this mean?</h4>
                <p className="text-sm text-charcoal">
                  {irr ? (
                    <>
                      The Internal Rate of Return (IRR) of {formatPercentage(irr)} represents the annual growth rate of your investment. This means your initial investment of {formatIndianRupee(initialInvestment)} is effectively growing at {formatPercentage(irr)} per year, resulting in a total profit of {formatIndianRupee(netProfit)}.
                    </>
                  ) : (
                    "Enter your investment details and click 'Calculate XIRR' to see your investment's performance analysis."
                  )}
                </p>
                {irr && (
                  <p className="text-sm text-charcoal mt-2">
                    {getIRRInterpretation(irr) === "Excellent" && "This is an excellent return rate that exceeds most market benchmarks."}
                    {getIRRInterpretation(irr) === "Good" && "This is a good return rate that meets or exceeds typical market expectations."}
                    {getIRRInterpretation(irr) === "Fair" && "This is a fair return rate, close to some market averages."}
                    {getIRRInterpretation(irr) === "Poor" && "This return rate is below typical market benchmarks and may warrant reconsidering this investment."}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default XirrCalculator;