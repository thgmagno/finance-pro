package com.api.finance_pro.service.email.template;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class VerifyAccountTemplate implements EmailTemplate {

    private final String userName;
    private final String verifyLink;

    public String build() {
        final var footer = FooterTemplate.build();

        return """
                <!DOCTYPE html>
                <html lang="pt-BR">
                  <body style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; color: #333;">
                    <p>Olá, %s,</p>
                    <p>Estamos quase lá! Clique no botão abaixo para verificar sua conta e começar a usar a <strong>FinancePRO</strong>:</p>
                    <p>
                      <a href="%s" style="display: inline-block; background-color: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Verificar Conta</a>
                    </p>
                    <p>Este link vai expirar em 15 minutos.</p>
                    <p>Se não foi você quem criou essa conta, ignore este e-mail.</p>
                    %s
                  </body>
                </html>
                """.formatted(userName, verifyLink, footer);
    }

    public String getSubject() {
        return "Verifique sua conta – FinancePRO";
    }
}
