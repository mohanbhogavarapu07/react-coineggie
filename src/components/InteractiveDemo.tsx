
import { useState } from 'react';
import { SIPCalculator } from './Calculator';
import { MessageSquare, XCircle } from 'lucide-react';

export const InteractiveDemo = () => {
  const [showAIExplanation, setShowAIExplanation] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAskAI = (question: string) => {
    setAiQuestion(question);
    setShowAIExplanation(true);
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      setIsLoading(false);
      setAiResponse(getSampleAIResponse(question));
    }, 1500);
  };

  const getSampleAIResponse = (question: string) => {
    return `
      SIP (Systematic Investment Plan) is a method of investing a fixed amount regularly in mutual funds.

      For your scenario: ₹${question.match(/₹(\d+)/)?.[1] || '5,000'} invested monthly for ${question.match(/(\d+) years/)?.[1] || '10'} years at ${question.match(/(\d+)%/)?.[1] || '12'}% returns.

      **How the calculation works:**

      1. **Monthly Rate:** ${question.match(/(\d+)%/)?.[1] || '12'}% per year ÷ 12 = ${(parseInt(question.match(/(\d+)%/)?.[1] || '12') / 12).toFixed(2)}% per month
      
      2. **Compound Interest Formula for SIP:**
         A = P × ((1 + r)^n - 1) ÷ r × (1 + r)
         
         Where:
         - A = Final amount
         - P = Monthly investment (₹${question.match(/₹(\d+)/)?.[1] || '5,000'})
         - r = Monthly interest rate (${(parseInt(question.match(/(\d+)%/)?.[1] || '12') / 12 / 100).toFixed(4)})
         - n = Number of payments (${question.match(/(\d+) years/)?.[1] || '10'} × 12 = ${(parseInt(question.match(/(\d+) years/)?.[1] || '10') * 12)})

      3. **Total Investment:** ₹${question.match(/₹(\d+)/)?.[1] || '5,000'} × ${(parseInt(question.match(/(\d+) years/)?.[1] || '10') * 12)} = ₹${(parseInt(question.match(/₹(\d+)/)?.[1] || '5000') * parseInt(question.match(/(\d+) years/)?.[1] || '10') * 12).toLocaleString('en-IN')}
      
      4. **Estimated Returns:** The difference between the final value and total investment

      **Key Factors Affecting SIP Returns:**
      - Longer investment periods benefit more from compounding
      - Higher expected returns significantly impact final value
      - Regular investments help average out market volatility

      **Related Topics:**
      - [Mutual Fund Basics](/#kb/mutual-funds)
      - [Power of Compounding](/#kb/compounding)
      - [Calculate XIRR for irregular investments](/#calculators/xirr)
    `;
  };

  return (
    <section id="demo" className="py-16 md:py-24 bg-finance-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-finance-charcoal mb-4">Try Our Interactive Tools</h2>
          <p className="text-lg text-finance-charcoal/70 max-w-2xl mx-auto">
            Test our powerful calculators with AI assistance to understand complex financial concepts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="order-2 lg:order-1">
            <SIPCalculator onAskAI={handleAskAI} />
          </div>
          
          <div className="order-1 lg:order-2">
            {showAIExplanation ? (
              <div className="finance-card h-full">
                <div className="bg-finance-blue text-white p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    <h3 className="font-semibold">AI Explanation</h3>
                  </div>
                  <button 
                    onClick={() => setShowAIExplanation(false)} 
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="p-6 h-[calc(100%-4rem)] flex flex-col">
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-finance-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-finance-charcoal font-medium text-sm">You</span>
                      </div>
                      <div className="text-sm text-finance-charcoal">
                        <p>{aiQuestion}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-grow overflow-auto pr-2">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="animate-pulse flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-finance-blue/20 flex items-center justify-center mb-3">
                            <MessageSquare className="h-5 w-5 text-finance-blue animate-pulse-soft" />
                          </div>
                          <p className="text-sm text-finance-charcoal/60">Generating response...</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-finance-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                          <MessageSquare className="h-4 w-4 text-white" />
                        </div>
                        <div className="prose prose-sm max-w-none">
                          <div className="text-sm text-finance-charcoal whitespace-pre-line">
                            {aiResponse}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder="Ask a follow-up question..."
                        className="flex-grow rounded-l-lg border-gray-300 focus:ring-finance-blue focus:border-finance-blue"
                      />
                      <button className="btn-secondary bg-finance-blue rounded-l-none rounded-r-lg py-2.5">
                        Send
                      </button>
                    </div>
                    <p className="mt-3 text-xs text-center text-finance-charcoal/50">
                      For educational purposes only. Not financial advice.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="finance-card h-full bg-finance-green/5 flex flex-col justify-center items-center p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-finance-blue/10 flex items-center justify-center mb-6">
                  <MessageSquare className="h-8 w-8 text-finance-blue" />
                </div>
                <h3 className="text-xl font-semibold text-finance-charcoal mb-3">
                  Ask the AI to Explain
                </h3>
                <p className="text-finance-charcoal/70 mb-6 max-w-md">
                  Click the "Ask AI" button on the calculator to get a detailed explanation of how the calculation works.
                </p>
                <button 
                  onClick={() => handleAskAI("Explain the SIP calculation for ₹5000 monthly investment for 10 years at 12% expected returns")}
                  className="btn-secondary bg-finance-blue"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Show Example Explanation</span>
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-16 bg-white rounded-xl p-6 md:p-10 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-finance-charcoal mb-4">Ready to master your finances?</h3>
              <p className="text-finance-charcoal/70 mb-6">
                Sign up for free to access all calculators, knowledge base articles, and AI assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary flex-1">Create Free Account</button>
                <button className="btn-tertiary flex-1">Explore Features</button>
              </div>
            </div>
            <div className="flex-1 max-w-md">
              <div className="bg-finance-cream rounded-lg p-5 border border-gray-200">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-finance-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageSquare className="h-4 w-4 text-white" />
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <div className="text-sm text-finance-charcoal">
                      <p className="font-medium">Did you know?</p>
                      <p className="text-finance-charcoal/70">
                        A monthly SIP of ₹10,000 for 20 years at 12% can grow to approximately ₹1 crore.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-finance-charcoal/50 text-right">
                  Powered by FinAI
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
