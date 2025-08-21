-- Database Setup for AI CRM System
-- This will create tables and add sample data

-- Use the correct database
USE my_test_db;

-- Drop existing tables if they exist (to avoid field mismatches)
DROP TABLE IF EXISTS ai_analytics;
DROP TABLE IF EXISTS communications;
DROP TABLE IF EXISTS deals;
DROP TABLE IF EXISTS leads;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS webhook_logs;

-- Services table
CREATE TABLE services (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('ADMIN', 'MANAGER', 'AGENT') DEFAULT 'AGENT',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Leads table
CREATE TABLE leads (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    city VARCHAR(100),
    service_id BIGINT,
    budget DECIMAL(10,2),
    event_date DATE,
    status ENUM('NEW', 'CONTACTED', 'QUALIFIED', 'LOST') DEFAULT 'NEW',
    source ENUM('INSTAGRAM', 'WHATSAPP', 'WEBSITE', 'REFERRAL', 'OTHER') DEFAULT 'OTHER',
    notes TEXT,
    assigned_to BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Deals table (must match @Table(name = "deals") in Java entity)
CREATE TABLE deals (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    lead_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    stage ENUM('QUALIFIED', 'CONTACTED', 'NEGOTIATION', 'CLOSED', 'LOST') DEFAULT 'QUALIFIED',
    value DECIMAL(10,2),
    probability INT DEFAULT 25,
    expected_close_date DATE,
    assigned_to BIGINT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create indexes separately (MySQL syntax)
CREATE INDEX idx_service ON leads(service_id);
CREATE INDEX idx_status ON leads(status);
CREATE INDEX idx_city ON leads(city);
CREATE INDEX idx_source ON leads(source);
CREATE INDEX idx_assigned_to ON leads(assigned_to);

CREATE INDEX idx_lead ON deals(lead_id);
CREATE INDEX idx_stage ON deals(stage);
CREATE INDEX idx_assigned_to ON deals(assigned_to);
CREATE INDEX idx_expected_close_date ON deals(expected_close_date);

-- Insert default services
INSERT INTO services (name, description) VALUES
('Photography', 'Professional photography services for events'),
('Makeup', 'Professional makeup and beauty services'),
('Decor', 'Event decoration and styling services'),
('Planning', 'Complete event planning and coordination');

-- Insert default admin user
INSERT INTO users (username, email, password, full_name, role) VALUES
('admin', 'admin@aicrm.com', 'admin123', 'System Administrator', 'ADMIN');

-- Insert sample leads
INSERT INTO leads (name, email, phone, city, service_id, budget, status, source, notes, created_at) VALUES
('Priya Sharma', 'priya@email.com', '9876543210', 'Mumbai', 1, 45000.00, 'QUALIFIED', 'WEBSITE', 'Interested in bridal makeup package', NOW()),
('Rajesh Kumar', 'rajesh@email.com', '9876543211', 'Delhi', 2, 75000.00, 'CONTACTED', 'INSTAGRAM', 'Looking for wedding photography', NOW()),
('Anjali Patel', 'anjali@email.com', '9876543212', 'Bangalore', 3, 120000.00, 'NEW', 'REFERRAL', 'Complete wedding decoration needed', NOW());

-- Insert sample deals
INSERT INTO deals (lead_id, title, stage, value, probability, expected_close_date, notes, created_at) VALUES
(1, 'Bridal Makeup Package', 'QUALIFIED', 45000.00, 75, DATE_ADD(NOW(), INTERVAL 30 DAY), 'High priority client', NOW()),
(2, 'Wedding Photography', 'NEGOTIATION', 75000.00, 60, DATE_ADD(NOW(), INTERVAL 45 DAY), 'Discussing package options', NOW()),
(3, 'Wedding Decoration', 'CONTACTED', 120000.00, 40, DATE_ADD(NOW(), INTERVAL 60 DAY), 'Initial consultation scheduled', NOW());
