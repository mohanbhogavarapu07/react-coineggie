
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calculator, PiggyBank, BarChart3, LineChart, TrendingUp, DollarSign, Home, Heart, Briefcase } from 'lucide-react';

const calculatorCategories = [
  {
    title: 'Investment Calculators',
    description: 'Plan your investments and understand their potential growth',
    icon: <TrendingUp className="h-8 w-8 text-finance-green" />,
    calculators: [
      {
        title: 'SIP Calculator',
        description: 'Calculate returns on your systematic investment plans',
        icon: <BarChart3 className="h-5 w-5 text-finance-green" />,
        path: '/calculators/sip'
      },
      {
        title: 'Lumpsum Calculator',
        description: 'Estimate returns on one-time investments',
        icon: <DollarSign className="h-5 w-5 text-finance-green" />,
        path: '/calculators/lumpsum'
      },
      {
        title: 'Compound Interest Calculator',
        description: 'Understand the power of compounding on your investments',
        icon: <LineChart className="h-5 w-5 text-finance-green" />,
        path: '/calculators/compound-interest'
      }
    ]
  },
  {
    title: 'Loan Calculators',
    description: 'Plan your loans and understand repayment schedules',
    icon: <Home className="h-8 w-8 text-finance-green" />,
    calculators: [
      {
        title: 'Home Loan EMI Calculator',
        description: 'Calculate monthly installments for your home loan',
        icon: <Home className="h-5 w-5 text-finance-green" />,
        path: '/calculators/home-loan-emi'
      },
      {
        title: 'Personal Loan EMI Calculator',
        description: 'Estimate EMIs for personal loans',
        icon: <DollarSign className="h-5 w-5 text-finance-green" />,
        path: '/calculators/personal-loan-emi'
      },
      {
        title: 'Loan Prepayment Calculator',
        description: 'See how prepayments can reduce your loan tenure and interest',
        icon: <Calculator className="h-5 w-5 text-finance-green" />,
        path: '/calculators/loan-prepayment'
      }
    ]
  },
  {
    title: 'Retirement Calculators',
    description: 'Plan for a financially secure retirement',
    icon: <Heart className="h-8 w-8 text-finance-green" />,
    calculators: [
      {
        title: 'Retirement Corpus Calculator',
        description: 'Estimate how much you need to save for retirement',
        icon: <PiggyBank className="h-5 w-5 text-finance-green" />,
        path: '/calculators/retirement-corpus'
      },
      {
        title: 'Pension Calculator',
        description: 'Calculate your retirement income from pension plans',
        icon: <Calculator className="h-5 w-5 text-finance-green" />,
        path: '/calculators/pension'
      }
    ]
  },
  {
    title: 'Tax Calculators',
    description: 'Estimate your tax liability and plan tax-saving investments',
    icon: <Briefcase className="h-8 w-8 text-finance-green" />,
    calculators: [
      {
        title: 'Income Tax Calculator',
        description: 'Calculate your income tax liability',
        icon: <Calculator className="h-5 w-5 text-finance-green" />,
        path: '/calculators/income-tax'
      },
      {
        title: 'Capital Gains Tax Calculator',
        description: 'Estimate tax on your investment gains',
        icon: <TrendingUp className="h-5 w-5 text-finance-green" />,
        path: '/calculators/capital-gains-tax'
      }
    ]
  }
];

const featuredCalculators = [
  {
    title: 'SIP Calculator',
    description: 'See how small, regular investments can grow into a significant corpus over time through the power of compounding.',
    icon: <BarChart3 className="h-6 w-6 text-finance-green" />,
    path: '/calculators/sip',
    popular: true
  },
  {
    title: 'Home Loan EMI Calculator',
    description: 'Plan your home purchase by calculating EMIs based on loan amount, interest rate, and tenure.',
    icon: <Home className="h-6 w-6 text-finance-green" />,
    path: '/calculators/home-loan-emi',
    popular: true
  },
  {
    title: 'Retirement Corpus Calculator',
    description: 'Estimate how much you need to save regularly to build your desired retirement corpus.',
    icon: <PiggyBank className="h-6 w-6 text-finance-green" />,
    path: '/calculators/retirement-corpus',
    popular: true
  }
];

const Calculators = () => {
  return (
    <MainLayout>
      <div className="bg-finance-green py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Financial Calculators</h1>
            <p className="text-xl opacity-90">
              Make informed financial decisions with our easy-to-use calculators
            </p>
          </div>
        </div>
      </div>
      
      <div className="container py-16">
        {/* Featured Calculators */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Most Popular Calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCalculators.map((calculator, index) => (
              <Card key={index} className="hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    {calculator.icon}
                    {calculator.popular && (
                      <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full font-medium">
                        Popular
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl mt-2">{calculator.title}</CardTitle>
                  <CardDescription>{calculator.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link to={calculator.path}>Use Calculator</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Calculator Categories */}
        <section>
          <h2 className="text-2xl font-bold mb-8">All Calculators</h2>
          <div className="space-y-12">
            {calculatorCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center gap-3 mb-6">
                  {category.icon}
                  <div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {category.calculators.map((calculator, calcIndex) => (
                    <Card key={calcIndex} className="hover:shadow-md transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          {calculator.icon}
                          <CardTitle className="text-lg">{calculator.title}</CardTitle>
                        </div>
                        <CardDescription>{calculator.description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="outline" asChild className="w-full hover:bg-finance-green hover:text-white">
                          <Link to={calculator.path}>Use Calculator</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Calculators;
