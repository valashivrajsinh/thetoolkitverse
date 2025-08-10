import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { ToolDetails, NewsArticle, ToolComparison, Tool, SuggestionResult, GroundingSource } from '../types';

// The API key is now sourced from environment variables, as per best practices.
// Safely access the API key to prevent crashes in environments where process is not defined.
const apiKey = typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : undefined;
const ai = new GoogleGenAI({ apiKey: apiKey || "" });

const toolDetailSchema = {
  type: Type.OBJECT,
  properties: {
    description: { 
        type: Type.STRING,
        description: "A comprehensive and neutral paragraph describing what the tool is, its primary purpose, and who its target audience is. Should be around 4-5 sentences. If the tool is not found, this MUST be the exact string 'ERROR: Tool not found'." 
    },
    keyFeatures: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: "A list of 3 to 5 of the most important and defining features of the tool."
    },
    useCases: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: "A list of 3 to 5 common real-world applications or problems this tool solves."
    },
    pricingModel: { 
        type: Type.STRING,
        description: "A brief description of the pricing structure (e.g., 'Freemium with paid tiers', 'Subscription-based', 'Free and Open Source', 'One-time purchase')."
    },
    pros: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: "A list of 3 key strengths or advantages of using this tool."
    },
    cons: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: "A list of 3 key weaknesses or disadvantages of using this tool."
    },
    competitors: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: "A list of 3-4 main competitors or alternative tools."
    }
  },
  required: ["description", "keyFeatures", "useCases", "pricingModel", "pros", "cons", "competitors"]
};

const directoryToolSchema = {
    type: Type.OBJECT,
    properties: {
        tools: {
            type: Type.ARRAY,
            description: "A list of up to 8 relevant tools found on the web.",
            items: {
                type: Type.OBJECT,
                properties: {
                    id: {
                        type: Type.STRING,
                        description: "A URL-friendly slug for the tool, based on its name (e.g., 'visual-studio-code'). Must be lowercase and use dashes for spaces."
                    },
                    name: {
                        type: Type.STRING,
                        description: "The official name of the tool."
                    },
                    tagline: {
                        type: Type.STRING,
                        description: "A concise, one-sentence tagline or description for the tool."
                    }
                },
                required: ["id", "name", "tagline"]
            }
        }
    },
    required: ["tools"]
};

const newsArticleSchemaWithUrl = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: {
        type: Type.STRING,
        description: "The original, accurate title of the news article."
      },
      summary: {
        type: Type.STRING,
        description: "A concise, one-paragraph summary of the article's key points, written in a journalistic style."
      },
      source: {
        type: Type.STRING,
        description: "The name of the publication or website that published the article (e.g., 'TechCrunch', 'The Verge')."
      },
      publishDate: {
        type: Type.STRING,
        description: "The original publication date in the format 'Month Day, Year' (e.g., August 27, 2025)."
      },
      url: {
          type: Type.STRING,
          description: "The direct URL to the original news article."
      }
    },
    required: ["title", "summary", "source", "publishDate", "url"]
  }
};

const toolComparisonSchema = {
    type: Type.OBJECT,
    properties: {
        summary: {
            type: Type.OBJECT,
            properties: {
                tool1_wins: {
                    type: Type.STRING,
                    description: "A brief sentence on where Tool 1 excels or its ideal user profile."
                },
                tool2_wins: {
                    type: Type.STRING,
                    description: "A brief sentence on where Tool 2 excels or its ideal user profile."
                }
            },
            required: ["tool1_wins", "tool2_wins"]
        },
        featureComparison: {
            type: Type.OBJECT,
            properties: {
                tool1: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "A list of 3-4 key features for Tool 1."
                },
                tool2: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "A list of 3-4 key features for Tool 2."
                }
            },
            required: ["tool1", "tool2"]
        },
        useCaseComparison: {
            type: Type.OBJECT,
            properties: {
                tool1: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "A list of 2-3 primary use cases for Tool 1."
                },
                tool2: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "A list of 2-3 primary use cases for Tool 2."
                }
            },
            required: ["tool1", "tool2"]
        },
        pricingComparison: {
            type: Type.OBJECT,
            properties: {
                tool1_pricing: {
                    type: Type.STRING,
                    description: "A brief description of Tool 1's pricing model."
                },
                tool2_pricing: {
                    type: Type.STRING,
                    description: "A brief description of Tool 2's pricing model."
                }
            },
            required: ["tool1_pricing", "tool2_pricing"]
        },
        recommendation: {
            type: Type.STRING,
            description: "A concluding paragraph summarizing the comparison and providing a clear recommendation on which tool to choose for specific needs or user types."
        }
    },
    required: ["summary", "featureComparison", "useCaseComparison", "pricingComparison", "recommendation"]
};

const handleError = (error: any, context: string): Error => {
    console.error(`Error in ${context}:`, error);
    let errorMessage = `Failed to ${context}. The AI may be busy or unable to format the response correctly.`;
    
    let message: string | undefined;
    if (error?.message) {
        message = error.message;
    } else if (typeof error === 'string') {
        message = error;
    }

    if (message) {
        if (message.includes("429") || message.includes("RESOURCE_EXHAUSTED")) {
            errorMessage = "API quota exceeded. Please check your plan and billing details, or try again later.";
        } else if (message.includes("API key not valid")) {
            errorMessage = "The configured API key is not valid. Please contact the administrator.";
        }
    }
    return new Error(errorMessage);
}


export const generateToolDetails = async (toolName: string): Promise<ToolDetails> => {
  const cacheKey = `tool-details-v3:${toolName}`; // Versioned cache key
  try {
    const cachedData = sessionStorage.getItem(cacheKey);
    if (cachedData) {
      const parsed = JSON.parse(cachedData) as ToolDetails | { error: string };
      if ('description' in parsed && parsed.description === "ERROR: Tool not found") {
         throw new Error(`Tool not found: ${toolName}`);
      }
      return parsed as ToolDetails;
    }
  } catch (e) {
    // If it's the "Tool not found" error we threw, re-throw it.
    if (e instanceof Error && e.message.startsWith('Tool not found')) {
        throw e;
    }
    console.warn("Session storage is not available or cache is invalid.", e);
  }

  try {
    const prompt = `You are a software and AI tool analyst. Your task is to provide a detailed, structured, and objective overview of a publicly known tool.

CRITICAL INSTRUCTION: If you cannot find any information about a real, publicly known tool with the name "${toolName}", you MUST respond with a valid JSON object that fits the requested schema, but with the "description" field set to the exact string "ERROR: Tool not found". Do NOT invent or hallucinate information for a tool that does not exist. For all other fields, provide empty arrays or empty strings.

If the tool is real, generate the full analysis for: "${toolName}".`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: toolDetailSchema
      }
    });
    
    const details = JSON.parse(response.text) as ToolDetails;

    // Programmatically check for the custom error message from the AI.
    if (details.description === "ERROR: Tool not found") {
        try {
          // Cache the "not found" response to prevent repeated invalid calls.
          sessionStorage.setItem(cacheKey, JSON.stringify(details));
        } catch(e) { console.warn("Session storage not available for caching error.", e); }
        throw new Error(`Tool not found: ${toolName}`);
    }
    
    try {
      sessionStorage.setItem(cacheKey, JSON.stringify(details));
    } catch (e) { console.warn("Session storage is not available.", e); }
    return details;
  } catch (error) {
     if (error instanceof Error && error.message.startsWith('Tool not found')) {
        throw error;
    }
    throw handleError(error, `generate details for ${toolName}`);
  }
};

export const findDirectoryTools = async (query: string): Promise<{ tools: Omit<Tool, 'logo'>[], sources: GroundingSource[] }> => {
    const cacheKey = `directory-find-v1:${query}`;
    try {
        const cachedData = sessionStorage.getItem(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        }
    } catch (e) { console.warn("Session storage is not available.", e); }

    try {
        const prompt = `You are an expert AI tool researcher for a software directory called Toolkitverse.
A user is searching the directory with the query: "${query}"

Use Google Search to find the most relevant, real-world software or AI tools that match this query.
Return a list of up to 8 of the most relevant tools.

CRITICAL: Your final output must be ONLY a single, valid JSON object that conforms to the specified schema. Do not include any other text, explanations, or markdown formatting.`;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
                responseMimeType: "application/json",
                responseSchema: directoryToolSchema,
            }
        });

        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        const sources: GroundingSource[] = groundingChunks
            .map(chunk => chunk.web)
            .filter((web): web is { uri: string; title: string } => !!web && !!web.uri)
            .map(web => ({ uri: web.uri, title: web.title || new URL(web.uri).hostname }));
        
        const uniqueSources = Array.from(new Map(sources.map(item => [item.uri, item])).values());

        const result = JSON.parse(response.text) as { tools: Omit<Tool, 'logo'>[] };
        const finalResult = { tools: result.tools || [], sources: uniqueSources };
        
        try {
            sessionStorage.setItem(cacheKey, JSON.stringify(finalResult));
        } catch (e) { console.warn("Session storage is not available for caching directory search.", e); }
        
        return finalResult;
    } catch (error) {
        throw handleError(error, `find tools for query "${query}"`);
    }
};

export const generateNewsArticles = async (options?: { forceRefresh?: boolean }): Promise<NewsArticle[]> => {
    const cacheKey = 'direct-link-news-v9-timed';
    const CACHE_DURATION = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
    
    if (options?.forceRefresh) {
        try { sessionStorage.removeItem(cacheKey); } catch (e) { console.warn("Could not remove news cache.", e); }
    } else {
        try {
            const cachedItem = sessionStorage.getItem(cacheKey);
            if (cachedItem) {
                const { timestamp, articles } = JSON.parse(cachedItem) as { timestamp: number; articles: NewsArticle[] };
                if (Date.now() - timestamp < CACHE_DURATION) {
                    return articles; // Cache is fresh, return it.
                }
            }
        } catch (e) { console.warn("Session storage is not available or cache is invalid.", e); }
    }
    
    try {
        // Step 1: Discover content and get a guaranteed list of genuine URLs from grounding metadata.
        const discoveryPrompt = `You are a tech news reporter. Use Google Search to write a report on the top 5 most significant news stories in AI and technology from the last 7 days. For each story, please include a headline, the publication date, and a one-paragraph summary.`;
        
        const discoveryResponse: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: discoveryPrompt,
            config: {
                tools: [{googleSearch: {}}],
            }
        });
        
        const generatedText = discoveryResponse.text;
        const groundingMetadata = discoveryResponse.candidates?.[0]?.groundingMetadata;

        const genuineLinks = groundingMetadata?.groundingChunks
            ?.map(chunk => chunk.web?.uri)
            .filter((uri): uri is string => !!uri && uri.startsWith('http'));

        if (!genuineLinks || genuineLinks.length === 0) {
            throw new Error("Google Search did not return any valid source URLs.");
        }

        // Step 2: Use a second, dedicated call to associate the generated text with the guaranteed URLs.
        const associationPrompt = `You are a data structuring assistant. You will be given a block of text containing news reports and a separate list of GENUINE URLs. Your task is to match each news report from the text to its correct URL from the list and format the result as a JSON array.

CRITICAL MANDATE: You MUST use the exact URL from the provided "Genuine URL List". The 'url' field in the JSON MUST be identical to a URL from this list. Do not invent or modify URLs. Infer the source name from the URL's domain (e.g., 'theverge.com' becomes 'The Verge').

News Report Text:
---
${generatedText}
---

Genuine URL List:
---
${JSON.stringify(genuineLinks)}
---`;

        const articlesResponse: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: associationPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: newsArticleSchemaWithUrl,
            }
        });
        
        const articles = JSON.parse(articlesResponse.text) as NewsArticle[];
        
        if (!articles || articles.length === 0) {
            throw new Error("AI failed to generate and format articles from the validated search results.");
        }

        try {
            const cachePayload = {
                timestamp: Date.now(),
                articles: articles,
            };
            sessionStorage.setItem(cacheKey, JSON.stringify(cachePayload));
        } catch(e) { console.warn("Session storage not available for news"); }
        
        return articles;

    } catch (error) {
        throw handleError(error, "generate news articles");
    }
};


export const generateToolComparison = async (tool1: string, tool2: string): Promise<ToolComparison> => {
    const cacheKey = `tool-comparison:${tool1}-vs-${tool2}`;
    try {
        const cachedData = sessionStorage.getItem(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData) as ToolComparison;
        }
    } catch (e) { console.warn("Session storage is not available.", e); }

    try {
        const prompt = `You are a software analyst. Create a detailed side-by-side comparison of two tools: "${tool1}" and "${tool2}". Provide a balanced and objective view.`;
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: toolComparisonSchema
            }
        });
        const comparison = JSON.parse(response.text) as ToolComparison;
        try {
            sessionStorage.setItem(cacheKey, JSON.stringify(comparison));
        } catch(e) { console.warn("Session storage is not available.", e); }
        return comparison;
    } catch (error) {
        throw handleError(error, `compare ${tool1} and ${tool2}`);
    }
};