import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CalculatorLayout } from "@/layouts/CalculatorLayout";

// Types
interface CustomerData {
  acquisitionCost: number;
  averageOrderValue: number;
  purchaseFrequency: number;
  customerLifespan: number;
  retentionRate: number;
  discountRate: number;
}

interface ChartDataPoint {
  year: number;
  revenue: number;
  cumulativeValue: number;
}

interface PDFData {
  clv: number;
  acquisitionCost: number;
  averageOrderValue: number;
  purchaseFrequency: number;
  customerLifespan: number;
  retentionRate: number;
  discountRate: number;
  totalRevenue: number;
  netProfit: number;
}

// Utility Functions
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

const formatPercentage = (value: number) => {
  return `${(value * 100).toFixed(2)}%`;
};

// CLV Calculation Functions
const calculateCLV = (data: CustomerData): number => {
  const {
    acquisitionCost,
    averageOrderValue,
    purchaseFrequency,
    customerLifespan,
    retentionRate,
    discountRate,
  } = data;

  // Calculate annual revenue per customer
  const annualRevenue = averageOrderValue * purchaseFrequency;

  // Calculate CLV using the formula:
  // CLV = (Annual Revenue * (1 - retentionRate) / (1 + discountRate - retentionRate)) - Acquisition Cost
  const clv =
    (annualRevenue * (1 - retentionRate)) / (1 + discountRate - retentionRate) -
    acquisitionCost;

  return clv;
};

const calculateTotalRevenue = (data: CustomerData): number => {
  const { averageOrderValue, purchaseFrequency, customerLifespan } = data;
  return averageOrderValue * purchaseFrequency * customerLifespan;
};

// Chart Component
const CLVChart: React.FC<{ data: ChartDataPoint[] }> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="font-medium text-sm">Year {label}</p>
          <p className="text-sm text-gray-600">
            Revenue: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm text-primary font-medium">
            Cumulative: {formatCurrency(payload[1].value)}
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
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
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
        <YAxis tickFormatter={formatCurrency} width={70} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={0} stroke="#000" strokeDasharray="3 3" />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#7ac9a7"
          fillOpacity={1}
          fill="url(#colorRevenue)"
          name="Revenue"
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
const CustomerLifetimeValueCalculator: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [customerData, setCustomerData] = useState<CustomerData>({
    acquisitionCost: 1000,
    averageOrderValue: 500,
    purchaseFrequency: 4,
    customerLifespan: 5,
    retentionRate: 0.8,
    discountRate: 0.1,
  });
  const [results, setResults] = useState<{
    clv: number;
    totalRevenue: number;
    netProfit: number;
  } | null>(null);

  // Calculate results on component mount
  useEffect(() => {
    calculateResults();
  }, []);

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setCustomerData((prev) => ({
        ...prev,
        [field]: numValue,
      }));
    }
  };

  const calculateResults = () => {
    setLoading(true);
    try {
      const clv = calculateCLV(customerData);
      const totalRevenue = calculateTotalRevenue(customerData);
      const netProfit = clv;

      setResults({
        clv,
        totalRevenue,
        netProfit,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to calculate CLV. Please check your inputs.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateChartData = (): ChartDataPoint[] => {
    if (!results) return [];

    const data: ChartDataPoint[] = [];
    let cumulativeValue = 0;

    for (let year = 1; year <= customerData.customerLifespan; year++) {
      const yearlyRevenue =
        customerData.averageOrderValue * customerData.purchaseFrequency;
      cumulativeValue += yearlyRevenue;

      data.push({
        year,
        revenue: yearlyRevenue,
        cumulativeValue,
      });
    }

    return data;
  };

  return (
    <CalculatorLayout
      title="Customer Lifetime Value Calculator"
      description="Calculate the lifetime value of your customers and optimize your business strategy"
      icon={<PieChart className="h-5 w-5 text-finance-green" />}
      activeTab="business"
      activeSubTab="sales"
    >
      <div className="space-y-6">
        {/* Input Form */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Customer Data</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="acquisitionCost">Acquisition Cost (₹)</Label>
                <Input
                  id="acquisitionCost"
                  type="number"
                  value={customerData.acquisitionCost}
                  onChange={(e) =>
                    handleInputChange("acquisitionCost", e.target.value)
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="averageOrderValue">Average Order Value (₹)</Label>
                <Input
                  id="averageOrderValue"
                  type="number"
                  value={customerData.averageOrderValue}
                  onChange={(e) =>
                    handleInputChange("averageOrderValue", e.target.value)
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="purchaseFrequency">Purchase Frequency (times/year)</Label>
                <Input
                  id="purchaseFrequency"
                  type="number"
                  value={customerData.purchaseFrequency}
                  onChange={(e) =>
                    handleInputChange("purchaseFrequency", e.target.value)
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="customerLifespan">Customer Lifespan (years)</Label>
                <Input
                  id="customerLifespan"
                  type="number"
                  value={customerData.customerLifespan}
                  onChange={(e) =>
                    handleInputChange("customerLifespan", e.target.value)
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="retentionRate">Retention Rate (%)</Label>
                <Input
                  id="retentionRate"
                  type="number"
                  value={customerData.retentionRate * 100}
                  onChange={(e) =>
                    handleInputChange(
                      "retentionRate",
                      (parseFloat(e.target.value) / 100).toString()
                    )
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="discountRate">Discount Rate (%)</Label>
                <Input
                  id="discountRate"
                  type="number"
                  value={customerData.discountRate * 100}
                  onChange={(e) =>
                    handleInputChange(
                      "discountRate",
                      (parseFloat(e.target.value) / 100).toString()
                    )
                  }
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={calculateResults}
                disabled={loading}
                className="bg-primary hover:bg-primary/90"
              >
                {loading ? "Calculating..." : "Calculate"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Results Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">CLV Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Customer Lifetime Value (CLV)</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(results?.clv || 0)}
                </p>
                <Badge
                  variant={
                    (results?.clv || 0) > customerData.acquisitionCost * 3
                      ? "default"
                      : (results?.clv || 0) > customerData.acquisitionCost
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {(results?.clv || 0) > customerData.acquisitionCost * 3
                    ? "Excellent"
                    : (results?.clv || 0) > customerData.acquisitionCost
                    ? "Good"
                    : "Poor"}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-charcoal">
                {formatCurrency(results?.totalRevenue || 0)}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-500">Acquisition Cost</p>
              <p className="text-2xl font-bold text-charcoal">
                {formatCurrency(customerData.acquisitionCost)}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-500">Net Profit</p>
              <p className="text-2xl font-bold text-charcoal">
                {formatCurrency(results?.netProfit || 0)}
              </p>
            </div>
          </div>

          <div className="h-[300px]">
            <CLVChart data={generateChartData()} />
          </div>
        </Card>
      </div>
    </CalculatorLayout>
  );
};

export default CustomerLifetimeValueCalculator; 