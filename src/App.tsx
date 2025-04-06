import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from '@/layouts/MainLayout';
import Index from "./pages/Index";
import Calculators from "./pages/Calculators";

// Investment Calculators
import SIPCalculator from "./pages/calculators/investment/SIPCalculator";
import StepUpSIPCalculator from "./pages/calculators/investment/SetUpSipCalculator";
import LumpsumCalculator from "./pages/calculators/investment/LumpsumCalculator";
import SWPCalculator from "./pages/calculators/investment/SwpCalculator";
import MutualFundsCalculator from "./pages/calculators/investment/MutualFundsCalculator";
import FDCalculator from "./pages/calculators/investment/FixedDepositCalculator";
import RDCalculator from "./pages/calculators/investment/RecurringDepositCalculator";
import SimpleInterestCalculator from "./pages/calculators/investment/SimpleInterestCalculator";
import CompoundInterestCalculator from "./pages/calculators/investment/CompoundintrestCalculator";
import StockAverageCalculator from "./pages/calculators/investment/StockAverageCalculator";
import XIRRCalculator from "./pages/calculators/investment/XirrCalculator";

// Business Calculators
import StartupCostCalculator from "./pages/calculators/business/finance/StartupCostCalculator";
import BreakEvenCalculator from "./pages/calculators/business/finance/BreakEvenCalculator";
import RunwayCalculator from "./pages/calculators/business/finance/RunwayCalculator";
import BusinessLoanEMICalculator from "./pages/calculators/business/finance/BusinessLoanEMICalculator";
import BurnRateCalculator from "./pages/calculators/business/finance/BurnRateCalculator";
import ROICalculator from "./pages/calculators/business/finance/RoiCalculator";

// Sales Calculators
import SalesForecastCalculator from "./pages/calculators/business/sales/SalesForecastCalculator";
import WinRateCalculator from "./pages/calculators/business/sales/WinRateCalculator";
import GrossMarginCalculator from "./pages/calculators/business/sales/GrossMarginCalculator";
import UpsellRevenueCalculator from "./pages/calculators/business/sales/UpsellRevenueCalculator";
import AverageDealSizeCalculator from "./pages/calculators/business/sales/AverageDealSizeCalculator";
import CustomerLifetimeValueCalculator from "./pages/calculators/business/sales/CustomerLifetimeValueCalculator";

// Marketing Calculators
import ROASCalculator from "./pages/calculators/business/marketing/ROASCalculator";
import CACCalculator from "./pages/calculators/business/marketing/CACCalculator";
import SEOROICalculator from "./pages/calculators/business/marketing/SEOROICalculator";
import FacebookAdsBreakEvenROAS from "./pages/calculators/business/marketing/FacebookAdsBreakEvenROAS";
import EmailMarketingROICalculator from "./pages/calculators/business/marketing/EmailMarketingROICalculator";
import LandingPageCalculator from "./pages/calculators/business/marketing/LandingPageCalculator";

// Operations Calculators
import COGSCalculator from "./pages/calculators/business/operations/COGSCalculator";
import InventoryTurnoverCalculator from "./pages/calculators/business/operations/InventoryTurnoverCalculator";
import EOQCalculator from "./pages/calculators/business/operations/EOQCalculator";
import EmployeeProductivityCalculator from "./pages/calculators/business/operations/EmployeeProductivityCalculator";
import FulfillmentCostCalculator from "./pages/calculators/business/operations/FulfillmentCostCalculator";
import CapacityUtilizationCalculator from "./pages/calculators/business/operations/CapacityUtilizationCalculator";

// HR & People Ops Calculators
import SalaryBenchmarkingCalculator from "./pages/calculators/business/hr/SalaryBenchmarkingCalculator";
import DiversityPayGapCalculator from "./pages/calculators/business/hr/DiversityPayGapCalculator";
import EmployeeTurnoverCostCalculator from "./pages/calculators/business/hr/EmployeeTurnoverCostCalculator";
import EquityDilutionCalculator from "./pages/calculators/business/hr/EquityDilutionCalculator";
import TrainingROICalculator from "./pages/calculators/business/hr/TrainingROICalculator";
import PTOAccrualCalculator from "./pages/calculators/business/hr/PtoAccrualCalculator";

// Valuation & Funding Calculators
import SAFENoteCalculator from "./pages/calculators/business/valuation/SAFENoteCalculator";
import ARRCalculator from "./pages/calculators/business/valuation/ARRCalculator";
import ValuationMultiplesCalculator from "./pages/calculators/business/valuation/ValuationMultiplesCalculator";
import ConvertibleNoteCalculator from "./pages/calculators/business/valuation/ConvertibleNoteCalculator";
import TermSheetSimulator from "./pages/calculators/business/valuation/TermSheetSimulator";

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
            <Route path="calculators" element={<Calculators />} />
            
            {/* Investment Calculators */}
            <Route path="calculators/sip" element={<SIPCalculator />} />
            <Route path="calculators/step-up-sip" element={<StepUpSIPCalculator />} />
            <Route path="calculators/lumpsum" element={<LumpsumCalculator />} />
            <Route path="calculators/swp" element={<SWPCalculator />} />
            <Route path="calculators/mutual-funds" element={<MutualFundsCalculator />} />
            <Route path="calculators/fd" element={<FDCalculator />} />
            <Route path="calculators/rd" element={<RDCalculator />} />
            <Route path="calculators/simple-interest" element={<SimpleInterestCalculator />} />
            <Route path="calculators/compound-interest" element={<CompoundInterestCalculator />} />
            <Route path="calculators/stock-average" element={<StockAverageCalculator />} />
            <Route path="calculators/xirr" element={<XIRRCalculator />} />
            
            {/* Business Calculators */}
            <Route path="calculators/startup-cost" element={<StartupCostCalculator />} />
            <Route path="calculators/break-even" element={<BreakEvenCalculator />} />
            <Route path="calculators/runway" element={<RunwayCalculator />} />
            <Route path="calculators/business-loan-emi" element={<BusinessLoanEMICalculator />} />
            <Route path="calculators/burn-rate" element={<BurnRateCalculator />} />
            <Route path="calculators/roi" element={<ROICalculator />} />
            
            {/* Sales Calculators */}
            <Route path="calculators/sales-forecast" element={<SalesForecastCalculator />} />
            <Route path="calculators/win-rate" element={<WinRateCalculator />} />
            <Route path="calculators/gross-margin" element={<GrossMarginCalculator />} />
            <Route path="calculators/upsell-revenue" element={<UpsellRevenueCalculator />} />
            <Route path="calculators/average-deal-size" element={<AverageDealSizeCalculator />} />
            <Route path="calculators/customer-lifetime-value" element={<CustomerLifetimeValueCalculator />} />
            
            {/* Marketing Calculators */}
            <Route path="calculators/roas" element={<ROASCalculator />} />
            <Route path="calculators/cac" element={<CACCalculator />} />
            <Route path="calculators/seo-roi" element={<SEOROICalculator />} />
            <Route path="calculators/facebook-ads-break-even-roas" element={<FacebookAdsBreakEvenROAS />} />
            <Route path="calculators/email-marketing-roi" element={<EmailMarketingROICalculator />} />
            <Route path="calculators/landing-page" element={<LandingPageCalculator />} />
            
            {/* Operations Calculators */}
            <Route path="calculators/cogs" element={<COGSCalculator />} />
            <Route path="calculators/inventory-turnover" element={<InventoryTurnoverCalculator />} />
            <Route path="calculators/economic-order-quantity" element={<EOQCalculator />} />
            <Route path="calculators/employee-productivity" element={<EmployeeProductivityCalculator />} />
            <Route path="calculators/fulfillment-cost" element={<FulfillmentCostCalculator />} />
            <Route path="calculators/capacity-utilization" element={<CapacityUtilizationCalculator />} />
            
            {/* HR & People Ops Calculators */}
            <Route path="calculators/salary-benchmarking" element={<SalaryBenchmarkingCalculator />} />
            <Route path="calculators/diversity-pay-gap" element={<DiversityPayGapCalculator />} />
            <Route path="calculators/employee-turnover" element={<EmployeeTurnoverCostCalculator />} />
            <Route path="calculators/equity-dilution" element={<EquityDilutionCalculator />} />
            <Route path="calculators/training-roi" element={<TrainingROICalculator />} />
            <Route path="calculators/pto-accrual" element={<PTOAccrualCalculator />} />
            
            {/* Valuation & Funding Calculators */}
            <Route path="calculators/safe-note" element={<SAFENoteCalculator />} />
            <Route path="calculators/arr" element={<ARRCalculator />} />
            <Route path="calculators/valuation-multiples" element={<ValuationMultiplesCalculator />} />
            <Route path="calculators/convertible-note" element={<ConvertibleNoteCalculator />} />
            <Route path="calculators/term-sheet" element={<TermSheetSimulator />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
