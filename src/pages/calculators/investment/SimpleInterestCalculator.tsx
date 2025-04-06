import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IndianRupee, Download, Mail, Info } from 'lucide-react';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CalculatorLayout } from '@/layouts/CalculatorLayout';
// Types
interface CalculationResult {
  principal: number;
  rate: number;
  time: number;
  interest: number;
  totalAmount: number;
  yearlyBreakdown: Array<{
    year: number;
    interest: number;
    balance: number;
  }>;
}

// Utility Functions
const formatInIndianRupees = (amount: number, decimals = 0): string => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return formatter.format(amount);
};

const parseIndianRupeeFormat = (formattedAmount: string): number => {
  const cleanedString = formattedAmount.replace(/[₹,\s]/g, '');
  return Number(cleanedString) || 0;
};

// Main Component
const SimpleInterestCalculator: React.FC = () => {
  // State for form inputs
  const [principal, setPrincipal] = useState<number>(100000); // ₹1 Lakh
  const [rate, setRate] = useState<number>(5); // 5%
  const [time, setTime] = useState<number>(3); // 3 years
  const [email, setEmail] = useState<string>('');
  
  // State for results
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [isEmailSending, setIsEmailSending] = useState<boolean>(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState<boolean>(false);

  // Calculate interest whenever inputs change
  useEffect(() => {
    calculateInterest();
  }, [principal, rate, time]);

  // Calculate simple interest
  const calculateInterest = () => {
    setIsCalculating(true);
    
    // Simple interest calculation: I = P × R × T
    const interest = (principal * rate * time) / 100;
    const totalAmount = principal + interest;
    
    // Create yearly breakdown
    const yearlyBreakdown = [];
    for (let year = 1; year <= time; year++) {
      const yearlyInterest = (principal * rate * year) / 100;
      yearlyBreakdown.push({
        year,
        interest: yearlyInterest,
        balance: principal + yearlyInterest
      });
    }
    
    setResult({
      principal,
      rate,
      time,
      interest,
      totalAmount,
      yearlyBreakdown
    });
    
    setIsCalculating(false);
  };

  // Handle input changes
  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseIndianRupeeFormat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setPrincipal(value);
    }
  };

  const handleRateChange = (value: number[]) => {
    setRate(value[0]);
  };

  const handleTimeChange = (value: number[]) => {
    setTime(value[0]);
  };

  // Handle PDF generation
  const handleDownloadPDF = async () => {
    if (!result) return;
    
    setIsPdfGenerating(true);
    try {
      // Create a simple PDF content
      const content = `
        Simple Interest Calculator Results
        
        Principal Amount: ${formatInIndianRupees(result.principal)}
        Interest Rate: ${result.rate}% p.a.
        Time Period: ${result.time} years
        
        Interest Earned: ${formatInIndianRupees(result.interest)}
        Total Amount: ${formatInIndianRupees(result.totalAmount)}
        
        Yearly Breakdown:
        ${result.yearlyBreakdown.map(year => `
          Year ${year.year}:
          Interest: ${formatInIndianRupees(year.interest)}
          Balance: ${formatInIndianRupees(year.balance)}
        `).join('\n')}
      `;
      
      // Create a blob and download
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'simple-interest-calculation.txt';
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

  // Handle email sending
  const handleSendEmail = async () => {
    if (!result || !email) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsEmailSending(true);
    try {
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Results sent to your email');
      setEmail('');
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email');
    } finally {
      setIsEmailSending(false);
    }
  };

  return (
    <CalculatorLayout
      title="Simple Interest Calculator"
      description="Calculate simple interest on your investments."
      icon={<IndianRupee className="h-6 w-6" />}
      activeTab="investment"
      >
     
    <div className="animate-fade-in">
      <Card className="shadow-lg border-mint-green/30">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
             
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="principal" className="text-charcoal">Principal Amount (₹)</Label>
                    <span className="text-sm text-muted-foreground">{formatInIndianRupees(principal)}</span>
                  </div>
                  <Input
                    id="principal"
                    type="text"
                    value={formatInIndianRupees(principal)}
                    onChange={handlePrincipalChange}
                    className="bg-white border-mint-green/50 focus:border-dark-green"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="rate" className="text-charcoal">Interest Rate (%)</Label>
                    <span className="text-sm text-muted-foreground">{rate}%</span>
                  </div>
                  <Slider
                    id="rate"
                    min={0.1}
                    max={20}
                    step={0.1}
                    value={[rate]}
                    onValueChange={handleRateChange}
                    className="py-4"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="time" className="text-charcoal">Time Period (Years)</Label>
                    <span className="text-sm text-muted-foreground">{time} years</span>
                  </div>
                  <Slider
                    id="time"
                    min={1}
                    max={30}
                    step={1}
                    value={[time]}
                    onValueChange={handleTimeChange}
                    className="py-4"
                  />
                </div>
              </div>

              {/* Results Panel */}
              {result && (
                <div className="p-4 bg-mint-green/10 rounded-lg border border-mint-green/30 mt-6">
                  <h3 className="text-lg font-semibold text-dark-green mb-3">Results Summary</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-sm">
                      <p className="text-muted-foreground">Principal</p>
                      <p className="font-semibold">{formatInIndianRupees(result.principal)}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground">Rate</p>
                      <p className="font-semibold">{result.rate}% p.a.</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground">Time</p>
                      <p className="font-semibold">{result.time} years</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground">Interest Earned</p>
                      <p className="font-semibold text-dark-green">{formatInIndianRupees(result.interest)}</p>
                    </div>
                    <div className="text-sm col-span-2">
                      <p className="text-muted-foreground">Total Amount</p>
                      <p className="font-semibold text-lg text-dark-green">{formatInIndianRupees(result.totalAmount)}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Email and Download */}
              <div className="space-y-3 mt-4 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white"
                  />
                 
                </div>

              </div>
            </div>

            {/* Yearly Breakdown Section */}
            <div className="bg-white p-4 rounded-lg border border-mint-green/30">
              <h3 className="text-lg font-semibold text-dark-green mb-4">Yearly Breakdown</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Year</th>
                          <th className="text-right py-2">Interest</th>
                          <th className="text-right py-2">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.yearlyBreakdown.map((year) => (
                          <tr key={year.year} className="border-b">
                            <td className="py-2">{year.year}</td>
                            <td className="text-right py-2">{formatInIndianRupees(year.interest)}</td>
                            <td className="text-right py-2">{formatInIndianRupees(year.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4 p-4 bg-mint-green/5 rounded-lg">
                    <h4 className="text-sm font-semibold text-dark-green mb-2">Simple Interest Formula</h4>
                    <p className="text-sm text-muted-foreground">
                      Interest = Principal × Rate × Time
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Where: Rate is in percentage and Time is in years
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">Enter values to see breakdown</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </CalculatorLayout>
  );
};

export default SimpleInterestCalculator;