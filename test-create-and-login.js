const API_BASE_URL = 'http://localhost:8080/api';

// Test user data
const testUser = {
  username: 'testuser',
  email: 'test@example.com',
  fullName: 'Test User',
  password: 'password123',
  confirmPassword: 'password123'
};

// Step 1: Create a user
async function createUser() {
  console.log('🧪 Step 1: Creating test user...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser)
    });
    
    const responseText = await response.text();
    console.log(`📡 Signup response (${response.status}):`, responseText);
    
    if (response.ok) {
      console.log('✅ User created successfully');
      return true;
    } else {
      console.log('❌ User creation failed');
      return false;
    }
  } catch (error) {
    console.error('❌ Signup error:', error.message);
    return false;
  }
}

// Step 2: Test login with username
async function testUsernameLogin() {
  console.log('\n🧪 Step 2: Testing username login...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: testUser.username,
        password: testUser.password
      })
    });
    
    const responseText = await response.text();
    console.log(`📡 Username login response (${response.status}):`, responseText);
    
    if (response.ok) {
      const data = JSON.parse(responseText);
      console.log('✅ Username login successful:', {
        token: data.token ? 'Present' : 'Missing',
        userId: data.userId,
        username: data.username,
        email: data.email
      });
      return data.token;
    } else {
      console.log('❌ Username login failed');
      return null;
    }
  } catch (error) {
    console.error('❌ Username login error:', error.message);
    return null;
  }
}

// Step 3: Test login with email
async function testEmailLogin() {
  console.log('\n🧪 Step 3: Testing email login...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: testUser.email, // Using email in the username field
        password: testUser.password
      })
    });
    
    const responseText = await response.text();
    console.log(`📡 Email login response (${response.status}):`, responseText);
    
    if (response.ok) {
      const data = JSON.parse(responseText);
      console.log('✅ Email login successful:', {
        token: data.token ? 'Present' : 'Missing',
        userId: data.userId,
        username: data.username,
        email: data.email
      });
      return data.token;
    } else {
      console.log('❌ Email login failed');
      return null;
    }
  } catch (error) {
    console.error('❌ Email login error:', error.message);
    return null;
  }
}

// Run all tests
async function runTests() {
  console.log('🚀 Starting Create User + Dual Login Tests...\n');
  
  // Step 1: Create user
  const userCreated = await createUser();
  if (!userCreated) {
    console.log('❌ Cannot proceed without creating a user first');
    return;
  }
  
  // Wait a moment for the user to be saved
  console.log('\n⏳ Waiting for user to be saved...');
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Step 2: Test username login
  const usernameToken = await testUsernameLogin();
  
  // Step 3: Test email login
  const emailToken = await testEmailLogin();
  
  // Summary
  console.log('\n📊 Test Results Summary:');
  console.log('========================');
  console.log(`✅ User Creation: ${userCreated ? 'PASS' : 'FAIL'}`);
  console.log(`✅ Username Login: ${usernameToken ? 'PASS' : 'FAIL'}`);
  console.log(`✅ Email Login: ${emailToken ? 'PASS' : 'FAIL'}`);
  
  const successCount = [userCreated, !!usernameToken, !!emailToken].filter(Boolean).length;
  const totalCount = 3;
  
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

module.exports = { createUser, testUsernameLogin, testEmailLogin, runTests };
