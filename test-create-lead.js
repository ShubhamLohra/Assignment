// Test script to verify the create lead endpoint
// Run this with: node test-create-lead.js

const testCreateLead = async () => {
  try {
    console.log('🧪 Testing create lead endpoint...');
    
    // First, get available services
    console.log('📋 Fetching available services...');
    const servicesResponse = await fetch('http://localhost:8080/api/services');
    
    if (!servicesResponse.ok) {
      throw new Error(`Failed to fetch services: ${servicesResponse.status}`);
    }
    
    const services = await servicesResponse.json();
    console.log('✅ Services loaded:', services.length);
    
    if (services.length === 0) {
      console.log('⚠️ No services available. Cannot test lead creation.');
      return;
    }
    
    // Use the first available service
    const testService = services[0];
    console.log(`🎯 Using service: ${testService.name} (ID: ${testService.id})`);
    
    // Test lead data
    const testLead = {
      name: "Test Lead - " + new Date().toISOString(),
      email: "test@example.com",
      phone: "+1234567890",
      service: { id: testService.id }, // Proper structure with object containing ID
      city: "Test City",
      budget: 5000.00,
      status: "NEW",
      source: "WEBSITE"
    };
    
    console.log('📤 Sending test lead data:', JSON.stringify(testLead, null, 2));
    
    // Create the lead
    const createResponse = await fetch('http://localhost:8080/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testLead)
    });
    
    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      throw new Error(`Failed to create lead: ${createResponse.status} - ${errorText}`);
    }
    
    const createdLead = await createResponse.json();
    console.log('✅ Lead created successfully!');
    console.log('📋 Created lead details:', JSON.stringify(createdLead, null, 2));
    
    // Verify the lead was created by fetching it
    console.log('🔍 Verifying lead was created...');
    const verifyResponse = await fetch(`http://localhost:8080/api/leads/${createdLead.id}`);
    
    if (!verifyResponse.ok) {
      throw new Error(`Failed to verify lead: ${verifyResponse.status}`);
    }
    
    const verifiedLead = await verifyResponse.json();
    console.log('✅ Lead verification successful!');
    console.log('📋 Verified lead:', JSON.stringify(verifiedLead, null, 2));
    
    return createdLead;
    
  } catch (error) {
    console.error('❌ Error testing create lead:', error.message);
    
    if (error.message.includes('fetch')) {
      console.log('💡 Make sure the backend is running on http://localhost:8080');
    }
    
    return null;
  }
};

// Run the test
testCreateLead();
