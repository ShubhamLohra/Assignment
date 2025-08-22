# Authentication System Setup

This document describes the complete authentication system implementation for the AI CRM system, including both backend and frontend components.

## 🏗️ Backend Implementation

### 1. Dependencies Added

**pom.xml** - Added Spring Security dependency:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

### 2. New Files Created

#### **AuthController.java**
- **Endpoint**: `/api/auth/*`
- **Methods**:
  - `POST /signup` - User registration
  - `POST /login` - User authentication
  - `GET /profile` - Get user profile (protected)

#### **AuthService.java**
- **Features**:
  - Password hashing with BCrypt
  - User validation
  - Token generation (simple format, replace with JWT in production)
  - Duplicate username/email checking

#### **DTOs**
- **LoginRequest.java** - Login credentials
- **SignupRequest.java** - Registration data
- **AuthResponse.java** - Authentication response

#### **SecurityConfig.java**
- **Purpose**: Disables default Spring Security form login
- **Configuration**: Allows all endpoints (for development)

### 3. Database Schema Updates

**User Entity** (`User.java`):
- Added `@JsonIgnore` to password field
- Enhanced with proper validation annotations
- Default role: `AGENT`
- Default status: `ACTIVE`

**Schema Updates**:
- Password field already exists in `users` table
- Updated sample data with BCrypt hashed passwords

## 🎨 Frontend Implementation

### 1. New Pages

#### **Login.js**
- **Features**:
  - Username/password form
  - Error handling
  - Loading states
  - Redirect to dashboard on success
  - Demo credentials display

#### **Signup.js**
- **Features**:
  - Complete registration form
  - Client-side validation
  - Password confirmation
  - Success feedback
  - Auto-redirect to login

### 2. Updated Components

#### **App.js**
- **New Routes**:
  - `/login` - Public route
  - `/signup` - Public route
  - Protected routes with authentication checks

#### **Sidebar.js**
- **New Features**:
  - Dynamic user information display
  - Logout functionality
  - User role display

#### **api.js**
- **New Methods**:
  - `login(credentials)`
  - `signup(userData)`
  - `getProfile()`

### 3. Route Protection

#### **ProtectedRoute Component**
- Checks for valid token in localStorage
- Redirects to login if unauthorized
- Wraps all authenticated pages

#### **PublicRoute Component**
- Redirects logged-in users to dashboard
- Prevents duplicate login sessions

## 🔐 Authentication Flow

### 1. User Registration
```
1. User fills signup form
2. Frontend validates input
3. POST /api/auth/signup
4. Backend validates data
5. Password hashed with BCrypt
6. User saved to database
7. Token generated and returned
8. Redirect to login page
```

### 2. User Login
```
1. User enters credentials
2. POST /api/auth/login
3. Backend verifies username/password
4. BCrypt password comparison
5. Token generated and returned
6. Token stored in localStorage
7. User info stored in localStorage
8. Redirect to dashboard
```

### 3. Protected Access
```
1. User navigates to protected route
2. ProtectedRoute checks localStorage
3. If token exists → render component
4. If no token → redirect to login
```

### 4. Logout
```
1. User clicks logout button
2. Clear localStorage (token + user)
3. Redirect to login page
```

## 🧪 Testing

### 1. Test Script
**File**: `test-auth-endpoints.js`
**Usage**: `node test-auth-endpoints.js`

**Tests**:
- User signup
- User login
- Profile retrieval
- Error handling

### 2. Demo Credentials
**Admin User**:
- Username: `admin`
- Password: `admin123`

**Manager User**:
- Username: `manager`
- Password: `admin123`

## 🚀 Getting Started

### 1. Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 3. Database Setup
```bash
# Run the schema.sql file in your MySQL database
mysql -u username -p database_name < schema.sql
```

## 🔧 Configuration

### 1. Security Settings
**Current**: All endpoints open (development mode)
**Production**: Implement proper JWT authentication

### 2. Password Policy
- Minimum length: 6 characters
- Stored as BCrypt hash
- Secure comparison

### 3. Token Management
**Current**: Simple format (`user_id:random_string`)
**Production**: JWT with expiration and signing

## 🛡️ Security Features

### 1. Password Security
- BCrypt hashing (industry standard)
- Salt automatically generated
- Secure password comparison

### 2. Input Validation
- Server-side validation
- Client-side validation
- SQL injection prevention

### 3. Session Management
- Token-based authentication
- Secure storage in localStorage
- Automatic logout on token removal

## 🚨 Production Considerations

### 1. JWT Implementation
- Replace simple token with JWT
- Add token expiration
- Implement refresh tokens

### 2. HTTPS Enforcement
- Force HTTPS in production
- Secure cookie settings
- CSRF protection

### 3. Rate Limiting
- Implement login attempt limits
- Add CAPTCHA for multiple failures
- Account lockout policies

### 4. Password Policies
- Enforce stronger password requirements
- Implement password history
- Add password expiration

## 📱 API Endpoints

### Authentication Endpoints
```
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/profile
```

### Request/Response Examples

#### Signup Request
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "fullName": "John Doe",
  "password": "password123",
  "confirmPassword": "password123"
}
```

#### Login Request
```json
{
  "username": "john_doe",
  "password": "password123"
}
```

#### Auth Response
```json
{
  "token": "1:uuid-string",
  "tokenType": "Bearer",
  "userId": 1,
  "username": "john_doe",
  "fullName": "John Doe",
  "email": "john@example.com",
  "role": "AGENT",
  "message": "Login successful"
}
```

## 🎯 Next Steps

### 1. Immediate Improvements
- Add password strength indicator
- Implement "Remember Me" functionality
- Add password reset capability

### 2. Advanced Features
- Multi-factor authentication
- Role-based access control
- Audit logging
- Session management

### 3. Integration
- Single sign-on (SSO)
- OAuth2 providers
- LDAP integration

## 📞 Support

For issues or questions about the authentication system:
1. Check the test script output
2. Verify database connectivity
3. Check Spring Boot logs
4. Review browser console errors

---

**Note**: This is a development-ready authentication system. For production deployment, implement the security enhancements mentioned in the Production Considerations section.
