# 📚 doAI API - Documentação Swagger

Esta API está **completamente documentada** com Swagger/OpenAPI 3.0! 🎉

## 🌐 Acessando a Documentação

### Interface Web Interativa (Swagger UI)
Após iniciar a aplicação, acesse:
```
http://localhost:8080/swagger-ui/index.html
```

### Especificação OpenAPI JSON
Para obter a especificação da API em formato JSON:
```
http://localhost:8080/v3/api-docs
```

### Especificação OpenAPI YAML
Para obter a especificação da API em formato YAML:
```
http://localhost:8080/v3/api-docs.yaml
```

## 🏷️ Tags e Endpoints Organizados

### 🔐 **Autenticação** (`/api/auth`)
- **POST** `/login` - Realizar login
- **POST** `/register` - Registrar novo usuário
- **POST** `/otp/request` - Solicitar código OTP
- **POST** `/otp/verify` - Verificar código OTP
- **POST** `/password/reset` - Resetar senha

### 📦 **Produtos** (`/api/products`)
- **GET** `/` - Listar todos os produtos
- **GET** `/{id}` - Buscar produto por ID
- **POST** `/` - Criar novo produto 🔒
- **PUT** `/{id}` - Atualizar produto 🔒
- **PUT** `/{id}/state` - Atualizar estado do produto 🔒
- **DELETE** `/{id}` - Deletar produto 🔒
- **GET** `/created-by/{userId}` - Produtos criados por usuário 🔒
- **GET** `/processing-by/{userId}` - Produtos processados por usuário 🔒

🔒 = Requer autenticação JWT

## 🔑 Autenticação

### Como Testar Endpoints Protegidos no Swagger UI:

1. **Faça login** primeiro:
   - Use o endpoint `POST /api/auth/login`
   - Copie o `token` da resposta

2. **Configure a autenticação**:
   - Clique no botão **"Authorize"** no topo da página
   - Insira: `Bearer {seu_token_aqui}`
   - Clique em **"Authorize"**

3. **Teste os endpoints protegidos**:
   - Agora você pode testar todos os endpoints que requerem autenticação

## 📋 Schemas Documentados

### Request DTOs
- `LoginRequestDTO` - Dados para login
- `RegisterRequestDTO` - Dados para registro
- `OtpRequestDTO` - Solicitação de OTP
- `OtpVerificationDTO` - Verificação de OTP
- `PasswordResetDTO` - Reset de senha
- `ProductRequestDTO` - Criação/atualização de produto
- `ProductStateUpdateDTO` - Atualização de estado
- `ProductLocationDTO` - Localização do produto

### Response DTOs
- `ResponseDTO` - Resposta de autenticação
- `ProductResponseDTO` - Dados completos do produto

### Enums Documentados
- `CategoryEnum` - Categorias de produtos
- `ConditionEnum` - Condições dos produtos
- `ProductStateEnum` - Estados dos produtos
- `LocationEnum` - Estados brasileiros

## 🎯 Recursos da Documentação

### ✅ O que está incluído:
- ✅ **Descrições detalhadas** de todos os endpoints
- ✅ **Exemplos** de request e response
- ✅ **Códigos de status HTTP** documentados
- ✅ **Schemas** completos de todos os DTOs
- ✅ **Autenticação JWT** configurada
- ✅ **Tags organizacionais** para melhor navegação
- ✅ **Validações** e tipos de dados especificados
- ✅ **Servidores** de desenvolvimento e produção
- ✅ **Informações de contato** e licença
- ✅ **Testes interativos** direto na interface

## 🚀 Como Iniciar

1. **Inicie a aplicação**:
   ```bash
   mvn spring-boot:run
   ```

2. **Acesse a documentação**:
   ```
   http://localhost:8080/swagger-ui/index.html
   ```

3. **Explore e teste** todos os endpoints interativamente!
