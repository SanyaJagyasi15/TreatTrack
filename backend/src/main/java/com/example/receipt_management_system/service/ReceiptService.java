package com.example.receipt_management_system.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.example.receipt_management_system.model.Receipt;
import com.example.receipt_management_system.repository.ReceiptRepository;
@Service
public class ReceiptService {

    @Autowired
    private ReceiptRepository receiptRepository;

    public List<Receipt> getAllReceipts(){
        return receiptRepository.findAll();
    }
    
    public void saveReceipt(Receipt receipt) {
        receiptRepository.save(receipt);
    }

    public List<Receipt> getReceiptsByUserId(Long userId) {
        return receiptRepository.findByUserId(userId);
    }

    public Optional<Receipt> getReceiptById(Long receiptId) {
        return receiptRepository.findById(receiptId);
    }

    public void deleteReceipt(Long receiptId) {
        if(receiptRepository.existsById(receiptId)){
        receiptRepository.deleteById(receiptId);
    }else{
        throw new RuntimeException("Receipt not found with id: "+ receiptId);
    }
}

public String saveImage(MultipartFile file) throws IOException {
    String fileName = StringUtils.cleanPath(file.getOriginalFilename());
    Path uploadPath = Paths.get("uploads");
    
    if (!Files.exists(uploadPath)) {
        Files.createDirectories(uploadPath);
    }
    
    try (InputStream inputStream = file.getInputStream()) {
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        return filePath.toString();
    } catch (IOException ioe) {
        throw new IOException("Could not save image file: " + fileName, ioe);
    }
}
}
