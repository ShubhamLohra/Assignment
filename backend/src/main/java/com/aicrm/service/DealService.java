package com.aicrm.service;

import com.aicrm.entity.Deal;
import com.aicrm.entity.Deal.DealStage;
import com.aicrm.repository.DealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class DealService {
    
    @Autowired
    private DealRepository dealRepository;
    
    public List<Deal> getAllDeals() {
        return dealRepository.findAll();
    }
    
    public List<Deal> getDealsByStage(DealStage stage) {
        return dealRepository.findByStageOrderByCreatedAtDesc(stage);
    }
    
    public Deal createDeal(Deal deal) {
        return dealRepository.save(deal);
    }
    
    public Deal getDealById(Long id) {
        return dealRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Deal not found with id: " + id));
    }
    
    public Deal updateDeal(Long id, Deal dealDetails) {
        Deal deal = getDealById(id);
        deal.setTitle(dealDetails.getTitle());
        deal.setStage(dealDetails.getStage());
        deal.setValue(dealDetails.getValue());
        deal.setProbability(dealDetails.getProbability());
        deal.setExpectedCloseDate(dealDetails.getExpectedCloseDate());
        deal.setNotes(dealDetails.getNotes());
        return dealRepository.save(deal);
    }
    
    public void deleteDeal(Long id) {
        dealRepository.deleteById(id);
    }
    
    public Long getActiveDealsCount() {
        return dealRepository.countActiveDeals();
    }
    
    public Long getClosedDealsCount() {
        return dealRepository.countClosedDeals();
    }
    
    public BigDecimal getTotalClosedValue() {
        BigDecimal value = dealRepository.getTotalClosedValue();
        return value != null ? value : BigDecimal.ZERO;
    }
}
