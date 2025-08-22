package com.aicrm.repository;

import com.aicrm.entity.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {
    
    @Query("SELECT l, s FROM Lead l LEFT JOIN l.service s ORDER BY l.createdAt DESC")
    List<Object[]> findAllWithServiceByOrderByCreatedAtDesc();
    
    // Fallback method
    List<Lead> findAllByOrderByCreatedAtDesc();
    
    @Query("SELECT COUNT(l) FROM Lead l WHERE l.status = 'NEW'")
    Long countNewLeads();
    
    @Query("SELECT COUNT(l) FROM Lead l WHERE l.status = 'QUALIFIED'")
    Long countQualifiedLeads();
    
    @Query("SELECT COUNT(l) FROM Lead l WHERE l.status = 'CONTACTED'")
    Long countContactedLeads();
    
    @Query("SELECT COUNT(l) FROM Lead l WHERE l.status = 'LOST'")
    Long countLostLeads();
}
