package com.doAI.backend.service;

import com.doAI.backend.dto.ProductRequestDTO;
import com.doAI.backend.dto.ProductResponseDTO;
import com.doAI.backend.model.Product;
import com.doAI.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductResponseDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(ProductResponseDTO::new)
                .collect(Collectors.toList());
    }

    public ProductResponseDTO createProduct(ProductRequestDTO productRequestDTO) {
        Product product = new Product(productRequestDTO);
        Product savedProduct = productRepository.save(product);
        return new ProductResponseDTO(savedProduct);
    }
}