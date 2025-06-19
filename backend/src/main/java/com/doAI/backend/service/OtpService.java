package com.doAI.backend.service;

import com.doAI.backend.model.Otp;
import com.doAI.backend.repository.OtpRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import reactor.core.publisher.Mono;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class OtpService {
    
    private final OtpRepository otpRepository;
    private final WebClient.Builder webClientBuilder;
    private final ObjectMapper objectMapper;
    
    @Value("${emailjs.service.id}")
    private String emailjsServiceId;
    
    @Value("${emailjs.template.id}")
    private String emailjsTemplateId;
    
    @Value("${emailjs.public.key}")
    private String emailjsPublicKey;
    
    @Value("${emailjs.private.key}")
    private String emailjsPrivateKey;
    
    private static final int OTP_LENGTH = 6;
    private static final int OTP_EXPIRY_MINUTES = 5;
    private static final String EMAILJS_API_URL = "https://api.emailjs.com/api/v1.0/email/send";
    private static final String EMAILJS_SERVER_URL = "https://api.emailjs.com/api/v1.0/email/send-form";
    
    private final SecureRandom secureRandom = new SecureRandom();
    
    public String generateAndSendOtp(String email) {
        try {
            // Generate 6-digit OTP
            String otpCode = generateOtp();
            
            // Mark all previous OTPs for this email as used
            otpRepository.markPreviousOtpsAsUsed(email);
            
            // Create new OTP entity
            Otp otp = new Otp();
            otp.setEmail(email);
            otp.setOtpCode(otpCode);
            otp.setCreatedAt(LocalDateTime.now());
            otp.setExpiresAt(LocalDateTime.now().plusMinutes(OTP_EXPIRY_MINUTES));
            otp.setUsed(false);
            
            // Save to database
            otpRepository.save(otp);
            
            // Send OTP via EmailJS
            sendOtpEmail(email, otpCode);
            
            log.info("OTP generated and sent successfully for email: {}", email);
            return "OTP sent successfully";
            
        } catch (Exception e) {
            log.error("Error generating/sending OTP for email: {}", email, e);
            throw new RuntimeException("Failed to send OTP");
        }
    }
    
    public boolean verifyOtp(String email, String providedOtp) {
        try {
            // Find valid OTP for this email and code
            Optional<Otp> otpOpt = otpRepository.findByEmailAndOtpCodeAndUsedFalse(email, providedOtp);
            
            if (otpOpt.isEmpty()) {
                log.warn("OTP not found for email: {} and code: {}", email, providedOtp);
                return false;
            }
            
            Otp otp = otpOpt.get();
            
            // Check if OTP is still valid (not expired)
            if (!otp.isValid()) {
                log.warn("OTP expired for email: {}", email);
                return false;
            }
            
            // Don't mark OTP as used here - it will be marked as used when actually consumed (e.g., password reset)
            log.info("OTP verified successfully for email: {}", email);
            return true;
            
        } catch (Exception e) {
            log.error("Error verifying OTP for email: {}", email, e);
            return false;
        }
    }
    
    public boolean verifyAndConsumeOtp(String email, String providedOtp) {
        try {
            // Find valid OTP for this email and code
            Optional<Otp> otpOpt = otpRepository.findByEmailAndOtpCodeAndUsedFalse(email, providedOtp);
            
            if (otpOpt.isEmpty()) {
                log.warn("OTP not found for email: {} and code: {}", email, providedOtp);
                return false;
            }
            
            Otp otp = otpOpt.get();
            
            // Check if OTP is still valid (not expired)
            if (!otp.isValid()) {
                log.warn("OTP expired for email: {}", email);
                return false;
            }
            
            // Mark OTP as used (consume it)
            otp.setUsed(true);
            otpRepository.save(otp);
            
            log.info("OTP verified and consumed successfully for email: {}", email);
            return true;
            
        } catch (Exception e) {
            log.error("Error verifying and consuming OTP for email: {}", email, e);
            return false;
        }
    }
    
    // Scheduled task to clean up expired OTPs (runs every hour)
    @Scheduled(fixedRate = 3600000) // 1 hour in milliseconds
    public void cleanupExpiredOtps() {
        try {
            otpRepository.deleteExpiredOtps(LocalDateTime.now());
            log.debug("Cleaned up expired OTPs");
        } catch (Exception e) {
            log.error("Error cleaning up expired OTPs", e);
        }
    }
    
    private String generateOtp() {
        StringBuilder otp = new StringBuilder();
        for (int i = 0; i < OTP_LENGTH; i++) {
            otp.append(secureRandom.nextInt(10));
        }
        return otp.toString();
    }
    
    private void sendOtpEmail(String email, String otp) {
        try {
            // Try the JSON API first, then fall back to form-based if it fails
            try {
                sendOtpEmailJson(email, otp);
                log.info("EmailJS JSON API succeeded for: {}", email);
            } catch (Exception jsonException) {
                log.warn("EmailJS JSON API failed, trying form-based approach: {}", jsonException.getMessage());
                sendOtpEmailForm(email, otp);
                log.info("EmailJS form-based API succeeded for: {}", email);
            }
        } catch (Exception e) {
            log.error("Both EmailJS approaches failed for: {}", email, e);
            throw new RuntimeException("Failed to send email: " + e.getMessage());
        }
    }
    
    private void sendOtpEmailJson(String email, String otp) throws Exception {
        // Validate EmailJS configuration
        validateEmailJSConfig();
        
        WebClient webClient = webClientBuilder.build();
        
        Map<String, Object> emailData = new HashMap<>();
        emailData.put("service_id", emailjsServiceId);
        emailData.put("template_id", emailjsTemplateId);
        emailData.put("user_id", emailjsPublicKey);
        emailData.put("accessToken", emailjsPrivateKey);
        
        Map<String, Object> templateParams = new HashMap<>();
        templateParams.put("to_email", email);
        templateParams.put("otp_code", otp);
        templateParams.put("user_name", email.split("@")[0]);
        
        emailData.put("template_params", templateParams);
        
        log.info("Sending EmailJS JSON request with service_id: {}, template_id: {}", emailjsServiceId, emailjsTemplateId);
        log.debug("EmailJS JSON request payload: {}", objectMapper.writeValueAsString(emailData));
        
        Mono<String> response = webClient
            .post()
            .uri(EMAILJS_API_URL)
            .header("Content-Type", "application/json")
            .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
            .header("Origin", "https://localhost:3000")
            .header("Referer", "https://localhost:3000/")
            .bodyValue(emailData)
            .retrieve()
            .onStatus(
                status -> !status.is2xxSuccessful(),
                clientResponse -> {
                    return clientResponse.bodyToMono(String.class)
                        .flatMap(body -> {
                            log.error("EmailJS JSON API error - Status: {}, Body: {}", clientResponse.statusCode(), body);
                            return Mono.error(new RuntimeException("EmailJS JSON API error: " + clientResponse.statusCode() + " - " + body));
                        });
                }
            )
            .bodyToMono(String.class);
        
        String result = response.block();
        log.info("EmailJS JSON response: {}", result);
    }
    
    private void sendOtpEmailForm(String email, String otp) throws Exception {
        // Validate EmailJS configuration
        validateEmailJSConfig();
        
        WebClient webClient = webClientBuilder.build();
        
        // Use form-based approach
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("service_id", emailjsServiceId);
        formData.add("template_id", emailjsTemplateId);
        formData.add("user_id", emailjsPublicKey);
        formData.add("accessToken", emailjsPrivateKey);
        formData.add("template_params[to_email]", email);
        formData.add("template_params[otp_code]", otp);
        formData.add("template_params[user_name]", email.split("@")[0]);
        
        log.info("Sending EmailJS form request with service_id: {}, template_id: {}", emailjsServiceId, emailjsTemplateId);
        log.debug("EmailJS form request data: {}", formData.toString());
        
        Mono<String> response = webClient
            .post()
            .uri("https://api.emailjs.com/api/v1.0/email/send-form")
            .header("Content-Type", "application/x-www-form-urlencoded")
            .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
            .header("Origin", "https://localhost:3000")
            .header("Referer", "https://localhost:3000/")
            .bodyValue(formData)
            .retrieve()
            .onStatus(
                status -> !status.is2xxSuccessful(),
                clientResponse -> {
                    return clientResponse.bodyToMono(String.class)
                        .flatMap(body -> {
                            log.error("EmailJS form API error - Status: {}, Body: {}", clientResponse.statusCode(), body);
                            return Mono.error(new RuntimeException("EmailJS form API error: " + clientResponse.statusCode() + " - " + body));
                        });
                }
            )
            .bodyToMono(String.class);
        
        String result = response.block();
        log.info("EmailJS form response: {}", result);
    }
    
    private void validateEmailJSConfig() {
        if (emailjsServiceId == null || emailjsServiceId.trim().isEmpty()) {
            throw new RuntimeException("EmailJS Service ID is not configured");
        }
        if (emailjsTemplateId == null || emailjsTemplateId.trim().isEmpty()) {
            throw new RuntimeException("EmailJS Template ID is not configured");
        }
        if (emailjsPublicKey == null || emailjsPublicKey.trim().isEmpty()) {
            throw new RuntimeException("EmailJS Public Key is not configured");
        }
        if (emailjsPrivateKey == null || emailjsPrivateKey.trim().isEmpty()) {
            throw new RuntimeException("EmailJS Private Key is not configured");
        }
    }
}