// Simple test to verify API utility functions work correctly

import { getApiBaseUrl } from './api';

// Test the API base URL determination
console.log('Testing API base URL determination...');

// Mock the import.meta.env object for testing
global.import = {
  meta: {
    env: {
      PROD: false,
      VITE_API_URL: 'http://localhost:5000/api',
      VITE_API_URL_PROD: 'https://nodejs-serverless-function-express-iota-ten.vercel.app'
    }
  }
};

// Test in development mode
const devUrl = getApiBaseUrl();
console.log('Development URL:', devUrl);

// Test in production mode
global.import.meta.env.PROD = true;
const prodUrl = getApiBaseUrl();
console.log('Production URL:', prodUrl);

// Expected outputs:
// Development URL: http://localhost:5000/api
// Production URL: https://nodejs-serverless-function-express-iota-ten.vercel.app

export { getApiBaseUrl };