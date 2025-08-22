-- Migration script to update leads table status enum
-- Run this script to add the missing status values

USE ai_crm;

-- First, update any existing leads with status values that will be removed
UPDATE leads SET status = 'NEW' WHERE status NOT IN ('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'LOST');

-- Alter the table to modify the status enum
ALTER TABLE leads MODIFY COLUMN status ENUM('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'LOST') DEFAULT 'NEW';

-- Verify the change
DESCRIBE leads;
