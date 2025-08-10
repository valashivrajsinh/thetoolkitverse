
import React, { useEffect } from 'react';
import { InfoIcon, BookOpenIcon, UserIcon, StarIcon, SparklesIcon, CrownIcon, NewspaperIcon, CompareIcon } from '../components/icons';
import { updateSeoTags } from '../constants';

const SectionWrapper = ({ children, title, icon }: { children: React.ReactNode, title: string, icon: React.ReactNode }) => (
    <div className="mb-16">
        <div className="flex items-center gap-4 mb-8 border-l-4 border-indigo-500 pl-4">
            {icon}
            <h2 className="text-3xl font-bold text-slate-100 tracking-tight">{title}</h2>
        </div>
        <div className="space-y-6">
            {children}
        </div>
    </div>
);

const InfoCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-slate-900/40 p-6 rounded-xl ring-1 ring-white/10 backdrop-blur-sm">
        <h3 className="font-semibold text-indigo-400 mb-3 text-lg">{title}</h3>
        <div className="text-slate-300 leading-relaxed space-y-2">{children}</div>
    </div>
);

const RoadmapItem = ({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) => (
     <div className="flex items-start gap-4 bg-slate-900/40 p-6 rounded-xl ring-1 ring-white/10 backdrop-blur-sm">
        <div className="flex-shrink-0 text-indigo-400 bg-indigo-500/10 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <h3 className="font-bold text-slate-200 text-lg">{title}</h3>
            <p className="text-slate-400 mt-1">{description}</p>
        </div>
     </div>
);


const InfoRoadmapPage = () => {
    useEffect(() => {
        const title = 'Features & Roadmap | Toolkitverse';
        const description = 'Learn about all the features of Toolkitverse, from our AI-powered directory to tool comparisons, and see what we have planned for the future.';
        updateSeoTags(title, description);
    }, []);

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-16">
                <div className="inline-block bg-indigo-500/10 p-4 rounded-full mb-4 border border-indigo-500/20">
                     <InfoIcon className="w-8 h-8 text-indigo-400"/>
                </div>
                <h1 className="text-4xl font-extrabold text-slate-100 sm:text-5xl tracking-tight">
                    Features & Roadmap
                </h1>
                <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                    Learn how to get the most out of Toolkitverse and see what's coming next.
                </p>
            </div>

            {/* How to Use Section */}
            <SectionWrapper title="How to Use Toolkitverse" icon={<SparklesIcon className="w-8 h-8 text-indigo-400" />}>
                <InfoCard title="Discover with AI Search">
                   <p>Start on the homepage and use the main search bar to find tools. You can search for a tool by name, describe a feature ("a tool for team collaboration"), or state a problem ("free alternative to Photoshop"). The AI will search the web to find the best matches for you.</p>
                </InfoCard>
                <InfoCard title="In-Depth AI Analysis">
                    <p>Click on any tool from the search results to get a comprehensive, AI-generated analysis. This includes a detailed description, key features, common use cases, pros, cons, and a list of competitors, giving you a 360-degree view in seconds.</p>
                </InfoCard>
                <InfoCard title="Tool vs. Tool Comparison (Premium)">
                    <p className="inline-flex items-center gap-2 font-semibold text-yellow-300 mb-2"><CrownIcon className="w-5 h-5" /> Premium Feature</p>
                    <p>Ready to make a decision? Navigate to the 'Compare' page. Enter the names of any two tools to generate a detailed, side-by-side analysis to help you choose the best option for your needs.</p>
                </InfoCard>
                <InfoCard title="Stay Updated with AI News">
                   <p>Visit the 'News' page for your daily briefing on the latest in technology and AI. Our system finds the most important recent articles and gives you a summary, with a direct link to read the full story on the source's website.</p>
                </InfoCard>
            </SectionWrapper>

            {/* Roadmap Section */}
            <SectionWrapper title="Coming Soon" icon={<NewspaperIcon className="w-8 h-8 text-indigo-400" />}>
                 <RoadmapItem
                    title="In-Depth Blog"
                    description="A dedicated blog featuring long-form articles, tutorials, and expert interviews on software development, AI trends, and productivity hacks."
                    icon={<BookOpenIcon className="w-6 h-6" />}
                />
                <RoadmapItem
                    title="User Accounts & Favorites"
                    description="Create a personal account to save your favorite tools, comparison reports, and news articles for easy access later."
                    icon={<UserIcon className="w-6 h-6" />}
                />
                <RoadmapItem
                    title="Community Ratings & Reviews"
                    description="Contribute your own ratings and reviews for tools. See what the community thinks to get real-world insights beyond the AI analysis."
                    icon={<StarIcon className="w-6 h-6" />}
                />
            </SectionWrapper>
        </div>
    );
}

export default InfoRoadmapPage;