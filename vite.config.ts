import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const geminiKey = env.GEMINI_API_KEY;
    if (!geminiKey) {
      console.error('GEMINI_API_KEY is not set in environment variables');
    }
    return {
      plugins: [react()],
      define: {
        'process.env.GEMINI_API_KEY': JSON.stringify(geminiKey),
        'process.env.API_KEY': JSON.stringify(geminiKey), // For backward compatibility
        'process.env.AWS_ACCESS_KEY_ID': JSON.stringify(env.AWS_ACCESS_KEY_ID),
        'process.env.AWS_SECRET_ACCESS_KEY': JSON.stringify(env.AWS_SECRET_ACCESS_KEY),
        'process.env.AWS_REGION': JSON.stringify(env.AWS_REGION)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      server: {
        proxy: {
          '/api': {
            target: process.env.VERCEL_URL || 'http://localhost:5000',
            changeOrigin: true,
            secure: false
          }
        }
      }
    };
});
