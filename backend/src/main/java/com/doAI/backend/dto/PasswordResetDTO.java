package com.doAI.backend.dto;

public record PasswordResetDTO(String email, String otp, String newPassword) {

}

