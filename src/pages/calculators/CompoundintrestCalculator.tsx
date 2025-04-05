import React, { useState, useEffect } from "react";
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Cell, 
  Legend, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { Badge, BadgeIndianRupee, ChartBar, ChartPie, Download, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { CalculatorLayout } from "@/layouts/CalculatorLayout";

// Types
interface CompoundInterestResult {
  year: number;
  investmentValue: number;
  interestEarned: number;
  totalDeposited: number;
  annualContribution: number;
}

interface CompoundInterestParams {
  principal: number;
  annualContribution: number;
  contributionFrequency: string;
  interestRate: number;
  compoundingFrequency: string;
  years: number;
}

// Utility Functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

const formatIndianLargeNumber = (num: number): string => {
  if (num >= 10000000) { // 1 crore
    return `${(num / 10000000).toFixed(2)} Cr`;
  } else if (num >= 100000) { // 1 lakh
    return `${(num / 100000).toFixed(2)} L`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(2)} K`;
  }
  return num.toString();
};

const calculateCompoundInterest = (params: CompoundInterestParams): CompoundInterestResult[] => {
  const { principal, annualContribution, contributionFrequency, interestRate, compoundingFrequency, years } = params;
  
  // Convert interest rate from percentage to decimal
  const rate = interestRate / 100;
  
  // Determine number of times interest is compounded per year
  let compoundsPerYear: number;
  switch (compoundingFrequency) {
    case 'annually':
      compoundsPerYear = 1;
      break;
    case 'semi-annually':
      compoundsPerYear = 2;
      break;
    case 'quarterly':
      compoundsPerYear = 4;
      break;
    case 'monthly':
      compoundsPerYear = 12;
      break;
    case 'daily':
      compoundsPerYear = 365;
      break;
    default:
      compoundsPerYear = 12; // Default to monthly
  }
  
  // Determine contribution per compounding period
  let contributionsPerYear: number;
  switch (contributionFrequency) {
    case 'annually':
      contributionsPerYear = 1;
      break;
    case 'semi-annually':
      contributionsPerYear = 2;
      break;
    case 'quarterly':
      contributionsPerYear = 4;
      break;
    case 'monthly':
      contributionsPerYear = 12;
      break;
    default:
      contributionsPerYear = 12; // Default to monthly
  }
  
  const contributionPerPeriod = annualContribution / contributionsPerYear;
  const periodsPerContribution = compoundsPerYear / contributionsPerYear;
  
  const results: CompoundInterestResult[] = [];
  let totalValue = principal;
  let totalContributions = principal;
  
  for (let year = 0; year <= years; year++) {
    if (year === 0) {
      results.push({
        year,
        investmentValue: totalValue,
        interestEarned: 0,
        totalDeposited: principal,
        annualContribution: 0
      });
      continue;
    }

    let yearStart = totalValue;
    
    // Calculate compounding for this year
    for (let period = 0; period < contributionsPerYear; period++) {
      // Add contribution
      totalValue += contributionPerPeriod;
      totalContributions += contributionPerPeriod;
      
      // Compound interest for this period
      for (let i = 0; i < periodsPerContribution; i++) {
        totalValue *= (1 + (rate / compoundsPerYear));
      }
    }
    
    results.push({
      year,
      investmentValue: totalValue,
      interestEarned: totalValue - totalContributions,
      totalDeposited: totalContributions,
      annualContribution: annualContribution
    });
  }
  
  return results;
};

// Main Component
const CompoundInterestCalculator: React.FC = () => {
  // Input state
  const [principal, setPrincipal] = useState<number>(100000);
  const [annualContribution, setAnnualContribution] = useState<number>(60000);
  const [contributionFrequency, setContributionFrequency] = useState<string>("monthly");
  const [interestRate, setInterestRate] = useState<number>(8);
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>("quarterly");
  const [years, setYears] = useState<number>(10);
  const [chartType, setChartType] = useState<string>("area");
  const [emailAddress, setEmailAddress] = useState<string>("");

  // Results state
  const [results, setResults] = useState<CompoundInterestResult[]>([]); // Ensure results is declared in the component's state
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [isEmailSending, setIsEmailSending] = useState<boolean>(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState<boolean>(false);

  // Calculate results when inputs change
  useEffect(() => {
    setIsCalculating(true);
    const calculationResults = calculateCompoundInterest({
      principal,
      annualContribution,
      contributionFrequency,
      interestRate,
      compoundingFrequency,
      years
    });
    setResults(calculationResults);
    setIsCalculating(false);
  }, [principal, annualContribution, contributionFrequency, interestRate, compoundingFrequency, years]);

  // Handle form input changes
  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setPrincipal(value);
  };

  const handleAnnualContributionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setAnnualContribution(value);
  };

  const handleInterestRateChange = (values: number[]) => {
    setInterestRate(values[0]);
  };

  const handleYearsChange = (values: number[]) => {
    setYears(values[0]);
  };

  // Handle download PDF
  const handleDownloadPDF = async () => {
    if (!results.length) return;
    
    setIsPdfGenerating(true);
    try {
      // Create a simple text content
      const content = `
        Compound Interest Calculator Results
        
        Initial Investment: ${formatCurrency(principal)}
        Annual Contribution: ${formatCurrency(annualContribution)}
        Contribution Frequency: ${contributionFrequency}
        Interest Rate: ${formatPercentage(interestRate)}
        Compounding Frequency: ${compoundingFrequency}
        Investment Period: ${years} years
        
        Yearly Breakdown:
        ${results.map(result => `
          Year ${result.year}:
          Investment Value: ${formatCurrency(result.investmentValue)}
          Interest Earned: ${formatCurrency(result.interestEarned)}
          Total Deposited: ${formatCurrency(result.totalDeposited)}
        `).join('\n')}
      `;
      
      // Create a blob and download
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'compound-interest-calculation.txt';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('Results downloaded successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate results');
    } finally {
      setIsPdfGenerating(false);
    }
  };

  // Handle send email
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailAddress || !results.length) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsEmailSending(true);
    try {
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Results sent to your email');
      setEmailAddress('');
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email');
    } finally {
      setIsEmailSending(false);
    }
  };

  // Format data for charts
  const chartData = results.map(result => ({
    year: `Year ${result.year}`,
    principal: result.totalDeposited,
    interest: result.interestEarned,
    total: result.investmentValue,
  }));

  // Prepare data for pie chart
  const finalResult = results[results.length - 1] || { totalDeposited: 0, interestEarned: 0, investmentValue: 0 };
  const pieData = [
    { name: "Principal Invested", value: finalResult.totalDeposited },
    { name: "Interest Earned", value: finalResult.interestEarned }
  ];
  
  // Chart colors
  const COLORS = ["#245e4f", "#7ac9a7"];

  return (
    <CalculatorLayout
      title="Compound Interest Calculator"
      description="Calculate the future value of your investments with compound interest."
      icon={<BadgeIndianRupee className="h-6 w-6" />}
    >
      <div className="w-full animate-fade-in">
        <Card className="shadow-lg">
         
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Input Section */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="principal">Initial Investment (₹)</Label>
                  <Input
                    id="principal"
                    type="number"
                    value={principal}
                    onChange={handlePrincipalChange}
                    className="focus:ring-primary focus:border-primary"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="annualContribution">Annual Contribution (₹)</Label>
                  <Input
                    id="annualContribution"
                    type="number"
                    value={annualContribution}
                    onChange={handleAnnualContributionChange}
                    className="focus:ring-primary focus:border-primary"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contributionFrequency">Contribution Frequency</Label>
                  <Select 
                    value={contributionFrequency} 
                    onValueChange={setContributionFrequency}
                  >
                    <SelectTrigger id="contributionFrequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="semi-annually">Semi-Annually</SelectItem>
                      <SelectItem value="annually">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                    <span className="text-sm font-medium">{interestRate}%</span>
                  </div>
                  <Slider
                    id="interestRate"
                    min={1}
                    max={20}
                    step={0.1}
                    value={[interestRate]}
                    onValueChange={handleInterestRateChange}
                    className="py-4"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="compoundingFrequency">Compounding Frequency</Label>
                  <Select 
                    value={compoundingFrequency} 
                    onValueChange={setCompoundingFrequency}
                  >
                    <SelectTrigger id="compoundingFrequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annually">Annually</SelectItem>
                      <SelectItem value="semi-annually">Semi-Annually</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="years">Investment Period (Years)</Label>
                    <span className="text-sm font-medium">{years} years</span>
                  </div>
                  <Slider
                    id="years"
                    min={1}
                    max={40}
                    step={1}
                    value={[years]}
                    onValueChange={handleYearsChange}
                    className="py-4"
                  />
                </div>
              </div>

              {/* Results Section */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="area" className="w-full">
                  <div className="flex justify-between items-center mb-4">
                    <TabsList>
                      <TabsTrigger value="area" className="flex items-center gap-2">
                        <ChartBar className="h-4 w-4" />
                        Area Chart
                      </TabsTrigger>
                      <TabsTrigger value="bar" className="flex items-center gap-2">
                        <ChartBar className="h-4 w-4" />
                        Bar Chart
                      </TabsTrigger>
                      <TabsTrigger value="pie" className="flex items-center gap-2">
                        <ChartPie className="h-4 w-4" />
                        Pie Chart
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="area" className="mt-0">
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area 
                            type="monotone" 
                            dataKey="principal" 
                            stackId="1" 
                            stroke="#245e4f" 
                            fill="#245e4f" 
                            name="Principal" 
                          />
                          <Area 
                            type="monotone" 
                            dataKey="interest" 
                            stackId="1" 
                            stroke="#7ac9a7" 
                            fill="#7ac9a7" 
                            name="Interest" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="bar" className="mt-0">
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="principal" stackId="1" fill="#245e4f" name="Principal" />
                          <Bar dataKey="interest" stackId="1" fill="#7ac9a7" name="Interest" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="pie" className="mt-0">
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Results Summary */}
                {results.length > 0 && (
                  <div className="mt-6 p-4 bg-mint-green/10 rounded-lg border border-mint-green/30">
                    <h3 className="text-lg font-semibold text-dark-green mb-3">Results Summary</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-sm">
                        <p className="text-muted-foreground">Initial Investment</p>
                        <p className="font-semibold">{formatCurrency(principal)}</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Annual Contribution</p>
                        <p className="font-semibold">{formatCurrency(annualContribution)}</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Total Deposited</p>
                        <p className="font-semibold">{formatCurrency(finalResult.totalDeposited)}</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Interest Earned</p>
                        <p className="font-semibold text-dark-green">{formatCurrency(finalResult.interestEarned)}</p>
                      </div>
                      <div className="text-sm col-span-2">
                        <p className="text-muted-foreground">Final Investment Value</p>
                        <p className="font-semibold text-lg text-dark-green">{formatCurrency(finalResult.investmentValue)}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
             
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CalculatorLayout>
  );

};

export default CompoundInterestCalculator;