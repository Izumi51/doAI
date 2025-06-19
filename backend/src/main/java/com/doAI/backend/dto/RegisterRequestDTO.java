package com.doAI.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Dados necessários para criar uma nova conta")
public record RegisterRequestDTO(
    @Schema(description = "Nome completo do usuário", example = "João Silva", required = true)
    String name,
    
    @Schema(description = "Email do usuário (deve ser único)", example = "joao@example.com", required = true)
    String email,
    
    @Schema(description = "Senha do usuário (mínimo 6 caracteres)", example = "password123", required = true)
    String password
) {
}
