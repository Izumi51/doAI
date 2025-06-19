package com.doAI.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Dados para verificar código OTP")
public record OtpVerificationDTO(
    @Schema(description = "Email do usuário", example = "user@example.com", required = true)
    String email,
    
    @Schema(description = "Código OTP recebido por email", example = "123456", required = true)
    String otp
) {

}
