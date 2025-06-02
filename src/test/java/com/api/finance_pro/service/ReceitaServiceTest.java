package com.api.finance_pro.service;

import com.api.finance_pro.model.Receita;
import com.api.finance_pro.repository.ReceitaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class ReceitaServiceTest {

    @Autowired
    private ReceitaService service;

    @Autowired
    private ReceitaRepository repository;

    @BeforeEach
    void setUp() {
        repository.deleteAll();
    }

    @Test
    void deveSalvarReceita() {
        final var receita = new Receita();
        receita.setValor(new BigDecimal("100.00"));
        receita.setDescricao("Teste");
        receita.setDataVencimento(LocalDate.now().plusDays(1));
        receita.setBaixaAutomatica(false);

        Receita salva = service.salvar(receita);

        assertNotNull(salva.getId());
        assertEquals("Teste", salva.getDescricao());
    }

}