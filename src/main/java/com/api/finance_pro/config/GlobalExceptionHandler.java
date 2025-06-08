package com.api.finance_pro.config;

import com.api.finance_pro.model.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.sql.SQLException;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ApiResponse<Void>> handleMissingParams(MissingServletRequestParameterException ex) {
        final var message = "Parâmetro obrigatório '%s' está faltando.".formatted(ex.getParameterName());
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.fail(message, null));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGenericException(Exception ex) {
        logger.error("Erro interno no servidor. ", ex);

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.fail("Erro interno. Tente novamente mais tarde.", null));
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponse<Void>> handleBadCredentials(BadCredentialsException ex) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ApiResponse.fail("Usuário ou senha inválidos.", null));
    }

    @ExceptionHandler(SQLException.class)
    public ResponseEntity<ApiResponse<Void>> handleSQLException(SQLException ex) {
        logger.error("Erro SQL: code={}, state={}, message={}", ex.getErrorCode(), ex.getSQLState(), ex.getMessage(), ex);

        final var sqlState = ex.getSQLState();

        if ("07000".equals(sqlState) && ex.getMessage().contains("No value specified for parameter")) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.fail("Erro interno: parâmetro não informado na consulta.", null));
        }

        return switch (sqlState) {
            case "23505" ->
                    ResponseEntity.badRequest().body(ApiResponse.fail("Já existe um registro com esse valor.", null));
            case "23503" ->
                    ResponseEntity.badRequest().body(ApiResponse.fail("Referência inválida. Verifique os dados relacionados.", null));
            case "23502" ->
                    ResponseEntity.badRequest().body(ApiResponse.fail("Campo obrigatório não informado.", null));
            case "22001" ->
                    ResponseEntity.badRequest().body(ApiResponse.fail("Valor informado excede o tamanho permitido.", null));
            case "23514" ->
                    ResponseEntity.badRequest().body(ApiResponse.fail("Valor inválido para um dos campos.", null));
            default -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.fail("Erro interno de banco de dados. Tente novamente mais tarde.", null));
        };
    }

}
