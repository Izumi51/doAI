package com.doAI.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "locations")
@Entity(name = "locations")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idLocation")
public class ProductLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long idLocation;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LocationEnum location;
}