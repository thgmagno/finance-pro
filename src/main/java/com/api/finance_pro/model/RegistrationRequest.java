package com.api.finance_pro.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "registration_requests")
public class RegistrationRequest {
    @Id
    @GeneratedValue(generator = "increment")
    private int id;

    private String name;
    private String email;
    private String hash;
    private String key;
    private LocalDateTime expiresAt;

    public RegistrationRequest(String name, String email, String hash, String key, LocalDateTime expiresAt) {
        this.name = name;
        this.email = email;
        this.hash = hash;
        this.key = key;
        this.expiresAt = expiresAt;
    }
}
