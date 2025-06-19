package com.doAI.backend.controller;

import com.doAI.backend.dto.ProductRequestDTO;
import com.doAI.backend.dto.ProductResponseDTO;
import com.doAI.backend.dto.ProductStateUpdateDTO;
import com.doAI.backend.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@Tag(name = "Produtos", description = "Endpoints para gerenciamento de produtos de doação")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @Operation(
        summary = "Listar todos os produtos",
        description = "Retorna uma lista de todos os produtos disponíveis para doação."
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Lista de produtos retornada com sucesso",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ProductResponseDTO.class)
            )
        )
    })
    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        List<ProductResponseDTO> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @Operation(
        summary = "Buscar produto por ID",
        description = "Retorna um produto específico pelo seu ID único."
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Produto encontrado com sucesso",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ProductResponseDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Produto não encontrado"
        )
    })
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(
        @Parameter(description = "ID único do produto", required = true)
        @PathVariable UUID id) {
        ProductResponseDTO product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @Operation(
        summary = "Criar novo produto",
        description = "Cria um novo produto para doação. Requer autenticação."
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "201",
            description = "Produto criado com sucesso",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ProductResponseDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Dados inválidos fornecidos"
        ),
        @ApiResponse(
            responseCode = "401",
            description = "Não autorizado - token JWT necessário"
        )
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping
    public ResponseEntity<ProductResponseDTO> createProduct(
            @Parameter(description = "Dados do produto a ser criado", required = true)
            @RequestBody ProductRequestDTO productRequestDTO,
            @Parameter(description = "ID do usuário que está criando o produto")
            @RequestParam(name = "userId", required = false) UUID userId) {
        ProductResponseDTO createdProduct;
        createdProduct = productService.createProduct(productRequestDTO, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @Operation(
        summary = "Atualizar produto",
        description = "Atualiza os dados de um produto existente. Requer autenticação."
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Produto atualizado com sucesso",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ProductResponseDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Produto não encontrado"
        ),
        @ApiResponse(
            responseCode = "401",
            description = "Não autorizado - token JWT necessário"
        )
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> updateProduct(
            @Parameter(description = "ID do produto a ser atualizado", required = true)
            @PathVariable UUID id,
            @Parameter(description = "Novos dados do produto", required = true)
            @RequestBody ProductRequestDTO productRequestDTO) {
        ProductResponseDTO updatedProduct = productService.updateProduct(id, productRequestDTO);
        return ResponseEntity.ok(updatedProduct);
    }

    @Operation(
        summary = "Atualizar estado do produto",
        description = "Atualiza o estado de um produto (Disponível, Processando, Concluído). Requer autenticação."
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Estado do produto atualizado com sucesso",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ProductResponseDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Produto não encontrado"
        ),
        @ApiResponse(
            responseCode = "401",
            description = "Não autorizado - token JWT necessário"
        )
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PutMapping("/{id}/state")
    public ResponseEntity<ProductResponseDTO> updateProductState(
            @Parameter(description = "ID do produto", required = true)
            @PathVariable UUID id,
            @Parameter(description = "Novo estado do produto", required = true)
            @RequestBody ProductStateUpdateDTO stateUpdateDTO,
            @Parameter(description = "ID do usuário que está processando (opcional)")
            @RequestParam(name = "userId", required = false) UUID userId) {

        ProductResponseDTO updatedProduct;
        if (userId != null) {
            updatedProduct = productService.updateProductState(id, stateUpdateDTO, userId);
        } else {
            updatedProduct = productService.updateProductState(id, stateUpdateDTO);
        }
        return ResponseEntity.ok(updatedProduct);
    }

    @Operation(
        summary = "Deletar produto",
        description = "Remove um produto da plataforma. Requer autenticação."
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "204",
            description = "Produto deletado com sucesso"
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Produto não encontrado"
        ),
        @ApiResponse(
            responseCode = "401",
            description = "Não autorizado - token JWT necessário"
        )
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(
        @Parameter(description = "ID do produto a ser deletado", required = true)
        @PathVariable UUID id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(
        summary = "Listar produtos criados por usuário",
        description = "Retorna todos os produtos criados por um usuário específico. Requer autenticação."
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Lista de produtos retornada com sucesso",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ProductResponseDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Usuário não encontrado"
        ),
        @ApiResponse(
            responseCode = "401",
            description = "Não autorizado - token JWT necessário"
        )
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping("/created-by/{userId}")
    public ResponseEntity<List<ProductResponseDTO>> getProductsCreatedByUser(
        @Parameter(description = "ID do usuário criador", required = true)
        @PathVariable UUID userId) {
        List<ProductResponseDTO> products = productService.getProductsCreatedByUser(userId);
        return ResponseEntity.ok(products);
    }

    @Operation(
        summary = "Listar produtos sendo processados por usuário",
        description = "Retorna todos os produtos que estão sendo processados por um usuário específico. Requer autenticação."
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Lista de produtos retornada com sucesso",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ProductResponseDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Usuário não encontrado"
        ),
        @ApiResponse(
            responseCode = "401",
            description = "Não autorizado - token JWT necessário"
        )
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping("/processing-by/{userId}")
    public ResponseEntity<List<ProductResponseDTO>> getProductsByProcessingUser(
        @Parameter(description = "ID do usuário que está processando", required = true)
        @PathVariable UUID userId) {
        List<ProductResponseDTO> products = productService.getProductsByProcessingUser(userId);
        return ResponseEntity.ok(products);
    }
}
