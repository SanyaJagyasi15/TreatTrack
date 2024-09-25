package com.example.receipt_management_system.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.receipt_management_system.repository.ReceiptRepository;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Service
public class ExpenseCalculationService {

    @Autowired
    private ReceiptRepository receiptRepository;

    public double calculateMonthlyExpenses(YearMonth yearMonth) {
        LocalDate startDate = yearMonth.atDay(1);
        LocalDate endDate = yearMonth.atEndOfMonth();
        
        return receiptRepository.findTotalSpentBetween(startDate, endDate)
                .stream()
                .mapToDouble(Double::doubleValue)
                .sum();
    }

    public double calculateTotalExpensesForMonth(YearMonth yearMonth) {
        LocalDate startDate = yearMonth.atDay(1);
        LocalDate endDate = yearMonth.atEndOfMonth();
        
        List<Double> expenses = receiptRepository.findTotalSpentBetween(startDate, endDate);
        
        return expenses.stream().mapToDouble(Double::doubleValue).sum();
    }
}
