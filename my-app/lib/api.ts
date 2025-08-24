// lib/api.ts
import axios from "axios";

// Dynamic base URL detection for mobile compatibility
const getBaseURL = () => {
  // For production, use environment variable
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }
  
  // For development, detect the current host
  if (typeof window !== "undefined") {
    const { hostname, protocol } = window.location;
    
    // Common development scenarios
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `${protocol}//${hostname}:3001/api`;
    }
    
    // Mobile browsers accessing local network
    if (hostname.startsWith('192.168.') || hostname.startsWith('10.0.')) {
      return `${protocol}//${hostname}:3001/api`;
    }
    
    // Fallback for other cases
    return `${protocol}//${hostname}:3001/api`;
  }
  
  // Server-side rendering fallback
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 30000, // 30 seconds timeout for mobile networks
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor - attach token automatically
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["x-auth-token"] = token;
      }
    }
    
    // Add mobile-specific headers
    if (typeof navigator !== "undefined") {
      const isMobile = /Mobile|Android|iPhone|iPad|Windows Phone/i.test(navigator.userAgent);
      if (isMobile) {
        config.headers["X-Mobile-Request"] = "true";
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle mobile-specific errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Enhanced error handling for mobile
    if (!navigator.onLine) {
      error.message = "No internet connection. Please check your network and try again.";
      error.code = "NETWORK_OFFLINE";
    } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      error.message = "Request timed out. Please check your internet connection.";
      error.code = "TIMEOUT_ERROR";
    } else if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
      error.message = "Network error. Please check your internet connection and try again.";
      error.code = "NETWORK_ERROR";
    } else if (error.response?.status === 0) {
      error.message = "Cannot connect to server. Please check if the server is running.";
      error.code = "CONNECTION_ERROR";
    }
    
    return Promise.reject(error);
  }
);

export default api;
