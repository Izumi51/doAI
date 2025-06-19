package com.doAI.backend.service;

import com.doAI.backend.dto.ProductRequestDTO;
import com.doAI.backend.dto.ProductResponseDTO;
import com.doAI.backend.dto.ProductStateUpdateDTO;
import com.doAI.backend.model.Product;
import com.doAI.backend.model.ProductLocation;
import com.doAI.backend.model.ProductStateEnum;
import com.doAI.backend.model.User;
import com.doAI.backend.repository.ProductRepository;
import com.doAI.backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductService(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public List<ProductResponseDTO> getAllProducts() {
        return productRepository.findByState(ProductStateEnum.DISPONIVEL)
                .stream()
                .map(ProductResponseDTO::new)
                .collect(Collectors.toList());
    }

    public ProductResponseDTO getProductById(UUID id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return new ProductResponseDTO(product);
    }

    public List<ProductResponseDTO> getProductsCreatedByUser(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        List<Product> products = productRepository.findByCreatedBy(user);
        return products.stream()
                .map(ProductResponseDTO::new)
                .collect(Collectors.toList());
    }

    public List<ProductResponseDTO> getProductsByProcessingUser(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        List<Product> products = productRepository.findByProcessingUser(user);
        return products.stream()
                .map(ProductResponseDTO::new)
                .collect(Collectors.toList());
    }

    public ProductResponseDTO createProduct(ProductRequestDTO productRequestDTO, UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        Product product = new Product(productRequestDTO, user);
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
        location.setLocation(productRequestDTO.location().location());

        Product updatedProduct = productRepository.save(existingProduct);
        return new ProductResponseDTO(updatedProduct);
    }

    public ProductResponseDTO updateProductState(UUID id, ProductStateUpdateDTO stateUpdateDTO) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        // Update only the state
        existingProduct.setState(stateUpdateDTO.state());

        Product updatedProduct = productRepository.save(existingProduct);
        return new ProductResponseDTO(updatedProduct);
    }

    public ProductResponseDTO updateProductState(UUID id, ProductStateUpdateDTO stateUpdateDTO, UUID userId) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        // Update the state
        existingProduct.setState(stateUpdateDTO.state());

        // If the new state is PROCESSANDO, set the processing user
        if (stateUpdateDTO.state() == ProductStateEnum.PROCESSANDO) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
            existingProduct.setProcessingUser(user);
        }

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