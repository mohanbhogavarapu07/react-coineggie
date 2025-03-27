
import { BookOpen } from 'lucide-react';

export const NewsletterSignup = () => {
  return (
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
  );
};
