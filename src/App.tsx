import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Preenchimento from "./pages/Preenchimento";
import Consultas from "./pages/Consultas";
import Metricas from "./pages/Metricas";
import Relatorios from "./pages/Relatorios";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar />
          <main className="flex-1 flex flex-col ml-64">
            <header className="border-b border-border bg-card p-4 flex items-center">
              <h1 className="text-lg font-semibold text-foreground">
                Sistema de Controle de Salmão
              </h1>
            </header>
            <div className="flex-1 p-6 overflow-auto">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/preenchimento" element={<Preenchimento />} />
                <Route path="/consultas" element={<Consultas />} />
                <Route path="/metricas" element={<Metricas />} />
                <Route path="/relatorios" element={<Relatorios />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
