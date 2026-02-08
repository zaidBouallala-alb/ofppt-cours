import React from "react";

/**
 * Minimalist Error Message Component
 */
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[300px] p-8 animate-fade-in">
      <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
        Something went wrong
      </h2>

      <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm mb-8 leading-relaxed">
        {message || "We encountered an error while loading this content."}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-primary"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try Again
        </button>
      )}
    </div>
  );
}
