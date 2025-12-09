// Utility functions for API calls that work in both local and production environments

// Determine the base URL based on the environment
const getApiBaseUrl = () => {
  // In production/Vercel, use the serverless function URL
  if (import.meta.env.PROD) {
    // Use the production API URL from environment variables
    return import.meta.env.VITE_API_URL_PROD || 'https://nodejs-serverless-function-express-iota-ten.vercel.app';
  }
  
  // In development, use the VITE_API_URL from .env or default to localhost
  return import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
};

// Create a standardized way to make API calls
export const apiCall = async (endpoint, options = {}) => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  // Set default headers
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  
  // Merge headers
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(url, config);
    return response;
  } catch (error) {
    console.error(`API call failed: ${url}`, error);
    throw error;
  }
};

// Helper functions for common operations
export const get = (endpoint, options = {}) => {
  return apiCall(endpoint, { method: 'GET', ...options });
};

export const post = (endpoint, data, options = {}) => {
  return apiCall(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  });
};

export const put = (endpoint, data, options = {}) => {
  return apiCall(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
    ...options,
  });
};

export const del = (endpoint, options = {}) => {
  return apiCall(endpoint, { method: 'DELETE', ...options });
};

export default {
  get,
  post,
  put,
  del,
  apiCall,
  getApiBaseUrl,
};