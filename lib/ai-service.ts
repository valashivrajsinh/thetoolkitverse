import { GoogleGenAI } from '@google/genai';
import { getDynamoDb, Tables } from './dynamodb';
import { Tool, ToolDetails, NewsArticle, ToolComparison } from '../types';
import crypto from 'crypto';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const generateToolId = (name: string): string => {
    return name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
};

export const createComparisonId = (tool1: string, tool2: string): string => {
    const sortedTools = [tool1, tool2].sort();
    return `${sortedTools[0]}-vs-${sortedTools[1]}`;
};

export const generateHash = (content: string): string => {
    return crypto.createHash('md5').update(content).digest('hex');
};

export class AIService {
    private db = getDynamoDb();

    async findTools(query: string): Promise<Tool[]> {
        try {
            // First, check if we have cached results
            const queryHash = generateHash(query);
            const cachedResult = await this.db.get({
                TableName: Tables.TOOLS,
                Key: { id: queryHash }
            }).promise();

            if (cachedResult.Item) {
                return cachedResult.Item.tools;
            }

            // If not in cache, use AI to find tools
            const prompt = `Find relevant software and AI tools for: "${query}"
            Return only real, publicly known tools. Format as JSON array with properties:
            - id (url-friendly slug)
            - name (official name)
            - tagline (short description)`;

            const result = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    tools: [{ googleSearch: {} }]
                }
            });

            const tools: Tool[] = JSON.parse(result.text);

            // Cache the results
            await this.db.put({
                TableName: Tables.TOOLS,
                Item: {
                    id: queryHash,
                    query,
                    tools,
                    timestamp: new Date().toISOString(),
                    ttl: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hour TTL
                }
            }).promise();

            return tools;
        } catch (error) {
            console.error('Error finding tools:', error);
            throw new Error('Failed to find tools');
        }
    }

    async getToolDetails(toolName: string): Promise<ToolDetails> {
        try {
            const toolId = generateToolId(toolName);
            
            // Check cache first
            const cachedResult = await this.db.get({
                TableName: Tables.TOOL_DETAILS,
                Key: { toolId }
            }).promise();

            if (cachedResult.Item) {
                return cachedResult.Item.details;
            }

            // If not in cache, generate with AI
            const prompt = `Analyze the tool: "${toolName}"
            Provide detailed information about this real, publicly known tool.
            Include:
            - Description
            - Key features
            - Use cases
            - Pricing model
            - Pros and cons
            - Main competitors`;

            const result = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    tools: [{ googleSearch: {} }]
                }
            });

            const details: ToolDetails = JSON.parse(result.text);

            // Cache the results
            await this.db.put({
                TableName: Tables.TOOL_DETAILS,
                Item: {
                    toolId,
                    details,
                    timestamp: new Date().toISOString(),
                    ttl: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 day TTL
                }
            }).promise();

            return details;
        } catch (error) {
            console.error('Error getting tool details:', error);
            throw new Error('Failed to get tool details');
        }
    }

    async compareTools(tool1: string, tool2: string): Promise<ToolComparison> {
        try {
            const comparisonId = createComparisonId(tool1, tool2);
            
            // Check cache first
            const cachedResult = await this.db.get({
                TableName: Tables.TOOL_COMPARISONS,
                Key: { comparisonId }
            }).promise();

            if (cachedResult.Item) {
                return cachedResult.Item.comparison;
            }

            // If not in cache, generate comparison with AI
            const prompt = `Compare two tools: "${tool1}" vs "${tool2}"
            Provide a detailed comparison including:
            - Summary of each tool's strengths
            - Feature comparison
            - Use case comparison
            - Pricing comparison
            - Final recommendation`;

            const result = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    tools: [{ googleSearch: {} }]
                }
            });

            const comparison: ToolComparison = JSON.parse(result.text);

            // Cache the results
            await this.db.put({
                TableName: Tables.TOOL_COMPARISONS,
                Item: {
                    comparisonId,
                    comparison,
                    timestamp: new Date().toISOString(),
                    ttl: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 day TTL
                }
            }).promise();

            return comparison;
        } catch (error) {
            console.error('Error comparing tools:', error);
            throw new Error('Failed to compare tools');
        }
    }

    async getNews(): Promise<NewsArticle[]> {
        try {
            const today = new Date().toISOString().split('T')[0];
            
            // Check cache first
            const cachedResult = await this.db.query({
                TableName: Tables.NEWS,
                KeyConditionExpression: '#date = :today',
                ExpressionAttributeNames: {
                    '#date': 'date'
                },
                ExpressionAttributeValues: {
                    ':today': today
                }
            }).promise();

            if (cachedResult.Items && cachedResult.Items.length > 0) {
                return cachedResult.Items[0].articles;
            }

            // If not in cache, generate with AI
            const prompt = `Find the top 5 most significant AI and tech news stories from the last 24 hours.
            For each story include:
            - Title
            - Summary
            - Source
            - Publication date
            - URL`;

            const result = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    tools: [{ googleSearch: {} }]
                }
            });

            const articles: NewsArticle[] = JSON.parse(result.text);

            // Cache the results
            await this.db.put({
                TableName: Tables.NEWS,
                Item: {
                    date: today,
                    id: generateHash(today),
                    articles,
                    timestamp: new Date().toISOString(),
                    ttl: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hour TTL
                }
            }).promise();

            return articles;
        } catch (error) {
            console.error('Error getting news:', error);
            throw new Error('Failed to get news');
        }
    }
}
