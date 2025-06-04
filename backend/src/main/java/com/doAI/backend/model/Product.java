package com.doAI.backend.model;

import com.doAI.backend.dto.ProductRequestDTO;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.beans.BeanUtils;

import java.util.UUID;

@Table(name = "product")
@Entity(name = "product")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idProduct")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID idProduct;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String condition;

    @Column(nullable = false)
    private String image;

    public Product(ProductRequestDTO data) {
        this.description = data.description();
        this.condition = data.condition();
        this.image = data.image();
        this.name = data.name();
    }
}
