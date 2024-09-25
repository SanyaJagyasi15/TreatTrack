package com.example.receipt_management_system.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.YearMonth;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Value("${admin.email}")
    private String adminEmail;

    public void sendMonthlyExpenseEmail(double totalExpenses, YearMonth month) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(adminEmail);
        message.setSubject("Monthly Expense Report for " + month);
        message.setText("Total expenses for " + month + ": $" + String.format("%.2f", totalExpenses));
        emailSender.send(message);
    }
}
