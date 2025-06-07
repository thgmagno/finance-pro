package com.api.finance_pro.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class RegistrationRequest {
    @Id
    @GeneratedValue(generator = "increment")
    private int id;

    private String name;
    private String email;
    private String hash;
    private String token;
    private LocalDateTime expiresAt;

    public RegistrationRequest(final String name, final String email, final String hash, final String token) {
        this.name = name;
        this.email = email;
        this.hash = hash;
        this.token = token;
    }
}
