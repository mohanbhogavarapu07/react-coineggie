
import { KnowledgeCategories } from './knowledge-base/KnowledgeCategories';
import { FeaturedArticles } from './knowledge-base/FeaturedArticles';
import { NewsletterSignup } from './knowledge-base/NewsletterSignup';
import { kbCategories, featuredArticles } from '@/data/knowledgeBaseData';

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
        <KnowledgeCategories categories={kbCategories} />
        
        {/* Featured Articles */}
        <FeaturedArticles articles={featuredArticles} />
        
        {/* Newsletter */}
        <NewsletterSignup />
      </div>
    </section>
  );
};
