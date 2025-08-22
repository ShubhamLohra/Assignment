const API_BASE_URL = 'http://localhost:8080/api';

// Test creating a lead and then updating its stage
async function testCreateAndUpdateLead() {
  console.log('🧪 Testing Create Lead + Update Stage...\n');
  
  try {
    // Step 1: Create a test lead
    console.log('📡 Step 1: Creating test lead...');
    const testLeadData = {
      name: 'Test Lead',
      email: 'test@example.com',
      phone: '1234567890',
      city: 'Test City',
      budget: 10000,
      source: 'WEBSITE',
      status: 'NEW',
      notes: 'Test lead for stage update testing'
    };
    
    console.log('📤 Sending lead data:', testLeadData);
    
    const createResponse = await fetch(`${API_BASE_URL}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testLeadData)
    });
    
    const createText = await createResponse.text();
    console.log(`📡 Create response (${createResponse.status}):`, createText);
    
    if (!createResponse.ok) {
      console.log('❌ Failed to create test lead');
      return;
    }
    
    let createdLead;
    try {
      createdLead = JSON.parse(createText);
    } catch (e) {
      console.log('❌ Create response is not valid JSON');
      return;
    }
    
    console.log('✅ Test lead created successfully:', {
      id: createdLead.id,
      name: createdLead.name,
      status: createdLead.status
    });
    
    // Step 2: Test updating the lead status
    console.log('\n📡 Step 2: Testing status update...');
    const updateData = {
      status: 'CONTACTED'
    };
    
    console.log('📤 Sending update data:', updateData);
    
    const updateResponse = await fetch(`${API_BASE_URL}/leads/${createdLead.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    });
    
    const updateText = await updateResponse.text();
    console.log(`📡 Update response (${updateResponse.status}):`, updateText);
    
    if (updateResponse.ok) {
      console.log('✅ Lead status updated successfully!');
      
      // Step 3: Verify the update
      console.log('\n📡 Step 3: Verifying update...');
      const verifyResponse = await fetch(`${API_BASE_URL}/leads/${createdLead.id}`);
      const verifyText = await verifyResponse.text();
      console.log(`📡 Verify response (${verifyResponse.status}):`, verifyText);
      
      if (verifyResponse.ok) {
        try {
          const updatedLead = JSON.parse(verifyText);
          console.log('✅ Verification successful! Updated lead:', {
            id: updatedLead.id,
            name: updatedLead.name,
            newStatus: updatedLead.status
          });
        } catch (e) {
          console.log('❌ Verification response is not valid JSON');
        }
      }
      
    } else {
      console.log('❌ Failed to update lead status');
      
      // Try to parse error response
      try {
        const errorData = JSON.parse(updateText);
        console.log('📋 Error details:', errorData);
      } catch (e) {
        console.log('📋 Raw error response:', updateText);
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }
}

// Run test
testCreateAndUpdateLead();
