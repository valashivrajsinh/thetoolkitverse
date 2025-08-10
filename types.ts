import React from 'react';

export interface Tool {
  id: string;
  name: string;
  tagline: string;
  logo: React.ReactNode;
}

export interface ToolDetails {
  description: string;
  keyFeatures: string[];
  useCases: string[];
  pricingModel: string;
  pros: string[];
  cons:string[];
  competitors: string[];
}

export interface SuggestedTool {
    name: string;
    description: string;
}

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface SuggestionResult {
    suggestions: SuggestedTool[];
    sources: GroundingSource[];
}

export interface NewsArticle {
    title: string;
    summary: string;
    source: string;
    publishDate: string;
    url: string;
}

export interface ComparisonSection {
    tool1: string[];
    tool2: string[];
}

export interface ToolComparison {
    summary: {
        tool1_wins: string;
        tool2_wins: string;
    };
    featureComparison: ComparisonSection;
    useCaseComparison: ComparisonSection;
    pricingComparison: {
        tool1_pricing: string;
        tool2_pricing: string;
    };
    recommendation: string;
}