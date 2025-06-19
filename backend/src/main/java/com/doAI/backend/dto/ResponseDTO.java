package com.doAI.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;

@Schema(description = "Resposta de autenticação bem-sucedida")
public record ResponseDTO (
    @Schema(description = "Nome do usuário autenticado", example = "João Silva")
    String name,
    
    @Schema(description = "Token JWT para autenticação", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    String token,
    
    @Schema(description = "ID único do usuário", example = "123e4567-e89b-12d3-a456-426614174000")
    UUID userId
) {
}
