import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

// Auth Pages
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage';
import { EmailVerificationPage } from '@/pages/auth/EmailVerificationPage';
import { OAuthCallbackPage } from '@/pages/auth/OAuthCallbackPage';

// Main Pages
import { Dashboard } from '@/pages/Dashboard';
import { ChatInterface } from '@/pages/ChatInterface';
import { ProfilePage } from '@/pages/ProfilePage';
import { SettingsPage } from '@/pages/SettingsPage';
import { ScripturesPage } from '@/pages/ScripturesPage';
import { MeditationsPage } from '@/pages/MeditationsPage';
import { BookmarksPage } from '@/pages/BookmarksPage';
import { DiscussionsPage } from '@/pages/DiscussionsPage';

// Admin Pages
import { AdminDashboard } from '@/pages/admin/AdminDashboard';

// Error Pages
import { UnauthorizedPage } from '@/pages/error/UnauthorizedPage';
import { NotFoundPage } from '@/pages/error/NotFoundPage';
import { ErrorPage } from '@/pages/error/ErrorPage';

// Components
import { MainLayout } from '@/components/layout/MainLayout';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

// Interface for ProtectedRoute
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRouteComponent: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, user } = useAuth(); // assuming user has role

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // @ts-ignore - user role might not be fully typed yet
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <MainLayout>{children}</MainLayout>;
};

import { ThemeProvider } from '@/components/ui/ThemeProvider';

export const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vidwaan-ui-theme">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/auth/verify-email/:token" element={<EmailVerificationPage />} />
          <Route path="/oauth/callback" element={<OAuthCallbackPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRouteComponent>
                <Dashboard />
              </ProtectedRouteComponent>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRouteComponent>
                <ErrorBoundary>
                  <ChatInterface />
                </ErrorBoundary>
              </ProtectedRouteComponent>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteComponent>
                <ProfilePage />
              </ProtectedRouteComponent>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRouteComponent>
                <SettingsPage />
              </ProtectedRouteComponent>
            }
          />
          <Route
            path="/scriptures"
            element={
              <ProtectedRouteComponent>
                <ScripturesPage />
              </ProtectedRouteComponent>
            }
          />
          <Route
            path="/meditations"
            element={
              <ProtectedRouteComponent>
                <MeditationsPage />
              </ProtectedRouteComponent>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <ProtectedRouteComponent>
                <BookmarksPage />
              </ProtectedRouteComponent>
            }
          />
          <Route
            path="/discussions"
            element={
              <ProtectedRouteComponent>
                <DiscussionsPage />
              </ProtectedRouteComponent>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRouteComponent requiredRole="admin">
                <AdminDashboard />
              </ProtectedRouteComponent>
            }
          />

          {/* Error Routes */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
