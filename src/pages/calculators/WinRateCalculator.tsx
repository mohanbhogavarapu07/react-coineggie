import React, { useState, useEffect } from 'react';
import { CalculatorLayout } from '@/layouts/CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { BarChart3, RefreshCw, TrendingUp, DollarSign, Download, Mail, Share2 } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { toast } from '@/components/ui/use-toast';

interface WinRateResults {
  winRate: number;
  totalRevenue: number;
  avgDealSize: number;
  avgDealValue: number;
  lostOpportunitiesValue: number;
  conversionRate: number;
  revenuePerDeal: number;
  potentialRevenue: number;
}

const INITIAL_RESULTS: WinRateResults = {
  winRate: 0,
  totalRevenue: 0,
  avgDealSize: 0,
  avgDealValue: 0,
  lostOpportunitiesValue: 0,
  conversionRate: 0,
  revenuePerDeal: 0,
  potentialRevenue: 0
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const WinRateCalculator = () => {
  const [dealsWon, setDealsWon] = useState(10);
  const [totalDeals, setTotalDeals] = useState(20);
  const [totalRevenue, setTotalRevenue] = useState(100000);
  const [averageSalesCycle, setAverageSalesCycle] = useState(30);
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<WinRateResults>(INITIAL_RESULTS);
  const [chartData, setChartData] = useState<any[]>([]);
  const [pieChartData, setPieChartData] = useState<any[]>([]);
  const [hasCalculated, setHasCalculated] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculateWinRate = () => {
    if (totalDeals === 0) return;

    // Calculate win rate
    const winRate = (dealsWon / totalDeals) * 100;
    
    // Calculate average deal value
    const avgDealValue = dealsWon > 0 ? totalRevenue / dealsWon : 0;
    
    // Calculate average deal size (considering all opportunities)
    const avgDealSize = totalDeals > 0 ? totalRevenue / totalDeals : 0;
    
    // Calculate value of lost opportunities
    const lostDeals = totalDeals - dealsWon;
    const lostOpportunitiesValue = lostDeals * avgDealValue;
    
    // Calculate conversion rate (same as win rate in this context)
    const conversionRate = winRate;
    
    // Calculate revenue per deal
    const revenuePerDeal = totalRevenue / totalDeals;
    
    // Calculate potential revenue if all deals were won
    const potentialRevenue = totalDeals * avgDealValue;

    setResult({
      winRate,
      totalRevenue,
      avgDealSize,
      avgDealValue,
      lostOpportunitiesValue,
      conversionRate,
      revenuePerDeal,
      potentialRevenue
    });

    generateChartData(dealsWon, totalDeals, totalRevenue, avgDealValue);
    generatePieChartData(dealsWon, lostDeals);
    setHasCalculated(true);
    
    toast({
      title: "Calculation complete",
      description: "Your sales win rate metrics have been calculated.",
    });
  };

  const generateChartData = (won: number, total: number, revenue: number, avgValue: number) => {
    const data = [];
    const lostDeals = total - won;
    
    // Generate monthly data points for the last 12 months
    for (let i = 0; i <= 12; i++) {
      const monthWon = Math.round(won * (i / 12));
      const monthLost = Math.round(lostDeals * (i / 12));
      const monthRevenue = Math.round(revenue * (i / 12));
      const monthLostValue = monthLost * avgValue;
      
      data.push({
        month: i,
        won: monthWon,
        lost: monthLost,
        revenue: monthRevenue,
        lostValue: monthLostValue
      });
    }
    
    setChartData(data);
  };

  const generatePieChartData = (won: number, lost: number) => {
    const data = [
      { name: 'Won Deals', value: won },
      { name: 'Lost Deals', value: lost }
    ];
    setPieChartData(data);
  };

  useEffect(() => {
    calculateWinRate();
  }, [dealsWon, totalDeals, totalRevenue]);

  const handleReset = () => {
    setDealsWon(10);
    setTotalDeals(20);
    setTotalRevenue(100000);
    setAverageSalesCycle(30);
    setEmail('');
    setHasCalculated(false);
  };

  const handleDownload = () => {
    if (!hasCalculated) {
      toast({
        title: "No data to download",
        description: "Please calculate your win rate first.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would generate a PDF report
    toast({
      title: "Download started",
      description: "Your PDF report is being generated.",
    });
  };

  const handleEmailSend = () => {
    if (!hasCalculated) {
      toast({
        title: "No data to send",
        description: "Please calculate your win rate first.",
        variant: "destructive"
      });
      return;
    }
    
    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would send an email with the report
    toast({
      title: "Email sent",
      description: `Your report has been sent to ${email}`,
    });
  };

  const handleShare = () => {
    if (!hasCalculated) {
      toast({
        title: "No data to share",
        description: "Please calculate your win rate first.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would generate a shareable link
    toast({
      title: "Link generated",
      description: "Your report link has been copied to clipboard.",
    });
  };

  const calculatorContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Deals Won</label>
            <span className="text-sm font-bold">{dealsWon} deals</span>
          </div>
          <Slider 
            value={[dealsWon]} 
            min={0} 
            max={100} 
            step={1}
            onValueChange={(value) => setDealsWon(value[0])}
            className="bg-finance-green/10"
          />
          <Input
            type="number"
            value={dealsWon}
            onChange={(e) => setDealsWon(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Total Deals</label>
            <span className="text-sm font-bold">{totalDeals} deals</span>
          </div>
          <Slider 
            value={[totalDeals]} 
            min={0} 
            max={200} 
            step={1}
            onValueChange={(value) => setTotalDeals(value[0])}
            className="bg-finance-green/10"
          />
          <Input
            type="number"
            value={totalDeals}
            onChange={(e) => setTotalDeals(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Total Revenue</label>
            <span className="text-sm font-bold">{formatCurrency(totalRevenue)}</span>
          </div>
          <Slider 
            value={[totalRevenue]} 
            min={0} 
            max={1000000} 
            step={10000}
            onValueChange={(value) => setTotalRevenue(value[0])}
            className="bg-finance-green/10"
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
            <label className="text-sm font-medium">Average Sales Cycle (Days)</label>
            <span className="text-sm font-bold">{averageSalesCycle} days</span>
          </div>
          <Slider 
            value={[averageSalesCycle]} 
            min={1} 
            max={180} 
            step={1}
            onValueChange={(value) => setAverageSalesCycle(value[0])}
            className="bg-finance-green/10"
          />
          <Input
            type="number"
            value={averageSalesCycle}
            onChange={(e) => setAverageSalesCycle(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium">Email for Report</label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button onClick={handleReset} variant="outline" className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset Values
          </Button>
          <Button onClick={handleDownload} variant="outline" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button onClick={handleEmailSend} variant="outline" className="w-full">
            <Mail className="mr-2 h-4 w-4" />
            Email Report
          </Button>
          <Button onClick={handleShare} variant="outline" className="w-full">
            <Share2 className="mr-2 h-4 w-4" />
            Share Report
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-4">
          <Card className="bg-finance-green/5 border-finance-green/20">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Win Rate</div>
              <div className="text-2xl font-bold text-finance-green">
                {result.winRate.toFixed(1)}%
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Avg Deal Size</div>
                <div className="text-lg font-bold">
                  {formatCurrency(result.avgDealSize)}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Lost Value</div>
                <div className="text-lg font-bold text-finance-green">
                  {formatCurrency(result.lostOpportunitiesValue)}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Conversion Rate</div>
                <div className="text-lg font-bold">
                  {result.conversionRate.toFixed(1)}%
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground">Potential Revenue</div>
                <div className="text-lg font-bold text-finance-green">
                  {formatCurrency(result.potentialRevenue)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-md border p-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottom', offset: -5 }} />
                <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stackId="1" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  name="Revenue"
                />
                <Area 
                  type="monotone" 
                  dataKey="lostValue" 
                  stackId="1" 
                  stroke="#245e4f" 
                  fill="#245e4f" 
                  name="Lost Value"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-md border p-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} deals`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const aboutContent = (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-amber-800">Understanding Win Rate</h3>
      <p className="text-sm text-amber-700">
        Win Rate is a crucial metric that measures the percentage of sales opportunities that result in successful deals. 
        It helps you evaluate your sales team's effectiveness and identify areas for improvement. A higher win rate indicates 
        better sales performance and more efficient use of resources.
      </p>
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-amber-800">Key Components:</h4>
        <ul className="list-disc pl-5 text-sm text-amber-700">
          <li><strong>Deals Won:</strong> Number of successful sales opportunities</li>
          <li><strong>Total Deals:</strong> Total number of sales opportunities</li>
          <li><strong>Total Revenue:</strong> Revenue generated from won deals</li>
          <li><strong>Average Sales Cycle:</strong> Time taken to close a deal</li>
          <li><strong>Lost Value:</strong> Potential revenue from lost opportunities</li>
          <li><strong>Conversion Rate:</strong> Percentage of opportunities converted to sales</li>
        </ul>
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="Win Rate Calculator"
      description="Calculate and analyze your sales win rate metrics"
      icon={<BarChart3 className="h-6 w-6" />}
      calculatorContent={calculatorContent}
      aboutContent={aboutContent}
      showSeparateAboutSection={true}
    />
  );
};

export default WinRateCalculator; 