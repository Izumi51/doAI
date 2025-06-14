package com.doAI.backend.service;

import com.doAI.backend.dto.ProductRequestDTO;
import com.doAI.backend.dto.ProductResponseDTO;
import com.doAI.backend.model.Product;
import com.doAI.backend.model.ProductLocation;
import com.doAI.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductResponseDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(ProductResponseDTO::new)
                .collect(Collectors.toList());
    }

    public ProductResponseDTO getProductById(UUID id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return new ProductResponseDTO(product);
    }

    public ProductResponseDTO createProduct(ProductRequestDTO productRequestDTO) {
        Product product = new Product(productRequestDTO);
        Product savedProduct = productRepository.save(product);
        return new ProductResponseDTO(savedProduct);
    }

    public ProductResponseDTO updateProduct(UUID id, ProductRequestDTO productRequestDTO) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        // Update the existing product with new data
        existingProduct.setName(productRequestDTO.name());
        existingProduct.setDescription(productRequestDTO.description());
        existingProduct.setCondition(productRequestDTO.condition());
        existingProduct.setImage(productRequestDTO.image());
        existingProduct.setCategory(productRequestDTO.category());

        // Update location
        ProductLocation location = existingProduct.getLocation();
        location.setLongitude(productRequestDTO.location().longitude());
        location.setLatitude(productRequestDTO.location().latitude());

        Product updatedProduct = productRepository.save(existingProduct);
        return new ProductResponseDTO(updatedProduct);
    }

    public void deleteProduct(UUID id) {
        if(!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }
}