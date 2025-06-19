# doAI - Plataforma de Doações

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23336791.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Descrição

doAI é uma plataforma web moderna que conecta doadores com pessoas em necessidade através de um sistema intuitivo de doações. A plataforma permite que usuários cadastrem produtos para doação e que outros usuários possam processar essas doações, facilitando a redistribuição de bens na comunidade.

### Principais Funcionalidades

- **🔐 Autenticação Segura**: Sistema de autenticação com verificação por OTP via email
- **📧 Integração de Email**: Notificações automáticas e entrega de códigos OTP
- **📦 Gestão de Produtos**: CRUD para itens de doação com mapeamento de localização
- **👥 Gestão de Usuários**: Perfis completos de usuário e fluxos de autenticação
- **🌐 Interface Moderna**: Design responsivo construído com React e TailwindCSS
- **🔒 Segurança**: Autenticação JWT com Spring Security
- **📱 Design Responsivo**: Abordagem mobile-first com componentes de UI modernos

### Diferenciais da Plataforma

- **Sistema de Estados**: Produtos passam por diferentes estados (Disponível, Processando, Concluído)
- **Mapeamento de Localização**: Sistema de localização para facilitar a logística das doações
- **Interface Intuitiva**: Experiência de usuário simplificada para doadores e receptores
- **Tecnologias Modernas**: Utiliza as versões mais recentes do Spring Boot 3.5, React 19 e Java 24
- **API RESTful**: Design de API bem estruturado com tratamento adequado de erros

## Instalação

### Requisitos

- **Java 24** ou superior
- **Node.js 18+** e npm
- **PostgreSQL 12+**
- **Maven 3.6+**
- **Git**

### Configuração do Backend

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seuusuario/doai.git
   cd doai
   ```

2. **Configure o banco de dados**:
   - Crie um banco PostgreSQL chamado `doai`
   - Atualize as configurações no arquivo `backend/src/main/resources/application.properties`

3. **Configure as variáveis de ambiente**:
   - Copie o arquivo `backend/.env.example` para `backend/.env`
   - Configure suas credenciais de email e banco de dados

4. **Instale as dependências e execute**:
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```

   O backend será iniciado em `http://localhost:8080`

### Configuração do Frontend

1. **Navegue para o diretório frontend**:
   ```bash
   cd frontend
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

   O frontend será iniciado em `http://localhost:5173`

## Estrutura do Projeto

```
doai/
├── backend/                 # API REST Spring Boot
│   ├── src/main/java/
│   │   └── com/doAI/backend/
│   │       ├── controller/  # Controladores REST
│   │       ├── service/     # Lógica de Negócio
│   │       ├── model/       # Entidades JPA
│   │       ├── repository/  # Camada de Acesso a Dados
│   │       ├── dto/         # Objetos de Transferência de Dados
│   │       └── infra/       # Segurança e Configuração
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/                # SPA React
│   ├── src/
│   │   ├── components/      # Componentes Reutilizáveis
│   │   │   ├── Auth/       # Componentes de Autenticação
│   │   │   ├── User/       # Gestão de Usuário
│   │   │   ├── Cards/      # Cards de Produto
│   │   │   ├── Header/     # Cabeçalho
│   │   │   └── Footer/     # Rodapé
│   │   ├── pages/          # Componentes de Página
│   │   ├── api/            # Integração com API
│   │   ├── auth/           # Contexto de Autenticação
│   │   └── products/       # Contexto de Produtos
│   ├── package.json
│   └── tailwind.config.js
├── OTP_SETUP.md            # Guia de Configuração OTP
└── README.md
```

## Tecnologias Utilizadas

### Backend
- **Spring Boot 3.5.0** - Framework principal
- **Spring Security** - Autenticação e autorização
- **Spring Data JPA** - Abstração de banco de dados
- **PostgreSQL** - Banco de dados principal
- **Java JWT** - Implementação de JSON Web Token
- **Spring Mail** - Funcionalidade de email
- **Lombok** - Geração de código
- **Maven** - Gerenciamento de dependências

### Frontend
- **React 19.1.0** - Framework de UI
- **Vite** - Ferramenta de build e servidor de desenvolvimento
- **React Router 7.6** - Roteamento do lado cliente
- **TailwindCSS 4.1** - Framework CSS utility-first
- **Axios** - Cliente HTTP
- **Heroicons** - Biblioteca de ícones
- **EmailJS** - Integração de serviço de email

## Endpoints da API

### Autenticação
- `POST /auth/login` - Login do usuário
- `POST /auth/register` - Registro do usuário
- `POST /auth/otp/request` - Solicitar OTP para reset de senha
- `POST /auth/otp/verify` - Verificar código OTP
- `POST /auth/password/reset` - Resetar senha com OTP

### Produtos
- `GET /products` - Listar todos os produtos disponíveis
- `POST /products` - Criar novo produto
- `GET /products/{id}` - Buscar produto por ID
- `PUT /products/{id}` - Atualizar produto
- `DELETE /products/{id}` - Deletar produto
- `PUT /products/{id}/state` - Atualizar estado do produto
- `GET /products/created-by/{userId}` - Produtos criados por usuário
- `GET /products/processing-by/{userId}` - Produtos sendo processados por usuário

## Como Usar

1. **Inicie os servidores backend e frontend** seguindo as instruções de instalação
2. **Acesse a aplicação** em `http://localhost:5173`
3. **Registre uma nova conta** ou faça login com credenciais existentes
4. **Navegue pelos itens de doação** disponíveis ou cadastre novos itens
5. **Gerencie suas doações** através do painel do usuário
6. **Use o sistema OTP** para reset seguro de senha quando necessário

## Fluxo de Doações

1. **Doador** cadastra um produto com descrição, categoria, condição e localização
2. **Produto** fica disponível na plataforma para visualização
3. **Receptor** visualiza produtos disponíveis e manifesta interesse
4. **Sistema** atualiza o estado do produto para "Processando"
5. **Usuários** coordenam a entrega através da plataforma
6. **Doação** é finalizada e marcada como concluída

## Contribuição

Contribuições são bem-vindas! Siga estas etapas:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas mudanças (`git commit -m 'feat: adicionar nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Abra uma issue no GitHub
3. Entre em contato com a equipe de desenvolvimento

---

**Nota**: Este projeto está em desenvolvimento ativo. Algumas funcionalidades podem estar sujeitas a mudanças.
