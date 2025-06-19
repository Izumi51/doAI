package com.doAI.backend.dto;

import com.doAI.backend.model.LocationEnum;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Localização do produto para doação")
public record ProductLocationDTO(
    @Schema(description = "Estado onde o produto está localizado", example = "SP", required = true)
    LocationEnum location
) {
}

