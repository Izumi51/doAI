package com.doAI.backend.dto;

import java.util.UUID;

public record ResponseDTO (String name, String token, UUID userId) {
}
