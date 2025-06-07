package com.api.finance_pro.controller;

import com.api.finance_pro.dtos.RegistrationRequestDTO;
import com.api.finance_pro.model.ApiResponse;
import com.api.finance_pro.model.RegistrationRequest;
import com.api.finance_pro.repository.RegistrationRequestRepository;
import com.api.finance_pro.service.LogService;
import com.api.finance_pro.service.email.EmailService;
import com.api.finance_pro.service.email.template.VerifyAccountTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private RegistrationRequestRepository repository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private LogService logService;

    @Value("${app.base.url}")
    private String baseUrl;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Void>> register(@RequestBody RegistrationRequestDTO registrationRequestDTO) {
        try {
            final var key = UUID.randomUUID().toString();

            final var request = new RegistrationRequest(
                    registrationRequestDTO.name(),
                    registrationRequestDTO.email(),
                    registrationRequestDTO.hash(),
                    key,
                    LocalDateTime.now().plusMinutes(15)
            );

            final var verifyLink = baseUrl + "/auth/verify?key=" + request.getKey();
            final var verifyAccountTemplate = new VerifyAccountTemplate(request.getName(), verifyLink);
            emailService.sendEmail(request.getEmail(), verifyAccountTemplate.getSubject(), verifyAccountTemplate.build());

            repository.save(request);

            return ResponseEntity.ok(ApiResponse.success("Por favor, confirme seu endereço de e-mail clicando no link que enviamos para sua caixa de entrada.", null));
        } catch (Exception e) {
            logService.logError("Erro ao registrar usuário.", e);
            return ResponseEntity.status(500).body(ApiResponse.fail("Erro ao processar a requisição. Tente novamente mais tarde.", null));
        }
    }

    @GetMapping("/verify")
    public ResponseEntity<ApiResponse<Void>> verify(@RequestParam String key) {
        try {
            final var requestOpt = repository.findByKey(key);

            if (requestOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.fail("Chave de verificação inválida.", null));
            }

            final var request = requestOpt.get();
            if (request.getExpiresAt().isBefore(LocalDateTime.now())) {
                repository.delete(request);
                return ResponseEntity.badRequest().body(ApiResponse.fail("Link expirado. Solicite um novo registro.", null));
            }

            repository.delete(request);
            return ResponseEntity.ok(ApiResponse.success("Conta verificada com sucesso.", null));
        } catch (Exception e) {
            logService.logError("Erro durante a verificação de conta de usuário.", e);
            return ResponseEntity.status(500).body(ApiResponse.fail("Erro interno ao verificar conta. Tente novamente mais tarde.", null));
        }
    }
}
