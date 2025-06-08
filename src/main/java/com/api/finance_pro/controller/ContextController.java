package com.api.finance_pro.controller;

import com.api.finance_pro.dtos.ContextDTO;
import com.api.finance_pro.model.ApiResponse;
import com.api.finance_pro.model.User;
import com.api.finance_pro.service.ContextService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/me")
public class ContextController {

    @Autowired
    private ContextService contextService;

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getContext() {
        final var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        final var ctx = ContextDTO.fromUser(user);

        return ResponseEntity.ok(ApiResponse.success("Contexto atualizado com sucesso.", Map.of("userCtx", ctx)));
    }

}
