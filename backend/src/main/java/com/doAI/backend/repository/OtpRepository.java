package com.doAI.backend.repository;

import com.doAI.backend.model.Otp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface OtpRepository extends JpaRepository<Otp, Long> {
    
    // Find the most recent valid OTP for an email
    @Query("SELECT o FROM Otp o WHERE o.email = :email AND o.used = false AND o.expiresAt > :now ORDER BY o.createdAt DESC")
    Optional<Otp> findValidOtpByEmail(@Param("email") String email, @Param("now") LocalDateTime now);
    
    // Find OTP by email and code
    Optional<Otp> findByEmailAndOtpCodeAndUsedFalse(String email, String otpCode);
    
    // Delete expired OTPs (cleanup)
    @Modifying
    @Transactional
    @Query("DELETE FROM Otp o WHERE o.expiresAt < :now")
    void deleteExpiredOtps(@Param("now") LocalDateTime now);
    
    // Mark all previous OTPs for this email as used when generating a new one
    @Modifying
    @Transactional
    @Query("UPDATE Otp o SET o.used = true WHERE o.email = :email AND o.used = false")
    void markPreviousOtpsAsUsed(@Param("email") String email);
}

