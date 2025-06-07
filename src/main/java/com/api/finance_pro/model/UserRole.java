package com.api.finance_pro.model;

import lombok.Getter;

@Getter
public enum UserRole {
    ADMIN(0, "ADMIN"),
    USER(1, "USER"),
    VISITANT(2, "VISITANT");

    private final int code;
    private final String role;

    UserRole(final int code, final String name) {
        this.code = code;
        this.role = name;
    }
}
