package com.doAI.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Dados para solicitar código OTP")
public record OtpRequestDTO(
    @Schema(description = "Email do usuário para envio do OTP", example = "user@example.com", required = true)
    String email
) {

}
