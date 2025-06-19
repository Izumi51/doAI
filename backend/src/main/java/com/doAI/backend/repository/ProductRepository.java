package com.doAI.backend.repository;

import com.doAI.backend.model.Product;
import com.doAI.backend.model.ProductStateEnum;
import com.doAI.backend.model.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
    List<Product> findByState(ProductStateEnum state);
    List<Product> findByCreatedBy(User createdBy);
    List<Product> findByProcessingUser(User processingUser);
}
