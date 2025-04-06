import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, ChevronDown, ChevronUp, BadgeIndianRupee } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { CalculatorLayout } from "@/layouts/CalculatorLayout";

// Types
interface FormData {
  visitors: number;
  conversions: number;
  averageOrderValue: number;
  adSpend: number;
}

interface ChartDataPoint {
  name: string;
  value: number;
  fill: string;
}

interface PDFData {
  conversionRate: number;
  totalRevenue: number;
  roi: number;
  costPerConversion: number;
  visitors: number;
  conversions: number;
  averageOrderValue: number;
  adSpend: number;
}

// Utility Functions
const formatIndianRupee = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

const formatPercentage = (value: number) => {
  return `${value.toFixed(2)}%`;
};

// Chart Component
const ConversionChart: React.FC<{ data: ChartDataPoint[] }> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 30 }}>
        <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-25} textAnchor="end" height={70} />
        <YAxis />
        <Tooltip formatter={(value) => [`${value}`, '']} />
        <Bar dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

const RevenuePieChart: React.FC<{ data: ChartDataPoint[] }> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        />
        <Legend verticalAlign="bottom" height={36} />
        <Tooltip formatter={(value) => [formatIndianRupee(value as number), '']} />
      </PieChart>
    </ResponsiveContainer>
  );
};

// Main Component
const LandingPageCalculator: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    visitors: 1000,
    conversions: 25,
    averageOrderValue: 2500,
    adSpend: 10000,
  });
  const [conversionRate, setConversionRate] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [roi, setRoi] = useState(0);
  const [costPerConversion, setCostPerConversion] = useState(0);
  const [isCalculated, setIsCalculated] = useState(true);
  const [showAdvancedFields, setShowAdvancedFields] = useState(false);
  const [showInfo, setShowInfo] = useState({
    section1: false,
    section2: false,
    section3: false,
    section4: false,
  });

  useEffect(() => {
    calculateResults();
  }, []);

  const calculateResults = () => {
    // Calculate conversion rate
    const cr = (formData.conversions / formData.visitors) * 100;
    setConversionRate(parseFloat(cr.toFixed(2)));

    // Calculate total revenue
    const revenue = formData.conversions * formData.averageOrderValue;
    setTotalRevenue(revenue);

    // Calculate ROI
    const returnOnInvestment = ((revenue - formData.adSpend) / formData.adSpend) * 100;
    setRoi(parseFloat(returnOnInvestment.toFixed(2)));

    // Calculate cost per conversion
    const cpc = formData.adSpend / formData.conversions;
    setCostPerConversion(parseFloat(cpc.toFixed(2)));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value) || 0,
    });
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculated(true);
    calculateResults();
  };

  const toggleInfoSection = (section: string) => {
    setShowInfo({
      ...showInfo,
      [section]: !showInfo[section as keyof typeof showInfo],
    });
  };

  const barChartData = [
    {
      name: 'Conversion Rate',
      value: conversionRate,
      fill: '#245e4f',
    },
    {
      name: 'Total Revenue (₹1000s)',
      value: totalRevenue / 1000,
      fill: '#7ac9a7',
    },
    {
      name: 'Cost Per Conversion (₹100s)',
      value: costPerConversion / 100,
      fill: '#e9c46a',
    },
  ];

  const pieChartData = [
    { name: 'Revenue', value: totalRevenue, fill: '#7ac9a7' },
    { name: 'Ad Spend', value: formData.adSpend, fill: '#e9c46a' },
  ];

  return (
    <CalculatorLayout
      title="Landing Page Calculator"
      description="Calculate and analyze your landing page conversion rates and ROI"
      icon={<Calculator className="h-5 w-5 text-marketing-blue" />}
      activeTab="business"
      activeSubTab="marketing"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Calculator className="mr-2 text-primary" size={24} />
            <h2 className="text-xl font-semibold">Landing Page Conversion Rate Calculator</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <form onSubmit={handleCalculate} className="space-y-6">
                <div>
                  <Label htmlFor="visitors">Number of Visitors</Label>
                  <Input
                    type="number"
                    id="visitors"
                    name="visitors"
                    value={formData.visitors}
                    onChange={handleInputChange}
                    className="mt-1"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="conversions">Number of Conversions</Label>
                  <Input
                    type="number"
                    id="conversions"
                    name="conversions"
                    value={formData.conversions}
                    onChange={handleInputChange}
                    className="mt-1"
                    min="0"
                    max={formData.visitors}
                    required
                  />
                  {formData.conversions > formData.visitors && (
                    <p className="text-red-500 text-xs mt-1">
                      Conversions cannot exceed the number of visitors.
                    </p>
                  )}
                </div>

                <div>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowAdvancedFields(!showAdvancedFields)}
                    className="flex items-center text-primary font-medium mb-2"
                  >
                    Advanced Options
                    {showAdvancedFields ? (
                      <ChevronUp size={16} className="ml-1" />
                    ) : (
                      <ChevronDown size={16} className="ml-1" />
                    )}
                  </Button>

                  {showAdvancedFields && (
                    <div className="space-y-4 border-l-2 border-secondary pl-4 py-2 animate-fade-in">
                      <div>
                        <Label htmlFor="averageOrderValue">Average Order Value (₹)</Label>
                        <div className="relative">
                          <BadgeIndianRupee className="absolute left-3 top-2.5 text-gray-500" size={18} />
                          <Input
                            type="number"
                            id="averageOrderValue"
                            name="averageOrderValue"
                            value={formData.averageOrderValue}
                            onChange={handleInputChange}
                            className="mt-1 pl-10"
                            min="0"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="adSpend">Ad Spend / Marketing Cost (₹)</Label>
                        <div className="relative">
                          <BadgeIndianRupee className="absolute left-3 top-2.5 text-gray-500" size={18} />
                          <Input
                            type="number"
                            id="adSpend"
                            name="adSpend"
                            value={formData.adSpend}
                            onChange={handleInputChange}
                            className="mt-1 pl-10"
                            min="0"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button type="submit" className="bg-primary hover:bg-primary/90 flex-1">
                    Calculate Results
                  </Button>
                </div>
              </form>

              {isCalculated && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 animate-scale-in">
                  <h3 className="text-xl font-semibold text-primary mb-4">Results</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Conversion Rate:</span>
                      <span className="font-semibold">{conversionRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Total Revenue:</span>
                      <span className="font-semibold">{formatIndianRupee(totalRevenue)}</span>
                    </div>
                    {showAdvancedFields && (
                      <>
                        <div className="flex justify-between">
                          <span className="font-medium">Return on Investment (ROI):</span>
                          <span className="font-semibold">{roi}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Cost Per Conversion:</span>
                          <span className="font-semibold">{formatIndianRupee(costPerConversion)}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <>
                <h3 className="text-lg font-semibold text-center mb-4">Conversion Analytics Visualization</h3>
                <div className="h-64 md:h-72">
                  <ConversionChart data={barChartData} />
                </div>
                
                {showAdvancedFields && (
                  <>
                    <h3 className="text-lg font-semibold text-center mt-6 mb-4">Revenue vs. Ad Spend</h3>
                    <div className="h-64">
                      <RevenuePieChart data={pieChartData} />
                    </div>
                  </>
                )}
              </>
            </div>
          </div>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default LandingPageCalculator; 