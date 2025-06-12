package com.doAI.backend.dto;

import com.doAI.backend.model.CategoryEnum;
import com.doAI.backend.model.ConditionEnum;

public record ProductRequestDTO(String name, ConditionEnum condition, String description, String image, CategoryEnum category, ProductLocationDTO location) {
}
