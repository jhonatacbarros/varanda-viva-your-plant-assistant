import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Assistant from "./pages/Assistant";
import MyGarden from "./pages/MyGarden";
import Feed from "./pages/Feed";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import PlantDetail from "./pages/PlantDetail";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";
import CreatePost from "./pages/CreatePost";
import AddPlant from "./pages/AddPlant";
import Login from "./pages/Login";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/assistant" replace />} />
          <Route path="/assistant" element={<AppLayout><Assistant /></AppLayout>} />
          <Route path="/garden" element={<AppLayout><MyGarden /></AppLayout>} />
          <Route path="/garden/:plantId" element={<AppLayout><PlantDetail /></AppLayout>} />
          <Route path="/garden/add" element={<AppLayout><AddPlant /></AppLayout>} />
          <Route path="/feed" element={<AppLayout><Feed /></AppLayout>} />
          <Route path="/feed/create" element={<AppLayout><CreatePost /></AppLayout>} />
          <Route path="/calendar" element={<AppLayout><Calendar /></AppLayout>} />
          <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
