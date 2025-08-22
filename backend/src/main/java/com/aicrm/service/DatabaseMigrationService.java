package com.aicrm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.util.logging.Logger;

@Service
public class DatabaseMigrationService {
    
    private static final Logger logger = Logger.getLogger(DatabaseMigrationService.class.getName());
    
    @Autowired
    private DataSource dataSource;
    
    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void migrateDatabase() {
        try {
            logger.info("Starting database migration...");
            
            // Check if migration is needed
            if (isMigrationNeeded()) {
                logger.info("Migration needed. Updating leads table status enum...");
                performMigration();
                logger.info("Database migration completed successfully.");
            } else {
                logger.info("No migration needed. Database is up to date.");
            }
            
        } catch (Exception e) {
            logger.severe("Database migration failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    private boolean isMigrationNeeded() {
        try (Connection connection = dataSource.getConnection()) {
            DatabaseMetaData metaData = connection.getMetaData();
            ResultSet columns = metaData.getColumns("my_test_db", null, "leads", "status");
            
            if (columns.next()) {
                String columnType = columns.getString("TYPE_NAME");
                logger.info("Current status column type: " + columnType);
                
                // Check if the enum contains all required values
                return !columnType.contains("PROPOSAL") || 
                       !columnType.contains("NEGOTIATION") || 
                       !columnType.contains("CLOSED_WON");
            }
        } catch (Exception e) {
            logger.warning("Could not check migration status: " + e.getMessage());
        }
        return true; // Assume migration is needed if we can't check
    }
    
    private void performMigration() {
        try (Connection connection = dataSource.getConnection()) {
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            
            // Create a temporary table with the new structure
            jdbcTemplate.execute("CREATE TABLE leads_new LIKE leads");
            
            // Modify the status column in the new table
            jdbcTemplate.execute(
                "ALTER TABLE leads_new MODIFY COLUMN status " +
                "ENUM('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'LOST') " +
                "DEFAULT 'NEW'"
            );
            
            // Copy all data from the old table to the new table
            jdbcTemplate.execute("INSERT INTO leads_new SELECT * FROM leads");
            
            // Drop the old table
            jdbcTemplate.execute("DROP TABLE leads");
            
            // Rename the new table to the original name
            jdbcTemplate.execute("RENAME TABLE leads_new TO leads");
            
            // Recreate indexes
            jdbcTemplate.execute("CREATE INDEX idx_service ON leads(service_id)");
            jdbcTemplate.execute("CREATE INDEX idx_status ON leads(status)");
            jdbcTemplate.execute("CREATE INDEX idx_city ON leads(city)");
            jdbcTemplate.execute("CREATE INDEX idx_source ON leads(source)");
            jdbcTemplate.execute("CREATE INDEX idx_assigned_to ON leads(assigned_to)");
            jdbcTemplate.execute("CREATE INDEX idx_leads_composite ON leads(service_id, status, city)");
            
            logger.info("Leads table structure updated successfully.");
            
        } catch (Exception e) {
            logger.severe("Migration failed: " + e.getMessage());
            throw new RuntimeException("Database migration failed", e);
        }
    }
}
