-- AI CRM Database Setup Script
-- Run this script to properly initialize your database

-- Drop and recreate database (BE CAREFUL - this will delete all data!)
-- DROP DATABASE IF EXISTS my_test_db;
-- CREATE DATABASE my_test_db;
-- USE my_test_db;

-- Use existing database
USE my_test_db;

-- Clear existing data (optional - uncomment if you want to start fresh)
-- DELETE FROM leads;
-- DELETE FROM deals;
-- DELETE FROM communications;
-- DELETE FROM ai_analytics;
-- DELETE FROM webhook_logs;
-- DELETE FROM users;
-- DELETE FROM services;

-- Reset auto-increment counters
-- ALTER TABLE leads AUTO_INCREMENT = 1;
-- ALTER TABLE deals AUTO_INCREMENT = 1;
-- ALTER TABLE users AUTO_INCREMENT = 1;
-- ALTER TABLE services AUTO_INCREMENT = 1;

-- Insert Services (must be done first due to foreign key constraints)
INSERT IGNORE INTO services (id, name, description, is_active, created_at, updated_at) VALUES
(1, 'Bridal Makeup', 'Complete bridal makeup package including hair styling', TRUE, NOW(), NOW()),
(2, 'Wedding Photography', 'Professional wedding photography with editing', TRUE, NOW(), NOW()),
(3, 'Wedding Decoration', 'Complete wedding decoration and floral arrangements', TRUE, NOW(), NOW()),
(4, 'Wedding Planning', 'Full wedding planning and coordination service', TRUE, NOW(), NOW()),
(5, 'Event Videography', 'Professional event videography services', TRUE, NOW(), NOW()),
(6, 'DJ & Music', 'Wedding DJ and music services', TRUE, NOW(), NOW());

-- Insert Users (must be done before leads due to foreign key constraints)
INSERT IGNORE INTO users (id, username, email, password, full_name, role, is_active, created_at, updated_at) VALUES
(1, 'admin', 'admin@aicrm.com', 'admin123', 'System Administrator', 'ADMIN', TRUE, NOW(), NOW()),
(2, 'manager', 'manager@aicrm.com', 'manager123', 'Sales Manager', 'MANAGER', TRUE, NOW(), NOW()),
(3, 'agent1', 'agent1@aicrm.com', 'agent123', 'Sales Agent 1', 'AGENT', TRUE, NOW(), NOW()),
(4, 'agent2', 'agent2@aicrm.com', 'agent123', 'Sales Agent 2', 'AGENT', TRUE, NOW(), NOW());

-- Insert Sample Leads (only after services and users exist)
INSERT IGNORE INTO leads (id, name, email, phone, city, service_id, budget, status, source, notes, assigned_to, created_at, updated_at) VALUES
(1, 'Priya Sharma', 'priya@email.com', '9876543210', 'Mumbai', 1, 45000.00, 'QUALIFIED', 'WEBSITE', 'Interested in bridal makeup package', 3, NOW(), NOW()),
(2, 'Rajesh Kumar', 'rajesh@email.com', '9876543211', 'Delhi', 2, 75000.00, 'CONTACTED', 'INSTAGRAM', 'Looking for wedding photography', 3, NOW(), NOW()),
(3, 'Anjali Patel', 'anjali@email.com', 'anjali@email.com', '9876543212', 'Bangalore', 3, 120000.00, 'NEW', 'REFERRAL', 'Complete wedding decoration needed', 4, NOW(), NOW()),
(4, 'Vikram Singh', 'vikram@email.com', '9876543213', 'Pune', 4, 200000.00, 'QUALIFIED', 'WHATSAPP', 'Full wedding planning required', 2, NOW(), NOW()),
(5, 'Meera Reddy', 'meera@email.com', '9876543214', 'Hyderabad', 5, 80000.00, 'NEW', 'WEBSITE', 'Interested in wedding videography', 4, NOW(), NOW());

-- Insert Sample Deals (only after leads exist)
INSERT IGNORE INTO deals (id, lead_id, title, stage, value, probability, expected_close_date, notes, assigned_to, created_at, updated_at) VALUES
(1, 1, 'Bridal Makeup Package', 'QUALIFIED', 45000.00, 75, DATE_ADD(NOW(), INTERVAL 30 DAY), 'High priority client', 3, NOW(), NOW()),
(2, 2, 'Wedding Photography', 'NEGOTIATION', 75000.00, 60, DATE_ADD(NOW(), INTERVAL 45 DAY), 'Discussing package options', 3, NOW(), NOW()),
(3, 3, 'Wedding Decoration', 'CONTACTED', 120000.00, 40, DATE_ADD(NOW(), INTERVAL 60 DAY), 'Initial consultation scheduled', 4, NOW(), NOW()),
(4, 4, 'Complete Wedding Planning', 'CLOSED', 200000.00, 100, DATE_ADD(NOW(), INTERVAL -5 DAY), 'Successfully completed', 2, NOW(), NOW()),
(5, 5, 'Wedding Videography', 'NEW', 80000.00, 25, DATE_ADD(NOW(), INTERVAL 90 DAY), 'New inquiry', 4, NOW(), NOW());

-- Verify data insertion
SELECT 'Services' as table_name, COUNT(*) as count FROM services
UNION ALL
SELECT 'Users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'Leads' as table_name, COUNT(*) as count FROM leads
UNION ALL
SELECT 'Deals' as table_name, COUNT(*) as count FROM deals;

-- Show sample data
SELECT 'Sample Services:' as info;
SELECT id, name, description FROM services LIMIT 5;

SELECT 'Sample Users:' as info;
SELECT id, username, email, role FROM users LIMIT 5;

SELECT 'Sample Leads:' as info;
SELECT id, name, email, city, service_id, status FROM leads LIMIT 5;
