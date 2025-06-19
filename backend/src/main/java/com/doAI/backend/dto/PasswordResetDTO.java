package com.doAI.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Dados para resetar senha com código OTP")
public record PasswordResetDTO(
    @Schema(description = "Email do usuário", example = "user@example.com", required = true)
    String email,
    
    @Schema(description = "Código OTP recebido por email", example = "123456", required = true)
    String otp,
    
    @Schema(description = "Nova senha do usuário", example = "newPassword123", required = true)
    String newPassword
) {

}

