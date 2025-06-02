package com.api.finance_pro.service;

import com.api.finance_pro.model.Receita;
import com.api.finance_pro.repository.ReceitaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReceitaService {

    private final ReceitaRepository repository;

    public ReceitaService(ReceitaRepository repository) {
        this.repository = repository;
    }

    public Receita salvar(Receita receita) {
        return repository.save(receita);
    }

    public List<Receita> listarTodas() {
        return repository.findAll();
    }

}
