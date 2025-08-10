
import React from 'react';
import { ToolDetails } from '../types';

const DetailSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-slate-900/60 rounded-lg p-6 ring-1 ring-white/10 backdrop-blur-sm">
    <h3 className="text-lg font-semibold text-indigo-400 mb-4">{title}</h3>
    {children}
  </div>
);

const List = ({ items, color }: { items: string[], color: 'green' | 'red' }) => {
    const iconColorClass = color === 'green' ? 'text-green-400' : 'text-red-400';
    const Icon = color === 'green' ? 
        (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconColorClass}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>) :
        (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconColorClass}><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>);

    return (
        <ul className="space-y-3">
            {items.map((item, index) => (
            <li key={index} className="flex items-start">
                <span className="mr-3 mt-0.5 flex-shrink-0">{Icon}</span>
                <span className="text-slate-300">{item}</span>
            </li>
            ))}
        </ul>
    );
}

const ToolDetailContent: React.FC<{ details: ToolDetails }> = ({ details }) => {
  return (
    <div className="space-y-6">
      <DetailSection title="Description">
        <p className="text-slate-300 leading-relaxed">{details.description}</p>
      </DetailSection>

      <div className="grid md:grid-cols-2 gap-6">
        <DetailSection title="Key Features">
          <ul className="space-y-3 text-slate-300">
            {details.keyFeatures.map((feature, i) => <li key={i} className="flex items-start"><span className="text-indigo-400 mr-3 mt-1">&#8227;</span><span>{feature}</span></li>)}
          </ul>
        </DetailSection>
        <DetailSection title="Use Cases">
          <ul className="space-y-3 text-slate-300">
            {details.useCases.map((useCase, i) => <li key={i} className="flex items-start"><span className="text-indigo-400 mr-3 mt-1">&#8227;</span><span>{useCase}</span></li>)}
          </ul>
        </DetailSection>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
          <DetailSection title="Pros">
              <List items={details.pros} color="green" />
          </DetailSection>
          <DetailSection title="Cons">
              <List items={details.cons} color="red" />
          </DetailSection>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <DetailSection title="Pricing Model">
            <p className="text-slate-300">{details.pricingModel}</p>
        </DetailSection>
        <DetailSection title="Competitors">
          <ul className="flex flex-wrap gap-2">
            {details.competitors.map((competitor, i) => (
              <li key={i} className="bg-indigo-500/20 text-indigo-300 text-sm font-medium px-3 py-1 rounded-full">{competitor}</li>
            ))}
          </ul>
        </DetailSection>
      </div>
    </div>
  );
};

export default ToolDetailContent;