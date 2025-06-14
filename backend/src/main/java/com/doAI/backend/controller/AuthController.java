package com.doAI.backend.controller;

import com.doAI.backend.dto.LoginRequestDTO;
import com.doAI.backend.dto.RegisterRequestDTO;
import com.doAI.backend.dto.ResponseDTO;
import com.doAI.backend.infra.security.TokenService;
import com.doAI.backend.model.User;
import com.doAI.backend.repository.UserRepository;
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
public class AuthController {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

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
                return ResponseEntity.ok(new ResponseDTO(user.getName(), token));
            }
            
            return ResponseEntity.badRequest().body(Map.of("message", "Email ou senha inválidos"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Erro ao fazer login"));
        }
    }

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
            return ResponseEntity.ok(new ResponseDTO(newUser.getName(), token));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Erro ao criar usuário"));
        }
    }
}