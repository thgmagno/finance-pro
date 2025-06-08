package com.api.finance_pro;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FinanceProApplication {

    public static void main(String[] args) {
        try {
            final var dotenv = Dotenv.configure().ignoreIfMissing().load();

            setPropertyIfPresent("DB_URL", dotenv);
            setPropertyIfPresent("DB_USER", dotenv);
            setPropertyIfPresent("DB_PASS", dotenv);
            setPropertyIfPresent("JWT_SECRET", dotenv);
            setPropertyIfPresent("API_BASE_URL", dotenv);
            setPropertyIfPresent("APP_BASE_URL", dotenv);
            setPropertyIfPresent("MAILERSEND_USERNAME", dotenv);
            setPropertyIfPresent("MAILERSEND_PASSWORD", dotenv);
        } catch (Exception e) {
            System.out.println("Iniciando aplicação sem carregar as variáveis de ambiente do .env");
        }

        SpringApplication.run(FinanceProApplication.class, args);
    }

    private static void setPropertyIfPresent(String key, Dotenv dotenv) {
        String value = null;
        if (dotenv != null) {
            value = dotenv.get(key);
        }
        if (value == null) {
            value = System.getenv(key);
        }
        if (value != null) {
            System.setProperty(key, value);
        } else {
            System.out.printf("Variável de ambiente %s não encontrada%n", key);
        }
    }


}
