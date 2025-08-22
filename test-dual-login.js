const API_BASE_URL = 'http://localhost:8080/api';

// Test data for both username and email login
const testCredentials = [
  {
    type: 'Username',
    value: 'admin',
    password: 'admin123'
  },
  {
    type: 'Email',
    value: 'admin@brideside.com',
    password: 'admin123'
  }
];

// Test login with different credential types
async function testLogin(credentialType, value, password) {
  console.log(`\n🧪 Testing ${credentialType} login with: ${value}`);
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: value, // This field now accepts both username and email
        password: password
      })
    });
    
    const responseText = await response.text();
    console.log(`📡 Raw response (${response.status}):`, responseText);
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.log(`❌ Response is not valid JSON: ${responseText}`);
      return null;
    }
    
    if (response.ok) {
      console.log(`✅ ${credentialType} login successful:`, {
        token: data.token ? 'Present' : 'Missing',
        userId: data.userId,
        username: data.username,
        email: data.email,
        role: data.role,
        message: data.message
      });
      return data.token;
    } else {
      console.log(`❌ ${credentialType} login failed:`, data);
      return null;
    }
  } catch (error) {
    console.error(`❌ ${credentialType} login error:`, error.message);
    return null;
  }
}

// Test profile retrieval with token
async function testProfile(token, credentialType) {
  if (!token) {
    console.log(`❌ No token available for ${credentialType} profile test`);
    return;
  }
  
  console.log(`\n🧪 Testing Profile retrieval for ${credentialType} login...`);
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log(`✅ Profile retrieved successfully for ${credentialType}:`, {
        id: data.id,
        username: data.username,
        email: data.email,
        fullName: data.fullName,
        role: data.role
      });
    } else {
      console.log(`❌ Profile retrieval failed for ${credentialType}:`, data);
    }
  } catch (error) {
    console.error(`❌ Profile error for ${credentialType}:`, error.message);
  }
}

// Run all tests
async function runTests() {
  console.log('🚀 Starting Dual Login Tests...\n');
  console.log('Testing both username and email login functionality...\n');
  
  const results = [];
  
  // Test each credential type
  for (const credential of testCredentials) {
    const token = await testLogin(credential.type, credential.value, credential.password);
    results.push({
      type: credential.type,
      value: credential.value,
      success: !!token,
      token: token
    });
    
    // Test profile with the token
    await testProfile(token, credential.type);
  }
  
  // Summary
  console.log('\n📊 Test Results Summary:');
  console.log('========================');
  
  results.forEach(result => {
    const status = result.success ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} - ${result.type} login with "${result.value}"`);
  });
  
  const successCount = results.filter(r => r.success).length;
  const totalCount = results.length;
  
  console.log(`\n🏁 Overall Result: ${successCount}/${totalCount} tests passed`);
  
  if (successCount === totalCount) {
    console.log('🎉 All tests passed! Both username and email login are working.');
  } else {
    console.log('⚠️  Some tests failed. Check the logs above for details.');
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

module.exports = { testLogin, testProfile, runTests };
