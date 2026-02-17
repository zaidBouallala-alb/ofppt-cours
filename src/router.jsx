import { createBrowserRouter, useRouteError } from "react-router-dom";
import ErrorMessage from "./components/ui/ErrorMessage";

// Wrapper for ErrorMessage to use with React Router
const ErrorDisplay = () => {
    const error = useRouteError();
    return <ErrorMessage message={error.message || "An unexpected error occurred."} onRetry={() => window.location.reload()} />;
};

import RootLayout from "./layouts/RootLayout";
import { lazy } from "react";
import {
    yearsLoader,
    formationsLoader,
    modulesLoader,
    coursesLoader,
    effsLoader
} from "./api/loaders";

// Lazy Load Pages
const WelcomePage = lazy(() => import('./pages/WelcomePage'));
const EducationLevelPage = lazy(() => import('./pages/EducationLevelPage'));
const FormationsPage = lazy(() => import('./pages/FormationsPage'));
const ModulesPage = lazy(() => import('./pages/ModulesPage'));
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const EffPage = lazy(() => import('./pages/EffPage'));
const AboutProjectPage = lazy(() => import('./pages/AboutProjectPage'));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <WelcomePage />,
            },
            {
                path: "levels",
                element: <EducationLevelPage />,
                loader: yearsLoader,
                errorElement: <ErrorDisplay />,
            },
            {
                path: "formations/:yearId",
                element: <FormationsPage />,
                loader: formationsLoader,
                errorElement: <ErrorDisplay />,
            },
            {
                path: "modules/:formationId",
                element: <ModulesPage />,
                loader: modulesLoader,
                errorElement: <ErrorDisplay />,
            },
            {
                path: "courses/:moduleId",
                element: <CoursesPage />,
                loader: coursesLoader,
                errorElement: <ErrorDisplay />,
            },
            {
                path: "eff/:formationId",
                element: <EffPage />,
                loader: effsLoader,
                errorElement: <ErrorDisplay />,
            },
            {
                path: "about-project",
                element: <AboutProjectPage />,
            },
        ],
    },
]);
