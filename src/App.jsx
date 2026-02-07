import React from 'react'
import './App.css'
import "./index.css";

import EducateWelcomePage from './components-app/educateWelcomePage';
import EducationLevelPage from './components-app/educationLevelPage';
import FormationsPage from './pages/FormationsPage';
import ModulesPage from './pages/ModulesPage';
import CoursesPage from './pages/CoursesPage';
import EffPage from './pages/EffPage';

import ErrorBoundary from './components-app/ErrorBoundary';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<EducateWelcomePage />} />
        <Route path="/levels" element={<EducationLevelPage />} />
        <Route path="/formations/:yearId" element={<FormationsPage />} />
        <Route path="/modules/:formationId" element={<ModulesPage />} />
        <Route path="/courses/:moduleId" element={<CoursesPage />} />
        <Route path="/eff/:formationId" element={<EffPage />} />

      </Routes>
    </ErrorBoundary>
  );
}
export default App
