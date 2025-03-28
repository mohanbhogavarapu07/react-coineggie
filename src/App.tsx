import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import KnowledgeBasePage from "./pages/KnowledgeBase";
import ArticlePage from "./pages/ArticlePage";
import Calculators from "./pages/Calculators";
import About from "./pages/About";
import AIAgents from "./pages/AIAgents";
import SignIn from "./pages/SignIn";
import Contact from "./pages/Contact";

// Category Pages
import PersonalFinance from "./pages/categories/PersonalFinance";
import Investments from "./pages/categories/Investments";
import Retirement from "./pages/categories/Retirement";
import Business from "./pages/categories/Business";
import Taxes from "./pages/categories/Taxes";

// Calculator Pages
import SIPCalculator from "./pages/calculators/SIPCalculator";
import HomeLoanEMICalculator from "./pages/calculators/HomeLoanEMICalculator";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Category Routes */}
            <Route path="/categories/personal-finance" element={<PersonalFinance />} />
            <Route path="/categories/investments" element={<Investments />} />
            <Route path="/categories/retirement" element={<Retirement />} />
            <Route path="/categories/business" element={<Business />} />
            <Route path="/categories/taxes" element={<Taxes />} />
            
            {/* Knowledge Base Routes */}
            <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
            <Route path="/knowledge-base/article/:slug" element={<ArticlePage />} />
            
            {/* Calculator Routes */}
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/calculators/sip" element={<SIPCalculator />} />
            <Route path="/calculators/home-loan-emi" element={<HomeLoanEMICalculator />} />
            
            {/* New Routes */}
            <Route path="/ai-agents" element={<AIAgents />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Other Main Routes */}
            <Route path="/about" element={<About />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
