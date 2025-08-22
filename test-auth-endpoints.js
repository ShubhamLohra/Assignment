const API_BASE_URL = 'http://localhost:8080/api';

// Test data
const testUser = {
  username: 'testuser',
  email: 'test@example.com',
  fullName: 'Test User',
  password: 'password123',
  confirmPassword: 'password123'
};

const testLogin = {
  username: 'admin',
  password: 'admin123'
};

// Test signup
async function testSignup() {
  console.log('🧪 Testing Signup...');
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Signup successful:', data);
      return data.token;
    } else {
      console.log('❌ Signup failed:', data);
      return null;
    }
  } catch (error) {
    console.error('❌ Signup error:', error);
    return null;
  }
}

// Test login
async function testLogin() {
  console.log('🧪 Testing Login...');
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testLogin)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Login successful:', data);
      return data.token;
    } else {
      console.log('❌ Login failed:', data);
      return null;
    }
  } catch (error) {
    console.error('❌ Login error:', error);
    return null;
  }
}

// Test profile with token
async function testProfile(token) {
  if (!token) {
    console.log('❌ No token available for profile test');
    return;
  }
  
  console.log('🧪 Testing Profile...');
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
      console.log('✅ Profile retrieved successfully:', data);
    } else {
      console.log('❌ Profile retrieval failed:', data);
    }
  } catch (error) {
    console.error('❌ Profile error:', error);
  }
}

// Run all tests
async function runTests() {
  console.log('🚀 Starting Authentication Tests...\n');
  
  // Test signup
  const signupToken = await testSignup();
  console.log('');
  
  // Test login
  const loginToken = await testLogin();
  console.log('');
  
  // Test profile with login token
  await testProfile(loginToken);
  console.log('');
  
  console.log('🏁 Authentication tests completed!');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

module.exports = { testSignup, testLogin, testProfile };
