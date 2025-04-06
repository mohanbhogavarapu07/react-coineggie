import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RefreshCw, DollarSign, TrendingUp, Percent, Calculator, Target } from 'lucide-react';
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
} from 'recharts';
import { CalculatorLayout } from '@/layouts/CalculatorLayout';

interface EmailROIData {
  month: number;
  emailCost: number;
  revenue: number;
  profit: number;
  roi: number;
  openRate: number;
  clickRate: number;
}

const EmailMarketingROICalculator = () => {
  const [subscriberCount, setSubscriberCount] = useState(10000);
  const [emailFrequency, setEmailFrequency] = useState(4);
  const [averageOrderValue, setAverageOrderValue] = useState(2000);
  const [conversionRate, setConversionRate] = useState(1);
  const [emailCost, setEmailCost] = useState(5000);
  const [result, setResult] = useState({
    monthlyRevenue: 0,
    monthlyROI: 0,
    totalRevenue: 0,
    totalCost: 0,
    totalROI: 0,
    openRate: 0,
    clickRate: 0,
  });
  const [chartData, setChartData] = useState<EmailROIData[]>([]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const calculateEmailROI = () => {
    // Calculate email metrics
    const openRate = 25; // Industry average
    const clickRate = 2.5; // Industry average
    const monthlyEmails = emailFrequency * 4; // Assuming 4 weeks per month
    
    // Calculate monthly revenue
    const monthlyRevenue = (subscriberCount * (openRate / 100) * (clickRate / 100) * (conversionRate / 100) * averageOrderValue);
    const monthlyROI = ((monthlyRevenue - emailCost) / emailCost) * 100;
    
    // Generate chart data for 12 months
    const data: EmailROIData[] = [];
    let currentSubscribers = subscriberCount;
    let totalRevenue = 0;
    let totalCost = 0;
    
    for (let month = 1; month <= 12; month++) {
      const monthSubscribers = currentSubscribers;
      const monthEmails = monthlyEmails;
      const monthCost = emailCost;
      const monthRevenue = (monthSubscribers * (openRate / 100) * (clickRate / 100) * (conversionRate / 100) * averageOrderValue);
      const monthProfit = monthRevenue - monthCost;
      const monthROI = ((monthRevenue - monthCost) / monthCost) * 100;
      
      data.push({
        month,
        emailCost: monthCost,
        revenue: monthRevenue,
        profit: monthProfit,
        roi: monthROI,
        openRate,
        clickRate,
      });
      
      currentSubscribers = Math.floor(currentSubscribers * 1.05); // 5% growth
      totalRevenue += monthRevenue;
      totalCost += monthCost;
    }

    const totalROI = ((totalRevenue - totalCost) / totalCost) * 100;

    setResult({
      monthlyRevenue,
      monthlyROI,
      totalRevenue,
      totalCost,
      totalROI,
      openRate,
      clickRate,
    });

    setChartData(data);
  };

  useEffect(() => {
    calculateEmailROI();
  }, [subscriberCount, emailFrequency, averageOrderValue, conversionRate, emailCost]);

  const handleReset = () => {
    setSubscriberCount(10000);
    setEmailFrequency(4);
    setAverageOrderValue(2000);
    setConversionRate(1);
    setEmailCost(5000);
  };

  const calculatorContent = (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Subscriber Count</label>
              <span className="text-sm font-bold">{subscriberCount.toLocaleString()}</span>
            </div>
            <Slider 
              value={[subscriberCount]} 
              min={0} 
              max={100000} 
              step={1000}
              onValueChange={(value) => setSubscriberCount(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={subscriberCount}
              onChange={(e) => setSubscriberCount(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Emails per Week</label>
              <span className="text-sm font-bold">{emailFrequency}</span>
            </div>
            <Slider 
              value={[emailFrequency]} 
              min={1} 
              max={7} 
              step={1}
              onValueChange={(value) => setEmailFrequency(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={emailFrequency}
              onChange={(e) => setEmailFrequency(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Average Order Value</label>
              <span className="text-sm font-bold">{formatCurrency(averageOrderValue)}</span>
            </div>
            <Slider 
              value={[averageOrderValue]} 
              min={0} 
              max={10000} 
              step={100}
              onValueChange={(value) => setAverageOrderValue(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={averageOrderValue}
              onChange={(e) => setAverageOrderValue(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Conversion Rate (%)</label>
              <span className="text-sm font-bold">{conversionRate}%</span>
            </div>
            <Slider 
              value={[conversionRate]} 
              min={0} 
              max={10} 
              step={0.1}
              onValueChange={(value) => setConversionRate(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={conversionRate}
              onChange={(e) => setConversionRate(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Monthly Email Cost</label>
              <span className="text-sm font-bold">{formatCurrency(emailCost)}</span>
            </div>
            <Slider 
              value={[emailCost]} 
              min={0} 
              max={50000} 
              step={1000}
              onValueChange={(value) => setEmailCost(value[0])}
              className="bg-purple-100"
            />
            <Input
              type="number"
              value={emailCost}
              onChange={(e) => setEmailCost(Number(e.target.value))}
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
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <div className="text-sm text-gray-500">Monthly ROI</div>
                <div className="text-2xl font-bold text-purple-600">
                  {result.monthlyROI.toFixed(1)}%
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Monthly Revenue</div>
                  <div className="text-lg font-bold text-green-600">
                    {formatCurrency(result.monthlyRevenue)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Total ROI (12 months)</div>
                  <div className="text-lg font-bold text-blue-600">
                    {result.totalROI.toFixed(1)}%
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="rounded-md border p-4 h-64">
            <h3 className="text-sm font-medium mb-2">Revenue & ROI Analysis</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis 
                  dataKey="month" 
                  label={{ value: 'Months', position: 'insideBottom', offset: -5 }} 
                />
                <YAxis tickFormatter={(value) => `${value.toFixed(1)}%`} />
                <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="roi" 
                  name="ROI %" 
                  stroke="#7ac9a7" 
                  strokeWidth={3}
                  dot={{ r: 0 }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="openRate" 
                  name="Open Rate %" 
                  stroke="#e9c46a" 
                  strokeWidth={3}
                  dot={{ r: 0 }}
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="clickRate" 
                  name="Click Rate %" 
                  stroke="#245e4f" 
                  strokeWidth={2}
                  dot={{ r: 0 }}
                  activeDot={{ r: 6 }}
                />
                <ReferenceLine 
                  y={0} 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  label={{ value: 'Break Even', position: 'right', fill: '#ef4444' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const aboutContent = (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-amber-800">Understanding Email Marketing ROI</h3>
      <p className="text-sm text-amber-700">
        Email Marketing ROI measures the return on investment from your email campaigns. 
        It's calculated by comparing the revenue generated from email marketing against the 
        cost of your email marketing activities. A positive ROI indicates that your email 
        marketing strategy is profitable.
      </p>
      <div className="mt-4 space-y-2">
        <h4 className="font-medium text-amber-800">Key Components:</h4>
        <ul className="list-disc pl-5 text-sm text-amber-700">
          <li><strong>Subscriber Count:</strong> Number of email subscribers</li>
          <li><strong>Email Frequency:</strong> Number of emails sent per week</li>
          <li><strong>Average Order Value:</strong> Revenue per conversion</li>
          <li><strong>Conversion Rate:</strong> Percentage of clicks that result in sales</li>
          <li><strong>Email Cost:</strong> Total investment in email marketing</li>
          <li><strong>Open Rate:</strong> Percentage of subscribers who open emails</li>
          <li><strong>Click Rate:</strong> Percentage of opens that result in clicks</li>
        </ul>
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="Email Marketing ROI Calculator"
      description="Calculate and optimize your Email Marketing Return on Investment (ROI)"
      icon={<Target className="h-6 w-6" />}
      calculatorContent={calculatorContent}
      
      showSeparateAboutSection={true}
       activeTab="business"
      activeSubTab="marketing"
    />
  );
};

export default EmailMarketingROICalculator; 