package com.doAI.backend.dto;

import com.doAI.backend.model.CategoryEnum;
import com.doAI.backend.model.ConditionEnum;
import com.doAI.backend.model.Product;
import com.doAI.backend.model.ProductLocation;
import com.doAI.backend.model.ProductStateEnum;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

@Schema(description = "Resposta completa com dados de um produto")
public record ProductResponseDTO(
    @Schema(description = "ID único do produto", example = "123e4567-e89b-12d3-a456-426614174000")
    UUID idProduct,
    
    @Schema(description = "Nome do produto", example = "Geladeira Brastemp")
    String name,
    
    @Schema(description = "Descrição do produto", example = "Geladeira em bom estado, funciona perfeitamente")
    String description,
    
    @Schema(description = "Condição do produto", example = "USADO_BOM")
    ConditionEnum condition,
    
    @Schema(description = "URL da imagem do produto", example = "https://example.com/image.jpg")
    String image,
    
    @Schema(description = "Categoria do produto", example = "ELETRODOMESTICOS")
    CategoryEnum category,
    
    @Schema(description = "Estado atual do produto", example = "DISPONIVEL")
    ProductStateEnum state,
    
    @Schema(description = "Localização do produto")
    ProductLocation location,
    
    @Schema(description = "ID do usuário que criou o produto", example = "123e4567-e89b-12d3-a456-426614174001")
    UUID createdByUserId,
    
    @Schema(description = "Nome do usuário que criou o produto", example = "João Silva")
    String createdByUserName,
    
    @Schema(description = "ID do usuário que está processando o produto", example = "123e4567-e89b-12d3-a456-426614174002")
    UUID processingUserId,
    
    @Schema(description = "Nome do usuário que está processando o produto", example = "Maria Santos")
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
