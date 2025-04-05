import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from '@/layouts/MainLayout';
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Calculators from "./pages/Calculators";
import SIPCalculator from "./pages/calculators/SIPCalculator";
import LumpsumCalculator from "./pages/calculators/LumpsumCalculator";
import SwpCalculator from "./pages/calculators/SwpCalculator";
import MutualFundsCalculator from "./pages/calculators/MutualFundsCalculator";
import HomeLoanEMICalculator from "./pages/calculators/HomeLoanEMICalculator";
import StartupCostCalculator from "./pages/calculators/StartupCostCalculator";
import SalesForecastCalculator from '@/pages/calculators/SalesForecastCalculator';
import BreakEvenCalculator from '@/pages/calculators/BreakEvenCalculator';
import RunwayCalculator from '@/pages/calculators/RunwayCalculator';
import BusinessLoanEMICalculator from '@/pages/calculators/BusinessLoanEMICalculator';
import BurnRateCalculator from '@/pages/calculators/BurnRateCalculator';
import ROASCalculator from '@/pages/calculators/ROASCalculator';
import CACCalculator from '@/pages/calculators/CACCalculator';
import SEOROICalculator from '@/pages/calculators/SEOROICalculator';
import FacebookAdsBreakEvenROAS from '@/pages/calculators/FacebookAdsBreakEvenROAS';
import EmailMarketingROICalculator from '@/pages/calculators/EmailMarketingROICalculator';
import WinRateCalculator from '@/pages/calculators/WinRateCalculator';
import UpsellRevenueCalculator from '@/pages/calculators/UpsellRevenueCalculator';
import AverageDealSizeCalculator from '@/pages/calculators/AverageDealSizeCalculator';
import COGSCalculator from '@/pages/calculators/COGSCalculator';
import GrossMarginCalculator from '@/pages/calculators/GrossMarginCalculator';
import InventoryTurnoverCalculator from '@/pages/calculators/InventoryTurnoverCalculator';
import EOQCalculator from '@/pages/calculators/EOQCalculator';
import EmployeeProductivityCalculator from '@/pages/calculators/EmployeeProductivityCalculator';
import FulfillmentCostCalculator from '@/pages/calculators/FulfillmentCostCalculator';
import SAFENoteCalculator from '@/pages/calculators/SAFENoteCalculator';
import ARRCalculator from '@/pages/calculators/ARRCalculator';
import ValuationMultiplesCalculator from '@/pages/calculators/ValuationMultiplesCalculator';
import ConvertibleNoteCalculator from '@/pages/calculators/ConvertibleNoteCalculator';
import TermSheetSimulator from '@/pages/calculators/TermSheetSimulator';
import SalaryBenchmarkingCalculator from '@/pages/calculators/SalaryBenchmarkingCalculator';
import EmployeeTurnoverCostCalculator from '@/pages/calculators/EmployeeTurnoverCostCalculator';
import DiversityPayGapCalculator from '@/pages/calculators/DiversityPayGapCalculator';
import EquityDilutionCalculator from '@/pages/calculators/EquityDilutionCalculator';
import TrainingROICalculator from '@/pages/calculators/TrainingROICalculator';
import FixedDepositCalculator from "./pages/calculators/FixedDepositCalculator";
import RecurringDepositCalculator from './pages/calculators/RecurringDepositCalculator';
import SimpleInterestCalculator from './pages/calculators/SimpleInterestCalculator';
import CompoundInterestCalculator from './pages/calculators/CompoundintrestCalculator';
import StepUpSipCalculator from './pages/calculators/SetUpSipCalculator';
import StockAverageCalculator from './pages/calculators/StockAverageCalculator';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
           
              <Route path="/" element={<Index />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="calculators" element={<Calculators />} />
              <Route path="calculators/sip" element={<SIPCalculator />} />
              <Route path="calculators/lumpsum" element={<LumpsumCalculator />} />
              <Route path="calculators/swp" element={<SwpCalculator />} />
              <Route path="calculators/mutual-funds" element={<MutualFundsCalculator />} />
              <Route path="calculators/home-loan-emi" element={<HomeLoanEMICalculator />} />
              <Route path="calculators/startup-cost" element={<StartupCostCalculator />} />
              <Route path="calculators/sales-forecast" element={<SalesForecastCalculator />} />
              <Route path="calculators/break-even" element={<BreakEvenCalculator />} />
              <Route path="calculators/runway" element={<RunwayCalculator />} />
              <Route path="calculators/business-loan-emi" element={<BusinessLoanEMICalculator />} />
              <Route path="calculators/burn-rate" element={<BurnRateCalculator />} />
              <Route path="calculators/roas" element={<ROASCalculator />} />
              <Route path="calculators/cac" element={<CACCalculator />} />
              <Route path="calculators/seo-roi" element={<SEOROICalculator />} />
              <Route path="calculators/facebook-ads-break-even-roas" element={<FacebookAdsBreakEvenROAS />} />
              <Route path="calculators/email-marketing-roi" element={<EmailMarketingROICalculator />} />
              <Route path="calculators/win-rate" element={<WinRateCalculator />} />
              <Route path="calculators/upsell-revenue" element={<UpsellRevenueCalculator />} />
              <Route path="calculators/average-deal-size" element={<AverageDealSizeCalculator />} />
              <Route path="calculators/cogs" element={<COGSCalculator />} />
              <Route path="calculators/gross-margin" element={<GrossMarginCalculator />} />
              <Route path="calculators/inventory-turnover" element={<InventoryTurnoverCalculator />} />
              <Route path="calculators/economic-order-quantity" element={<EOQCalculator />} />
              <Route path="calculators/employee-productivity" element={<EmployeeProductivityCalculator />} />
              <Route path="calculators/fulfillment-cost" element={<FulfillmentCostCalculator />} />
              <Route path="calculators/safe-note" element={<SAFENoteCalculator />} />
              <Route path="calculators/arr" element={<ARRCalculator />} />
              <Route path="calculators/valuation-multiples" element={<ValuationMultiplesCalculator />} />
              <Route path="calculators/convertible-note" element={<ConvertibleNoteCalculator />} />
              <Route path="calculators/term-sheet" element={<TermSheetSimulator />} />
              <Route path="calculators/salary-benchmarking" element={<SalaryBenchmarkingCalculator />} />
              <Route path="calculators/employee-turnover" element={<EmployeeTurnoverCostCalculator />} />
              <Route path="calculators/diversity-pay-gap" element={<DiversityPayGapCalculator />} />
              <Route path="calculators/equity-dilution" element={<EquityDilutionCalculator />} />
              <Route path="calculators/training-roi" element={<TrainingROICalculator />} />
              <Route path="calculators/fd" element={<FixedDepositCalculator />} />
              <Route path="calculators/rd" element={<RecurringDepositCalculator />} />
              <Route path="calculators/simple-interest" element={<SimpleInterestCalculator />} />
              <Route path="calculators/compound-interest" element={<CompoundInterestCalculator />} />
              <Route path="calculators/step-up-sip" element={<StepUpSipCalculator />} />
              <Route path="calculators/stock-average" element={<StockAverageCalculator />} />
              {/* Add more calculator routes here */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
