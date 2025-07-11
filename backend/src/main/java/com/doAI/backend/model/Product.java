package com.doAI.backend.model;

import com.doAI.backend.dto.ProductRequestDTO;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Table(name = "products")
@Entity(name = "products")
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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ConditionEnum condition;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CategoryEnum category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProductStateEnum state;

    @Column(nullable = false)
    private String image;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "location_id", nullable = false)
    private ProductLocation location;

    // User who created the product
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_user_id", nullable = false)
    private User createdBy;

    // User who updated the product to PROCESSANDO state
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "processing_user_id", nullable = true)
    private User processingUser;

    public Product(ProductRequestDTO data, User createdBy) {
        this.description = data.description();
        this.condition = data.condition();
        this.image = data.image();
        this.name = data.name();
        this.category = data.category();
        this.state = ProductStateEnum.DISPONIVEL; // Default state
        this.location = new ProductLocation(null, data.location().location());
        this.createdBy = createdBy;
    }
}
