package com.doAI.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Dados necessários para realizar login")
public record LoginRequestDTO(
    @Schema(description = "Email do usuário", example = "user@example.com", required = true)
    String email,
    
    @Schema(description = "Senha do usuário", example = "password123", required = true)
    String password
) {
}
