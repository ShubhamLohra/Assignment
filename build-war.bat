@echo off
echo 🚀 Building AI CRM Backend WAR file using Docker...

echo 📦 Creating Maven build container...
docker run --rm -v "%cd%/backend:/app" -w /app maven:3.9.5 mvn clean package -DskipTests

if %ERRORLEVEL% EQU 0 (
    echo ✅ WAR file built successfully!
    echo 📁 Location: backend/target/ai-crm-backend-1.0.0.war
    echo.
    echo 🐳 Starting Tomcat and MySQL...
    docker-compose -f docker-compose-tomcat.yml up -d
    echo.
    echo 🌐 Your application will be available at:
    echo    - Frontend: http://localhost:3000
    echo    - Backend API: http://localhost:8080/api
    echo    - Tomcat Manager: http://localhost:8080/manager
) else (
    echo ❌ Failed to build WAR file
    echo Please check the error messages above
)

pause
