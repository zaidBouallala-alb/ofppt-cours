import React, { Suspense, lazy } from 'react'
import "./index.css";

// Lazy Load Pages for Performance
const WelcomePage = lazy(() => import('./pages/WelcomePage'));
const EducationLevelPage = lazy(() => import('./pages/EducationLevelPage'));
const FormationsPage = lazy(() => import('./pages/FormationsPage'));
const ModulesPage = lazy(() => import('./pages/ModulesPage'));
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const EffPage = lazy(() => import('./pages/EffPage'));

import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';
import GoogleAnalytics from "./components/GoogleAnalytics";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <GoogleAnalytics />
      <div className="flex flex-col min-h-screen">
        <ErrorBoundary>
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><LoadingSpinner /></div>}>
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/levels" element={<EducationLevelPage />} />
              <Route path="/formations/:yearId" element={<FormationsPage />} />
              <Route path="/modules/:formationId" element={<ModulesPage />} />
              <Route path="/courses/:moduleId" element={<CoursesPage />} />
              <Route path="/eff/:formationId" element={<EffPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Footer />
      </div>
    </>
  );
}
export default App
