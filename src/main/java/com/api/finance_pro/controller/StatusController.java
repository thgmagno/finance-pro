package com.api.finance_pro.controller;

import com.api.finance_pro.model.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/status")
public class StatusController {

    @GetMapping
    public ResponseEntity<ApiResponse<Void>> getStatus() {
        return ResponseEntity.ok(ApiResponse.success("Serviço está funcionando normalmente!", null));
    }

}
