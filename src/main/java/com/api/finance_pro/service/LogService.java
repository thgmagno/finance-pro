package com.api.finance_pro.service;

import com.api.finance_pro.model.LogLevel;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Arrays;

@Service
public class LogService {

    private final DataSource dataSource;

    public LogService(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void logInfo(String message) {
        log(LogLevel.INFO, message, null, null);
    }

    public void logWarn(String message) {
        log(LogLevel.WARN, message, null, null);
    }

    public void logError(String message, Throwable throwable) {
        final var origin = throwable != null ? throwable.toString() : null;
        final var stackTrace = throwable != null ? throwable.getStackTrace() : null;
        log(LogLevel.ERROR, message, origin, Arrays.toString(stackTrace));
    }

    private void log(LogLevel level, String message, String origin, String stackTrace) {
        String sql = "INSERT INTO logs (timestamp, level, message, origin, stack_trace) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setTimestamp(1, Timestamp.from(Instant.now()));
            ps.setInt(2, level.getCode());
            ps.setString(3, message);
            ps.setString(4, origin != null ? origin.substring(0, Math.min(origin.length(), 100)) : null);
            ps.setString(5, stackTrace);

            ps.executeUpdate();

        } catch (SQLException e) {
            System.err.println("Erro ao gravar log: " + e.getMessage());
        }
    }

}
