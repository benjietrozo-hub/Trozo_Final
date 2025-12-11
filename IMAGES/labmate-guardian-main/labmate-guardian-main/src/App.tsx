import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AuthGuard } from "@/components/AuthGuard";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import IncidentReports from "./pages/IncidentReports";
import LostFound from "./pages/LostFound";
import Inventory from "./pages/Inventory";
import BorrowItems from "./pages/BorrowItems";
import VisitorLogs from "./pages/VisitorLogs";
import RepairMaintenance from "./pages/RepairMaintenance";
import NotFound from "./pages/NotFound";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => (
  <AuthGuard>
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-6">
          <div className="mb-4">
            <SidebarTrigger />
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  </AuthGuard>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Index />} />
          <Route path="/incidents" element={<ProtectedLayout><IncidentReports /></ProtectedLayout>} />
          <Route path="/lost-found" element={<ProtectedLayout><LostFound /></ProtectedLayout>} />
          <Route path="/inventory" element={<ProtectedLayout><Inventory /></ProtectedLayout>} />
          <Route path="/borrow" element={<ProtectedLayout><BorrowItems /></ProtectedLayout>} />
          <Route path="/visitors" element={<ProtectedLayout><VisitorLogs /></ProtectedLayout>} />
          <Route path="/repairs" element={<ProtectedLayout><RepairMaintenance /></ProtectedLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
