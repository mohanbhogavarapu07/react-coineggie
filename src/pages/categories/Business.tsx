
import React from 'react';
import { CategoryLayout } from '@/layouts/CategoryLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building, DollarSign, BarChart3, LineChart, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const articles = [
  {
    id: 1,
    title: "Business Financing: Options for Small Businesses",
    excerpt: "Explore different financing options available to small businesses, from loans to venture capital.",
    category: "Financing",
    level: "Intermediate",
    readTime: "11 min",
    icon: <DollarSign className="h-5 w-5 text-finance-green" />,
  },
  {
    id: 2,
    title: "Creating a Business Plan That Works",
    excerpt: "A step-by-step guide to developing a comprehensive business plan that attracts investors.",
    category: "Planning",
    level: "Beginner",
    readTime: "12 min",
    icon: <Building className="h-5 w-5 text-finance-green" />,
  },
  {
    id: 3,
    title: "Small Business Tax Strategies",
    excerpt: "Legal tax minimization strategies to help your small business keep more of what it earns.",
    category: "Taxes",
    level: "Intermediate",
    readTime: "10 min",
    icon: <DollarSign className="h-5 w-5 text-finance-green" />,
  },
  {
    id: 4,
    title: "Understanding Cash Flow Management",
    excerpt: "Learn how to effectively manage your business's cash flow to ensure sustainability and growth.",
    category: "Cash Flow",
    level: "Intermediate",
    readTime: "9 min",
    icon: <BarChart3 className="h-5 w-5 text-finance-green" />,
  },
  {
    id: 5,
    title: "Scaling Your Business: When and How",
    excerpt: "Strategies for growing your business at the right time and in the right ways.",
    category: "Growth",
    level: "Advanced",
    readTime: "14 min",
    icon: <TrendingUp className="h-5 w-5 text-finance-green" />,
  },
  {
    id: 6,
    title: "Hiring Your First Employee: A Financial Guide",
    excerpt: "The financial considerations and obligations of hiring employees for your business.",
    category: "HR",
    level: "Beginner",
    readTime: "8 min",
    icon: <Users className="h-5 w-5 text-finance-green" />,
  },
];

const Business = () => {
  return (
    <CategoryLayout
      title="Business Finance"
      description="Build and grow your business with smart financial strategies, from startup funding to scaling operations."
      bgColor="bg-finance-blue"
    >
      <div className="grid gap-8">
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Business Resources</h2>
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
            <h2 className="text-2xl font-bold">Business Financial Tools</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-finance-cream hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Business Loan Calculator</CardTitle>
                <CardDescription>Calculate monthly payments and total costs for business loans.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">Try Calculator</Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-finance-cream hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Cash Flow Forecaster</CardTitle>
                <CardDescription>Project your business's cash flow over different time periods.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">Try Calculator</Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-finance-cream hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Break-Even Analysis Tool</CardTitle>
                <CardDescription>Calculate when your business will become profitable.</CardDescription>
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

export default Business;
