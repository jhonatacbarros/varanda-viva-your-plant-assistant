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
import PremiumUpgrade from "./pages/PremiumUpgrade";
import PremiumDiagnosis from "./pages/PremiumDiagnosis";
import PremiumAICare from "./pages/PremiumAICare";
import PremiumPots from "./pages/PremiumPots";
import PremiumShare from "./pages/PremiumShare";
import PremiumPests from "./pages/PremiumPests";
import PremiumWeather from "./pages/PremiumWeather";

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
          <Route path="/premium" element={<AppLayout><PremiumUpgrade /></AppLayout>} />
          <Route path="/premium/diagnosis" element={<AppLayout><PremiumDiagnosis /></AppLayout>} />
          <Route path="/premium/ai-care" element={<AppLayout><PremiumAICare /></AppLayout>} />
          <Route path="/premium/pots" element={<AppLayout><PremiumPots /></AppLayout>} />
          <Route path="/premium/share" element={<AppLayout><PremiumShare /></AppLayout>} />
          <Route path="/premium/pests" element={<AppLayout><PremiumPests /></AppLayout>} />
          <Route path="/premium/weather" element={<AppLayout><PremiumWeather /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
