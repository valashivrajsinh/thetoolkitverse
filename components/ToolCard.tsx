
import React from 'react';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <div className="group relative bg-slate-900/40 rounded-xl p-6 flex flex-col items-center text-center transform transition-all duration-300 ease-in-out shadow-lg backdrop-blur-sm ring-1 ring-white/10 hover:ring-indigo-500/70 hover:-translate-y-1 h-full">
       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
      <div className="relative z-10 flex flex-col items-center flex-grow w-full">
        <div className="mb-4 text-slate-300">{tool.logo}</div>
        <h3 className="text-lg font-bold text-slate-100">{tool.name}</h3>
        <p className="text-sm text-slate-400 mt-2 flex-grow">{tool.tagline}</p>
      </div>
    </div>
  );
};

export default ToolCard;