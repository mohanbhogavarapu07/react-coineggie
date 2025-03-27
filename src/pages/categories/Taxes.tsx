
import React from 'react';
import { CategoryLayout } from '@/layouts/CategoryLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, DollarSign, Home, BarChart, Briefcase, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

const articles = [
  {
    id: 1,
    title: "Tax Deductions You Might Be Missing",
    excerpt: "Common tax deductions that many taxpayers overlook, potentially costing them thousands of dollars.",
    category: "Deductions",
    level: "Beginner",
    readTime: "8 min",
    icon: <FileText className="h-5 w-5 text-finance-green" />,
  },
  {
    id: 2,
    title: "Understanding Tax Brackets: How Much Do You Really Pay?",
    excerpt: "An explanation of how progressive tax brackets work and calculating your effective tax rate.",
    category: "Basics",
    level: "Beginner",
    readTime: "6 min",
    icon: <BarChart className="h-5 w-5 text-finance-green" />,
  },
  {
    id: 3,
    title: "Capital Gains Tax: A Complete Guide",
    excerpt: "Learn how capital gains taxes work on investments and strategies to minimize your tax burden.",
    category: "Investment Taxes",
    level: "Intermediate",
    readTime: "10 min",
    icon: <DollarSign className="h-5 w-5 text-finance-green" />,
  },
  {
    id: 4,
    title: "Tax Implications of Working from Home",
    excerpt: "Understand which home office expenses you can deduct and how to properly document them.",
    category: "Home Office",
    level: "Intermediate",
    readTime: "9 min",
    icon: <Home className="h-5 w-5 text-finance-green" />,
  },
  {
    id: 5,
    title: "Self-Employment Taxes Explained",
    excerpt: "A guide to understanding and calculating self-employment taxes for freelancers and business owners.",
    category: "Self-Employment",
    level: "Intermediate",
    readTime: "11 min",
    icon: <Briefcase className="h-5 w-5 text-finance-green" />,
  },
  {
    id: 6,
    title: "Small Business Tax Forms Guide",
    excerpt: "Navigate the various tax forms required for small businesses and ensure compliance.",
    category: "Business Taxes",
    level: "Advanced",
    readTime: "12 min",
    icon: <Building className="h-5 w-5 text-finance-green" />,
  },
];

const Taxes = () => {
  return (
    <CategoryLayout
      title="Taxes"
      description="Navigate the complex world of taxation with our guides on deductions, credits, filing strategies, and more."
      bgColor="bg-finance-green/90"
    >
      <div className="grid gap-8">
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Tax Guides</h2>
            <Button variant="outline" className="gap-2">
              View All <ArrowRight size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Card key={article.id} className="h-full flex flex-col hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`kb-pill ${article.level === 'Beginner' ? 'kb-pill-beginner' : article.level === 'Intermediate' ? 'kb-pill-intermediate' : 'kb-pill-advanced'}`}>
                        {article.level}
                      </span>
                      <span className="text-xs text-muted-foreground">{article.readTime} read</span>
                    </div>
                    {article.icon}
                  </div>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription>{article.excerpt}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-finance-green">{article.category}</span>
                  <Button variant="ghost" size="sm" className="gap-1 text-finance-green">
                    Read Article <ArrowRight size={14} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
        
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Tax Calculators</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-finance-cream hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Income Tax Calculator</CardTitle>
                <CardDescription>Estimate your federal and state income tax liability.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">Try Calculator</Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-finance-cream hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Capital Gains Tax Calculator</CardTitle>
                <CardDescription>Calculate tax on investment gains for different holding periods.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">Try Calculator</Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-finance-cream hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Self-Employment Tax Estimator</CardTitle>
                <CardDescription>Estimate your self-employment tax obligations.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">Try Calculator</Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </CategoryLayout>
  );
};

export default Taxes;
