package com.aicrm.repository;

import com.aicrm.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
    
    /**
     * Find service by name
     */
    Optional<Service> findByName(String name);
    
    /**
     * Find all active services
     */
    @Query("SELECT s FROM Service s WHERE s.isActive = true")
    List<Service> findAllActive();
    
    /**
     * Check if service exists by ID
     */
    boolean existsById(Long id);
    
    /**
     * Check if service exists by name
     */
    boolean existsByName(String name);
}
