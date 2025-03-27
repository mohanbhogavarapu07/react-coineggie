
import React from 'react';
import { CategoryLayout } from '@/layouts/CategoryLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, DollarSign, CreditCard, PiggyBank, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const articles = [
  {
    id: 1,
    title: "Building an Emergency Fund: How Much Do You Need?",
    excerpt: "Learn how to calculate the right size for your emergency fund based on your personal circumstances.",
    category: "Savings",
    level: "Beginner",
    readTime: "6 min",
    icon: <Shield className="h-5 w-5 text-finance-green" />,
  },
  {
    id: 2,
    title: "50/30/20 Budgeting: A Simple Way to Manage Your Money",
    excerpt: "The 50/30/20 rule is a straightforward budgeting method that can help you manage your finances more effectively.",
    category: "Budgeting",
    level: "Beginner",
    readTime: "8 min",
    icon: <DollarSign className="h-5 w-5 text-finance-green" />,
  },
  {
    id: 3,
    title: "How to Get Out of Debt Faster: Strategies That Work",
    excerpt: "Practical strategies to help you pay down debt more quickly and save money on interest payments.",
    category: "Debt Management",
    level: "Intermediate",
    readTime: "10 min",
    icon: <CreditCard className="h-5 w-5 text-finance-green" />,
  },
  {
    id: 4,
    title: "Building Wealth on an Average Income",
    excerpt: "You don't need a six-figure salary to build wealth. Learn strategies for growing your net worth.",
    category: "Wealth Building",
    level: "Intermediate",
    readTime: "12 min",
    icon: <TrendingUp className="h-5 w-5 text-finance-green" />,
  },
  {
    id: 5,
    title: "Automating Your Finances: Set It and Forget It",
    excerpt: "How to use automation to ensure you're saving, investing, and paying bills without constant effort.",
    category: "Organization",
    level: "Beginner",
    readTime: "7 min",
    icon: <PiggyBank className="h-5 w-5 text-finance-green" />,
  },
  {
    id: 6,
    title: "How to Create a Personal Financial Statement",
    excerpt: "A step-by-step guide to creating a personal financial statement to track your assets and liabilities.",
    category: "Financial Planning",
    level: "Intermediate",
    readTime: "9 min",
    icon: <DollarSign className="h-5 w-5 text-finance-green" />,
  },
];

const PersonalFinance = () => {
  return (
    <CategoryLayout
      title="Personal Finance"
      description="Master your money with our guides on budgeting, saving, debt management, and building wealth."
    >
      <div className="grid gap-8">
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Popular Articles</h2>
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
                      <span className="kb-pill kb-pill-beginner">{article.level}</span>
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
            <h2 className="text-2xl font-bold">Recommended Tools</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-finance-cream hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Budget Calculator</CardTitle>
                <CardDescription>Plan your monthly expenses with our interactive budget tool.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">Try Calculator</Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-finance-cream hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Debt Payoff Planner</CardTitle>
                <CardDescription>Create a customized plan to pay off your debts faster.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">Try Calculator</Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-finance-cream hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Emergency Fund Calculator</CardTitle>
                <CardDescription>Calculate how much you need for a solid emergency fund.</CardDescription>
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

export default PersonalFinance;
