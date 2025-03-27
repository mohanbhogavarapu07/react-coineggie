
import { ArrowRight, Clock, BarChartHorizontal } from 'lucide-react';

interface FeaturedArticleProps {
  articles: {
    title: string;
    excerpt: string;
    category: string;
    readTime: number;
    difficulty: string;
    imageUrl: string;
  }[];
}

export const FeaturedArticles = ({ articles }: FeaturedArticleProps) => {
  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-finance-charcoal">Featured Articles</h3>
        <a href="#all-articles" className="text-finance-green hover:text-opacity-80 font-medium text-sm flex items-center transition-colors">
          <span>View All Articles</span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article, index) => (
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
  );
};
