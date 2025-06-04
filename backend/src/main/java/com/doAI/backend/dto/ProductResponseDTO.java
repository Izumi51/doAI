package com.doAI.backend.dto;

import com.doAI.backend.model.Product;

import java.util.UUID;

public record ProductResponseDTO(UUID idProduct, String name, String description, String condition, String image) {
    public ProductResponseDTO(Product product) {
        this(product.getIdProduct(),
             product.getDescription(),
             product.getCondition(),
             product.getName(),
             product.getImage());
    }
}
