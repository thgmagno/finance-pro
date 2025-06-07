package com.api.finance_pro.service.email;

import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class EmailService {

    private final Session session;
    private final String from;

    public EmailService(
            @Value("${MAILERSEND_USERNAME}") String username,
            @Value("${MAILERSEND_PASSWORD}") String password
    ) {
        this.from = username;

        final var props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.mailersend.net");
        props.put("mail.smtp.port", "587");

        this.session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });
    }

    public void sendEmail(final String to, final String subject, final String body) throws MessagingException {
        final var message = new MimeMessage(session);
        message.setFrom(new InternetAddress(from));
        message.setRecipients(MimeMessage.RecipientType.TO, InternetAddress.parse(to));
        message.setSubject(subject);
        message.setContent(body, "text/html; charset=utf-8");

        Transport.send(message);
    }

}
