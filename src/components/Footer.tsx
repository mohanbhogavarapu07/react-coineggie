
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-finance-green text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                <span className="text-finance-green font-bold text-lg">DS</span>
              </span>
              <span className="font-semibold text-xl">DigitSage</span>
            </Link>
            <p className="text-sm text-white/80 mb-6">
              AI-powered financial tools and knowledge to help you make smarter financial decisions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-finance-gold transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-white hover:text-finance-gold transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-white hover:text-finance-gold transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-white hover:text-finance-gold transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-white hover:text-finance-gold transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-white">Categories</h3>
            <ul className="grid gap-2">
              <li><Link to="/categories/personal-finance" className="text-sm text-white/80 hover:text-finance-gold transition-colors">Personal Finance</Link></li>
              <li><Link to="/categories/investments" className="text-sm text-white/80 hover:text-finance-gold transition-colors">Investments</Link></li>
              <li><Link to="/categories/retirement" className="text-sm text-white/80 hover:text-finance-gold transition-colors">Retirement</Link></li>
              <li><Link to="/categories/business" className="text-sm text-white/80 hover:text-finance-gold transition-colors">Business</Link></li>
              <li><Link to="/categories/taxes" className="text-sm text-white/80 hover:text-finance-gold transition-colors">Taxes</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-white">Resources</h3>
            <ul className="grid gap-2">
              <li><Link to="/calculators" className="text-sm text-white/80 hover:text-finance-gold transition-colors">Calculators</Link></li>
              <li><Link to="/knowledge-base" className="text-sm text-white/80 hover:text-finance-gold transition-colors">Knowledge Base</Link></li>
              <li><Link to="/blog" className="text-sm text-white/80 hover:text-finance-gold transition-colors">Blog</Link></li>
              <li><Link to="/guides" className="text-sm text-white/80 hover:text-finance-gold transition-colors">Guides</Link></li>
              <li><Link to="/glossary" className="text-sm text-white/80 hover:text-finance-gold transition-colors">Financial Glossary</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="grid gap-2">
              <li><Link to="/about" className="text-sm text-white/80 hover:text-finance-gold transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-white/80 hover:text-finance-gold transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="text-sm text-white/80 hover:text-finance-gold transition-colors">Careers</Link></li>
              <li><Link to="/privacy" className="text-sm text-white/80 hover:text-finance-gold transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-white/80 hover:text-finance-gold transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/70">
              © {new Date().getFullYear()} DigitSage. All rights reserved.
            </p>
            <p className="text-sm text-white/70">
              Disclaimer: Information provided is for educational purposes only and should not be considered financial advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
