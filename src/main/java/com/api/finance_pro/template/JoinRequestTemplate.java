package com.api.finance_pro.template;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class JoinRequestTemplate {

    private final String ownerName;
    private final String requesterName;

    public String build() {
        final var footer = FooterTemplate.build();
        return """
                <!DOCTYPE html>
                <html lang="pt-BR">
                  <body style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; color: #333;">
                    <h2 style="color: #2c3e50;">📥 Novo pedido de entrada – FinancePRO</h2>
                    <p>Olá, %s,</p>
                    <p>O usuário <strong>%s</strong> solicitou entrada no seu grupo da <strong>FinancePRO</strong>.</p>
                    <p>Você pode aprovar ou recusar essa solicitação diretamente no seu painel.</p>
                    %s
                  </body>
                </html>
                """.formatted(ownerName, requesterName, footer);
    }
}
