package com.doAI.backend.infra.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "doAI - API de Doações",
        version = "1.0.0",
        description = "API REST para plataforma de doações que conecta doadores com pessoas em necessidade. " +
                      "A plataforma permite cadastro de produtos para doação, gerenciamento de usuários, " +
                      "autenticação segura com OTP via email e controle de estados das doações.",
        contact = @Contact(
            name = "Equipe doAI",
            email = "contato@doai.com"
        ),
        license = @License(
            name = "MIT License",
            url = "https://opensource.org/licenses/MIT"
        )
    ),
    servers = {
        @Server(
            url = "http://localhost:8080",
            description = "Servidor de Desenvolvimento"
        ),
        @Server(
            url = "https://api.doai.com",
            description = "Servidor de Produção"
        )
    }
)
@SecurityScheme(
    name = "Bearer Authentication",
    type = SecuritySchemeType.HTTP,
    bearerFormat = "JWT",
    scheme = "bearer",
    description = "Token JWT obtido através do endpoint de login. Formato: Bearer {token}"
)
public class OpenApiConfig {
}

