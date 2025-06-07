package com.api.finance_pro;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Objects;

@SpringBootApplication
public class FinanceProApplication {

    public static void main(String[] args) {
        final var dotenv = Dotenv.load();

        System.setProperty("DB_URL", Objects.requireNonNull(dotenv.get("DB_URL")));
        System.setProperty("DB_USER", Objects.requireNonNull(dotenv.get("DB_USER")));
        System.setProperty("DB_PASS", Objects.requireNonNull(dotenv.get("DB_PASS")));
        System.setProperty("BASE_URL", Objects.requireNonNull(dotenv.get("BASE_URL")));
        System.setProperty("MAILERSEND_USERNAME", Objects.requireNonNull(dotenv.get("MAILERSEND_USERNAME")));
        System.setProperty("MAILERSEND_PASSWORD", Objects.requireNonNull(dotenv.get("MAILERSEND_PASSWORD")));

        SpringApplication.run(FinanceProApplication.class, args);
    }

}
