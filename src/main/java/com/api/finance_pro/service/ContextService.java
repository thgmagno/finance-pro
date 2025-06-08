package com.api.finance_pro.service;

import com.api.finance_pro.model.User;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

@Service
public class ContextService {

    private final DataSource dataSource;

    public ContextService(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    private User parseUser(ResultSet rs) throws SQLException {
        final var id = rs.getInt("id");
        final var name = rs.getString("name");
        final var email = rs.getString("email");
        final var role = rs.getInt("role");
        final var createdAt = rs.getTimestamp("created_at");

        return new User(id, name, email, role, createdAt);
    }

    public Optional<User> getContext(int id) throws SQLException {
        final var sql = """
                SELECT * FROM public.users WHERE id = ?
                """;
        try (final var conn = dataSource.getConnection()) {
            final var stmt = conn.prepareStatement(sql);
            stmt.setInt(1, id);

            try (var rs = stmt.executeQuery()) {
                if (rs.next()) {
                    User user = parseUser(rs);
                    return Optional.of(user);
                }
            }
            return Optional.empty();
        }
    }

}
