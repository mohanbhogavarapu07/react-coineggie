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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Calculator } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
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
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';
import { CalculatorLayout } from '@/layouts/CalculatorLayout';

// Types and Interfaces
interface CalculationResult {
  roi: number;
  paybackPeriod: number;
  netProfit: number;
  totalInvestment: number;
  totalRevenue: number;
  totalCosts: number;
  monthlyROI: number[];
  cumulativeROI: number[];
  monthlyRevenue: number[];
  monthlyCosts: number[];
}

interface ChartDataPoint {
  name: string;
  value: number;
  fill?: string;
}

// Utility Functions
const formatCurrency = (value: number) => {
  return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
};

const formatPercentage = (value: number) => {
  return `${value.toFixed(2)}%`;
};

const formatMonths = (value: number) => {
  return `${value.toFixed(1)} months`;
};

// Results Display Component
const ROIResultsDisplay: React.FC<{ results: CalculationResult }> = ({ results }) => {
  // Prepare data for charts
  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    name: `Month ${i + 1}`,
    revenue: results.monthlyRevenue[i],
    costs: results.monthlyCosts[i],
    roi: results.monthlyROI[i],
    cumulativeROI: results.cumulativeROI[i]
  }));

  const roiData = [
    { name: 'ROI', value: results.roi, fill: '#245e4f' },
    { name: 'Payback Period', value: results.paybackPeriod, fill: '#7ac9a7' },
  ];
  
  const COLORS = ['#7ac9a7', '#245e4f'];

  return (
    <Card className="p-6 shadow-md bg-white">
      <h2 className="text-2xl font-bold text-primary mb-6">Your ROI Analysis Results</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-charcoal-DEFAULT">Summary</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-cream-DEFAULT p-4 rounded-lg border border-secondary">
              <p className="text-sm text-gray-500">ROI</p>
              <p className="text-2xl font-bold text-primary">{formatPercentage(results.roi)}</p>
            </div>
            
            <div className="bg-cream-DEFAULT p-4 rounded-lg border border-secondary">
              <p className="text-sm text-gray-500">Payback Period</p>
              <p className="text-2xl font-bold text-primary">{formatMonths(results.paybackPeriod)}</p>
            </div>
            
            <div className="bg-cream-DEFAULT p-4 rounded-lg border border-secondary">
              <p className="text-sm text-gray-500">Total Investment</p>
              <p className="text-xl font-bold text-primary">{formatCurrency(results.totalInvestment)}</p>
            </div>
            
            <div className="bg-cream-DEFAULT p-4 rounded-lg border border-secondary">
              <p className="text-sm text-gray-500">Net Profit</p>
              <p className="text-xl font-bold text-primary">{formatCurrency(results.netProfit)}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-charcoal-DEFAULT mb-4">Monthly ROI Breakdown</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `${value.toFixed(0)}%`} />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toFixed(2)}%`, 'ROI']}
                    labelStyle={{ color: '#333333' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="roi" 
                    name="Monthly ROI" 
                    stroke="#245e4f" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cumulativeROI" 
                    name="Cumulative ROI" 
                    stroke="#7ac9a7" 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-charcoal-DEFAULT">Revenue vs. Investment</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Amount']}
                  labelStyle={{ color: '#333333' }}
                />
                <Legend />
                <Bar dataKey="revenue" name="Revenue" fill="#245e4f" />
                <Bar dataKey="costs" name="Costs" fill="#e9c46a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-cream-DEFAULT p-4 rounded-lg border border-secondary mt-6">
            <h4 className="font-semibold text-primary mb-2">ROI Interpretation</h4>
            <p className="text-charcoal-DEFAULT mb-2">
              {results.roi > 100 ? 
                "Excellent ROI! Your investment is generating significant returns." : 
                results.roi > 50 ? 
                  "Good ROI. Your investment is performing well." : 
                  results.roi > 0 ? 
                    "Positive ROI. Your investment is profitable." : 
                    "Negative ROI. Your investment is not profitable."}
            </p>
            <p className="text-charcoal-DEFAULT">
              Your investment will pay for itself in approximately {formatMonths(results.paybackPeriod)}.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Explanation Component
const ROIExplanation: React.FC = () => {
  return (
    <Card className="p-6 shadow-md bg-white">
      <h2 className="text-2xl font-bold text-primary mb-6">Understanding ROI</h2>
      
      <div className="prose max-w-none">
        <p className="text-charcoal-DEFAULT mb-4">
          Return on Investment (ROI) is a performance measure used to evaluate the efficiency or profitability of an investment. 
          It compares the magnitude and timing of gains from an investment directly to the magnitude and timing of investment costs.
        </p>
        
        <h3 className="text-xl font-semibold text-primary mt-6 mb-4">What is ROI?</h3>
        <p className="text-charcoal-DEFAULT mb-4">
          ROI is calculated by dividing the net profit (or loss) from an investment by the cost of the investment. 
          The result is expressed as a percentage or a ratio. A positive ROI means the investment is profitable, 
          while a negative ROI indicates a loss.
        </p>
        
        <Accordion type="single" collapsible className="mt-6">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold text-primary">Why Calculate ROI?</AccordionTrigger>
            <AccordionContent className="text-charcoal-DEFAULT">
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Investment Evaluation:</strong> ROI helps you determine if an investment is worth pursuing.</li>
                <li><strong>Comparison Tool:</strong> It allows you to compare different investment opportunities.</li>
                <li><strong>Performance Measurement:</strong> ROI provides a clear metric to measure the success of your investments.</li>
                <li><strong>Resource Allocation:</strong> It helps you make informed decisions about where to allocate resources.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold text-primary">ROI Calculation Methods</AccordionTrigger>
            <AccordionContent className="text-charcoal-DEFAULT">
              <p className="mb-4">There are several ways to calculate ROI:</p>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <strong>Basic ROI Formula:</strong> (Net Profit / Total Investment) × 100
                </li>
                <li>
                  <strong>Annualized ROI:</strong> Useful for comparing investments with different time periods.
                </li>
                <li>
                  <strong>ROI with Time Value of Money:</strong> Accounts for the time value of money using discounted cash flows.
                </li>
                <li>
                  <strong>Social ROI:</strong> Measures the return on investment for social media and marketing campaigns.
                </li>
              </ol>
              <p className="mt-4">
                Our calculator uses the basic ROI formula and also calculates the payback period, which is the time it takes for an investment to generate enough returns to cover its initial cost.
              </p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-semibold text-primary">Interpreting ROI Results</AccordionTrigger>
            <AccordionContent className="text-charcoal-DEFAULT">
              <p className="mb-4">
                Understanding what your ROI means is crucial for decision-making:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Positive ROI:</strong> Indicates that your investment is profitable. The higher the percentage, the better the return.</li>
                <li><strong>Negative ROI:</strong> Indicates that your investment is losing money.</li>
                <li><strong>ROI of 0%:</strong> Means you're breaking even - neither gaining nor losing money.</li>
                <li><strong>Payback Period:</strong> The time it takes to recover the initial investment. A shorter payback period is generally better.</li>
              </ul>
              <p className="mt-4">
                Industry benchmarks can help you determine if your ROI is competitive. Different industries have different typical ROI ranges.
              </p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-semibold text-primary">Improving Your ROI</AccordionTrigger>
            <AccordionContent className="text-charcoal-DEFAULT">
              <p className="mb-4">Here are strategies to improve your ROI:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Reduce Costs:</strong> Look for ways to decrease your investment or operational costs.</li>
                <li><strong>Increase Revenue:</strong> Find ways to generate more income from your investment.</li>
                <li><strong>Optimize Timing:</strong> Consider when to make investments to maximize returns.</li>
                <li><strong>Risk Management:</strong> Implement strategies to minimize potential losses.</li>
                <li><strong>Continuous Monitoring:</strong> Regularly track your ROI to identify trends and make adjustments.</li>
              </ol>
              <p className="mt-4">
                By understanding and regularly calculating your ROI, you can make more informed investment decisions and improve your financial outcomes.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="bg-cream-DEFAULT p-4 rounded-lg border border-secondary mt-8">
          <h3 className="text-lg font-semibold text-primary mb-2">How Our Calculator Works</h3>
          <p className="text-charcoal-DEFAULT">
            Our ROI Calculator uses your investment amount, expected monthly revenue, and monthly costs to calculate your ROI, 
            payback period, and generate monthly projections. This information helps you understand the potential profitability 
            of your investment and make informed financial decisions.
          </p>
        </div>
        
        <p className="mt-8 text-sm text-gray-500">
          Disclaimer: This calculator provides estimates based on the information you provide. Actual ROI may 
          vary based on market conditions, competition, and other factors. Always conduct thorough research 
          and consider consulting with financial professionals before making investment decisions.
        </p>
      </div>
    </Card>
  );
};

// Main Calculator Component
const RoiCalculator = () => {
  const { toast } = useToast();
  const [initialInvestment, setInitialInvestment] = useState<string>('100000');
  const [monthlyRevenue, setMonthlyRevenue] = useState<string>('15000');
  const [monthlyCosts, setMonthlyCosts] = useState<string>('5000');
  const [growthRate, setGrowthRate] = useState<string>('5');
  const [timePeriod, setTimePeriod] = useState<string>('12');
  const [calculatedResults, setCalculatedResults] = useState<CalculationResult | null>(null);

  // Calculate default results on component mount
  useEffect(() => {
    calculateROI();
  }, []);

  const calculateROI = () => {
    if (!initialInvestment || !monthlyRevenue || !monthlyCosts || !growthRate || !timePeriod) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const investment = parseFloat(initialInvestment);
    const revenue = parseFloat(monthlyRevenue);
    const costs = parseFloat(monthlyCosts);
    const growth = parseFloat(growthRate) / 100;
    const months = parseInt(timePeriod);

    if (isNaN(investment) || isNaN(revenue) || isNaN(costs) || isNaN(growth) || isNaN(months)) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers for all fields.",
        variant: "destructive",
      });
      return;
    }

    // Calculate monthly values
    const monthlyRevenueArray: number[] = [];
    const monthlyCostsArray: number[] = [];
    const monthlyROIArray: number[] = [];
    const cumulativeROIArray: number[] = [];
    
    let totalRevenue = 0;
    let totalCosts = 0;
    let cumulativeProfit = -investment;
    let paybackPeriod = 0;
    let paybackFound = false;
    
    for (let i = 0; i < months; i++) {
      // Apply growth rate to revenue
      const currentRevenue = revenue * Math.pow(1 + growth, i);
      const currentCosts = costs * Math.pow(1 + growth * 0.5, i); // Costs grow at half the rate of revenue
      
      monthlyRevenueArray.push(currentRevenue);
      monthlyCostsArray.push(currentCosts);
      
      totalRevenue += currentRevenue;
      totalCosts += currentCosts;
      
      const monthlyProfit = currentRevenue - currentCosts;
      const monthlyROI = (monthlyProfit / investment) * 100;
      monthlyROIArray.push(monthlyROI);
      
      cumulativeProfit += monthlyProfit;
      const cumulativeROI = (cumulativeProfit / investment) * 100;
      cumulativeROIArray.push(cumulativeROI);
      
      // Calculate payback period
      if (!paybackFound && cumulativeProfit >= 0) {
        paybackPeriod = i + 1 + (Math.abs(cumulativeProfit - monthlyProfit) / monthlyProfit);
        paybackFound = true;
      }
    }
    
    // If payback period not found within the time period, estimate it
    if (!paybackFound) {
      const lastMonthlyProfit = monthlyRevenueArray[months - 1] - monthlyCostsArray[months - 1];
      paybackPeriod = months + (Math.abs(cumulativeProfit) / lastMonthlyProfit);
    }
    
    const netProfit = totalRevenue - totalCosts - investment;
    const roi = (netProfit / investment) * 100;
    
    const results: CalculationResult = {
      roi: roi,
      paybackPeriod: paybackPeriod,
      netProfit: netProfit,
      totalInvestment: investment,
      totalRevenue: totalRevenue,
      totalCosts: totalCosts,
      monthlyROI: monthlyROIArray,
      cumulativeROI: cumulativeROIArray,
      monthlyRevenue: monthlyRevenueArray,
      monthlyCosts: monthlyCostsArray,
    };

    setCalculatedResults(results);
    
    toast({
      title: "Calculation Complete",
      description: "Your ROI has been calculated successfully.",
    });
  };

  return (
    <CalculatorLayout
      title="ROI Calculator"
      description="Calculate your return on investment"
      icon={<Calculator className="h-5 w-5 text-finance-green" />}
    >
      <div className="space-y-8">
        <Card className="p-6 shadow-md bg-white">
          <h2 className="text-2xl font-bold text-primary mb-6">ROI Calculator</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="initial-investment">Initial Investment (₹)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                  <Input
                    id="initial-investment"
                    type="number"
                    className="pl-8"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(e.target.value)}
                    placeholder="Enter initial investment amount"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthly-revenue">Monthly Revenue (₹)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                  <Input
                    id="monthly-revenue"
                    type="number"
                    className="pl-8"
                    value={monthlyRevenue}
                    onChange={(e) => setMonthlyRevenue(e.target.value)}
                    placeholder="Enter expected monthly revenue"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthly-costs">Monthly Costs (₹)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                  <Input
                    id="monthly-costs"
                    type="number"
                    className="pl-8"
                    value={monthlyCosts}
                    onChange={(e) => setMonthlyCosts(e.target.value)}
                    placeholder="Enter expected monthly costs"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="growth-rate">Monthly Growth Rate (%)</Label>
                <Input
                  id="growth-rate"
                  type="number"
                  value={growthRate}
                  onChange={(e) => setGrowthRate(e.target.value)}
                  placeholder="Enter expected monthly growth rate"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time-period">Time Period (Months)</Label>
                <Input
                  id="time-period"
                  type="number"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                  placeholder="Enter analysis time period in months"
                />
              </div>

              <div className="pt-6">
                <Button 
                  onClick={calculateROI}
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Calculate ROI
                </Button>
              </div>
            </div>
          </div>
        </Card>
        
        {calculatedResults && (
          <>
            <ROIResultsDisplay results={calculatedResults} />
           
          </>
        )}
      </div>
    </CalculatorLayout>
  );
};

export default RoiCalculator; 