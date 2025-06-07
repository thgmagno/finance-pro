package com.api.finance_pro.template;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ResetPasswordTemplate implements EmailTemplate {

    private final String userName;
    private final String resetLink;

    public String build() {
        final var footer = FooterTemplate.build();

        return """
                <!DOCTYPE html>
                <html lang="pt-BR">
                  <body style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; color: #333;">
                    <p>Olá, %s,</p>
                    <p>Recebemos uma solicitação para redefinir sua senha.</p>
                    <p>Clique no botão abaixo para criar uma nova senha:</p>
                    <p>
                      <a href="%s" style="display: inline-block; background-color: #2ecc71; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Redefinir Senha</a>
                    </p>
                    <p>Se você não solicitou isso, apenas ignore este e-mail.</p>
                    %s
                  </body>
                </html>
                """.formatted(userName, resetLink, footer);
    }

    @Override
    public String getSubject() {
        return "🔒 Redefinir senha – FinancePRO";
    }
}
