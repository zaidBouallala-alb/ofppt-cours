import React from 'react';

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree.
 * Now uses Tailwind classes for proper dark/light mode support.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.state = { hasError: true, error, errorInfo };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen
                               bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900
                               dark:from-slate-900 dark:via-indigo-950 dark:to-slate-950
                               p-8 text-center">
          {/* Icon */}
          <div className="text-7xl sm:text-8xl mb-6" aria-hidden="true">💥</div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Oops!
          </h1>

          {/* Message */}
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-md leading-relaxed">
            Something went wrong. Don't worry, we'll get you back on track.
          </p>

          {/* Button */}
          <button
            onClick={this.handleReset}
            className="px-8 py-4 text-lg font-bold text-slate-900
                                  bg-gradient-to-r from-white to-yellow-300
                                  rounded-2xl shadow-lg
                                  hover:-translate-y-1 hover:shadow-xl
                                  active:translate-y-0 active:shadow-md
                                  transition-all duration-200
                                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-700"
          >
            Go to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
