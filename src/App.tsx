import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import AQIOverview from "./pages/AQIOverview";
import HealthRecommendations from "./pages/HealthRecommendations";
import PollutantBreakdown from "./pages/PollutantBreakdown";
import ReportEvent from "./pages/ReportEvent";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/aqi" element={<AQIOverview />} />
          <Route path="/health" element={<HealthRecommendations />} />
          <Route path="/pollutants" element={<PollutantBreakdown />} />
          <Route path="/report" element={<ReportEvent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
