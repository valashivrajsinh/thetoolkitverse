
// This file holds the configuration for your backend API.
// Once you deploy your AWS Lambda and API Gateway, you will get a public URL for your API.
// Paste that URL here.

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !! CRITICAL SECURITY NOTICE !!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// DO NOT PASTE YOUR AWS SECRET KEY OR ACCESS KEY ID HERE.
//
// This endpoint must be a public URL (e.g., from AWS API Gateway).
// The authentication to your database must be handled securely on the backend
// (e.g., using an IAM Role on your AWS Lambda function), NOT in your frontend code.
//
// Pasting secret keys here will expose them to every visitor of your website.

// Example of a valid API Gateway URL:
// export const API_ENDPOINT = 'https://abcdef123.execute-api.us-east-1.amazonaws.com/prod';

// The application will use the local data fallback in `data/tools.ts`
// as long as this value is empty.
export const API_ENDPOINT = '';