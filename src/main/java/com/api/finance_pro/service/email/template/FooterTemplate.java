package com.api.finance_pro.service.email.template;

public class FooterTemplate {

    public static String build() {
        return """
                    <p>Se tiver dúvidas ou precisar de ajuda, entre em contato: <a href="mailto:thgmgn@gmail.com">thgmgn@gmail.com</a></p>
                    <p>– Equipe FinancePRO</p>
                """;
    }
}
