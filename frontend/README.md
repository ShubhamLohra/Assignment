# AI CRM Frontend

This is the frontend application for the AI-enabled CRM system, now connected to the Spring Boot backend.

## Features

- **Dashboard**: View CRM statistics and recent leads
- **Pipeline**: Visual deal pipeline management
- **Lead Management**: Add and manage leads
- **API Integration**: Connected to Spring Boot backend
- **Modern UI**: Built with React and Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- MySQL database running on localhost:3306
- Spring Boot backend running on port 8080

## Database Setup

Make sure your MySQL database is configured with:
- **Host**: localhost
- **Port**: 3306
- **Database**: my_test_db
- **Username**: root
- **Password**: Shubham@123

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd ../backend
   ```

2. Build the project:
   ```bash
   ./mvnw clean install
   ```

3. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

The backend will start on `http://localhost:8080` with the API available at `http://localhost:8080/api`.

## Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

The frontend will start on `http://localhost:3000` and automatically proxy API requests to the backend.

## API Endpoints

The frontend communicates with the following backend endpoints:

- **Leads**: `/api/leads` (GET, POST, PUT, DELETE)
- **Deals**: `/api/deals` (GET, POST, PUT, DELETE)
- **AI Services**: `/api/ai/*`

## Configuration

API settings can be configured in `src/config/config.js`. The default configuration:
- API Base URL: `/api` (proxied to backend)
- Timeout: 30 seconds
- CORS: Configured for localhost:3000

## Troubleshooting

1. **Backend Connection Issues**: Ensure the Spring Boot application is running on port 8080
2. **Database Connection**: Verify MySQL is running and accessible with the correct credentials
3. **CORS Issues**: Check that the backend CORS configuration includes `http://localhost:3000`
4. **API Errors**: Check browser console and backend logs for detailed error messages

## Development

- The frontend uses React 18 with functional components and hooks
- API communication is handled through the `ApiService` class
- Styling is done with Tailwind CSS
- State management uses React's built-in useState and useEffect

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.
