
import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { HelpCircle, Calculator as CalculatorIcon } from 'lucide-react';

interface SIPCalculatorProps {
  onAskAI?: (question: string) => void;
}

export const SIPCalculator = ({ onAskAI }: SIPCalculatorProps) => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    // Calculate SIP returns
    const monthlyRate = expectedReturn / 100 / 12;
    const months = years * 12;
    
    const invested = monthlyInvestment * months;
    const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    
    setTotalInvestment(invested);
    setTotalValue(Math.round(futureValue));
    setEstimatedReturns(Math.round(futureValue - invested));
  }, [monthlyInvestment, years, expectedReturn]);

  const handleAskAI = () => {
    if (onAskAI) {
      onAskAI(`Explain the SIP calculation for ₹${monthlyInvestment} monthly investment for ${years} years at ${expectedReturn}% expected returns`);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="finance-card overflow-visible">
      <div className="bg-finance-green p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalculatorIcon className="h-5 w-5" />
          <h3 className="font-semibold">SIP Calculator</h3>
        </div>
        <button 
          onClick={handleAskAI}
          className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full flex items-center gap-1 transition-colors"
        >
          <HelpCircle className="h-3 w-3" />
          <span>Ask AI</span>
        </button>
      </div>
      
      <div className="p-6">
        <div className="space-y-6">
          {/* Monthly Investment */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-finance-charcoal">Monthly Investment</label>
              <div className="flex items-center gap-2">
                <span className="text-finance-charcoal/60">₹</span>
                <input
                  type="number"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="w-20 border-0 p-1 text-right text-finance-charcoal bg-gray-50 rounded"
                />
              </div>
            </div>
            <Slider
              value={[monthlyInvestment]}
              min={500}
              max={100000}
              step={500}
              onValueChange={(value) => setMonthlyInvestment(value[0])}
              className="my-4"
            />
            <div className="flex justify-between text-xs text-finance-charcoal/60">
              <span>₹500</span>
              <span>₹1,00,000</span>
            </div>
          </div>
          
          {/* Investment Period */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-finance-charcoal">Investment Period</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-16 border-0 p-1 text-right text-finance-charcoal bg-gray-50 rounded"
                />
                <span className="text-finance-charcoal/60">years</span>
              </div>
            </div>
            <Slider
              value={[years]}
              min={1}
              max={30}
              step={1}
              onValueChange={(value) => setYears(value[0])}
              className="my-4"
            />
            <div className="flex justify-between text-xs text-finance-charcoal/60">
              <span>1 year</span>
              <span>30 years</span>
            </div>
          </div>
          
          {/* Expected Returns */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-finance-charcoal">Expected Returns (p.a.)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-16 border-0 p-1 text-right text-finance-charcoal bg-gray-50 rounded"
                />
                <span className="text-finance-charcoal/60">%</span>
              </div>
            </div>
            <Slider
              value={[expectedReturn]}
              min={1}
              max={30}
              step={0.5}
              onValueChange={(value) => setExpectedReturn(value[0])}
              className="my-4"
            />
            <div className="flex justify-between text-xs text-finance-charcoal/60">
              <span>1%</span>
              <span>30%</span>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-xs text-finance-charcoal/60 mb-1">Invested Amount</p>
              <p className="text-lg font-semibold text-finance-charcoal">{formatCurrency(totalInvestment)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-finance-charcoal/60 mb-1">Est. Returns</p>
              <p className="text-lg font-semibold text-finance-green">{formatCurrency(estimatedReturns)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-finance-charcoal/60 mb-1">Total Value</p>
              <p className="text-lg font-semibold text-finance-gold">{formatCurrency(totalValue)}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="h-4 w-full rounded-full overflow-hidden bg-gray-100">
              <div className="flex h-full">
                <div 
                  className="bg-finance-green transition-all duration-500 ease-out"
                  style={{ width: `${(totalInvestment / totalValue) * 100}%` }}
                ></div>
                <div 
                  className="bg-finance-gold transition-all duration-500 ease-out"
                  style={{ width: `${(estimatedReturns / totalValue) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-finance-green"></div>
                <span className="text-finance-charcoal/60">Invested</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-finance-gold"></div>
                <span className="text-finance-charcoal/60">Returns</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-xs text-finance-charcoal/60 text-center">
            <p>
              *The calculator is for illustrative purposes only and does not guarantee actual returns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
