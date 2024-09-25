package com.example.receipt_management_system.scheduler;

import java.time.YearMonth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.receipt_management_system.service.EmailService;
import com.example.receipt_management_system.service.ExpenseCalculationService;
import com.example.receipt_management_system.service.NotificationService;

@Component
public class MonthlyExpenseNotificationScheduler {

    @Autowired
    private ExpenseCalculationService expenseCalculationService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private NotificationService notificationService;
//@Scheduled(fixedRate = 10000)
    @Scheduled(cron = "0 0 1 1 * ?") // Runs at 1:00 AM on the first day of every month
    public void sendMonthlyExpenseNotification() {
        YearMonth lastMonth = YearMonth.now().minusMonths(1);
        double totalExpenses = expenseCalculationService.calculateTotalExpensesForMonth(lastMonth);

        // Send email notification
        emailService.sendMonthlyExpenseEmail(totalExpenses, lastMonth);

        // Send WebSocket notification
        String message = String.format("Total expenses for %s: $%.2f", lastMonth, totalExpenses);
        notificationService.sendNotification(message);
    }
}
