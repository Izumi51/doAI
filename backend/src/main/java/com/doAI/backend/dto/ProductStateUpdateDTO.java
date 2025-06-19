package com.doAI.backend.dto;

import com.doAI.backend.model.ProductStateEnum;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Dados para atualizar o estado de um produto")
public record ProductStateUpdateDTO(
    @Schema(description = "Novo estado do produto", example = "PROCESSANDO", allowableValues = {"DISPONIVEL", "PROCESSANDO", "CONCLUIDO"}, required = true)
    ProductStateEnum state
) {
}

