
import React from 'react';
import { ToolComparison } from '../types';
import { SparklesIcon } from './icons';

const ComparisonSectionWrapper = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-slate-900/60 rounded-lg p-6 ring-1 ring-white/10 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-indigo-400 mb-4">{title}</h3>
        {children}
    </div>
);

const ComparisonGrid = ({ tool1Name, tool2Name, data }: { tool1Name: string, tool2Name: string, data: { tool1: string[], tool2: string[] } }) => (
    <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
        <div>
            <h4 className="font-bold text-slate-200 mb-3">{tool1Name}</h4>
            <ul className="space-y-2 text-slate-300">
                {data.tool1.map((item, i) => (
                    <li key={i} className="flex items-start"><span className="text-indigo-400 mr-3 mt-1">&#8227;</span><span>{item}</span></li>
                ))}
            </ul>
        </div>
        <div className="border-t border-slate-700 md:border-t-0 md:border-l md:border-slate-800 md:pl-6">
            <h4 className="font-bold text-slate-200 mb-3 mt-4 md:mt-0">{tool2Name}</h4>
            <ul className="space-y-2 text-slate-300">
                {data.tool2.map((item, i) => (
                    <li key={i} className="flex items-start"><span className="text-indigo-400 mr-3 mt-1">&#8227;</span><span>{item}</span></li>
                ))}
            </ul>
        </div>
    </div>
);

const ToolComparisonContent: React.FC<{ comparison: ToolComparison, tool1Name: string, tool2Name: string }> = ({ comparison, tool1Name, tool2Name }) => {
    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-center text-slate-100 tracking-tight">
                {tool1Name} <span className="text-indigo-400">vs</span> {tool2Name}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
                 <div className="bg-slate-900/60 rounded-lg p-6 ring-1 ring-white/10 backdrop-blur-sm">
                    <h4 className="font-bold text-slate-200 mb-2">Best for {tool1Name}</h4>
                    <p className="text-slate-300">{comparison.summary.tool1_wins}</p>
                 </div>
                  <div className="bg-slate-900/60 rounded-lg p-6 ring-1 ring-white/10 backdrop-blur-sm">
                    <h4 className="font-bold text-slate-200 mb-2">Best for {tool2Name}</h4>
                    <p className="text-slate-300">{comparison.summary.tool2_wins}</p>
                 </div>
            </div>

            <ComparisonSectionWrapper title="Feature Comparison">
                <ComparisonGrid tool1Name={tool1Name} tool2Name={tool2Name} data={comparison.featureComparison} />
            </ComparisonSectionWrapper>

            <ComparisonSectionWrapper title="Use Case Comparison">
                 <ComparisonGrid tool1Name={tool1Name} tool2Name={tool2Name} data={comparison.useCaseComparison} />
            </ComparisonSectionWrapper>
            
            <ComparisonSectionWrapper title="Pricing Comparison">
                 <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                        <h4 className="font-bold text-slate-200 mb-2">{tool1Name}</h4>
                        <p className="text-slate-300">{comparison.pricingComparison.tool1_pricing}</p>
                    </div>
                     <div className="border-t border-slate-700 md:border-t-0 md:border-l md:border-slate-800 md:pl-6">
                        <h4 className="font-bold text-slate-200 mb-2 mt-4 md:mt-0">{tool2Name}</h4>
                        <p className="text-slate-300">{comparison.pricingComparison.tool2_pricing}</p>
                    </div>
                 </div>
            </ComparisonSectionWrapper>

            <ComparisonSectionWrapper title="Final Recommendation">
                <div className="flex items-start text-slate-300">
                    <SparklesIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-yellow-300" />
                    <p className="leading-relaxed">{comparison.recommendation}</p>
                </div>
            </ComparisonSectionWrapper>
        </div>
    );
};

export default ToolComparisonContent;