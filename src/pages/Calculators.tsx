import React, { useState, useMemo, memo } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calculator, PiggyBank, BarChart3, LineChart, TrendingUp, DollarSign, ShoppingCart, Target, Users, PieChart, Briefcase, Heart, Mail } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Business Sub-Categories
const businessSubCategories = [
  {
    id: 'finance',
    title: 'Finance',
    icon: <DollarSign className="h-5 w-5" />,
    description: 'Financial planning, accounting, and investment calculators'
  },
  {
    id: 'sales',
    title: 'Sales',
    icon: <ShoppingCart className="h-5 w-5" />,
    description: 'Sales forecasting, commission, and performance calculators'
  },
  {
    id: 'marketing',
    title: 'Marketing',
    icon: <Target className="h-5 w-5" />,
    description: 'Marketing ROI, campaign analysis, and customer acquisition calculators'
  },
  {
    id: 'operations',
    title: 'Operations',
    icon: <Briefcase className="h-5 w-5" />,
    description: 'Operations management, efficiency, and process optimization calculators'
  },
  {
    id: 'hr',
    title: 'HR & People Ops',
    icon: <Users className="h-5 w-5" />,
    description: 'Payroll, benefits, and workforce planning calculators'
  },
  {
    id: 'valuation',
    title: 'Valuation & Funding',
    icon: <PieChart className="h-5 w-5" />,
    description: 'Business valuation, funding, and investment calculators'
  }
];

// Updated calculator categories with business sub-categories
const calculatorCategories = [
  {
    title: 'Finance',
    subCategory: 'finance',
    description: 'Essential financial calculators for startups and businesses',
    icon: <TrendingUp className="h-8 w-8 text-finance-green" />,
    calculators: [
      {
        title: 'Startup Cost Calculator',
        description: '#1 searched - calculate initial costs for your business',
        icon: <Calculator className="h-5 w-5 text-finance-green" />,
        path: '/calculators/startup-cost',
        implemented: true,
        featured: true
      },
      {
        title: 'Break-even Calculator',
        description: 'Essential for pricing & business viability analysis',
        icon: <BarChart3 className="h-5 w-5 text-finance-green" />,
        path: '/calculators/break-even',
        implemented: true,
        featured: true
      },
      {
        title: 'Runway Calculator',
        description: 'Calculate how long your funding will last (hot keyword)',
        icon: <LineChart className="h-5 w-5 text-finance-green" />,
        path: '/calculators/runway',
        implemented: true,
        featured: true
      },
      {
        title: 'Business Loan EMI Calculator',
        description: 'Higher searches than generic loan calculators',
        icon: <DollarSign className="h-5 w-5 text-finance-green" />,
        path: '/calculators/business-loan-emi',
        implemented: true,
        featured: true
      },
      {
        title: 'Burn Rate Calculator',
        description: 'Top for SaaS/startups - track your monthly expenses',
        icon: <TrendingUp className="h-5 w-5 text-finance-green" />,
        path: '/calculators/burn-rate',
        implemented: true,
        featured: true
      },
      {
        title: 'ROI Calculator',
        description: 'Universal demand - calculate return on investment',
        icon: <PieChart className="h-5 w-5 text-finance-green" />,
        path: '/calculators/roi',
        implemented: false,
        featured: true
      }
    ]
  },
  {
    title: 'Sales',
    subCategory: 'sales',
    description: 'Sales performance and forecasting calculators',
    icon: <ShoppingCart className="h-8 w-8 text-finance-green" />,
    calculators: [
      {
        title: 'Sales Forecast Calculator',
        description: 'High B2B/B2C demand - project future sales',
        icon: <TrendingUp className="h-5 w-5 text-finance-green" />,
        path: '/calculators/sales-forecast',
        implemented: true,
        featured: true
      },
      {
        title: 'Win Rate Calculator',
        description: 'Essential for B2B sales teams',
        icon: <BarChart3 className="h-5 w-5 text-finance-green" />,
        path: '/calculators/win-rate',
        implemented: true,
        featured: true
      },
      {
        title: 'Gross Profit Margin Calculator',
        description: 'More searched than contribution margin',
        icon: <Calculator className="h-5 w-5 text-finance-green" />,
        path: '/calculators/gross-margin',
        implemented: true,
        featured: true
      },
      {
        title: 'Upsell Revenue Calculator',
        description: 'Growing SaaS need - calculate upsell potential',
        icon: <LineChart className="h-5 w-5 text-finance-green" />,
        path: '/calculators/upsell-revenue',
        implemented: true,
        featured: true
      },
      {
        title: 'Average Deal Size Calculator',
        description: 'CRM teams use this heavily',
        icon: <DollarSign className="h-5 w-5 text-finance-green" />,
        path: '/calculators/deal-size',
        implemented: true,
        featured: true
      },
      {
        title: 'Customer Lifetime Value (LTV) Calculator',
        description: 'E-commerce/SaaS staple - calculate customer value',
        icon: <PieChart className="h-5 w-5 text-finance-green" />,
        path: '/calculators/customer-ltv',
        implemented: false, // Coming soon
        featured: true
      }
    ]
  },
  {
    title: 'Marketing',
    subCategory: 'marketing',
    description: 'Marketing ROI and campaign analysis calculators',
    icon: <Target className="h-8 w-8 text-finance-green" />,
    calculators: [
      {
        title: 'ROAS Calculator',
        description: 'Most searched marketing calculator - calculate return on ad spend',
        icon: <BarChart3 className="h-5 w-5 text-finance-green" />,
        path: '/calculators/roas',
        implemented: true,
        featured: true
      },
      {
        title: 'CAC Calculator',
        description: 'Paid ads/SaaS focus - calculate customer acquisition cost',
        icon: <Calculator className="h-5 w-5 text-finance-green" />,
        path: '/calculators/cac',
        implemented: true,
        featured: true
      },
      {
        title: 'SEO ROI Calculator',
        description: 'Massive organic traffic potential - measure SEO returns',
        icon: <TrendingUp className="h-5 w-5 text-finance-green" />,
        path: '/calculators/seo-roi',
        implemented: true,
        featured: true
      },
      {
        title: 'Facebook Ads Break-even ROAS',
        description: 'Niche but high intent searches - optimize your Facebook ad spend',
        icon: <Target className="h-5 w-5 text-finance-green" />,
        path: '/calculators/facebook-ads-breakeven',
        implemented: true,
        featured: true
      },
      {
        title: 'Email Marketing ROI Calculator',
        description: 'E-commerce favorite - measure email campaign effectiveness',
        icon: <Mail className="h-5 w-5 text-finance-green" />,
        path: '/calculators/email-marketing-roi',
        implemented: true,
        featured: true
      },
      {
        title: 'Landing Page Conversion Rate',
        description: 'CRO teams - optimize your landing page performance',
        icon: <LineChart className="h-5 w-5 text-finance-green" />,
        path: '/calculators/landing-page-conversion',
        implemented: false,
        featured: true
      }
    ]
  },
  {
    title: 'Operations',
    subCategory: 'operations',
    description: 'Operations management and efficiency calculators',
    icon: <Briefcase className="h-8 w-8 text-finance-green" />,
    calculators: [
      {
        title: 'COGS Calculator',
        description: '#1 ops tool for product businesses - calculate cost of goods sold',
        icon: <Calculator className="h-5 w-5 text-finance-green" />,
        path: '/calculators/cogs',
        implemented: true,
        featured: true
      },
      {
        title: 'Inventory Turnover Calculator',
        description: 'Retail/e-commerce staple - measure inventory efficiency',
        icon: <ShoppingCart className="h-5 w-5 text-finance-green" />,
        path: '/calculators/inventory-turnover',
        implemented: true,
        featured: true
      },
      {
        title: 'EOQ Calculator',
        description: 'Saves procurement costs - optimize order quantities',
        icon: <BarChart3 className="h-5 w-5 text-finance-green" />,
        path: '/calculators/economic-order-quantity',
        implemented: true,
        featured: true
      },
      {
        title: 'Employee Productivity Calculator',
        description: 'Remote work trend - measure team efficiency',
        icon: <Users className="h-5 w-5 text-finance-green" />,
        path: '/calculators/employee-productivity',
        implemented: true,
        featured: true
      },
      {
        title: 'Fulfillment Cost per Order',
        description: 'E-commerce logistics - optimize shipping costs',
        icon: <ShoppingCart className="h-5 w-5 text-finance-green" />,
        path: '/calculators/fulfillment-cost',
        implemented: true,
        featured: true
      },
      {
        title: 'Capacity Utilization Calculator',
        description: 'Manufacturing/consulting - optimize resource usage',
        icon: <LineChart className="h-5 w-5 text-finance-green" />,
        path: '/calculators/capacity-utilization',
        implemented: false,
        featured: true
      }
    ]
  },
  {
    title: 'HR & People Ops',
    subCategory: 'hr',
    description: 'Payroll and workforce planning calculators',
    icon: <Users className="h-8 w-8 text-finance-green" />,
    calculators: []
  },
  {
    title: 'Valuation & Funding',
    subCategory: 'valuation',
    description: 'Business valuation and funding calculators',
    icon: <PieChart className="h-8 w-8 text-finance-green" />,
    calculators: [
      {
        title: 'SAFE Note Calculator',
        description: 'Y Combinator-style funding - calculate SAFE note terms',
        icon: <Calculator className="h-5 w-5 text-finance-green" />,
        path: '/calculators/safe-note',
        implemented: true,
        featured: true
      },
      {
        title: 'ARR Calculator',
        description: 'SaaS valuation cornerstone - calculate annual recurring revenue',
        icon: <TrendingUp className="h-5 w-5 text-finance-green" />,
        path: '/calculators/arr',
        implemented: true,
        featured: true
      },
      {
        title: 'Valuation Multiples Calculator',
        description: 'Comparables method - value your business using industry multiples',
        icon: <BarChart3 className="h-5 w-5 text-finance-green" />,
        path: '/calculators/valuation-multiples',
        implemented: true,
        featured: true
      },
      {
        title: 'Convertible Note Calculator',
        description: 'Early-stage startups - calculate convertible note terms',
        icon: <DollarSign className="h-5 w-5 text-finance-green" />,
        path: '/calculators/convertible-note',
        implemented: true,
        featured: true
      },
      {
        title: 'Term Sheet Simulator',
        description: 'Negotiation prep - simulate different term sheet scenarios',
        icon: <LineChart className="h-5 w-5 text-finance-green" />,
        path: '/calculators/term-sheet-simulator',
        implemented: false,
        featured: true
      }
    ]
  }
];

// Flatten all calculators
const allCalculators = calculatorCategories.flatMap(category => 
  category.calculators.map(calc => ({
    ...calc,
    category: category.title,
    subCategory: category.subCategory
  }))
);

const comingSoonCalculators = allCalculators.filter(calc => !calc.implemented);

// Memoized Calculator Card Component
const CalculatorCard = memo(({ calculator }: { calculator: any }) => (
  <Card className="hover:shadow-md transition-all duration-300 h-[220px] flex flex-col">
    <CardHeader className="p-4 pb-2">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-finance-green/10 text-finance-green">
          {calculator.icon}
        </div>
        <CardTitle className="text-base font-semibold line-clamp-1">{calculator.title}</CardTitle>
      </div>
      <CardDescription className="text-sm line-clamp-2 min-h-[3rem]">{calculator.description}</CardDescription>
    </CardHeader>
    <CardFooter className="p-4 pt-0 mt-auto">
      {calculator.implemented ? (
        <Button 
          asChild 
          className="w-full hover:bg-finance-green hover:text-white h-10 text-base"
        >
          <Link to={calculator.path}>
            Use Calculator
          </Link>
        </Button>
      ) : (
        <Button 
          variant="secondary"
          className="w-full bg-gray-200 text-gray-600 hover:bg-gray-200 cursor-not-allowed h-10 text-base"
          disabled
        >
          Coming Soon
        </Button>
      )}
    </CardFooter>
  </Card>
));

// Memoized Sub-tab Content Component
const SubTabContent = memo(({ 
  subCat, 
  calculators 
}: { 
  subCat: any; 
  calculators: any[]; 
}) => (
  <TabsContent value={subCat.id} className="space-y-3">
    <div className="mb-2">
      <h2 className="text-base sm:text-lg font-bold">{subCat.title}</h2>
      <p className="text-xs sm:text-sm text-muted-foreground">{subCat.description}</p>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {calculators.map((calculator, index) => (
        <CalculatorCard key={calculator.path} calculator={calculator} />
      ))}
    </div>
  </TabsContent>
));

const Calculators = () => {
  const [activeTab, setActiveTab] = useState("business");
  const [activeSubTab, setActiveSubTab] = useState("finance");

  // Memoize the calculator categories to prevent unnecessary re-renders
  const memoizedCalculatorCategories = useMemo(() => calculatorCategories, []);

  // Memoize the current category's calculators
  const currentCalculators = useMemo(() => {
    const category = memoizedCalculatorCategories.find(cat => cat.subCategory === activeSubTab);
    return category?.calculators || [];
  }, [memoizedCalculatorCategories, activeSubTab]);

  // Memoize the business sub-categories
  const memoizedBusinessSubCategories = useMemo(() => businessSubCategories, []);

  // Memoize the sub-tab triggers
  const subTabTriggers = useMemo(() => (
    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
      {memoizedBusinessSubCategories.map((subCat) => (
        <TabsTrigger key={subCat.id} value={subCat.id} className="flex items-center gap-2">
          {subCat.icon}
          <span className="hidden sm:inline">{subCat.title}</span>
        </TabsTrigger>
      ))}
    </TabsList>
  ), [memoizedBusinessSubCategories]);

  // Memoize the sub-tab contents
  const subTabContents = useMemo(() => (
    memoizedBusinessSubCategories.map((subCat) => (
      <SubTabContent 
        key={subCat.id} 
        subCat={subCat} 
        calculators={currentCalculators} 
      />
    ))
  ), [memoizedBusinessSubCategories, currentCalculators]);

  return (
    <MainLayout>
      <div className="bg-finance-green py-6 sm:py-8 md:py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Financial Calculators</h1>
            <p className="text-base sm:text-lg opacity-90">
              Make informed financial decisions with our easy-to-use calculators
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <Tabs 
          defaultValue="business" 
          className="mb-4"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="business" className="flex-1 sm:flex-none">Business</TabsTrigger>
              <TabsTrigger value="personal" className="flex-1 sm:flex-none">Personal Finance</TabsTrigger>
              <TabsTrigger value="investment" className="flex-1 sm:flex-none">Investment</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Business Calculators Tab with Sub-Tabs */}
          <TabsContent value="business" className="space-y-3">
            <Tabs 
              defaultValue="finance" 
              className="mb-3"
              value={activeSubTab}
              onValueChange={setActiveSubTab}
            >
              {subTabTriggers}
              {subTabContents}
            </Tabs>
          </TabsContent>
          
          {/* Personal Finance Tab */}
          <TabsContent value="personal" className="space-y-4 sm:space-y-6">
            <div className="text-center py-6 sm:py-8">
              <h2 className="text-lg sm:text-xl font-bold mb-3">Personal Finance Calculators</h2>
              <p className="text-sm sm:text-base text-muted-foreground">Coming soon - Personal finance calculators to help manage your money better</p>
            </div>
          </TabsContent>

          {/* Investment Tab */}
          <TabsContent value="investment" className="space-y-4 sm:space-y-6">
            <div className="text-center py-6 sm:py-8">
              <h2 className="text-lg sm:text-xl font-bold mb-3">Investment Calculators</h2>
              <p className="text-sm sm:text-base text-muted-foreground">Coming soon - Investment calculators to help make better investment decisions</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Calculators;