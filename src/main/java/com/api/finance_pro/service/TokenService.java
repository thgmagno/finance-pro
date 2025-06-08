package com.api.finance_pro.service;

import com.api.finance_pro.model.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${spring.application.name}")
    private String appName;

    @Value("${app.jwt.secret}")
    private String secret;

    public String generateToken(final User user) {
        try {
            return JWT.create()
                    .withIssuer(appName)
                    .withSubject(user.getEmail())
                    .withExpiresAt(generateExpirationDate())
                    .sign(generateAlgorithm());
        } catch (JWTCreationException e) {
            throw new RuntimeException("Ocorreu um erro ao gerar o token JWT:");
        }
    }

    public String validateToken(final String token) {
        try {
            final var verifier = JWT.require(generateAlgorithm()).withIssuer(appName).build();
            return verifier.verify(token).getSubject();
        } catch (Exception e) {
            return null;
        }
    }

    private Algorithm generateAlgorithm() {
        return Algorithm.HMAC256(secret);
    }

    private Instant generateExpirationDate() {
        return LocalDateTime.now().plusDays(7).toInstant(ZoneOffset.of("-03:00"));
    }

}
