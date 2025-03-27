
import { ArrowRight } from 'lucide-react';

interface KnowledgeCategoryProps {
  categories: {
    title: string;
    description: string;
    icon: string;
    articles: number;
    color: string;
  }[];
}

export const KnowledgeCategories = ({ categories }: KnowledgeCategoryProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {categories.map((category, index) => (
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
  );
};
