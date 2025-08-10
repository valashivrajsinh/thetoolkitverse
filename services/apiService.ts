import { endpoints } from '../config/api';
import { Tool, ToolDetails, NewsArticle, ToolComparison } from '../types';

class ApiError extends Error {
    constructor(message: string, public status: number) {
        super(message);
        this.name = 'ApiError';
    }
}

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new ApiError(error.error || 'Request failed', response.status);
    }
    return response.json();
}

export const findTools = async (query: string): Promise<Tool[]> => {
    const response = await fetch(`${endpoints.tools}?query=${encodeURIComponent(query)}`);
    return handleResponse<Tool[]>(response);
};

export const getToolDetails = async (toolName: string): Promise<ToolDetails> => {
    const response = await fetch(`${endpoints.toolDetails}?tool=${encodeURIComponent(toolName)}`);
    return handleResponse<ToolDetails>(response);
};

export const compareTools = async (tool1: string, tool2: string): Promise<ToolComparison> => {
    const response = await fetch(`${endpoints.compare}?tool1=${encodeURIComponent(tool1)}&tool2=${encodeURIComponent(tool2)}`);
    return handleResponse<ToolComparison>(response);
};

export const getNews = async (): Promise<NewsArticle[]> => {
    const response = await fetch(endpoints.news);
    return handleResponse<NewsArticle[]>(response);
};
