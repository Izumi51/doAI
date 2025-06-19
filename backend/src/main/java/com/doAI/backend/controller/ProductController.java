package com.doAI.backend.controller;

import com.doAI.backend.dto.ProductRequestDTO;
import com.doAI.backend.dto.ProductResponseDTO;
import com.doAI.backend.dto.ProductStateUpdateDTO;
import com.doAI.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        List<ProductResponseDTO> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable UUID id) {
        ProductResponseDTO product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping
    public ResponseEntity<ProductResponseDTO> createProduct(
            @RequestBody ProductRequestDTO productRequestDTO,
            @RequestParam(name = "userId", required = false) UUID userId) {
        ProductResponseDTO createdProduct;
        createdProduct = productService.createProduct(productRequestDTO, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> updateProduct(
            @PathVariable UUID id,
            @RequestBody ProductRequestDTO productRequestDTO) {
        ProductResponseDTO updatedProduct = productService.updateProduct(id, productRequestDTO);
        return ResponseEntity.ok(updatedProduct);
    }

    @PutMapping("/{id}/state")
    public ResponseEntity<ProductResponseDTO> updateProductState(
            @PathVariable UUID id,
            @RequestBody ProductStateUpdateDTO stateUpdateDTO,
            @RequestParam(name = "userId", required = false) UUID userId) {

        ProductResponseDTO updatedProduct;
        if (userId != null) {
            updatedProduct = productService.updateProductState(id, stateUpdateDTO, userId);
        } else {
            updatedProduct = productService.updateProductState(id, stateUpdateDTO);
        }
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/created-by/{userId}")
    public ResponseEntity<List<ProductResponseDTO>> getProductsCreatedByUser(@PathVariable UUID userId) {
        List<ProductResponseDTO> products = productService.getProductsCreatedByUser(userId);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/processing-by/{userId}")
    public ResponseEntity<List<ProductResponseDTO>> getProductsByProcessingUser(@PathVariable UUID userId) {
        List<ProductResponseDTO> products = productService.getProductsByProcessingUser(userId);
        return ResponseEntity.ok(products);
    }
}
