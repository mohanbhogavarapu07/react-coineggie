
import React from 'react';
import { CategoryLayout } from '@/layouts/CategoryLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays, Piggy, Clock, HeartPulse, Home, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

const articles = [
  {
    id: 1,
    title: "When Can You Retire? The 4% Rule Explained",
    excerpt: "Learn about the 4% withdrawal rule and how it can help you determine your retirement number.",
    category: "Retirement Planning",
    level: "Intermediate",
    readTime: "9 min",
    icon: <CalendarDays className="h-5 w-5 text-finance-green" />,
  },
  {
    id: 2,
    title: "Traditional vs. Roth IRA: Which Is Right for You?",
    excerpt: "Compare the tax advantages and disadvantages of Traditional and Roth IRAs to make the best choice.",
    category: "Retirement Accounts",
    level: "Beginner",
    readTime: "8 min",
    icon: <Piggy className="h-5 w-5 text-finance-green" />,
  },
  {
    id: 3,
    title: "Maximizing Your 401(k): Strategies for Growth",
    excerpt: "Tips to make the most of your employer-sponsored retirement plan and grow your nest egg faster.",
    category: "401(k)",
    level: "Intermediate",
    readTime: "10 min",
    icon: <Calculator className="h-5 w-5 text-finance-green" />,
  },
  {
    id: 4,
    title: "Early Retirement: Is FIRE Right for You?",
    excerpt: "Explore the Financial Independence, Retire Early movement and whether it aligns with your goals.",
    category: "FIRE Movement",
    level: "Advanced",
    readTime: "12 min",
    icon: <Clock className="h-5 w-5 text-finance-green" />,
  },
  {
    id: 5,
    title: "Healthcare in Retirement: What You Need to Know",
    excerpt: "Understand Medicare, supplemental insurance, and planning for healthcare costs in retirement.",
    category: "Healthcare",
    level: "Intermediate",
    readTime: "11 min",
    icon: <HeartPulse className="h-5 w-5 text-finance-green" />,
  },
  {
    id: 6,
    title: "Downsizing for Retirement: Financial and Lifestyle Considerations",
    excerpt: "The pros and cons of downsizing your home in retirement and how to make the transition smoothly.",
    category: "Housing",
    level: "Beginner",
    readTime: "7 min",
    icon: <Home className="h-5 w-5 text-finance-green" />,
  },
];

const Retirement = () => {
  return (
    <CategoryLayout
      title="Retirement"
      description="Prepare for a secure retirement with strategies for saving, investing, and creating sustainable income streams."
      bgColor="bg-finance-green/80"
    >
      <div className="grid gap-8">
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Essential Retirement Guides</h2>
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
            <h2 className="text-2xl font-bold">Retirement Planning Tools</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-finance-cream hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Retirement Calculator</CardTitle>
                <CardDescription>Calculate how much you need to save for a comfortable retirement.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">Try Calculator</Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-finance-cream hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">401(k) Contribution Calculator</CardTitle>
                <CardDescription>Optimize your 401(k) contributions based on employer matching.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">Try Calculator</Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-finance-cream hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Retirement Income Planner</CardTitle>
                <CardDescription>Create a sustainable withdrawal strategy for your retirement savings.</CardDescription>
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

export default Retirement;
