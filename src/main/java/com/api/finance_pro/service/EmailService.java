package com.api.finance_pro.service;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

import java.util.Properties;

public class EmailService {

    private final Session session;
    private final String from;

    public EmailService() {
        final var dotenv = Dotenv.load();
        final var username = dotenv.get("MAILERSEND_USERNAME");
        final var password = dotenv.get("MAILERSEND_PASSWORD");

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
