# FinancePro API

API backend desenvolvida em **Java Spring Boot**, utilizando **PostgreSQL** como banco de dados.

Sistema de gestão **financeira** com integração **social**, permitindo o controle e compartilhamento de despesas, receitas e reservas entre grupos.

---

## ✅ Tecnologias Utilizadas

- Java 24+
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Lombok
- JUnit / Mockito (testes)
- Flyway (opcional para migrações)

---

## ✅ Funcionalidades previstas

### 🏦 Financeiro
- Cadastro e consulta de **Despesas**, **Receitas** e **Reservas**.
- Configuração de **baixa automática** no vencimento.
- **Extrato consolidado** com histórico financeiro.

### 🤝 Social
- Criação de **grupos de compartilhamento**.
- **Convites**, solicitações e respostas (aceitação/rejeição).
- Integração entre membros para gestão conjunta.

### 🔔 Notificações
- **Alerta de vencimento** de despesas e reservas.
- Notificações de **convites recebidos** e **respostas**.

### 📄 Processos Automáticos
- Rotina periódica para **baixa automática** de itens no vencimento.
- Geração de **snapshot JSON** com dados consolidados por usuário, para otimizar a performance do frontend.

---

## ✅ Estrutura inicial

- **Model**: entidades principais (Receita, Despesa, Reserva, Grupo, etc).
- **Repository**: interfaces JPA.
- **Service**: regras de negócio.
- **Controller**: endpoints REST.
- **Testes**: cobertura unitária e de integração desde o início.
