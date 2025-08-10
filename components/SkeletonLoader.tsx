
import React from 'react';

const SkeletonBar = ({ className }: { className: string }) => (
    <div className={`bg-slate-800/80 rounded animate-pulse ${className}`}></div>
);

export const ToolDetailSkeleton = () => {
    return (
        <div className="space-y-6">
            <div className="bg-slate-900/60 rounded-lg p-6 ring-1 ring-white/10 space-y-3">
                <SkeletonBar className="h-6 w-1/4 mb-4" />
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-5/6 mt-2" />
                <SkeletonBar className="h-4 w-3/4 mt-2" />
            </div>
             <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-900/60 rounded-lg p-6 ring-1 ring-white/10 space-y-3">
                    <SkeletonBar className="h-5 w-1/3 mb-3" />
                    <SkeletonBar className="h-4 w-full" />
                    <SkeletonBar className="h-4 w-full" />
                    <SkeletonBar className="h-4 w-5/6" />
                </div>
                <div className="bg-slate-900/60 rounded-lg p-6 ring-1 ring-white/10 space-y-3">
                    <SkeletonBar className="h-5 w-1/3 mb-3" />
                    <SkeletonBar className="h-4 w-full" />
                    <SkeletonBar className="h-4 w-5/6" />
                    <SkeletonBar className="h-4 w-full" />
                </div>
            </div>
             <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-900/60 rounded-lg p-6 ring-1 ring-white/10 space-y-3">
                    <SkeletonBar className="h-5 w-1/3 mb-3" />
                    <SkeletonBar className="h-4 w-full" />
                    <SkeletonBar className="h-4 w-5/6" />
                </div>
                <div className="bg-slate-900/60 rounded-lg p-6 ring-1 ring-white/10 space-y-3">
                    <SkeletonBar className="h-5 w-1/3 mb-3" />
                    <SkeletonBar className="h-4 w-5/6" />
                </div>
            </div>
        </div>
    );
};

const TopStorySkeleton = () => (
    <div className="bg-slate-900/60 p-6 md:p-8 rounded-xl ring-1 ring-white/10 shadow-lg">
        <SkeletonBar className="h-4 w-1/4 mb-4" />
        <SkeletonBar className="h-8 w-3/4 mb-4" />
        <div className="space-y-2">
            <SkeletonBar className="h-4 w-full" />
            <SkeletonBar className="h-4 w-full" />
            <SkeletonBar className="h-4 w-5/6" />
        </div>
        <div className="flex justify-between items-center border-t border-slate-800 mt-6 pt-4">
            <SkeletonBar className="h-4 w-1/4" />
            <SkeletonBar className="h-4 w-1/3" />
        </div>
    </div>
);


const NewsCardSkeleton = () => (
    <div className="bg-slate-900/60 p-6 rounded-xl ring-1 ring-white/10 space-y-4">
        <SkeletonBar className="h-5 w-3/4" />
        <div className="space-y-2">
            <SkeletonBar className="h-4 w-full" />
            <SkeletonBar className="h-4 w-full" />
            <SkeletonBar className="h-4 w-5/6" />
        </div>
        <div className="flex justify-between items-center pt-2">
            <SkeletonBar className="h-4 w-1/4" />
            <SkeletonBar className="h-4 w-1/3" />
        </div>
    </div>
);

export const NewsSkeleton = () => (
    <div>
        <TopStorySkeleton />
        <div className="mt-12 mb-6">
             <SkeletonBar className="h-7 w-48" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
            <NewsCardSkeleton />
            <NewsCardSkeleton />
            <NewsCardSkeleton />
            <NewsCardSkeleton />
        </div>
    </div>
);

export const ToolComparisonSkeleton = () => (
    <div className="space-y-6 animate-pulse">
        <SkeletonBar className="h-8 w-3/4 mx-auto" />
        <div className="bg-slate-900/60 rounded-lg p-6 ring-1 ring-white/10 space-y-4">
            <SkeletonBar className="h-6 w-1/4 mb-2" />
            <SkeletonBar className="h-4 w-5/6" />
            <SkeletonBar className="h-4 w-full" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/60 rounded-lg p-6 ring-1 ring-white/10 space-y-3">
                <SkeletonBar className="h-5 w-1/2 mb-3" />
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-5/6" />
                <SkeletonBar className="h-4 w-full" />
            </div>
            <div className="bg-slate-900/60 rounded-lg p-6 ring-1 ring-white/10 space-y-3">
                <SkeletonBar className="h-5 w-1/2 mb-3" />
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-5/6" />
                <SkeletonBar className="h-4 w-full" />
            </div>
        </div>
        <div className="bg-slate-900/60 rounded-lg p-6 ring-1 ring-white/10 space-y-3">
            <SkeletonBar className="h-6 w-1/4 mb-2" />
            <SkeletonBar className="h-4 w-full" />
            <SkeletonBar className="h-4 w-3/4" />
        </div>
    </div>
);

const SkeletonToolCard = () => (
    <div className="bg-slate-900/40 rounded-xl p-6 flex flex-col items-center text-center ring-1 ring-white/10">
        <div className="mb-4">
            <SkeletonBar className="h-12 w-12 rounded-full" />
        </div>
        <SkeletonBar className="h-5 w-3/4 mb-2" />
        <SkeletonBar className="h-4 w-full" />
        <SkeletonBar className="h-4 w-5/6 mt-1" />
    </div>
);

export const ToolGridSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => <SkeletonToolCard key={i} />)}
    </div>
);