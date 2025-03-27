
import { ReactNode } from 'react';
import { ChatAgent } from '@/components/ChatAgent';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-finance-cream">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-finance-green flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M2 17a5 5 0 0 1 10 0c0 2.5-2.5 3-2.5 3H5s-3-.5-3-3Z" />
                    <path d="M12 17a5 5 0 0 1 10 0c0 2.5-2.5 3-2.5 3H15s-3-.5-3-3Z" />
                    <path d="M2 8a5 5 0 0 1 10 0c0 2.5-2.5 3-2.5 3H5s-3-.5-3-3Z" />
                    <path d="M12 8a5 5 0 0 1 10 0c0 2.5-2.5 3-2.5 3H15s-3-.5-3-3Z" />
                  </svg>
                </div>
                <span className="font-bold text-lg text-finance-charcoal">FinAI</span>
              </a>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#calculators" className="text-sm text-finance-charcoal/80 hover:text-finance-green transition-colors duration-200">Calculators</a>
              <a href="#knowledge" className="text-sm text-finance-charcoal/80 hover:text-finance-green transition-colors duration-200">Knowledge Base</a>
              <a href="#demo" className="text-sm text-finance-charcoal/80 hover:text-finance-green transition-colors duration-200">Interactive Demo</a>
            </nav>
            
            <div className="flex items-center gap-4">
              <button className="btn-tertiary py-2 px-4">Log In</button>
              <button className="btn-primary py-2 px-4">Sign Up</button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-finance-charcoal text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">FinAI</h3>
              <p className="text-sm text-gray-300">
                AI-Powered Financial Mastery. Calculators × KB Articles × Personalized AI Agents.
              </p>
              <div className="mt-4 text-xs text-gray-400">
                <p>For educational purposes only. Not financial advice.</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Calculators</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Knowledge Base</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Assistant</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-xs text-gray-400">
            <p>© {new Date().getFullYear()} FinAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <ChatAgent />
    </div>
  );
};
