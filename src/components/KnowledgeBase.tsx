
import { BookOpen, ArrowRight, Clock, BarChartHorizontal } from 'lucide-react';

const kbCategories = [
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
  },
  {
    title: 'Tax Saving: Maximizing Section 80C Benefits',
    excerpt: 'Comprehensive guide to Section 80C investments, eligible expenses, and strategies to save up to ₹46,800 in taxes.',
    category: 'Tax Planning',
    readTime: 12,
    difficulty: 'Intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
  {
    title: 'ESOP Taxation: Complete Guide for Startup Employees',
    excerpt: 'Understanding the tax implications of Employee Stock Option Plans at different stages - grant, vesting, exercise, and sale.',
    category: 'Taxation',
    readTime: 15,
    difficulty: 'Advanced',
    imageUrl: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  },
];

export const KnowledgeBase = () => {
  return (
    <section id="knowledge" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-finance-charcoal mb-4">Knowledge Base</h2>
          <p className="text-lg text-finance-charcoal/70 max-w-2xl mx-auto">
            Expert guides and articles to help you understand personal finance, investments, taxation, and more.
          </p>
        </div>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {kbCategories.map((category, index) => (
            <div key={index} className="finance-card hover:translate-y-[-4px] transition-all duration-300">
              <div className="p-6">
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
                <a href={`#${category.title.toLowerCase().replace(' ', '-')}`} className="flex items-center text-finance-green hover:text-opacity-80 font-medium text-sm transition-colors">
                  <span>Browse Articles</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* Featured Articles */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-finance-charcoal">Featured Articles</h3>
            <a href="#all-articles" className="text-finance-green hover:text-opacity-80 font-medium text-sm flex items-center transition-colors">
              <span>View All Articles</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => (
              <div key={index} className="finance-card hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-finance-green/10 text-finance-green">
                      {article.category}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-finance-charcoal mb-2">{article.title}</h4>
                  <p className="text-sm text-finance-charcoal/70 mb-4 flex-grow">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-finance-charcoal/60 mt-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime} min read</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChartHorizontal className="h-3 w-3" />
                      <span className={`kb-pill ${
                        article.difficulty === 'Beginner' ? 'kb-pill-beginner' : 
                        article.difficulty === 'Intermediate' ? 'kb-pill-intermediate' : 
                        'kb-pill-advanced'
                      }`}>
                        {article.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-4">
                  <a href="#" className="btn-tertiary w-full py-2">
                    <span>Read Article</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="bg-finance-green rounded-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="p-8 md:p-12 md:w-3/5 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated with Financial Insights</h3>
              <p className="text-white/80 mb-6">
                Join our newsletter for the latest articles, calculators, and financial tips delivered to your inbox.
              </p>
              <form className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-grow px-4 py-3 rounded-lg text-finance-charcoal focus:outline-none focus:ring-2 focus:ring-finance-gold"
                  />
                  <button 
                    type="submit" 
                    className="bg-finance-gold hover:brightness-105 text-finance-charcoal font-medium px-6 py-3 rounded-lg transition-all duration-200 whitespace-nowrap"
                  >
                    Subscribe
                  </button>
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
    </section>
  );
};
