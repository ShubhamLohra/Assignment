-- Simple Sample Data for AI CRM System
-- This will populate the dashboard and pipeline pages

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
