-- Test Database Connection
-- Run this script to verify your MySQL connection

-- Connect to the database
USE my_test_db;

-- Test basic operations
SELECT 'Database connection successful!' as status;

-- Check if tables exist
SHOW TABLES;

-- Test a simple query
SELECT COUNT(*) as table_count FROM information_schema.tables 
WHERE table_schema = 'my_test_db';

-- If you want to see the current user and host
SELECT USER(), CURRENT_USER();

-- Test database privileges
SHOW GRANTS FOR CURRENT_USER();
