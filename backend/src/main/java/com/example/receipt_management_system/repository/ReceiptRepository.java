package com.example.receipt_management_system.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.receipt_management_system.model.Receipt;

public interface ReceiptRepository extends JpaRepository<Receipt, Long> {
    List<Receipt> findByUserId(Long userId);  
    @Query("SELECT r.amount FROM Receipt r WHERE r.date BETWEEN :startDate AND :endDate")
    List<Double> findTotalSpentBetween(LocalDate startDate, LocalDate endDate);
}
