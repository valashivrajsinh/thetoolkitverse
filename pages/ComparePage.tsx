
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { generateToolComparison, generateToolDetails } from '../services/geminiService';
import { ToolComparison } from '../types';
import { CompareIcon, CrownIcon } from '../components/icons';
import { ToolComparisonSkeleton } from '../components/SkeletonLoader';
import ToolComparisonContent from '../components/ToolComparisonContent';
import { updateSeoTags } from '../constants';

const PremiumUpsell = () => (
    <div className="max-w-xl mx-auto text-center animate-fade-in">
        <div className="relative p-8 rounded-xl border border-slate-800/80 shadow-2xl overflow-hidden bg-slate-900/40 backdrop-blur-sm">
             <div className="relative z-10">
                <div className="flex justify-center items-center gap-2 mb-4 text-yellow-400">
                    <CrownIcon className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">Unlock Tool Comparison</h2>
                <p className="text-slate-400 my-4 max-w-lg mx-auto">
                    This powerful side-by-side analysis is a premium feature. Upgrade your plan to compare any two tools instantly.
                </p>
                <Link 
                    to="/premium" 
                    className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-indigo-600/20"
                >
                    Upgrade to Premium
                </Link>
             </div>
        </div>
    </div>
);


const ComparePage = () => {
    const [plan] = useState<'free' | 'premium'>(() => {
        try {
            return window.localStorage.getItem('userPlan') === 'premium' ? 'premium' : 'free';
        } catch {
            return 'free';
        }
    });

    const [tool1, setTool1] = useState('');
    const [tool2, setTool2] = useState('');
    const [comparison, setComparison] = useState<ToolComparison | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        let title = 'Tool Comparison | Toolkitverse';
        let description = 'Compare any two software or AI tools side-by-side. Get an AI-generated analysis of features, use cases, and pricing to choose the best option.';

        if(plan === 'premium' && tool1 && tool2 && !loading && comparison) {
            const t1 = tool1.charAt(0).toUpperCase() + tool1.slice(1);
            const t2 = tool2.charAt(0).toUpperCase() + tool2.slice(1);
            title = `${t1} vs ${t2} | AI Comparison | Toolkitverse`;
            description = `In-depth AI comparison: ${t1} vs ${t2}. See a side-by-side analysis of features, use cases, pricing, and a final recommendation.`;
        }
        updateSeoTags(title, description);
    }, [plan, tool1, tool2, loading, comparison]);

    const validateTool = useCallback(async (toolName: string): Promise<boolean> => {
        // Use AI to check if it's a real, public tool by attempting to fetch its details.
        // The `generateToolDetails` function is designed to throw an error if the tool is not found.
        try {
            await generateToolDetails(toolName);
            return true;
        } catch (e) {
            console.error(`Validation failed for ${toolName}:`, e);
            return false;
        }
    }, []);
    
    const handleCompare = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!tool1.trim() || !tool2.trim()) {
            setError('Please enter both tool names to compare.');
            return;
        }
        
        setLoading(true);
        setError(null);
        setComparison(null);

        // --- New Validation Logic ---
        const [isTool1Valid, isTool2Valid] = await Promise.all([
            validateTool(tool1),
            validateTool(tool2)
        ]);
        
        if (!isTool1Valid) {
            setError(`Could not find information for "${tool1}". Please check the spelling or try a different tool.`);
            setLoading(false);
            return;
        }
        
        if (!isTool2Valid) {
            setError(`Could not find information for "${tool2}". Please check the spelling or try a different tool.`);
            setLoading(false);
            return;
        }
        // --- End Validation Logic ---

        try {
            const result = await generateToolComparison(tool1, tool2);
            setComparison(result);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
            setError(`Sorry, we couldn't generate the comparison. ${errorMessage}`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    
    if (plan === 'free') {
        return <PremiumUpsell />;
    }
    
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
                <div className="inline-block bg-indigo-500/10 p-4 rounded-full mb-4 border border-indigo-500/20">
                     <CompareIcon className="w-8 h-8 text-indigo-400"/>
                </div>
                <h1 className="text-4xl font-extrabold text-slate-100 sm:text-5xl tracking-tight">
                    Tool vs. Tool Comparison
                </h1>
                <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                    Analyze two tools side-by-side with the power of AI.
                </p>
            </div>
            
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-6 shadow-2xl backdrop-blur-sm mb-12">
                <form onSubmit={handleCompare} className="flex flex-col sm:flex-row items-center gap-4">
                    <input
                        type="text"
                        value={tool1}
                        onChange={(e) => setTool1(e.target.value)}
                        placeholder="e.g., Figma"
                        className="w-full sm:w-1/3 flex-grow bg-slate-800/60 border border-slate-700 rounded-lg py-2.5 px-4 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        disabled={loading}
                        aria-label="First tool name"
                    />
                    <span className="text-slate-500 font-bold">vs</span>
                     <input
                        type="text"
                        value={tool2}
                        onChange={(e) => setTool2(e.target.value)}
                        placeholder="e.g., Sketch"
                        className="w-full sm:w-1/3 flex-grow bg-slate-800/60 border border-slate-700 rounded-lg py-2.5 px-4 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        disabled={loading}
                        aria-label="Second tool name"
                    />
                    <button type="submit" disabled={loading || !tool1.trim() || !tool2.trim()} className="w-full sm:w-auto bg-indigo-600 text-white font-semibold py-2.5 px-5 rounded-lg hover:bg-indigo-500 transition-colors duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]">
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        ) : 'Compare'}
                    </button>
                </form>
            </div>
            
            {loading && <ToolComparisonSkeleton />}
            {error && <div className="text-center p-8 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400">{error}</div>}
            {comparison && <ToolComparisonContent comparison={comparison} tool1Name={tool1} tool2Name={tool2} />}

        </div>
    );
};

export default ComparePage;