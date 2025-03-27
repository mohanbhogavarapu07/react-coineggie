
import { Calculator, BookOpen, MessageSquare } from 'lucide-react';

const calculatorItems = [
  { name: 'SIP Calculator', url: '#sip' },
  { name: 'Loan EMI', url: '#loan' },
  { name: 'Tax Calculator', url: '#tax' },
  { name: 'PPF Calculator', url: '#ppf' },
];

const kbItems = [
  { name: 'Mutual Fund Basics', url: '#', category: 'Investing' },
  { name: 'Tax Filing Guide', url: '#', category: 'Taxation' },
  { name: 'ESOP Taxation', url: '#', category: 'Equity' },
  { name: 'Retirement Planning', url: '#', category: 'Planning' },
];

export const ValueColumns = () => {
  return (
    <section id="calculators" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-finance-charcoal mb-4">All Your Financial Tools in One Place</h2>
          <p className="text-lg text-finance-charcoal/70 max-w-2xl mx-auto">
            Powerful calculators, expert knowledge, and AI assistance to help you make smarter financial decisions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Calculators Column */}
          <div className="finance-card p-6 animate-slide-up">
            <div className="w-12 h-12 rounded-lg bg-finance-green/10 flex items-center justify-center mb-4">
              <Calculator className="h-6 w-6 text-finance-green" />
            </div>
            <h3 className="text-xl font-semibold text-finance-charcoal mb-4">Financial Calculators</h3>
            <p className="text-finance-charcoal/70 mb-6">
              Interactive tools to help you plan investments, loans, taxes, and more with precision.
            </p>
            <div className="space-y-3">
              {calculatorItems.map((item, index) => (
                <a 
                  key={index} 
                  href={item.url}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-finance-green/5 flex items-center justify-center mr-3 group-hover:bg-finance-green/10 transition-colors">
                    <Calculator className="h-4 w-4 text-finance-green" />
                  </div>
                  <span className="text-finance-charcoal group-hover:text-finance-green transition-colors">{item.name}</span>
                </a>
              ))}
            </div>
            <div className="mt-6">
              <a href="#all-calculators" className="btn-tertiary w-full">View All Calculators</a>
            </div>
          </div>

          {/* KB Articles Column */}
          <div className="finance-card p-6 animate-slide-up animate-delay-2">
            <div className="w-12 h-12 rounded-lg bg-finance-green/10 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-finance-green" />
            </div>
            <h3 className="text-xl font-semibold text-finance-charcoal mb-4">Knowledge Base</h3>
            <p className="text-finance-charcoal/70 mb-6">
              Expert-written articles and guides covering all aspects of personal finance.
            </p>
            <div className="space-y-3">
              {kbItems.map((item, index) => (
                <a 
                  key={index} 
                  href={item.url}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-finance-green/5 flex items-center justify-center mr-3 group-hover:bg-finance-green/10 transition-colors">
                    <BookOpen className="h-4 w-4 text-finance-green" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-finance-charcoal group-hover:text-finance-green transition-colors">{item.name}</span>
                    <span className="text-xs text-finance-charcoal/50">{item.category}</span>
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-6">
              <a href="#all-articles" className="btn-tertiary w-full">Browse All Articles</a>
            </div>
          </div>

          {/* AI Agent Column */}
          <div className="finance-card p-6 animate-slide-up animate-delay-4">
            <div className="w-12 h-12 rounded-lg bg-finance-blue/10 flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-finance-blue" />
            </div>
            <h3 className="text-xl font-semibold text-finance-charcoal mb-4">AI Financial Assistant</h3>
            <p className="text-finance-charcoal/70 mb-6">
              Get instant answers to your financial questions from our intelligent AI agent.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-finance-charcoal/70 mb-3">Try asking about:</p>
              <div className="space-y-2">
                <div className="px-3 py-2 rounded-md bg-white hover:bg-finance-blue/5 border border-gray-100 cursor-pointer text-sm transition-colors">
                  "How do tax-saving SIPs work?"
                </div>
                <div className="px-3 py-2 rounded-md bg-white hover:bg-finance-blue/5 border border-gray-100 cursor-pointer text-sm transition-colors">
                  "Calculate EMI for 20 lakh home loan"
                </div>
                <div className="px-3 py-2 rounded-md bg-white hover:bg-finance-blue/5 border border-gray-100 cursor-pointer text-sm transition-colors">
                  "Explain ESOP taxation in startups"
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button className="btn-secondary w-full bg-finance-blue">
                <MessageSquare className="h-4 w-4" />
                <span>Chat with AI Assistant</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
