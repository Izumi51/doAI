package com.doAI.backend.controller;

import com.doAI.backend.dto.ProductRequestDTO;
import com.doAI.backend.dto.ProductResponseDTO;
import com.doAI.backend.model.Product;
import com.doAI.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductRepository repository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<ProductResponseDTO> getAllProducts() {
        return repository.findAll().stream().map(ProductResponseDTO::new).toList();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public void saveProduct(@RequestBody ProductRequestDTO data) {
        Product productData = new Product(data);
        repository.save(productData);
    }

}
