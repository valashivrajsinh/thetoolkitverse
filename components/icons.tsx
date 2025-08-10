
import React from 'react';

export const ToolkitverseIcon = ({size=32}: {size?:number}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="tk-gradient-logo" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                <stop stopColor="#a855f7" />
                <stop offset="1" stopColor="#6366f1" />
            </linearGradient>
        </defs>
        <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2Z" stroke="url(#tk-gradient-logo)" strokeWidth="1.5" />
        <path d="M7 8H17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 8V16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);


export const FigmaIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Z" fill="#1ABCFE"/>
    <path d="M12 7a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Z" fill="#0ACF83"/>
    <path d="M12 17a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Z" fill="#FF7262"/>
    <path d="M7 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Z" fill="#F24E1E"/>
    <path d="M7 7a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z" fill="#A259FF"/>
  </svg>
);

export const NotionIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M15.42 20.556H8.58V5.332L15.42 6.556v14zM8.58 3.444H17v17.112h-1.58V3.444z" fill="currentColor"/>
  </svg>
);

export const SlackIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" fill="#36C5F0"/>
    <path d="M9 10a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" fill="#2EB67D"/>
    <path d="M14 15.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z" fill="#ECB22E"/>
    <path d="M14 15a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" fill="#E01E5A"/>
    <path d="M10 8.5a1.5 1.5 0 1 1-3 0v5a1.5 1.5 0 1 1 3 0v-5Z" fill="#36C5F0"/>
    <path d="M15.5 14a1.5 1.5 0 1 1 0 3h-5a1.5 1.5 0 1 1 0-3h5Z" fill="#ECB22E"/>
    <path d="M8.5 14a1.5 1.5 0 1 1 0-3v-5a1.5 1.5 0 1 1 0 3v5Z" fill="#2EB67D"/>
    <path d="M14 8.5a1.5 1.5 0 1 1 3 0h-5a1.5 1.5 0 1 1-3 0h5Z" fill="#E01E5A"/>
  </svg>
);

export const GoogleAIIcon = ({size=48}: {size?:number}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 2L13.844 8.156L20 10L13.844 11.844L12 18L10.156 11.844L4 10L10.156 8.156L12 2Z" fill="#8888FF"/>
    </svg>
);

export const VscodeIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M13.53 2.22l-10 2.5A1 1 0 003 5.69v12.62a1 1 0 00.53.88l10 4.5a1 1 0 00.94 0l10-4.5a1 1 0 00.53-.88V5.69a1 1 0 00-1.47-.88l-10-2.5a1 1 0 00-.94 0zM12 5.48l7.5 1.88-5.71 4.44-7.5-3.6zM4.5 7.42l5.74 2.76v7.46L4.5 15.3V7.42zm15 7.88l-5.74 2.34V10.18l5.74-2.76v7.88z" fill="#007ACC"/>
    </svg>
);

export const DockerIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M22.14 9.22c-.22-2.1-1.22-3.98-2.67-5.33-1.45-1.35-3.33-2.17-5.43-2.39-.4-.04-.8-.06-1.2-.06H4.2c-1.1 0-2 .9-2 2v10.32c0 1.1.9 2 2 2h15.6c1.1 0 2-.9 2-2V9.9c0-.23-.02-.46-.06-.68zm-9.36 2.36h-2.79v-2.79h2.79v2.79zm3.11 0h-2.79v-2.79h2.79v2.79zm3.1 0h-2.78v-2.79h2.78v2.79zM9.78 8.47H6.99V5.68h2.79v2.79zm3.11 0h-2.79V5.68h2.79v2.79zm3.11 0h-2.79V5.68h2.79v2.79z" fill="#2496ED"/>
    </svg>
);

export const GithubIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.82c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"/>
    </svg>
);

export const PostmanIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FF6C37"/>
    </svg>
);

export const SupabaseIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12.513 1.25a1.5 1.5 0 00-1.026 0l-9.13 5.03a1.5 1.5 0 00-.757 1.3V16.42a1.5 1.5 0 00.757 1.3l9.13 5.03a1.5 1.5 0 001.026 0l9.13-5.03a1.5 1.5 0 00.757-1.3V7.58a1.5 1.5 0 00-.757-1.3l-9.13-5.03zM12 11.23L4.82 7.02l7.18-3.95 7.18 3.95L12 11.23zM12.75 12.3v8.13l7.5-4.13V8.17l-7.5 4.13zm-1.5 0l-7.5-4.13v8.13l7.5 4.13V12.3z" fill="#3ECF8E"/>
    </svg>
);

export const VercelIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 2L2 12h20L12 2z"/>
    </svg>
);

export const CloudflareIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M16.94 13.12h-4.82l-2.02 4.39-1.5-.68 3.1-6.73h5.72l.48 1.04-.48 1.04c-.2.43-.57.73-.98.94zM7.06 10.88h4.82l2.02-4.39 1.5.68-3.1 6.73H6.58l-.48-1.04.48-1.04c.2-.43.57-.73.98-.94z" fill="#F38020"/>
    </svg>
);

export const HuggingFaceIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12.5 4.5a.5.5 0 00-1 0v3.31a3.5 3.5 0 01-2.47 3.23.5.5 0 00-.27.8v2.32a.5.5 0 00.27.8A3.5 3.5 0 0111.5 18.2v-3.32a3.5 3.5 0 00-1.28-2.69.5.5 0 010-.73A3.5 3.5 0 0011.5 8.8v3.32a.5.5 0 001 0V8.8a3.5 3.5 0 001.28-2.68.5.5 0 010-.73A3.5 3.5 0 0012.5 2.7v-1.82a.5.5 0 00-1 0V2.7a3.5 3.5 0 00-2.47 3.23.5.5 0 00.27.8v2.32a.5.5 0 00.27.8A3.5 3.5 0 018.5 12.07v-.01z" fill="#FFD21E"/>
    </svg>
);

export const MiroIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M8 3v18h3V3H8z" fill="#FFD02F"/>
        <path d="M15.5 3a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" fill="#050038"/>
        <path d="M15.5 16a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" fill="#050038"/>
        <path d="M3 10.5h10.5v3H3v-3z" fill="#4262FF"/>
    </svg>
);

export const AsanaIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="12" cy="7" r="3" fill="#FB923C"/>
        <circle cx="7" cy="15" r="3" fill="#FB923C"/>
        <circle cx="17" cy="15" r="3" fill="#FB923C"/>
    </svg>
);

export const ClickUpIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M7.8 2.2L2 7.2v9.6l5.8 5 14.2-8.4V9.4L7.8 2.2z" fill="#7B68EE"/>
        <path d="M16.2 21.8l5.8-5V7.2l-5.8-5L2 10.6v2.8l14.2 8.4z" fill="#28B6F6"/>
    </svg>
);

export const WebflowIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16.99V11.5h-3v-3h3V5.01L15.5 8.5v3h3v3h-3v7.49h-3.5z" fill="#4353FF"/>
    </svg>
);

export const SparklesIcon = ({className = "w-6 h-6"}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 3L9.27 9.27L3 12l6.27 2.73L12 21l2.73-6.27L21 12l-6.27-2.73L12 3z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
);

export const MenuIcon = ({className = "w-6 h-6"}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);

export const XIcon = ({className = "w-6 h-6"}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

export const CrownIcon = ({className = "w-6 h-6"}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>
    </svg>
);

export const QuestionMarkIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-500">
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
);

export const AnalyzeIcon = () => (
     <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-400">
        <path d="M12 3L9.27 9.27L3 12l6.27 2.73L12 21l2.73-6.27L21 12l-6.27-2.73L12 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 5h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 19h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const NewspaperIcon = ({className = "w-6 h-6"}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4M4 9h16M4 15h16M10 3v18"/></svg>
);

export const RefreshCwIcon = ({className = "w-6 h-6"}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
);

export const CheckCircleIcon = ({className = "w-6 h-6"}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
);

export const XCircleIcon = ({className = "w-6 h-6"}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
);

export const ChevronDownIcon = ({className = "w-6 h-6"}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"/></svg>
);

export const CompareIcon = ({className = "w-6 h-6"}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M12 21v-8"/><path d="M12 3v2.34"/><path d="m14.5 9.5-2.5 2.5-2.5-2.5"/><path d="M21 16v5h-5"/><path d="M3 16v5h5"/><path d="M12 21v-2.34"/><path d="m9.5 14.5 2.5-2.5 2.5 2.5"/></svg>
);

export const InfoIcon = ({className = "w-6 h-6"}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
);

export const BookOpenIcon = ({className = "w-6 h-6"}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);

export const UserIcon = ({className = "w-6 h-6"}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

export const StarIcon = ({className = "w-6 h-6"}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);