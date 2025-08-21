const config = {
  // API Configuration
  api: {
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
    timeout: 30000, // 30 seconds
  },
  
  // App Configuration
  app: {
    name: 'AI CRM System',
    version: '1.0.0',
  },
  
  // Feature Flags
  features: {
    aiEnabled: true,
    realTimeUpdates: false,
  }
};

export default config;
