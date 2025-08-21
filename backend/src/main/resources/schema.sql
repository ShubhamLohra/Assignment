-- AI-Enabled CRM System Database Schema
-- MySQL 8.0+

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS ai_crm;
USE ai_crm;

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
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
CREATE TABLE IF NOT EXISTS leads (
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (service_id) REFERENCES services(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id),
    
    INDEX idx_service (service_id),
    INDEX idx_status (status),
    INDEX idx_city (city),
    INDEX idx_source (source),
    INDEX idx_assigned_to (assigned_to)
);

-- Deals table
CREATE TABLE IF NOT EXISTS deals (
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (lead_id) REFERENCES leads(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id),
    
    INDEX idx_lead (lead_id),
    INDEX idx_stage (stage),
    INDEX idx_assigned_to (assigned_to),
    INDEX idx_expected_close_date (expected_close_date)
);

-- Communications table
CREATE TABLE IF NOT EXISTS communications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    lead_id BIGINT,
    deal_id BIGINT,
    type ENUM('EMAIL', 'PHONE', 'INSTAGRAM', 'WHATSAPP', 'MEETING', 'OTHER') NOT NULL,
    direction ENUM('INBOUND', 'OUTBOUND') DEFAULT 'INBOUND',
    content TEXT NOT NULL,
    sender VARCHAR(100),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_ai_processed BOOLEAN DEFAULT FALSE,
    
    FOREIGN KEY (lead_id) REFERENCES leads(id),
    FOREIGN KEY (deal_id) REFERENCES deals(id),
    
    INDEX idx_lead (lead_id),
    INDEX idx_deal (deal_id),
    INDEX idx_type (type),
    INDEX idx_timestamp (timestamp)
);

-- AI Analytics table
CREATE TABLE IF NOT EXISTS ai_analytics (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    communication_id BIGINT NOT NULL,
    extracted_entities JSON,
    summary TEXT,
    next_action_suggestion TEXT,
    confidence_score DECIMAL(3,2),
    processing_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (communication_id) REFERENCES communications(id),
    
    INDEX idx_communication (communication_id),
    INDEX idx_processing_timestamp (processing_timestamp)
);

-- Webhook Logs table
CREATE TABLE IF NOT EXISTS webhook_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    platform ENUM('INSTAGRAM', 'WHATSAPP') NOT NULL,
    payload JSON NOT NULL,
    processed BOOLEAN DEFAULT FALSE,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_platform (platform),
    INDEX idx_processed (processed),
    INDEX idx_created_at (created_at)
);

-- Insert default services
INSERT IGNORE INTO services (name, description) VALUES
('Photography', 'Professional photography services for events'),
('Makeup', 'Professional makeup and beauty services'),
('Decor', 'Event decoration and styling services'),
('Planning', 'Complete event planning and coordination');

-- Insert default admin user (password: admin123)
INSERT IGNORE INTO users (username, email, password, full_name, role) VALUES
('admin', 'admin@aicrm.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'System Administrator', 'ADMIN');

-- Create indexes for better performance
CREATE INDEX idx_leads_composite ON leads(service_id, status, city);
CREATE INDEX idx_deals_composite ON deals(stage, assigned_to, expected_close_date);
CREATE INDEX idx_communications_composite ON communications(lead_id, type, timestamp);
