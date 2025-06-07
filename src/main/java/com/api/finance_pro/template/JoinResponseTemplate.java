package com.api.finance_pro.template;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class JoinResponseTemplate {

    private final String userName;
    private final String groupName;
    private final boolean approved;

    public String build() {
        final var footer = FooterTemplate.build();

        if (approved) {
            return """
                    <!DOCTYPE html>
                    <html lang="pt-BR">
                      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; color: #333;">
                        <h2 style="color: #2c3e50;">🎉 Solicitação aprovada – FinancePRO</h2>
                        <p>Olá, %s,</p>
                        <p>Sua solicitação para participar do grupo "%s" foi aprovada!</p>
                        <p>Agora você poderá colaborar e compartilhar informações financeiras com os membros do grupo, mantendo tudo organizado em um só lugar.</p>
                        %s
                      </body>
                    </html>
                    """.formatted(userName, groupName, footer);
        } else {
            return """
                    <!DOCTYPE html>
                    <html lang="pt-BR">
                      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; color: #333;">
                        <h2 style="color: #2c3e50;">❌ Solicitação recusada – FinancePRO</h2>
                        <p>Olá, %s,</p>
                        <p>Sua solicitação para participar do grupo "%s" foi recusada.</p>
                        <p>Não se preocupe: você ainda pode continuar usando a <strong>FinancePRO</strong> normalmente, com todos os seus recursos pessoais disponíveis.</p>
                        %s
                      </body>
                    </html>
                    """.formatted(userName, groupName, footer);
        }
    }
}
