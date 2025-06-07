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

		SpringApplication.run(FinanceProApplication.class, args);
    }

}
