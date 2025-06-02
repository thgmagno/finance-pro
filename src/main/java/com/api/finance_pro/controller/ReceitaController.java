package com.api.finance_pro.controller;

import com.api.finance_pro.model.Receita;
import com.api.finance_pro.service.ReceitaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/receitas")
public class ReceitaController {

    private final ReceitaService service;

    public ReceitaController(ReceitaService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Receita> criar(@RequestBody Receita receita) {
        return ResponseEntity.ok(service.salvar(receita));
    }

    @GetMapping
    public ResponseEntity<Iterable<Receita>> listar() {
        return ResponseEntity.ok(service.listarTodas());
    }

}
