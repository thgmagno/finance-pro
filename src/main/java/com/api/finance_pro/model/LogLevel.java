package com.api.finance_pro.model;

import lombok.Getter;

@Getter
public enum LogLevel {
    INFO(0, "info"),
    WARN(1, "warn"),
    ERROR(2, "error");

    private final int code;
    private final String level;

    LogLevel(final int code, final String level) {
        this.code = code;
        this.level = level;
    }
}
