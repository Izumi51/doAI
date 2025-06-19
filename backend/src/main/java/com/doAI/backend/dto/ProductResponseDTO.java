package com.doAI.backend.dto;

import com.doAI.backend.model.CategoryEnum;
import com.doAI.backend.model.ConditionEnum;
import com.doAI.backend.model.Product;
import com.doAI.backend.model.ProductLocation;
import com.doAI.backend.model.ProductStateEnum;

import java.util.UUID;

public record ProductResponseDTO(
    UUID idProduct, 
    String name, 
    String description, 
    ConditionEnum condition, 
    String image, 
    CategoryEnum category, 
    ProductStateEnum state, 
    ProductLocation location,
    UUID createdByUserId,
    String createdByUserName,
    UUID processingUserId,
    String processingUserName
) {
    public ProductResponseDTO(Product product) {
        this(product.getIdProduct(),
             product.getName(),
             product.getDescription(),
             product.getCondition(),
             product.getImage(),
             product.getCategory(),
             product.getState(),
             product.getLocation(),
             product.getCreatedBy() != null ? product.getCreatedBy().getIdUser() : null,
             product.getCreatedBy() != null ? product.getCreatedBy().getName() : null,
             product.getProcessingUser() != null ? product.getProcessingUser().getIdUser() : null,
             product.getProcessingUser() != null ? product.getProcessingUser().getName() : null
        );
    }
}
