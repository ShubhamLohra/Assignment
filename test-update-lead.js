const API_BASE_URL = 'http://localhost:8080/api';

// Test updating a lead's stage
async function testUpdateLead() {
  console.log('🧪 Testing Lead Stage Update...\n');
  
  try {
    // Step 1: Get all leads to find one to update
    console.log('📡 Step 1: Fetching leads...');
    const leadsResponse = await fetch(`${API_BASE_URL}/leads`);
    const leadsText = await leadsResponse.text();
    console.log(`📡 Leads response (${leadsResponse.status}):`, leadsText);
    
    if (!leadsResponse.ok) {
      console.log('❌ Failed to fetch leads');
      return;
    }
    
    let leads;
    try {
      leads = JSON.parse(leadsText);
    } catch (e) {
      console.log('❌ Leads response is not valid JSON');
      return;
    }
    
    if (!leads || leads.length === 0) {
      console.log('❌ No leads found to test with');
      return;
    }
    
    // Step 2: Select first lead for testing
    const testLead = leads[0];
    console.log(`\n📋 Selected lead for testing:`, {
      id: testLead.id,
      name: testLead.name,
      currentStatus: testLead.status
    });
    
    // Step 3: Test updating the lead status
    console.log('\n📡 Step 2: Testing status update...');
    const updateData = {
      status: 'CONTACTED' // Try to change to CONTACTED
    };
    
    console.log('📤 Sending update data:', updateData);
    
    const updateResponse = await fetch(`${API_BASE_URL}/leads/${testLead.id}`, {
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
      
      // Step 4: Verify the update
      console.log('\n📡 Step 3: Verifying update...');
      const verifyResponse = await fetch(`${API_BASE_URL}/leads/${testLead.id}`);
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
testUpdateLead();
