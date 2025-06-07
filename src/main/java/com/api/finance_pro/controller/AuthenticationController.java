package com.api.finance_pro.controller;

import com.api.finance_pro.dto.RegistrationRequestDTO;
import com.api.finance_pro.model.RegistrationRequest;
import com.api.finance_pro.repository.RegistrationRequestRepository;
import com.api.finance_pro.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private RegistrationRequestRepository repository;

    @Autowired
    private EmailService emailService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegistrationRequestDTO registrationRequestDTO) {
        final var token = UUID.randomUUID().toString();

        final var request = new RegistrationRequest(
                registrationRequestDTO.name(),
                registrationRequestDTO.email(),
                registrationRequestDTO.hash(),
                token
        );

        repository.save(request);

        return ResponseEntity.ok("Registration request submitted.");
    }

}
