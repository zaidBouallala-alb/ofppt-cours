import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import ErrorBoundary from '../components/ui/ErrorBoundary';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Footer from '../components/layout/Footer';
import GoogleAnalytics from '../components/common/GoogleAnalytics';
import InstallPrompt from '../components/common/InstallPrompt';

export default function RootLayout() {
    return (
        <>
            <GoogleAnalytics />
            <InstallPrompt />
            <div className="flex flex-col min-h-screen">
                <main className="flex-grow flex flex-col">
                    <ErrorBoundary>
                        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><LoadingSpinner /></div>}>
                            <Outlet />
                        </Suspense>
                    </ErrorBoundary>
                </main>
                <Footer />
            </div>
        </>
    );
}
