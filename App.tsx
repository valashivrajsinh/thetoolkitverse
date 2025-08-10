
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import DirectoryPage from './pages/DirectoryPage';
import ToolDetailPage from './pages/ToolDetailPage';
import Header from './components/Header';
import NewsPage from './pages/NewsPage';
import PremiumPage from './pages/PremiumPage';
import ComparePage from './pages/ComparePage';
import InfoRoadmapPage from './pages/InfoRoadmapPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './lib/auth-context';

function App(): React.ReactElement {
  return (
    <div className="min-h-screen font-sans relative z-10">
      <HashRouter>
        <AuthProvider>
          <Header />
          <main className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
              <Routes>
                  <Route path="/" element={<DirectoryPage />} />
                  <Route path="/tool/:toolId" element={<ToolDetailPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route
                    path="/premium"
                    element={
                      <PrivateRoute>
                        <PremiumPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/compare"
                    element={
                      <PrivateRoute>
                        <ComparePage />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/news" element={<NewsPage />} />
                  <Route path="/features" element={<InfoRoadmapPage />} />
              </Routes>
          </main>
        </AuthProvider>
      </HashRouter>
    </div>
  );
}

export default App;