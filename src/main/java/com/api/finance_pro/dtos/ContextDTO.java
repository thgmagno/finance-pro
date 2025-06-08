package com.api.finance_pro.dtos;

import com.api.finance_pro.model.User;

import java.time.format.DateTimeFormatter;

public record ContextDTO(
        int id,
        String name,
        String email,
        String role,
        String createdAt
) {

    public static ContextDTO fromUser(User user) {
        return new ContextDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name().toLowerCase(),
                user.getCreated_at().format(DateTimeFormatter.ISO_LOCAL_DATE)
        );
    }

}
