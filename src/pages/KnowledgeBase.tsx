
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, ArrowRight, Clock, BarChartHorizontal, FileText, TrendingUp, Search, Filter } from 'lucide-react';

const categories = [
  {
    title: 'Personal Finance',
    description: 'Budgeting, Savings, Debt Management',
    icon: '💰',
    articles: 24,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Investments',
    description: 'Stocks, Mutual Funds, Bonds',
    icon: '📈',
    articles: 36,
    color: 'bg-green-50 text-green-600',
  },
  {
    title: 'Tax Planning',
    description: 'Income Tax, Deductions, Filing',
    icon: '📝',
    articles: 18,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    title: 'Retirement',
    description: 'Pension, EPF, NPS',
    icon: '🏖️',
    articles: 12,
    color: 'bg-yellow-50 text-yellow-600',
  },
  {
    title: 'Insurance',
    description: 'Life, Health, Property',
    icon: '🛡️',
    articles: 15,
    color: 'bg-red-50 text-red-600',
  },
  {
    title: 'Real Estate',
    description: 'Home Loans, Property Investment',
    icon: '🏠',
    articles: 9,
    color: 'bg-indigo-50 text-indigo-600',
  },
];

const featuredArticles = [
  {
    title: 'Mutual Fund Basics: A Beginner\'s Guide',
    excerpt: 'Learn the fundamentals of mutual funds, types of funds, and how to start investing with just ₹500 per month.',
    category: 'Investments',
    readTime: 8,
    difficulty: 'Beginner',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    slug: 'mutual-fund-basics',
  },
  {
    title: 'Tax Saving: Maximizing Section 80C Benefits',
    excerpt: 'Comprehensive guide to Section 80C investments, eligible expenses, and strategies to save up to ₹46,800 in taxes.',
    category: 'Tax Planning',
    readTime: 12,
    difficulty: 'Intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    slug: 'tax-saving-section-80c',
  },
  {
    title: 'ESOP Taxation: Complete Guide for Startup Employees',
    excerpt: 'Understanding the tax implications of Employee Stock Option Plans at different stages - grant, vesting, exercise, and sale.',
    category: 'Taxation',
    readTime: 15,
    difficulty: 'Advanced',
    imageUrl: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    slug: 'esop-taxation-guide',
  },
];

const allArticles = [
  ...featuredArticles,
  {
    title: 'Emergency Fund: How Much Should You Save?',
    excerpt: 'A comprehensive analysis of emergency fund requirements based on income stability, fixed expenses, and financial obligations.',
    category: 'Personal Finance',
    readTime: 10,
    difficulty: 'Beginner',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    slug: 'emergency-fund-savings',
  },
  {
    title: 'Understanding Asset Allocation Strategies',
    excerpt: 'Explore different asset allocation models and how to adjust them based on your risk tolerance and investment horizon.',
    category: 'Investments',
    readTime: 13,
    difficulty: 'Intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    slug: 'asset-allocation-strategies',
  },
  {
    title: 'Retirement Planning in Your 30s: The Complete Roadmap',
    excerpt: 'Why starting retirement planning in your 30s can lead to financial freedom, with step-by-step investment strategies.',
    category: 'Retirement',
    readTime: 14,
    difficulty: 'Intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    slug: 'retirement-planning-30s',
  },
];

const KnowledgeBasePage = () => {
  return (
    <MainLayout>
      <div className="bg-finance-green py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">DigitSage Knowledge Base</h1>
            <p className="text-xl opacity-90 mb-8">
              Expert guides and resources to build your financial knowledge
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                type="search" 
                placeholder="Search for topics, articles, or keywords..." 
                className="w-full pl-10 py-6 text-finance-charcoal bg-white rounded-lg focus:ring-2 focus:ring-finance-gold border-none"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="container py-16">
        <Tabs defaultValue="featured" className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <TabsList>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="all">All Articles</TabsTrigger>
            </TabsList>
            
            <Button variant="outline" className="gap-2">
              <Filter size={16} />
              Filter
            </Button>
          </div>
          
          <TabsContent value="featured" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-finance-green/10 text-finance-green`}>
                        {article.category}
                      </span>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{article.readTime} min read</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2 hover:text-finance-green transition-colors">
                      <Link to={`/knowledge-base/article/${article.slug}`}>
                        {article.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center pt-0">
                    <span className={`kb-pill ${
                      article.difficulty === 'Beginner' ? 'kb-pill-beginner' : 
                      article.difficulty === 'Intermediate' ? 'kb-pill-intermediate' : 
                      'kb-pill-advanced'
                    }`}>
                      {article.difficulty}
                    </span>
                    <Button variant="ghost" size="sm" asChild className="text-finance-green hover:text-finance-green/80">
                      <Link to={`/knowledge-base/article/${article.slug}`} className="flex items-center gap-1">
                        Read Article <ArrowRight size={14} />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="popular" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Display slightly different order of articles for Popular tab */}
              {[allArticles[3], allArticles[0], allArticles[4]].map((article, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-finance-green/10 text-finance-green`}>
                        {article.category}
                      </span>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{article.readTime} min read</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2 hover:text-finance-green transition-colors">
                      <Link to={`/knowledge-base/article/${article.slug}`}>
                        {article.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center pt-0">
                    <span className={`kb-pill ${
                      article.difficulty === 'Beginner' ? 'kb-pill-beginner' : 
                      article.difficulty === 'Intermediate' ? 'kb-pill-intermediate' : 
                      'kb-pill-advanced'
                    }`}>
                      {article.difficulty}
                    </span>
                    <Button variant="ghost" size="sm" asChild className="text-finance-green hover:text-finance-green/80">
                      <Link to={`/knowledge-base/article/${article.slug}`} className="flex items-center gap-1">
                        Read Article <ArrowRight size={14} />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Display slightly different order of articles for Recent tab */}
              {[allArticles[5], allArticles[1], allArticles[2]].map((article, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-finance-green/10 text-finance-green`}>
                        {article.category}
                      </span>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{article.readTime} min read</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2 hover:text-finance-green transition-colors">
                      <Link to={`/knowledge-base/article/${article.slug}`}>
                        {article.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center pt-0">
                    <span className={`kb-pill ${
                      article.difficulty === 'Beginner' ? 'kb-pill-beginner' : 
                      article.difficulty === 'Intermediate' ? 'kb-pill-intermediate' : 
                      'kb-pill-advanced'
                    }`}>
                      {article.difficulty}
                    </span>
                    <Button variant="ghost" size="sm" asChild className="text-finance-green hover:text-finance-green/80">
                      <Link to={`/knowledge-base/article/${article.slug}`} className="flex items-center gap-1">
                        Read Article <ArrowRight size={14} />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="all" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {allArticles.map((article, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-all duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={article.imageUrl} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-finance-green/10 text-finance-green`}>
                        {article.category}
                      </span>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{article.readTime} min read</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2 hover:text-finance-green transition-colors">
                      <Link to={`/knowledge-base/article/${article.slug}`}>
                        {article.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center pt-0">
                    <span className={`kb-pill ${
                      article.difficulty === 'Beginner' ? 'kb-pill-beginner' : 
                      article.difficulty === 'Intermediate' ? 'kb-pill-intermediate' : 
                      'kb-pill-advanced'
                    }`}>
                      {article.difficulty}
                    </span>
                    <Button variant="ghost" size="sm" asChild className="text-finance-green hover:text-finance-green/80">
                      <Link to={`/knowledge-base/article/${article.slug}`} className="flex items-center gap-1">
                        Read Article <ArrowRight size={14} />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Topic Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Browse by Topic</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow hover:shadow-md transition-all duration-300 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${category.color} mb-4`}>
                      <span className="text-2xl">{category.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-finance-charcoal">{category.title}</h3>
                    <p className="text-sm text-finance-charcoal/70 mt-1">{category.description}</p>
                  </div>
                  <div className="bg-gray-50 rounded-full px-2 py-1 text-xs font-medium text-finance-charcoal/60">
                    {category.articles} articles
                  </div>
                </div>
                <Link 
                  to={`/knowledge-base/category/${category.title.toLowerCase().replace(' ', '-')}`}
                  className="flex items-center text-finance-green hover:text-opacity-80 font-medium text-sm transition-colors"
                >
                  <span>Browse Articles</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>
        
        {/* Newsletter Section */}
        <div className="bg-finance-green rounded-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="p-8 md:p-12 md:w-3/5 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated with Financial Insights</h3>
              <p className="text-white/80 mb-6">
                Join our newsletter for the latest articles, calculators, and financial tips delivered to your inbox.
              </p>
              <form className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-grow px-4 py-3 rounded-lg text-finance-charcoal focus:outline-none focus:ring-2 focus:ring-finance-gold border-none"
                  />
                  <Button className="bg-finance-gold hover:brightness-105 text-finance-charcoal font-medium px-6 py-3 rounded-lg transition-all duration-200 whitespace-nowrap">
                    Subscribe
                  </Button>
                </div>
                <p className="text-white/60 text-xs">
                  By subscribing, you agree to our Privacy Policy. We respect your privacy and will never share your information.
                </p>
              </form>
            </div>
            <div className="hidden md:block md:w-2/5 bg-finance-green relative overflow-hidden">
              <div className="absolute inset-0 bg-finance-green/20">
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default KnowledgeBasePage;
