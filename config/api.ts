// API endpoints configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://your-vercel-deployment-url.vercel.app/api'
    : 'http://localhost:3000/api';

export const endpoints = {
    tools: `${API_BASE_URL}/tools`,
    toolDetails: `${API_BASE_URL}/tool-details`,
    compare: `${API_BASE_URL}/compare`,
    news: `${API_BASE_URL}/news`,
};
