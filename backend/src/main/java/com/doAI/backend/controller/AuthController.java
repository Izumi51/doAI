package com.doAI.backend.controller;

import com.doAI.backend.dto.LoginRequestDTO;
import com.doAI.backend.dto.OtpRequestDTO;
import com.doAI.backend.dto.OtpVerificationDTO;
import com.doAI.backend.dto.PasswordResetDTO;
import com.doAI.backend.dto.RegisterRequestDTO;
import com.doAI.backend.dto.ResponseDTO;
import com.doAI.backend.infra.security.TokenService;
import com.doAI.backend.model.User;
import com.doAI.backend.repository.UserRepository;
import com.doAI.backend.service.OtpService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Autenticação", description = "Endpoints para autenticação de usuários, registro e recuperação de senha")
public class AuthController {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final OtpService otpService;

    @Operation(
        summary = "Realizar login",
        description = "Autentica um usuário com email e senha. Retorna um token JWT em caso de sucesso."
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Login realizado com sucesso",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ResponseDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Credenciais inválidas ou erro no login",
            content = @Content(
                mediaType = "application/json"
            )
        )
    })
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO body) {
        try {
            Optional<User> userOpt = this.repository.findByEmail(body.email());
            
            if(userOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Email ou senha inválidos"));
            }
            
            User user = userOpt.get();
            
            if(passwordEncoder.matches(body.password(), user.getPassword())) {
                String token = this.tokenService.generateToken(user);
                return ResponseEntity.ok(new ResponseDTO(user.getName(), token, user.getIdUser()));
            }
            
            return ResponseEntity.badRequest().body(Map.of("message", "Email ou senha inválidos"));
        } catch(Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Erro ao fazer login"));
        }
    }

    @Operation(
        summary = "Registrar novo usuário",
        description = "Cria uma nova conta de usuário com email, nome e senha. Retorna um token JWT em caso de sucesso."
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Usuário registrado com sucesso",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ResponseDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Email já está em uso ou erro no registro",
            content = @Content(
                mediaType = "application/json"
            )
        )
    })
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDTO body) {
        // Check if user already exists
        Optional<User> existingUser = this.repository.findByEmail(body.email());
        
        if(existingUser.isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email já está em uso"));
        }

        try {
            User newUser = new User();
            newUser.setPassword(passwordEncoder.encode(body.password()));
            newUser.setEmail(body.email());
            newUser.setName(body.name());

            this.repository.save(newUser);

            String token = this.tokenService.generateToken(newUser);
            return ResponseEntity.ok(new ResponseDTO(newUser.getName(), token, newUser.getIdUser()));
        } catch(Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Erro ao criar usuário"));
        }
    }

    @Operation(
        summary = "Solicitar código OTP",
        description = "Gera e envia um código OTP por email para recuperação de senha."
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "OTP enviado com sucesso",
            content = @Content(
                mediaType = "application/json"
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Erro ao enviar OTP",
            content = @Content(
                mediaType = "application/json"
            )
        )
    })
    @PostMapping("/otp/request")
    public ResponseEntity<?> requestOtp(@RequestBody OtpRequestDTO body) {
        try {
            String result = otpService.generateAndSendOtp(body.email());
            return ResponseEntity.ok(Map.of("message", result));
        } catch(Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Failed to send OTP: " + e.getMessage()));
        }
    }

    @Operation(
        summary = "Verificar código OTP",
        description = "Verifica se o código OTP fornecido é válido para o email especificado."
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "OTP verificado com sucesso",
            content = @Content(
                mediaType = "application/json"
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "OTP inválido ou expirado",
            content = @Content(
                mediaType = "application/json"
            )
        )
    })
    @PostMapping("/otp/verify")
    public ResponseEntity<?> verifyOtp(@RequestBody OtpVerificationDTO body) {
        try {
            boolean isValid = otpService.verifyOtp(body.email(), body.otp());
            
            if (isValid) {
                return ResponseEntity.ok(Map.of("message", "OTP verified successfully", "valid", true));
            } else {
                return ResponseEntity.badRequest().body(Map.of("message", "Invalid or expired OTP", "valid", false));
            }
        } catch(Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error verifying OTP: " + e.getMessage(), "valid", false));
        }
    }

    @Operation(
        summary = "Resetar senha",
        description = "Reseta a senha do usuário após verificação do código OTP."
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Senha resetada com sucesso",
            content = @Content(
                mediaType = "application/json"
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "OTP inválido, expirado ou erro ao resetar senha",
            content = @Content(
                mediaType = "application/json"
            )
        )
    })
    @PostMapping("/password/reset")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetDTO body) {
        try {
            // Verify and consume the OTP (marks it as used)
            boolean isValid = otpService.verifyAndConsumeOtp(body.email(), body.otp());

            if (isValid) {
                Optional<User> userOpt = repository.findByEmail(body.email());

                if (userOpt.isEmpty()) {
                    return ResponseEntity.badRequest().body(Map.of("message", "Usuário não encontrado"));
                }

                User user = userOpt.get();
                user.setPassword(passwordEncoder.encode(body.newPassword()));
                repository.save(user);

                return ResponseEntity.ok(Map.of("message", "Password reset successful"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("message", "Invalid or expired OTP"));
            }
        } catch(Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error resetting password: " + e.getMessage()));
        }
    }
}
