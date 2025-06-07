package com.api.finance_pro.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Log {
    @Id
    @GeneratedValue(generator = "increment")
    private long id;

    private LocalDateTime timestamp;
    private Short level;
    private String message;
    private String origin;
    private Integer userId;
    private String userName;
    private String stackTrace;
    private String ipAddress;
    @Column(columnDefinition = "jsonb")
    private String additionalData;
}
