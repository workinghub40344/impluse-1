import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Classes from "./pages/Classes";
import Membership from "./pages/Membership";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import JoinNow from "./pages/JoinNow";
import Login from "./pages/Login";
import Admin from "./pages/AdminClasses";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMembershipPage from "./pages/AdminMembershipPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public user-facing routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="classes" element={<Classes />} />
              <Route path="membership" element={<Membership />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* Standalone auth routes */}
            <Route path="join-now" element={<JoinNow />} />
            <Route path="login" element={<Login />} />

            {/* Protected admin routes with a separate layout */}
            <Route element={<ProtectedRoute requiredRole="admin" />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="addclass" element={<Admin />} />
                <Route path="membership" element={<AdminMembershipPage />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
