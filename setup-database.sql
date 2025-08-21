-- Setup Database for AI CRM System
-- Run this script in MySQL to create the database and tables

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS my_test_db;

-- Use the database
USE my_test_db;

-- Create tables based on the entities in your Spring Boot application

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    full_name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    service_id BIGINT,
    city VARCHAR(100),
    budget DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'NEW',
    source VARCHAR(20) DEFAULT 'WEBSITE',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id)
);

-- Deals table
CREATE TABLE IF NOT EXISTS deals (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    lead_id BIGINT,
    service_id BIGINT,
    stage VARCHAR(20) DEFAULT 'QUALIFIED',
    value DECIMAL(10,2),
    probability INT DEFAULT 50,
    expected_close_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (lead_id) REFERENCES leads(id),
    FOREIGN KEY (service_id) REFERENCES services(id)
);

-- Insert sample data

-- Insert sample services
INSERT INTO services (name, description, price) VALUES
('Photography', 'Professional event photography services', 25000.00),
('Makeup', 'Professional makeup and beauty services', 15000.00),
('Decor', 'Event decoration and setup services', 30000.00),
('Planning', 'Complete event planning and coordination', 50000.00);

-- Insert sample leads
INSERT INTO leads (name, email, phone, service_id, city, budget, status, source) VALUES
('Priya Sharma', 'priya.sharma@email.com', '+91-9876543210', 1, 'Mumbai', 30000.00, 'NEW', 'WEBSITE'),
('Rajesh Kumar', 'rajesh.kumar@email.com', '+91-8765432109', 2, 'Delhi', 20000.00, 'CONTACTED', 'REFERRAL'),
('Anita Patel', 'anita.patel@email.com', '+91-7654321098', 3, 'Bangalore', 40000.00, 'QUALIFIED', 'SOCIAL_MEDIA'),
('Vikram Singh', 'vikram.singh@email.com', '+91-6543210987', 4, 'Chennai', 60000.00, 'NEW', 'WEBSITE');

-- Insert sample deals
INSERT INTO deals (title, lead_id, service_id, stage, value, probability, expected_close_date) VALUES
('Wedding Photography Package', 1, 1, 'QUALIFIED', 30000.00, 80, '2024-12-15'),
('Bridal Makeup Service', 2, 2, 'NEGOTIATION', 20000.00, 70, '2024-11-20'),
('Corporate Event Decor', 3, 3, 'CLOSED', 40000.00, 100, '2024-10-30'),
('Birthday Party Planning', 4, 4, 'CONTACTED', 60000.00, 60, '2024-12-01');

-- Show the created data
SELECT 'Services:' as info;
SELECT * FROM services;

SELECT 'Leads:' as info;
SELECT * FROM leads;

SELECT 'Deals:' as info;
SELECT * FROM deals;

-- Show table structure
SHOW TABLES;
