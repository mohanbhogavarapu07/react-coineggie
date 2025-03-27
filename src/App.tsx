
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Category Pages
import PersonalFinance from "./pages/categories/PersonalFinance";
import Investments from "./pages/categories/Investments";
import Retirement from "./pages/categories/Retirement";
import Business from "./pages/categories/Business";
import Taxes from "./pages/categories/Taxes";

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
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
