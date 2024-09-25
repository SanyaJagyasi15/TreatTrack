package com.example.receipt_management_system.Controller;

import java.io.IOException;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.receipt_management_system.model.Receipt;
import com.example.receipt_management_system.model.User;
import com.example.receipt_management_system.service.ReceiptService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/receipts")
public class ReceiptController {

    @Autowired
    private ReceiptService receiptService;

    @GetMapping
    public ResponseEntity<List<Receipt>> getAllReceipts() {
        List<Receipt> receipts = receiptService.getAllReceipts();
        return ResponseEntity.ok(receipts);
    }

    @PostMapping("/upload")
    public String uploadFile(
            @RequestParam("date") String date,
            @RequestParam("description") String description,
            @RequestParam("reason") String reason,
            @RequestParam("otherReason") String otherReason,
            @RequestParam("amount") Double amount,
            @RequestParam("image") MultipartFile image) {
                
        return "File uploaded successfully!";
    }

    @PostMapping("/add")
    public ResponseEntity<String> addReceipt(@RequestParam("date") String date,
                                         @RequestParam("items") String itemsJson) {
        try {
            LocalDate receiptDate = LocalDate.parse(date);
            ObjectMapper objectMapper = new ObjectMapper();
            List<Map<String, Object>> items = objectMapper.readValue(itemsJson, new TypeReference<List<Map<String, Object>>>(){});

            for (Map<String, Object> item : items) {
                Receipt receipt = new Receipt();
                receipt.setDate(receiptDate);
                receipt.setDescription((String) item.get("description"));
                receipt.setReason((String) item.get("reason"));
                receipt.setOtherReason((String) item.get("otherReason"));
                
                // Handle the amount as a Number and convert to Double
                Object amountObj = item.get("amount");
                receipt.setAmount(switch (amountObj) {
                    case Number number -> number.doubleValue();
                    case String string -> Double.parseDouble(string);
                    default -> throw new IllegalArgumentException("Invalid amount type");
                });
            
                //dummy
                User dummyUser = new User();
                dummyUser.setId(1L);
                dummyUser.setUsername("dummyUser");
                receipt.setUser(dummyUser);
                
                if (item.containsKey("image") && item.get("image") instanceof MultipartFile) {
                    MultipartFile image = (MultipartFile) item.get("image");
                    if (!image.isEmpty()) {
                        String imagePath = receiptService.saveImage(image);
                        receipt.setImagePath(imagePath);
                    }
                }
                
                receiptService.saveReceipt(receipt);
            }
            return ResponseEntity.status(201).body("Receipts added successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error processing image: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body("Invalid amount format: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error adding receipts: " + e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Receipt>> getReceiptsByUser(@PathVariable Long userId) {
        List<Receipt> receipts = receiptService.getReceiptsByUserId(userId);
        if (receipts.isEmpty()) {
            return ResponseEntity.noContent().build(); 
        }
        return ResponseEntity.ok(receipts);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteReceipt(@PathVariable Long id) {
        if (receiptService.getReceiptById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        receiptService.deleteReceipt(id);
        return ResponseEntity.ok("Receipt deleted successfully");
    }
}
