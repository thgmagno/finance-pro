package com.api.finance_pro.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Receita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private BigDecimal valor;
    private String descricao;
    private String categoria;
    private String observacao;
    private LocalDate dataVencimento;
    private boolean baixaAutomatica;
    private ReceitaStatus status;

    enum ReceitaStatus {
        PENDENTE,
        RECEBIDO
    }
}