
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Tool, GroundingSource } from '../types';
import ToolCard from '../components/ToolCard';
import { AnalyzeIcon, QuestionMarkIcon, SparklesIcon, FigmaIcon, NotionIcon, SlackIcon, GoogleAIIcon, VscodeIcon, DockerIcon, GithubIcon, PostmanIcon, SupabaseIcon, VercelIcon, CloudflareIcon, HuggingFaceIcon, MiroIcon, AsanaIcon, ClickUpIcon, WebflowIcon } from '../components/icons';
import { findDirectoryTools } from '../services/geminiService';
import { ToolGridSkeleton } from '../components/SkeletonLoader';
import { updateSeoTags } from '../constants';

const getToolLogo = (toolName: string): React.ReactNode => {
  const lowerToolName = toolName.toLowerCase();
  if (lowerToolName.includes('figma')) return <FigmaIcon />;
  if (lowerToolName.includes('notion')) return <NotionIcon />;
  if (lowerToolName.includes('slack')) return <SlackIcon />;
  if (lowerToolName.includes('google ai') || lowerToolName.includes('gemini') || lowerToolName.includes('bard')) return <GoogleAIIcon />;
  if (lowerToolName.includes('visual studio code')) return <VscodeIcon />;
  if (lowerToolName.includes('docker')) return <DockerIcon />;
  if (lowerToolName.includes('github')) return <GithubIcon />;
  if (lowerToolName.includes('postman')) return <PostmanIcon />;
  if (lowerToolName.includes('supabase')) return <SupabaseIcon />;
  if (lowerToolName.includes('vercel')) return <VercelIcon />;
  if (lowerToolName.includes('cloudflare')) return <CloudflareIcon />;
  if (lowerToolName.includes('hugging face')) return <HuggingFaceIcon />;
  if (lowerToolName.includes('miro')) return <MiroIcon />;
  if (lowerToolName.includes('asana')) return <AsanaIcon />;
  if (lowerToolName.includes('clickup')) return <ClickUpIcon />;
  if (lowerToolName.includes('webflow')) return <WebflowIcon />;
  return <QuestionMarkIcon />;
};

// Simple debounce hook
const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};

const DirectoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [foundTools, setFoundTools] = useState<Tool[]>([]);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const title = 'Toolkitverse | AI Tool Directory & Software Finder';
    const description = 'Discover, analyze, and compare thousands of AI and software tools. Use our AI-powered search to find the exact tool for your needs from across the web.';
    updateSeoTags(title, description);
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const performSearch = async () => {
        setLoading(true);
        setError(null);
        setFoundTools([]);
        setSources([]);
        try {
          const { tools: foundToolsData, sources: foundSources } = await findDirectoryTools(debouncedSearchTerm);
          const toolsWithLogos = foundToolsData.map(tool => ({
            ...tool,
            logo: getToolLogo(tool.name)
          }));
          setFoundTools(toolsWithLogos);
          setSources(foundSources);
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
          setError(`AI search failed: ${errorMessage}`);
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      performSearch();
    } else {
      setLoading(false);
      setError(null);
      setFoundTools([]);
      setSources([]);
    }
  }, [debouncedSearchTerm]);
  
  const showAnalyzeButton = !loading && debouncedSearchTerm && foundTools.length === 0;

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-100 sm:text-6xl tracking-tighter">
          Explore the <span className="gradient-text">Toolkitverse</span>
        </h1>
        <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
          Your universe to discover, analyze, and compare the best tools, powered by AI search.
        </p>
      </div>
      
      <div className="mb-8 max-w-xl mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
             <svg className="h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
          </div>
          <input
            type="text"
            placeholder="Search for a tool, feature, or use case..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800/60 border border-slate-700 rounded-lg py-3 pl-12 pr-12 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            disabled={loading}
            aria-label="AI-powered tool directory search"
          />
           {loading && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <svg className="animate-spin h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                </div>
            )}
        </div>
      </div>
      
      <div className="mt-12 min-h-[400px]">
        {loading && <ToolGridSkeleton />}

        {!loading && error && <div className="text-center my-6 p-4 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400">{error}</div>}

        {!loading && !error && !debouncedSearchTerm && (
            <div className="text-center py-10 text-slate-500">
                <SparklesIcon className="mx-auto w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold text-slate-300">Find Your Next Tool</h3>
                <p>Start typing above to search the web for tools with AI.</p>
            </div>
        )}

        {!loading && !error && debouncedSearchTerm && foundTools.length > 0 && (
            <div className="animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {foundTools.map(tool => (
                        <Link to={`/tool/${tool.id}`} key={tool.id} state={{ tool }} aria-label={`View details for ${tool.name}`}>
                            <ToolCard tool={tool} />
                        </Link>
                    ))}
                </div>
                {sources.length > 0 && (
                    <div className="mt-10 pt-6 border-t border-slate-800">
                        <h5 className="text-sm font-semibold text-slate-400 mb-2 text-center">Powered by Google Search. Sources:</h5>
                        <ul className="flex flex-wrap gap-x-4 gap-y-1 justify-center max-w-3xl mx-auto">
                            {sources.map((source, index) => (
                                <li key={index}>
                                    <a 
                                        href={source.uri} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline transition-colors truncate"
                                        title={source.uri}
                                    >
                                        {source.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        )}

        {showAnalyzeButton && (
             <div className="text-center py-10 animate-fade-in">
                <p className="text-slate-400 mb-4">No tools found for "{searchTerm}".</p>
                <Link
                    to={`/tool/${encodeURIComponent(searchTerm.toLowerCase().replace(/\s+/g, '-'))}`}
                    state={{ tool: { id: searchTerm, name: searchTerm, tagline: 'Analyze this custom tool', logo: <AnalyzeIcon /> } }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all duration-300"
                >
                    Analyze "{searchTerm}" with AI
                </Link>
            </div>
        )}
      </div>
    </div>
  );
};

export default DirectoryPage;