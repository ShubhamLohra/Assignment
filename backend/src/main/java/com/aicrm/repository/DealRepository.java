package com.aicrm.repository;

import com.aicrm.entity.Deal;
import com.aicrm.entity.Deal.DealStage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface DealRepository extends JpaRepository<Deal, Long> {
    
    List<Deal> findByStageOrderByCreatedAtDesc(DealStage stage);
    
    @Query("SELECT COUNT(d) FROM Deal d WHERE d.stage = 'CLOSED'")
    Long countClosedDeals();
    
    @Query("SELECT SUM(d.value) FROM Deal d WHERE d.stage = 'CLOSED'")
    BigDecimal getTotalClosedValue();
    
    @Query("SELECT COUNT(d) FROM Deal d WHERE d.stage IN ('QUALIFIED', 'CONTACTED', 'NEGOTIATION')")
    Long countActiveDeals();
}
