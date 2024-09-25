package com.example.receipt_management_system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
@EnableScheduling
@SpringBootApplication

public class ReceiptManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReceiptManagementSystemApplication.class, args);
	}

}
