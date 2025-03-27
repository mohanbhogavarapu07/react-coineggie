
import React from 'react';
import { CategoryLayout } from '@/layouts/CategoryLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, BarChart3, LineChart, Percent, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const articles = [
  {
    id: 1,
    title: "Understanding Stock Market Basics",
    excerpt: "Learn the fundamentals of stock investing, from how stocks work to opening your first brokerage account.",
    category: "Stocks",
    level: "Beginner",
    readTime: "8 min",
    icon: <TrendingUp className="h-5 w-5 text-finance-green" />,
  },
  {
    id: 2,
    title: "Asset Allocation: Building a Balanced Portfolio",
    excerpt: "How to distribute your investments across different asset classes based on your goals and risk tolerance.",
    category: "Portfolio Management",
    level: "Intermediate",
    readTime: "10 min",
    icon: <Briefcase className="h-5 w-5 text-finance-green" />,
  },
  {
    id: 3,
    title: "ETFs vs. Mutual Funds: Which Is Right for You?",
    excerpt: "Compare the features, benefits, and drawbacks of Exchange-Traded Funds and Mutual Funds.",
    category: "Funds",
    level: "Beginner",
    readTime: "7 min",
    icon: <BarChart3 className="h-5 w-5 text-finance-green" />,
  },
  {
    id: 4,
    title: "The Power of Compound Interest",
    excerpt: "Understand how compound interest works and why it's often called the eighth wonder of the world.",
    category: "Investing Basics",
    level: "Beginner",
    readTime: "5 min",
    icon: <Percent className="h-5 w-5 text-finance-green" />,
  },
  {
    id: 5,
    title: "Analyzing Financial Statements: A Guide for Investors",
    excerpt: "Learn how to read and analyze company financial statements to make better investment decisions.",
    category: "Stock Analysis",
    level: "Advanced",
    readTime: "15 min",
    icon: <LineChart className="h-5 w-5 text-finance-green" />,
  },
  {
    id: 6,
    title: "Real Estate Investing for Beginners",
    excerpt: "Explore different ways to invest in real estate, from rental properties to REITs.",
    category: "Real Estate",
    level: "Intermediate",
    readTime: "12 min",
    icon: <Briefcase className="h-5 w-5 text-finance-green" />,
  },
];

const Investments = () => {
  return (
    <CategoryLayout
      title="Investments"
      description="Build wealth through smart investment strategies. Explore our guides on stocks, bonds, real estate, and more."
      bgColor="bg-finance-gold/80"
      textColor="text-finance-charcoal"
    >
      <div className="grid gap-8">
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Investment Guides</h2>
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
            <h2 className="text-2xl font-bold">Investment Calculators</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-finance-cream hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Investment Return Calculator</CardTitle>
                <CardDescription>Calculate potential returns based on different investment scenarios.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">Try Calculator</Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-finance-cream hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Compound Interest Calculator</CardTitle>
                <CardDescription>See the power of compound interest over different time periods.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">Try Calculator</Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-finance-cream hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Portfolio Allocation Tool</CardTitle>
                <CardDescription>Create and analyze different portfolio allocation strategies.</CardDescription>
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

export default Investments;
