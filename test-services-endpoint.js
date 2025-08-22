// Test script to verify the backend services endpoint
// Run this with: node test-services-endpoint.js

const testServicesEndpoint = async () => {
  try {
    console.log('🧪 Testing backend services endpoint...');
    
    const response = await fetch('http://localhost:8080/api/services');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const services = await response.json();
    
    console.log('✅ Services endpoint working!');
    console.log('📋 Available services:');
    services.forEach(service => {
      console.log(`  - ID: ${service.id}, Name: ${service.name}, Active: ${service.isActive}`);
    });
    
    return services;
  } catch (error) {
    console.error('❌ Error testing services endpoint:', error.message);
    
    if (error.message.includes('fetch')) {
      console.log('💡 Make sure the backend is running on http://localhost:8080');
    }
    
    return null;
  }
};

// Run the test
testServicesEndpoint();
