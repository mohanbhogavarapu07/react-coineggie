
import { Search } from 'lucide-react';
import { useState } from 'react';

export const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality
  };

  return (
    <section className="relative bg-gradient-to-b from-white to-finance-cream py-20 md:py-28">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-finance-green/5 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-finance-gold/5 translate-x-1/3 translate-y-1/3"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <span className="inline-block px-3 py-1 rounded-full bg-finance-green/10 text-finance-green text-xs font-medium mb-6">
            AI-Powered Finance Platform
          </span>
        </div>
        
        <h1 className="animate-fade-in text-4xl md:text-5xl lg:text-6xl font-bold text-finance-charcoal mb-6 max-w-4xl mx-auto leading-tight text-balance">
          AI-Powered Financial Mastery
        </h1>
        
        <p className="animate-fade-in animate-delay-1 text-lg md:text-xl text-finance-charcoal/80 mb-8 max-w-2xl mx-auto">
          Calculators × KB Articles × Personalized AI Agents
        </p>
        
        <form onSubmit={handleSearch} className="animate-fade-in animate-delay-2 max-w-2xl mx-auto relative mb-12">
          <div className="relative flex">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-lg border-0 py-4 pl-10 pr-32 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-finance-green transition-all duration-200 placeholder:text-gray-400"
              placeholder="Search calculators, articles, or ask a question..."
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <button
                type="submit"
                className="rounded-md bg-finance-gold px-5 py-2 m-1 text-sm font-medium text-finance-charcoal hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-finance-gold transition-all duration-200"
              >
                Search
              </button>
            </div>
          </div>
        </form>
        
        <div className="animate-fade-in animate-delay-3 flex flex-wrap justify-center gap-4 text-sm text-finance-charcoal/70">
          <span>Popular searches:</span>
          <a href="#" className="hover:text-finance-green hover:underline transition-colors">SIP Calculator</a>
          <a href="#" className="hover:text-finance-green hover:underline transition-colors">Tax Saving Investments</a>
          <a href="#" className="hover:text-finance-green hover:underline transition-colors">ESOP Taxation</a>
          <a href="#" className="hover:text-finance-green hover:underline transition-colors">Retirement Planning</a>
        </div>
      </div>
    </section>
  );
};
