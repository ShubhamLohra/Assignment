-- Safe migration script to update leads table status enum
-- This script will preserve all existing data

USE my_test_db;

-- Check current table structure
SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE, COLUMN_DEFAULT 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'my_test_db' AND TABLE_NAME = 'leads' AND COLUMN_NAME = 'status';

-- Create a temporary table with the new structure
CREATE TABLE leads_new LIKE leads;

-- Modify the status column in the new table
ALTER TABLE leads_new MODIFY COLUMN status ENUM('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'LOST') DEFAULT 'NEW';

-- Copy all data from the old table to the new table
INSERT INTO leads_new SELECT * FROM leads;

-- Drop the old table
DROP TABLE leads;

-- Rename the new table to the original name
RENAME TABLE leads_new TO leads;

-- Verify the migration
DESCRIBE leads;
SELECT COUNT(*) as total_leads FROM leads;
SELECT status, COUNT(*) as count FROM leads GROUP BY status;

-- Recreate indexes
CREATE INDEX idx_service ON leads(service_id);
CREATE INDEX idx_status ON leads(status);
CREATE INDEX idx_city ON leads(city);
CREATE INDEX idx_source ON leads(source);
CREATE INDEX idx_assigned_to ON leads(assigned_to);
CREATE INDEX idx_leads_composite ON leads(service_id, status, city);
