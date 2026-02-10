import React from 'react';

export const SkeletonCard = () => {
    return (
        <div className="flex flex-col p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-card)] shadow-sm animate-pulse h-full">
            {/* Header Icon + Code */}
            <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                <div className="w-16 h-6 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>

            {/* Title + Desc */}
            <div className="flex-1 mb-6 space-y-3">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div className="flex gap-2">
                    <div className="w-10 h-3 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div className="w-10 h-3 bg-slate-200 dark:bg-slate-700 rounded"></div>
                </div>
                <div className="w-24 h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
        </div>
    );
};

export const SkeletonGrid = ({ count = 6 }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {Array(count).fill(0).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
};
