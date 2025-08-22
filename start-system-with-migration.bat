@echo off
echo ========================================
echo AI CRM System - Startup with Migration
echo ========================================
echo.

echo Starting MySQL container...
docker-compose up -d mysql

echo Waiting for MySQL to be ready...
timeout /t 10 /nobreak >nul

echo Running database migration...
echo Please enter MySQL root password when prompted: Shubham@123

REM Connect to MySQL and run the migration
docker exec -i ai-crm-mysql mysql -u root -pShubham@123 my_test_db < backend/src/main/resources/migrate-lead-status.sql

echo.
echo Migration completed. Starting the full system...
echo.

REM Start the full system
call start-system.bat

echo.
echo ========================================
echo System startup completed!
echo ========================================
echo.
echo Your data has been preserved and the lead status enum has been updated.
echo You can now change lead stages in the Pipeline without losing data.
echo.
pause
