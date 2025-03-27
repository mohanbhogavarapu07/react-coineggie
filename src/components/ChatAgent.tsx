
import { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Minimize2, Maximize2, ChevronDown } from 'lucide-react';

export const ChatAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<{sender: 'user' | 'ai', message: string}[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  
  const suggestions = [
    "How do SIPs work?",
    "Best tax-saving investments for FY 2023-24?",
    "Explain ELSS mutual funds",
    "How to plan for retirement in my 30s?",
  ];

  useEffect(() => {
    if (isOpen && conversation.length === 0) {
      // Add initial AI message
      setConversation([
        {
          sender: 'ai',
          message: "Hi! I'm your Finance AI. Ask me about loans, taxes, or investments. How can I help you today?"
        }
      ]);
    }
  }, [isOpen, conversation.length]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    // Add user message
    setConversation([...conversation, { sender: 'user', message }]);
    setShowSuggestions(false);
    
    // Clear input
    setMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      let response = "I'm analyzing your question...";
      
      if (message.toLowerCase().includes('sip')) {
        response = "SIP (Systematic Investment Plan) is a method to invest in mutual funds where you invest a fixed amount regularly. It helps you average your purchase cost and benefit from rupee cost averaging. Would you like to know more about its benefits or see a calculation example?";
      } else if (message.toLowerCase().includes('tax')) {
        response = "There are several tax-saving investment options under Section 80C like ELSS mutual funds, PPF, NPS, and tax-saving FDs. Each has different lock-in periods and returns. Would you like me to explain any specific option in detail?";
      } else if (message.toLowerCase().includes('loan') || message.toLowerCase().includes('emi')) {
        response = "For home loans, the EMI depends on the principal amount, interest rate, and loan tenure. Would you like me to calculate an EMI for you or explain how to get the best interest rates?";
      } else {
        response = "That's an interesting financial question. I can help with investment planning, tax optimization, loan calculations, and retirement planning. Could you provide more specific details so I can give you a more tailored response?";
      }
      
      setConversation(prev => [...prev, { sender: 'ai', message: response }]);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    setShowSuggestions(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-finance-blue text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-finance-blue/90 transition-all duration-300"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${isMinimized ? 'w-80' : 'w-80 sm:w-96'} rounded-xl overflow-hidden shadow-xl transition-all duration-300 bg-white border border-gray-200`}>
      {/* Header */}
      <div className="bg-finance-blue text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          <h3 className="font-semibold">FinAI Assistant</h3>
        </div>
        <div className="flex items-center gap-2">
          {isMinimized ? (
            <button onClick={() => setIsMinimized(false)} className="text-white/80 hover:text-white transition-colors">
              <Maximize2 className="h-4 w-4" />
            </button>
          ) : (
            <button onClick={() => setIsMinimized(true)} className="text-white/80 hover:text-white transition-colors">
              <Minimize2 className="h-4 w-4" />
            </button>
          )}
          <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {!isMinimized && (
        <>
          {/* Conversation */}
          <div className="bg-gray-50 p-4 h-80 overflow-y-auto flex flex-col gap-4">
            {conversation.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender === 'user' 
                    ? 'bg-finance-blue text-white' 
                    : 'bg-white border border-gray-200 text-finance-charcoal'
                }`}>
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Suggestions */}
          {showSuggestions && (
            <div className="p-3 border-t border-gray-200">
              <p className="text-xs text-finance-charcoal/60 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-finance-charcoal px-3 py-1.5 rounded-full transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your financial question..."
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-finance-blue"
              />
              <button
                onClick={handleSend}
                className="bg-finance-blue text-white px-3 py-2 rounded-r-lg hover:bg-finance-blue/90 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-xs text-center text-finance-charcoal/50">
              For educational purposes only. Not financial advice.
            </p>
          </div>
        </>
      )}
      
      {isMinimized && (
        <div 
          className="p-4 cursor-pointer" 
          onClick={() => setIsMinimized(false)}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-finance-charcoal/70 truncate">Click to continue chatting</p>
            <ChevronDown className="h-4 w-4 text-finance-charcoal/50" />
          </div>
        </div>
      )}
    </div>
  );
};
