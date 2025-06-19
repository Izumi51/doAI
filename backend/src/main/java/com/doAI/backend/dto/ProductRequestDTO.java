package com.doAI.backend.dto;

import com.doAI.backend.model.CategoryEnum;
import com.doAI.backend.model.ConditionEnum;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Dados necessários para criar ou atualizar um produto")
public record ProductRequestDTO(
    @Schema(description = "Nome do produto", example = "Geladeira Brastemp", required = true)
    String name,
    
    @Schema(description = "Condição do produto", example = "USADO_BOM", allowableValues = {"NOVO", "USADO_EXCELENTE", "USADO_BOM", "USADO_REGULAR"}, required = true)
    ConditionEnum condition,
    
    @Schema(description = "Descrição detalhada do produto", example = "Geladeira em bom estado, funciona perfeitamente", required = true)
    String description,
    
    @Schema(description = "URL da imagem do produto", example = "https://example.com/image.jpg")
    String image,
    
    @Schema(description = "Categoria do produto", example = "ELETRODOMESTICOS", allowableValues = {"ELETRONICOS", "ELETRODOMESTICOS", "MOVEIS", "ROUPAS", "LIVROS", "BRINQUEDOS", "OUTROS"}, required = true)
    CategoryEnum category,
    
    @Schema(description = "Localização do produto", required = true)
    ProductLocationDTO location
) {
}
