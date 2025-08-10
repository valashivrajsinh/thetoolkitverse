
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Tool, ToolDetails } from '../types';
import { generateToolDetails } from '../services/geminiService';
import { ToolDetailSkeleton } from '../components/SkeletonLoader';
import ToolDetailContent from '../components/ToolDetailContent';
import { QuestionMarkIcon, AnalyzeIcon, FigmaIcon, NotionIcon, SlackIcon, GoogleAIIcon } from '../components/icons';
import { updateSeoTags } from '../constants';

const getToolLogo = (toolName: string): React.ReactNode => {
    const lowerToolName = toolName.toLowerCase();
    if (lowerToolName.includes('figma')) return <FigmaIcon />;
    if (lowerToolName.includes('notion')) return <NotionIcon />;
    if (lowerToolName.includes('slack')) return <SlackIcon />;
    if (lowerToolName.includes('google ai') || lowerToolName.includes('gemini') || lowerToolName.includes('bard')) return <GoogleAIIcon />;
    return <QuestionMarkIcon />;
};


const ToolDetailPage = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const location = useLocation();

  const [tool, setTool] = useState<Tool | null>(null);
  const [details, setDetails] = useState<ToolDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let currentTool: Tool | undefined;
    if (location.state?.tool) {
      currentTool = location.state.tool as Tool;
      setTool(currentTool);
    } else if (toolId) {
        // Handle case where user directly navigates to a custom tool URL
        const decodedToolName = decodeURIComponent(toolId.replace(/-/g, ' '));
        const capitalizedToolName = decodedToolName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        currentTool = { id: toolId, name: capitalizedToolName, tagline: `Analysis for ${capitalizedToolName}`, logo: getToolLogo(capitalizedToolName) }
        setTool(currentTool);
    } else {
      setError("Tool not found.");
      setLoading(false);
    }
  }, [toolId, location.state]);

  useEffect(() => {
    if (tool) {
      const title = `${tool.name} | AI Analysis & Details | Toolkitverse`;
      const description = `Explore a detailed AI-generated analysis of ${tool.name}. Discover key features, pros, cons, pricing, and top competitors to make an informed decision.`;
      updateSeoTags(title, description);

      const fetchDetails = async () => {
        setLoading(true);
        setError(null);
        try {
          const generatedDetails = await generateToolDetails(tool.name);
          setDetails(generatedDetails);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
            setError(`Failed to generate tool details. ${errorMessage}`);
            console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchDetails();
    }
  }, [tool]);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Back to Directory
            </Link>
        </div>

        {tool && (
            <div className="flex items-center space-x-6 mb-12">
                <div className="flex-shrink-0 text-slate-300 p-3 bg-slate-800/50 rounded-lg">{tool.logo}</div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-100">{tool.name}</h1>
                    <p className="text-slate-400 mt-1">{tool.tagline}</p>
                </div>
            </div>
        )}

      {loading && <ToolDetailSkeleton />}
      {error && <div className="text-center p-8 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400">{error}</div>}
      {details && !loading && <ToolDetailContent details={details} />}
    </div>
  );
};

export default ToolDetailPage;