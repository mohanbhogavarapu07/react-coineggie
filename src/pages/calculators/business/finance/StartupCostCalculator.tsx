import { useState, useEffect } from "react";
import {
  BadgeIndianRupee,
  Calculator,
  Calendar,
  Clock,
  Goal,
  Info,
  Briefcase,
  Building2,
  Users,
  PencilRuler,
  Coins,
  Receipt,
  CreditCard,
  Settings,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { CalculatorLayout } from "@/layouts/CalculatorLayout";

// Types
interface CostItem {
  id: string;
  label: string;
  description?: string;
  step?: number;
  defaultValue?: number;
}

interface CostCategory {
  title: string;
  icon: React.ReactNode;
  items: CostItem[];
}

// Calculator Data
const calculatorData: CostCategory[] = [
  {
    title: "Legal & Administrative",
    icon: <Briefcase className="h-4 w-4" />,
    items: [
      {
        id: "registration",
        label: "Business Registration & Licenses",
        description: "Costs for registering your business, obtaining necessary licenses, and permits.",
        step: 1000,
        defaultValue: 10000,
      },
      {
        id: "legal_fees",
        label: "Legal Fees",
        description: "Attorney fees for business formation, contracts, and legal advice.",
        step: 2500,
        defaultValue: 15000,
      },
      {
        id: "insurance",
        label: "Business Insurance",
        description: "General liability, property, professional liability insurance premiums.",
        step: 1000,
        defaultValue: 8000,
      },
      {
        id: "accounting",
        label: "Accounting Setup",
        description: "Initial accounting software, financial systems, and professional fees.",
        step: 1000,
        defaultValue: 5000,
      },
      {
        id: "intellectual_property",
        label: "Intellectual Property",
        description: "Trademark, copyright, and patent registration costs.",
        step: 2500,
        defaultValue: 20000,
      },
    ],
  },
  {
    title: "Equipment & Technology",
    icon: <Settings className="h-4 w-4" />,
    items: [
      {
        id: "computers",
        label: "Computers & Hardware",
        description: "Laptops, desktops, tablets, servers, and other computing devices.",
        step: 5000,
        defaultValue: 35000,
      },
      {
        id: "software",
        label: "Software & Subscriptions",
        description: "Software licenses, SaaS subscriptions, and digital tools.",
        step: 1000,
        defaultValue: 12000,
      },
      {
        id: "machinery",
        label: "Specialized Equipment",
        description: "Industry-specific machinery and equipment for your operations.",
        step: 10000,
        defaultValue: 25000,
      },
      {
        id: "phone_system",
        label: "Communication Systems",
        description: "Phone systems, video conferencing equipment, etc.",
        step: 1000,
        defaultValue: 7000,
      },
      {
        id: "security",
        label: "Security Systems",
        description: "Surveillance cameras, alarm systems, and cybersecurity tools.",
        step: 2500,
        defaultValue: 15000,
      },
    ],
  },
  {
    title: "Marketing & Sales",
    icon: <PencilRuler className="h-4 w-4" />,
    items: [
      {
        id: "branding",
        label: "Branding & Design",
        description: "Logo design, brand identity, and business materials creation.",
        step: 5000,
        defaultValue: 25000,
      },
      {
        id: "website",
        label: "Website Development",
        description: "Website design, development, and initial hosting costs.",
        step: 5000,
        defaultValue: 35000,
      },
      {
        id: "marketing_materials",
        label: "Marketing Materials",
        description: "Business cards, brochures, flyers, and promotional items.",
        step: 2500,
        defaultValue: 10000,
      },
      {
        id: "advertising",
        label: "Initial Advertising",
        description: "Launch campaigns, digital ads, and promotional events.",
        step: 5000,
        defaultValue: 20000,
      },
      {
        id: "crm",
        label: "CRM & Sales Tools",
        description: "Customer relationship management software and sales enablement tools.",
        step: 2500,
        defaultValue: 8000,
      },
    ],
  },
  {
    title: "Initial Inventory",
    icon: <Receipt className="h-4 w-4" />,
    items: [
      {
        id: "raw_materials",
        label: "Raw Materials",
        description: "Initial stock of materials needed for production.",
        step: 5000,
        defaultValue: 40000,
      },
      {
        id: "finished_goods",
        label: "Finished Goods",
        description: "Ready-to-sell inventory to stock your business.",
        step: 10000,
        defaultValue: 75000,
      },
      {
        id: "packaging",
        label: "Packaging & Supplies",
        description: "Packaging materials, labels, and shipping supplies.",
        step: 2500,
        defaultValue: 15000,
      },
    ],
  },
  {
    title: "Operating Expenses",
    icon: <CreditCard className="h-4 w-4" />,
    items: [
      {
        id: "rent_monthly",
        label: "Monthly Rent",
        description: "Ongoing monthly lease payments.",
        step: 5000,
        defaultValue: 25000,
      },
      {
        id: "utilities_monthly",
        label: "Monthly Utilities",
        description: "Recurring electricity, water, internet, and other utility costs.",
        step: 1000,
        defaultValue: 8000,
      },
      {
        id: "insurance_monthly",
        label: "Monthly Insurance",
        description: "Ongoing monthly insurance premiums.",
        step: 1000,
        defaultValue: 4000,
      },
      {
        id: "subscriptions",
        label: "Monthly Subscriptions",
        description: "Recurring software, services, and membership fees.",
        step: 1000,
        defaultValue: 5000,
      },
      {
        id: "misc_expenses",
        label: "Miscellaneous Expenses",
        description: "Unforeseen costs and day-to-day operational expenses.",
        step: 2500,
        defaultValue: 10000,
      },
    ],
  },
  {
    title: "Contingency Fund",
    icon: <Coins className="h-4 w-4" />,
    items: [
      {
        id: "emergency_fund",
        label: "Emergency Fund",
        description: "Reserve for unexpected expenses or opportunities.",
        step: 10000,
        defaultValue: 100000,
      },
      {
        id: "cash_reserve",
        label: "Working Capital",
        description: "Additional cash reserve to cover operating expenses until revenue stabilizes.",
        step: 25000,
        defaultValue: 200000,
      },
    ],
  },
];

// Components
const CostInput = ({ id, label, description, value, onChange, step = 1000, min = 0, max = 1000000 }: {
  id: string;
  label: string;
  description?: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
}) => {
  return (
    <div className="flex items-center justify-between py-2">
      <Label className="text-sm font-medium flex-1">{label}</Label>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={value || ''}
          onChange={(e) => {
            const newValue = e.target.value === '' ? 0 : Number(e.target.value);
            onChange(Math.min(max, Math.max(min, newValue)));
          }}
          className="w-32 text-right"
        />
        <span className="text-sm font-bold w-32 text-right">₹{value.toLocaleString('en-IN')}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

const CostCategory = ({ title, icon, items, values, onChange, initialExpanded = false }: {
  title: string;
  icon: React.ReactNode;
  items: CostItem[];
  values: Record<string, number>;
  onChange: (id: string, value: number) => void;
  initialExpanded?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const categoryTotal = items.reduce((sum, item) => sum + (values[item.id] || 0), 0);

  return (
    <Card className="bg-white border-brand-mint/40">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-white">
              {icon}
            </div>
            <h3 className="text-lg font-medium text-brand-green">{title}</h3>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold">₹{categoryTotal.toLocaleString('en-IN')}</div>
            <div className="text-xs text-muted-foreground">
              {Math.round((categoryTotal / Object.values(values).reduce((a, b) => a + b, 0)) * 100)}%
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-4">
          {items.map((item) => (
            <CostInput
              key={item.id}
              id={item.id}
              label={item.label}
              description={item.description}
              value={values[item.id] || 0}
              onChange={(value) => onChange(item.id, value)}
              step={item.step}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const CostChart = ({ categorizedCosts, values }: { categorizedCosts: CostCategory[]; values: Record<string, number> }) => {
  const data = categorizedCosts.map(category => ({
    name: category.title,
    value: category.items.reduce((sum, item) => sum + (values[item.id] || 0), 0)
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <Card className="bg-white border-brand-mint/40">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-medium text-brand-green">Cost Distribution</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const CostTimeline = ({ categorizedCosts, values }: { categorizedCosts: CostCategory[]; values: Record<string, number> }) => {
  const oneTimeCosts = categorizedCosts
    .filter(cat => ["Legal & Administrative", "Equipment & Technology", "Location & Facilities", "Initial Inventory"].includes(cat.title))
    .flatMap(cat => cat.items)
    .reduce((sum, item) => sum + (values[item.id] || 0), 0);

  const ongoingMonthlyCosts = categorizedCosts
    .filter(cat => ["Marketing & Sales", "Operating Expenses", "Staffing & Payroll"].includes(cat.title))
    .flatMap(cat => cat.items)
    .reduce((sum, item) => sum + (values[item.id] || 0), 0);

  const sixMonthRunway = ongoingMonthlyCosts * 6;
  
  const data = [
    { name: 'One-time Costs', amount: oneTimeCosts },
    { name: '6-Month Runway', amount: sixMonthRunway },
    { name: 'Total Startup Cost', amount: oneTimeCosts + sixMonthRunway },
  ];

  return (
    <Card className="bg-white border-brand-mint/40">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-medium text-brand-green">Cost Timeline</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
              <RechartsTooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
              <Area type="monotone" dataKey="amount" stroke="#245e4f" fill="#245e4f" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Component
export default function StartupCostCalculator() {
  const [businessName, setBusinessName] = useState<string>("");
  const [values, setValues] = useState<Record<string, number>>({});

  useEffect(() => {
    // Initialize default values
    const initialValues: Record<string, number> = {};
    calculatorData.forEach((category) => {
      category.items.forEach((item) => {
        if (item.defaultValue) {
          initialValues[item.id] = item.defaultValue;
        } else {
          initialValues[item.id] = 0;
        }
      });
    });
    setValues(initialValues);
  }, []);

  const handleValueChange = (id: string, value: number) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const totalCost = Object.values(values).reduce((total, value) => total + value, 0);

  return (
    <CalculatorLayout
      title="Startup Cost Calculator"
      description="Calculate the total cost of starting your business in India"
      icon={<Calculator className="h-6 w-6" />}
    >
      <div className="space-y-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-brand-green">Business Information</CardTitle>
            <CardDescription>Enter your business details to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="business-name">Business Name</Label>
                <Input
                  id="business-name"
                  placeholder="Enter your business name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="mt-1.5"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {calculatorData.map((category, index) => (
          <CostCategory
            key={category.title}
            title={category.title}
            icon={category.icon}
            items={category.items}
            values={values}
            onChange={handleValueChange}
            initialExpanded={index === 0}
          />
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CostChart categorizedCosts={calculatorData} values={values} />
          <CostTimeline categorizedCosts={calculatorData} values={values} />
        </div>

        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-brand-green mb-2">Total Startup Cost</h3>
              <p className="text-3xl font-bold text-brand-green">
                ₹{totalCost.toLocaleString('en-IN')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Guide Section */}
        {/* <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-brand-green mb-4">Understanding Startup Costs in India</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-brand-charcoal mb-2">
                  Why Calculate Startup Costs?
                </h3>
                <p className="text-muted-foreground">
                  Accurately estimating your startup costs is crucial for securing funding, creating realistic financial projections, and ensuring your business has enough capital to reach profitability.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-brand-charcoal mb-2">
                  One-Time vs. Ongoing Costs
                </h3>
                <p className="text-muted-foreground">
                  Startup costs typically fall into two categories:
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2 text-muted-foreground">
                  <li><span className="font-medium text-brand-charcoal">One-time costs:</span> Expenses that occur only during the startup phase</li>
                  <li><span className="font-medium text-brand-charcoal">Ongoing costs:</span> Regular expenses that continue after your business is operational</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-brand-charcoal mb-2">
                  How to Use This Calculator
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>Enter your business name (optional)</li>
                  <li>Open each category and adjust the cost estimates</li>
                  <li>Review the summary and charts</li>
                </ol>
              </div>
              
              <div className="bg-brand-mint/20 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-brand-green mb-2 flex items-center">
                  <Goal className="h-5 w-5 mr-2" />
                  Pro Tip
                </h3>
                <p className="text-muted-foreground">
                  Consider creating three different versions of your startup budget: minimum, realistic, and optimal scenarios.
                </p>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </CalculatorLayout>
  );
} 