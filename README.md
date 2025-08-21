# AI-Enabled CRM System

A full-stack CRM system with AI capabilities, social media integration, and modern Kanban board interface.

## 🚀 Features

- **Deal Pipeline Management**: Kanban board with drag & drop functionality
- **Service-Based Management**: Photography, Makeup, Decor, Planning
- **Social Media Integration**: Instagram/WhatsApp webhook processing
- **AI Assistance**: Entity extraction, conversation summaries, next action suggestions
- **Real-time Updates**: Live pipeline updates across all users
- **Advanced Search & Filtering**: By service, stage, city, budget

## 🏗️ Architecture

- **Frontend**: React.js with modern UI/UX
- **Backend**: Spring Boot REST API
- **Database**: MySQL with JPA/Hibernate
- **AI Service**: OpenAI API integration
- **Real-time**: WebSocket support

## 📋 Prerequisites

- Java 17+
- Node.js 18+
- MySQL 8.0+
- Maven 3.6+
- OpenAI API Key

## 🚀 Quick Start

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-crm-system
   ```

2. **Configure MySQL**
   ```sql
   CREATE DATABASE ai_crm;
   CREATE USER 'crm_user'@'localhost' IDENTIFIED BY 'crm_password';
   GRANT ALL PRIVILEGES ON ai_crm.* TO 'crm_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. **Configure application.properties**
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/ai_crm
   spring.datasource.username=crm_user
   spring.datasource.password=crm_password
   openai.api.key=your_openai_api_key
   ```

4. **Run Spring Boot Application**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   ```

3. **Open browser**
   Navigate to `http://localhost:3000`

## 📚 API Documentation

### Core Endpoints

- `POST /api/leads` - Create new lead
- `GET /api/leads` - Get all leads with filtering
- `PUT /api/leads/{id}` - Update lead
- `DELETE /api/leads/{id}` - Delete lead

- `POST /api/deals` - Create new deal
- `GET /api/deals` - Get all deals
- `PUT /api/deals/{id}/stage` - Update deal stage
- `DELETE /api/deals/{id}` - Delete deal

- `POST /api/webhooks/instagram` - Instagram webhook
- `POST /api/webhooks/whatsapp` - WhatsApp webhook

- `POST /api/ai/extract` - AI entity extraction
- `POST /api/ai/summarize` - AI conversation summary
- `POST /api/ai/suggest` - AI next action suggestion

## 🔧 Configuration

### Environment Variables

```bash
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ai_crm
DB_USERNAME=crm_user
DB_PASSWORD=crm_password

# OpenAI
OPENAI_API_KEY=your_api_key

# Server
SERVER_PORT=8080
```

## 📊 Database Schema

### Tables
- `leads` - Lead information and details
- `deals` - Deal pipeline management
- `communications` - Message history
- `services` - Available services
- `users` - System users
- `ai_analytics` - AI processing results

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Manual Deployment
1. Build backend: `mvn clean package`
2. Build frontend: `npm run build`
3. Deploy JAR file to server
4. Serve frontend build files

## 📝 Sample Data

The system includes seed data with:
- 20+ sample leads
- 30+ sample deals across services
- Sample webhook payloads for testing

## 🔮 Future Enhancements

- Multi-tenant support
- Advanced analytics dashboard
- Mobile app development
- Integration with more social platforms
- Advanced AI features (sentiment analysis, lead scoring)

## 📞 Support

For questions or issues, please create an issue in the repository.

## 📄 License

This project is licensed under the MIT License.
