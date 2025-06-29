
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, User, ArrowRight, Search, Filter, TrendingUp, BookOpen } from 'lucide-react';

const featuredBlogs = [
  {
    id: '1',
    title: 'The Complete Guide to Building Wealth in Your 20s: A Decade-by-Decade Strategy',
    excerpt: 'Your twenties are a critical decade for establishing financial foundations. This comprehensive guide covers everything from emergency funds to investment strategies, helping you make the most of compound interest and time.',
    content: 'Detailed analysis of wealth-building strategies specifically tailored for young professionals...',
    category: 'Personal Finance',
    author: {
      name: 'Arjun Mehta',
      avatar: 'https://i.pravatar.cc/150?img=33',
      designation: 'Senior Financial Advisor'
    },
    publishedDate: '2024-01-15',
    readTime: 15,
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    slug: 'wealth-building-guide-twenties',
    tags: ['Wealth Building', 'Young Professionals', 'Investment Strategy'],
    featured: true
  },
  {
    id: '2',
    title: 'Indian Stock Market Analysis 2024: Sectors to Watch and Investment Opportunities',
    excerpt: 'An in-depth analysis of the Indian stock market trends for 2024, including sector-wise performance, emerging opportunities in renewable energy, technology, and healthcare sectors.',
    content: 'Comprehensive market analysis covering macroeconomic factors, sector performance...',
    category: 'Investments',
    author: {
      name: 'Priya Sharma',
      avatar: 'https://i.pravatar.cc/150?img=28',
      designation: 'Market Research Analyst'
    },
    publishedDate: '2024-01-10',
    readTime: 20,
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    slug: 'indian-stock-market-analysis-2024',
    tags: ['Stock Market', 'India', 'Market Analysis', 'Investment'],
    featured: true
  },
  {
    id: '3',
    title: 'Real Estate Investment in India: A Complete Guide to REITs, Property Investment, and Market Trends',
    excerpt: 'Everything you need to know about real estate investment in India, from traditional property investment to modern REITs, including tax implications and market analysis.',
    content: 'Detailed exploration of real estate investment options in India...',
    category: 'Real Estate',
    author: {
      name: 'Vikram Singh',
      avatar: 'https://i.pravatar.cc/150?img=51',
      designation: 'Real Estate Investment Specialist'
    },
    publishedDate: '2024-01-08',
    readTime: 18,
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    slug: 'real-estate-investment-india-guide',
    tags: ['Real Estate', 'REITs', 'Property Investment', 'India'],
    featured: true
  }
];

const allBlogs = [
  ...featuredBlogs,
  {
    id: '4',
    title: 'Cryptocurrency in India: Legal Framework, Tax Implications, and Investment Strategies',
    excerpt: 'Navigate the complex world of cryptocurrency investments in India with our comprehensive guide covering legal aspects, taxation, and strategic investment approaches.',
    content: 'In-depth analysis of cryptocurrency landscape in India...',
    category: 'Digital Assets',
    author: {
      name: 'Rajesh Kumar',
      avatar: 'https://i.pravatar.cc/150?img=45',
      designation: 'Crypto Investment Advisor'
    },
    publishedDate: '2024-01-05',
    readTime: 16,
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    slug: 'cryptocurrency-india-legal-tax-guide',
    tags: ['Cryptocurrency', 'Digital Assets', 'Tax', 'Legal'],
    featured: false
  },
  {
    id: '5',
    title: 'Insurance Planning in India: Life, Health, and Motor Insurance Comprehensive Guide',
    excerpt: 'A detailed guide to understanding and choosing the right insurance products in India, covering life insurance, health insurance, and motor insurance with claim processes.',
    content: 'Complete insurance planning strategy for Indian families...',
    category: 'Insurance',
    author: {
      name: 'Neha Gupta',
      avatar: 'https://i.pravatar.cc/150?img=29',
      designation: 'Insurance Planning Expert'
    },
    publishedDate: '2024-01-03',
    readTime: 14,
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    slug: 'insurance-planning-india-comprehensive-guide',
    tags: ['Insurance', 'Life Insurance', 'Health Insurance', 'Motor Insurance'],
    featured: false
  },
  {
    id: '6',
    title: 'Financial Independence and Early Retirement (FIRE) Movement in India: A Practical Roadmap',
    excerpt: 'Learn how to achieve financial independence and retire early in the Indian context with practical strategies, investment planning, and lifestyle considerations.',
    content: 'Detailed roadmap to achieving FIRE in India...',
    category: 'Retirement Planning',
    author: {
      name: 'Ankit Patel',
      avatar: 'https://i.pravatar.cc/150?img=42',
      designation: 'FIRE Movement Advocate'
    },
    publishedDate: '2024-01-01',
    readTime: 22,
    imageUrl: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    slug: 'fire-movement-india-practical-guide',
    tags: ['FIRE', 'Financial Independence', 'Early Retirement', 'India'],
    featured: false
  }
];

const categories = [
  { name: 'All', count: allBlogs.length },
  { name: 'Personal Finance', count: allBlogs.filter(blog => blog.category === 'Personal Finance').length },
  { name: 'Investments', count: allBlogs.filter(blog => blog.category === 'Investments').length },
  { name: 'Real Estate', count: allBlogs.filter(blog => blog.category === 'Real Estate').length },
  { name: 'Digital Assets', count: allBlogs.filter(blog => blog.category === 'Digital Assets').length },
  { name: 'Insurance', count: allBlogs.filter(blog => blog.category === 'Insurance').length },
  { name: 'Retirement Planning', count: allBlogs.filter(blog => blog.category === 'Retirement Planning').length }
];

const Blog = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-finance-green to-finance-green/80 py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">DigitSage Blog</h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              In-depth insights, expert analysis, and practical guides for your financial journey
            </p>
            <p className="text-lg opacity-80 mb-8">
              Discover comprehensive articles on investments, personal finance, market trends, and wealth-building strategies specifically tailored for the Indian financial landscape.
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                type="search" 
                placeholder="Search articles, topics, or authors..." 
                className="w-full pl-12 py-6 text-lg text-finance-charcoal bg-white rounded-xl focus:ring-2 focus:ring-finance-gold border-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-16">
        {/* Featured Article Highlight */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="h-6 w-6 text-finance-green" />
            <h2 className="text-3xl font-bold">Featured Article</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <Badge className="mb-4 bg-finance-green/10 text-finance-green">
                {featuredBlogs[0].category}
              </Badge>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {featuredBlogs[0].title}
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                {featuredBlogs[0].excerpt}
              </p>
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={featuredBlogs[0].author.avatar} alt={featuredBlogs[0].author.name} />
                    <AvatarFallback>{featuredBlogs[0].author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{featuredBlogs[0].author.name}</p>
                    <p className="text-sm text-muted-foreground">{featuredBlogs[0].author.designation}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(featuredBlogs[0].publishedDate).toLocaleDateString('en-IN')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{featuredBlogs[0].readTime} min read</span>
                  </div>
                </div>
              </div>
              <Button asChild size="lg" className="bg-finance-green hover:bg-finance-green/90">
                <Link to={`/blog/${featuredBlogs[0].slug}`} className="flex items-center gap-2">
                  Read Full Article <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative h-96 lg:h-full min-h-[400px] rounded-2xl overflow-hidden">
                <img 
                  src={featuredBlogs[0].imageUrl} 
                  alt={featuredBlogs[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Browse Articles Section */}
        <section>
          <Tabs defaultValue="featured" className="mb-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-finance-green" />
                <h2 className="text-3xl font-bold">Latest Articles</h2>
              </div>
              
              <div className="flex items-center gap-4">
                <TabsList className="grid grid-cols-4 w-full md:w-auto">
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="all">All Posts</TabsTrigger>
                </TabsList>
                
                <Button variant="outline" className="gap-2">
                  <Filter size={16} />
                  Filter
                </Button>
              </div>
            </div>
            
            <TabsContent value="featured" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredBlogs.slice(1).map((blog) => (
                  <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={blog.imageUrl} 
                        alt={blog.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="bg-finance-green/10 text-finance-green border-finance-green/20">
                          {blog.category}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{blog.readTime} min</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl mb-2 group-hover:text-finance-green transition-colors line-clamp-2">
                        <Link to={`/blog/${blog.slug}`}>
                          {blog.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-3">
                        {blog.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                          <AvatarFallback className="text-xs">{blog.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{blog.author.name}</span>
                      </div>
                      <Button variant="ghost" size="sm" asChild className="text-finance-green hover:text-finance-green/80">
                        <Link to={`/blog/${blog.slug}`} className="flex items-center gap-1">
                          Read More <ArrowRight size={12} />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recent" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allBlogs.slice(0, 6).map((blog) => (
                  <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={blog.imageUrl} 
                        alt={blog.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="bg-finance-green/10 text-finance-green border-finance-green/20">
                          {blog.category}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{blog.readTime} min</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl mb-2 group-hover:text-finance-green transition-colors line-clamp-2">
                        <Link to={`/blog/${blog.slug}`}>
                          {blog.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-3">
                        {blog.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                          <AvatarFallback className="text-xs">{blog.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{blog.author.name}</span>
                      </div>
                      <Button variant="ghost" size="sm" asChild className="text-finance-green hover:text-finance-green/80">
                        <Link to={`/blog/${blog.slug}`} className="flex items-center gap-1">
                          Read More <ArrowRight size={12} />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="popular" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[allBlogs[2], allBlogs[0], allBlogs[4], allBlogs[1], allBlogs[5], allBlogs[3]].map((blog) => (
                  <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={blog.imageUrl} 
                        alt={blog.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="bg-finance-green/10 text-finance-green border-finance-green/20">
                          {blog.category}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{blog.readTime} min</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl mb-2 group-hover:text-finance-green transition-colors line-clamp-2">
                        <Link to={`/blog/${blog.slug}`}>
                          {blog.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-3">
                        {blog.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                          <AvatarFallback className="text-xs">{blog.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{blog.author.name}</span>
                      </div>
                      <Button variant="ghost" size="sm" asChild className="text-finance-green hover:text-finance-green/80">
                        <Link to={`/blog/${blog.slug}`} className="flex items-center gap-1">
                          Read More <ArrowRight size={12} />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="all" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allBlogs.map((blog) => (
                  <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={blog.imageUrl} 
                        alt={blog.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="bg-finance-green/10 text-finance-green border-finance-green/20">
                          {blog.category}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{blog.readTime} min</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl mb-2 group-hover:text-finance-green transition-colors line-clamp-2">
                        <Link to={`/blog/${blog.slug}`}>
                          {blog.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-3">
                        {blog.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                          <AvatarFallback className="text-xs">{blog.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{blog.author.name}</span>
                      </div>
                      <Button variant="ghost" size="sm" asChild className="text-finance-green hover:text-finance-green/80">
                        <Link to={`/blog/${blog.slug}`} className="flex items-center gap-1">
                          Read More <ArrowRight size={12} />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-finance-green to-finance-green/90 rounded-2xl overflow-hidden mt-16">
          <div className="p-8 md:p-12 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated with Our Latest Insights</h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest financial insights, market analysis, and investment strategies delivered directly to your inbox.
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-grow px-4 py-3 rounded-lg text-finance-charcoal focus:outline-none focus:ring-2 focus:ring-finance-gold border-none"
                />
                <Button className="bg-finance-gold hover:brightness-105 text-finance-charcoal font-medium px-6 py-3 rounded-lg transition-all duration-200 whitespace-nowrap">
                  Subscribe Now
                </Button>
              </div>
              <p className="text-white/70 text-sm mt-4">
                Join 10,000+ readers. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Blog;
