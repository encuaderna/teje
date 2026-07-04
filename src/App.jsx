import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import Layout from '@/components/Layout';
import Inicio from '@/pages/Inicio';
import Telares from '@/pages/Telares';
import Proyectos from '@/pages/Proyectos';
import Errores from '@/pages/Errores';
import Materiales from '@/pages/Materiales';
import Perfil from '@/pages/Perfil';
import Notas from '@/pages/Notas';
import Quiz from '@/pages/Quiz';
import Comparador from '@/pages/Comparador';
import MisTelares from '@/pages/MisTelares';
import Login from '@/pages/Login';
import ProtectedRoute from '@/components/ProtectedRoute';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/telares" element={<Telares />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/errores" element={<Errores />} />
          <Route path="/materiales" element={<Materiales />} />
          <Route path="/notas" element={<Notas />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/comparador" element={<Comparador />} />
          <Route path="/mis-telares" element={<MisTelares />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App