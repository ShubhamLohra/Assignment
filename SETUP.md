# AI-Enabled CRM System - Setup Guide

This guide will walk you through setting up the complete AI-enabled CRM system with Spring Boot backend and React frontend.

## 🚀 Quick Start (Docker)

The fastest way to get started is using Docker Compose:

```bash
# Clone the repository
git clone <your-repo-url>
cd ai-crm-system

# Set your OpenAI API key
export OPENAI_API_KEY=your_actual_api_key_here

# Start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080/api
# Database: localhost:3306
```

## 🛠️ Manual Setup

### Prerequisites

- **Java 17+** - Download from [Oracle](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://adoptium.net/)
- **Node.js 18+** - Download from [Node.js](https://nodejs.org/)
- **MySQL 8.0+** - Download from [MySQL](https://dev.mysql.com/downloads/mysql/)
- **Maven 3.6+** - Download from [Maven](https://maven.apache.org/download.cgi/)
- **OpenAI API Key** - Get from [OpenAI Platform](https://platform.openai.com/api-keys)

### Step 1: Database Setup

1. **Install MySQL**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install mysql-server
   
   # macOS
   brew install mysql
   
   # Windows
   # Download and install from MySQL website
   ```

2. **Start MySQL Service**
   ```bash
   # Ubuntu/Debian
   sudo systemctl start mysql
   sudo systemctl enable mysql
   
   # macOS
   brew services start mysql
   
   # Windows
   # Start from Services or MySQL Installer
   ```

3. **Create Database and User**
   ```sql
   mysql -u root -p
   
   CREATE DATABASE ai_crm;
   CREATE USER 'crm_user'@'localhost' IDENTIFIED BY 'crm_password';
   GRANT ALL PRIVILEGES ON ai_crm.* TO 'crm_user'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

4. **Run Schema and Seed Data**
   ```bash
   mysql -u crm_user -p ai_crm < backend/src/main/resources/schema.sql
   mysql -u crm_user -p ai_crm < backend/src/main/resources/data.sql
   ```

### Step 2: Backend Setup

1. **Navigate to Backend Directory**
   ```bash
   cd backend
   ```

2. **Configure Application Properties**
   ```bash
   # Edit src/main/resources/application.properties
   # Update database credentials and OpenAI API key
   ```

3. **Build and Run**
   ```bash
   # Build the project
   mvn clean package
   
   # Run the application
   mvn spring-boot:run
   
   # Or run the JAR file
   java -jar target/ai-crm-backend-1.0.0.jar
   ```

4. **Verify Backend**
   - Open: http://localhost:8080/api/health
   - Should see: `{"status":"UP","timestamp":"..."}`

### Step 3: Frontend Setup

1. **Navigate to Frontend Directory**
   ```bash
   cd frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Verify Frontend**
   - Open: http://localhost:3000
   - Should see the CRM dashboard

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ai_crm
DB_USERNAME=crm_user
DB_PASSWORD=crm_password

# OpenAI
OPENAI_API_KEY=your_actual_api_key_here

# Server
SERVER_PORT=8080
FRONTEND_URL=http://localhost:3000
```

### Backend Configuration

Key configuration files:

- `backend/src/main/resources/application.properties` - Main configuration
- `backend/src/main/resources/schema.sql` - Database schema
- `backend/src/main/resources/data.sql` - Seed data

### Frontend Configuration

Key configuration files:

- `frontend/package.json` - Dependencies and scripts
- `frontend/tailwind.config.js` - Tailwind CSS configuration
- `frontend/src/App.css` - Custom styles

## 🧪 Testing

### Backend Testing

```bash
cd backend
mvn test
```

### Frontend Testing

```bash
cd frontend
npm test
```

### API Testing

Use the provided webhook examples in `webhook-examples.md`:

```bash
# Test Instagram webhook
curl -X POST http://localhost:8080/api/webhooks/instagram \
  -H "Content-Type: application/json" \
  -d '{
    "sender": "test.user",
    "message": "Hi, I need photography for my event on Dec 15 in Mumbai. Budget 50k.",
    "timestamp": "2024-11-01T16:00:00Z",
    "platform": "INSTAGRAM",
    "user_id": "ig_test_123",
    "conversation_id": "conv_test_456"
  }'
```

## 📱 Features to Test

### 1. Dashboard
- View overall statistics
- Check recent leads and deals
- Quick action buttons

### 2. Pipeline
- Drag & drop deals between stages
- Filter by service
- View deal details

### 3. Webhooks
- Test Instagram integration
- Test WhatsApp integration
- Verify AI processing

### 4. AI Features
- Entity extraction from messages
- Conversation summarization
- Next action suggestions

## 🚀 Deployment

### Production Deployment

1. **Build Backend**
   ```bash
   cd backend
   mvn clean package -Pprod
   ```

2. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy to Server**
   ```bash
   # Copy JAR file to server
   scp target/ai-crm-backend-1.0.0.jar user@server:/app/
   
   # Copy frontend build to web server
   scp -r build/* user@server:/var/www/html/
   ```

### Docker Production

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy to production
docker-compose -f docker-compose.prod.yml up -d
```

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check MySQL service is running
   - Verify credentials in `application.properties`
   - Ensure database exists

2. **Frontend Can't Connect to Backend**
   - Check backend is running on port 8080
   - Verify CORS configuration
   - Check proxy setting in `package.json`

3. **AI Features Not Working**
   - Verify OpenAI API key is set
   - Check API key has sufficient credits
   - Review API rate limits

4. **Drag & Drop Not Working**
   - Ensure `react-beautiful-dnd` is installed
   - Check browser console for errors
   - Verify React version compatibility

### Logs

```bash
# Backend logs
tail -f backend/logs/application.log

# Docker logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

## 📚 Next Steps

After successful setup:

1. **Customize Services** - Add/modify services in the database
2. **Configure AI Models** - Adjust OpenAI parameters for better results
3. **Add Authentication** - Implement user login and role-based access
4. **Real-time Features** - Enable WebSocket for live updates
5. **Mobile App** - Build React Native mobile application
6. **Advanced Analytics** - Add reporting and dashboard features

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review logs for error messages
3. Verify all prerequisites are met
4. Create an issue in the repository with:
   - Error message
   - Steps to reproduce
   - Environment details
   - Logs

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.
