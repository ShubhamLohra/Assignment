-- Sample Services
INSERT INTO services (id, name, description, is_active, created_at, updated_at) VALUES
(1, 'Bridal Makeup', 'Complete bridal makeup package', TRUE, NOW(), NOW()),
(2, 'Wedding Photography', 'Professional wedding photography', TRUE, NOW(), NOW()),
(3, 'Wedding Decoration', 'Complete wedding decoration', TRUE, NOW(), NOW()),
(4, 'Wedding Planning', 'Full wedding planning service', TRUE, NOW(), NOW());

-- Sample Users
INSERT INTO users (id, username, email, password, full_name, role, is_active, created_at, updated_at) VALUES
(1, 'admin', 'admin@brideside.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'System Administrator', 'ADMIN', TRUE, NOW(), NOW()),
(2, 'manager', 'manager@brideside.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'Manager User', 'MANAGER', TRUE, NOW(), NOW());

-- Sample Leads
INSERT INTO leads (id, name, email, phone, city, service_id, budget, status, source, created_at, updated_at) VALUES
(1, 'Priya Sharma', 'priya@email.com', '9876543210', 'Mumbai', 1, 45000.00, 'QUALIFIED', 'WEBSITE', NOW(), NOW()),
(2, 'Rajesh Kumar', 'rajesh@email.com', '9876543211', 'Delhi', 2, 75000.00, 'CONTACTED', 'INSTAGRAM', NOW(), NOW()),
(3, 'Anjali Patel', 'anjali@email.com', '9876543212', 'Bangalore', 3, 120000.00, 'NEW', 'REFERRAL', NOW(), NOW()),
(4, 'Vikram Singh', 'vikram@email.com', '9876543213', 'Pune', 4, 200000.00, 'QUALIFIED', 'WHATSAPP', NOW(), NOW());

-- Sample Deals
INSERT INTO deals (id, lead_id, title, stage, value, probability, created_at, updated_at) VALUES
(1, 1, 'Bridal Makeup Package', 'QUALIFIED', 45000.00, 40, NOW(), NOW()),
(2, 2, 'Corporate Photography', 'CONTACTED', 75000.00, 60, NOW(), NOW()),
(3, 3, 'Wedding Decoration', 'NEGOTIATION', 120000.00, 80, NOW(), NOW()),
(4, 4, 'Complete Wedding Planning', 'CLOSED', 200000.00, 100, NOW(), NOW());
