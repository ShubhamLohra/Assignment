@echo off
echo ========================================
echo AI CRM System - Complete Setup Script
echo ========================================
echo.

echo Step 1: Database Setup
echo ======================
echo.
echo Please ensure MySQL is running and accessible with:
echo - Host: localhost
echo - Port: 3306
echo - Username: root
echo - Password: Shubham@123
echo.
echo You need to run the setup-database.sql script in MySQL
echo to create the database and tables.
echo.
echo Options:
echo 1. Use MySQL Workbench or phpMyAdmin to run setup-database.sql
echo 2. Use MySQL command line: mysql -u root -p < setup-database.sql
echo 3. Copy and paste the SQL commands manually
echo.
pause

echo.
echo Step 2: Starting Backend
echo ========================
cd backend
echo Building backend...
call mvnw.cmd clean install -DskipTests
if %errorlevel% neq 0 (
    echo Backend build failed!
    pause
    exit /b 1
)

echo Starting backend on port 8080...
start "Backend" cmd /k "mvnw.cmd spring-boot:run"
cd ..

echo.
echo Waiting for backend to start...
timeout /t 20 /nobreak >nul

echo.
echo Step 3: Testing Backend
echo =======================
echo Testing if backend is responding...
curl -s http://localhost:8080/api/leads >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend is running successfully!
    echo 📱 API available at: http://localhost:8080/api
) else (
    echo ❌ Backend is not responding yet
    echo Please check the backend console for any error messages
    echo Common issues:
    echo - Database connection failed
    echo - Port 8080 already in use
    echo - Missing dependencies
    pause
)

echo.
echo Step 4: Starting Frontend
echo =========================
cd frontend-working
echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Frontend dependency installation failed!
    pause
    exit /b 1
)

echo Starting frontend on port 3001...
start "Frontend" cmd /k "set PORT=3001 && npm start"
cd ..

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Backend: http://localhost:8080/api
echo Frontend: http://localhost:3001
echo Database: localhost:3306
echo.
echo If you see data in the frontend, the system is working!
echo If not, check the backend console for database connection errors.
echo.
pause
