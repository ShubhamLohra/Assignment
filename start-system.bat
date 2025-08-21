@echo off
echo ========================================
echo AI CRM System - Startup Script
echo ========================================
echo.

echo Starting MySQL Database...
echo Please ensure MySQL is running on localhost:3306
echo Database: my_test_db
echo Username: root
echo Password: Shubham@123
echo.
pause

echo.
echo Starting Spring Boot Backend...
cd backend
echo Building backend...
call mvnw clean install -DskipTests
if %errorlevel% neq 0 (
    echo Backend build failed!
    pause
    exit /b 1
)

echo Starting backend on port 8080...
start "Backend" cmd /k "mvnw spring-boot:run"
cd ..

echo.
echo Waiting for backend to start...
timeout /t 10 /nobreak >nul

echo.
echo Starting React Frontend...
cd frontend-working
echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Frontend dependency installation failed!
    pause
    exit /b 1
)

echo Starting frontend on port 3000...
start "Frontend" cmd /k "npm start"
cd ..

echo.
echo ========================================
echo System startup initiated!
echo ========================================
echo.
echo Backend: http://localhost:8080/api
echo Frontend: http://localhost:3000
echo Database: localhost:3306
echo.
echo Press any key to exit this script...
pause >nul
