
import React, { useState, useEffect, useCallback } from 'react';
import { NewsArticle } from '../types';
import { generateNewsArticles } from '../services/geminiService';
import { NewspaperIcon, RefreshCwIcon } from '../components/icons';
import { NewsSkeleton } from '../components/SkeletonLoader';
import { updateSeoTags } from '../constants';

const TopStoryCard = ({ article }: { article: NewsArticle }) => (
    <a href={article.url} target="_blank" rel="noopener noreferrer" className="group block w-full text-left bg-slate-900/60 p-6 md:p-8 rounded-2xl ring-1 ring-white/10 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:ring-indigo-500/70 transform hover:-translate-y-1">
        <span className="text-sm font-bold tracking-wider uppercase text-indigo-400">Top News</span>
        <h3 className="font-extrabold text-2xl md:text-3xl text-slate-100 mt-2 mb-4 group-hover:text-indigo-400 transition-colors">{article.title}</h3>
        <p className="text-slate-300 text-base mb-6 leading-relaxed line-clamp-3">{article.summary}</p>
        <div className="flex flex-wrap gap-4 justify-between items-center border-t border-slate-800 pt-4">
             <div className="text-xs text-slate-500">
                <span className="font-medium">{article.source}</span> &bull; <span>{article.publishDate}</span>
            </div>
            <div className="inline-flex items-center text-sm font-semibold text-indigo-400">
                Read Full Article
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1.5 transition-transform group-hover:translate-x-1"><path d="m9 18 6-6-6-6"/></svg>
            </div>
        </div>
    </a>
);


const NewsCard = ({ article }: { article: NewsArticle }) => (
    <a href={article.url} target="_blank" rel="noopener noreferrer" className="group block w-full text-left bg-slate-900/40 p-6 rounded-xl ring-1 ring-white/10 hover:ring-indigo-500/70 transition-all duration-300 h-full flex flex-col shadow-lg backdrop-blur-sm transform hover:-translate-y-1">
        <h3 className="font-bold text-lg text-slate-200 mb-2 flex-grow group-hover:text-indigo-400 transition-colors">{article.title}</h3>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed line-clamp-4">{article.summary}</p>
        <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-800 pt-3 mt-auto">
            <span className="truncate pr-2">{article.source}</span>
            <span className="flex-shrink-0">{article.publishDate}</span>
        </div>
    </a>
);

const NewsPage = () => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchNews = useCallback(async (isRefresh = false) => {
        if (isRefresh) {
            setIsRefreshing(true);
        } else {
            setLoading(true);
        }
        setError(null);

        try {
            const generatedArticles = await generateNewsArticles({ forceRefresh: isRefresh });
            setArticles(generatedArticles);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred. Please try again later.";
            setError(errorMessage);
            console.error(err);
        } finally {
            if (isRefresh) {
                setIsRefreshing(false);
            } else {
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        const title = 'Latest AI & Tech News | Toolkitverse';
        const description = 'Stay ahead with AI-curated news on the latest in technology and software. Get summaries and links to top stories from leading tech publications.';
        updateSeoTags(title, description);
        fetchNews();
    }, [fetchNews]);
    
    const handleRefresh = () => {
        fetchNews(true);
    };

    const topStory = articles.length > 0 ? articles[0] : null;
    const latestNews = articles.length > 1 ? articles.slice(1) : [];

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
                <div className="inline-block bg-indigo-500/10 p-4 rounded-full mb-4 border border-indigo-500/20">
                     <NewspaperIcon className="w-8 h-8 text-indigo-400"/>
                </div>
                <h1 className="text-4xl font-extrabold text-slate-100 sm:text-5xl tracking-tight">
                    Top Tech & AI News
                </h1>
                <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                    Your AI-powered briefing on the latest developments in technology, linking you to the source.
                </p>
            </div>
            
            <div className="mb-8 flex justify-end">
                 <button 
                    onClick={handleRefresh} 
                    disabled={isRefreshing || loading}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-md hover:bg-indigo-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Refresh news articles"
                >
                    {isRefreshing ? (
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <RefreshCwIcon className="h-5 w-5" />
                    )}
                    Refresh
                </button>
            </div>
            
            {loading && <NewsSkeleton />}
            {error && <div className="text-center p-8 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400">{error}</div>}
            
            {!loading && !error && articles.length > 0 && (
                <div>
                    {topStory && <TopStoryCard article={topStory} />}

                    {articles.length > 1 && (
                        <>
                            <h3 className="text-2xl font-bold text-slate-100 mt-16 mb-6 border-l-4 border-indigo-500 pl-4">
                                Latest News
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {latestNews.map((article, index) => (
                                    <NewsCard key={index} article={article} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
            
            {!loading && !error && articles.length === 0 && (
                 <div className="text-center p-8 bg-slate-900/60 ring-1 ring-white/10 rounded-lg text-slate-500">
                    No news to display at the moment. Please check back later.
                </div>
            )}
        </div>
    );
};

export default NewsPage;