package com.api.finance_pro.controller;

import com.api.finance_pro.dtos.LoginRequestDTO;
import com.api.finance_pro.dtos.RegistrationRequestDTO;
import com.api.finance_pro.model.ApiResponse;
import com.api.finance_pro.model.RegistrationRequest;
import com.api.finance_pro.model.User;
import com.api.finance_pro.model.UserRole;
import com.api.finance_pro.repository.RegistrationRequestRepository;
import com.api.finance_pro.repository.UserRepository;
import com.api.finance_pro.service.LogService;
import com.api.finance_pro.service.TokenService;
import com.api.finance_pro.service.email.EmailService;
import com.api.finance_pro.service.email.template.VerifyAccountTemplate;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private RegistrationRequestRepository registrationRequestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private LogService logService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Value("${app.base.url}")
    private String appBaseUrl;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Map<String, String>>> login(@RequestBody @Valid LoginRequestDTO data) {
        final var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        final var auth = this.authenticationManager.authenticate(usernamePassword);

        final var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(ApiResponse.success("Login realizado com sucesso.", Map.of("token", token)));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Void>> register(@RequestBody @Valid RegistrationRequestDTO data) {
        try {
            if (this.userRepository.findByEmail(data.email()) != null) {
                return ResponseEntity.status(401).body(ApiResponse.fail("O endereço de e-mail informado já está registrado.", null));
            }

            final var key = UUID.randomUUID().toString();
            final var hash = new BCryptPasswordEncoder().encode(data.password());
            final var exp = LocalDateTime.now().plusMinutes(15);
            final var request = new RegistrationRequest(data.name(), data.email(), hash, key, exp);

            final var verifyLink = appBaseUrl + "/api/auth/verify?key=" + request.getKey();
            final var verifyAccountTemplate = new VerifyAccountTemplate(request.getName(), verifyLink);
            emailService.sendEmail(request.getEmail(), verifyAccountTemplate.getSubject(), verifyAccountTemplate.build());

            registrationRequestRepository.save(request);

            return ResponseEntity.ok(ApiResponse.success("Por favor, confirme seu endereço de e-mail clicando no link que enviamos para sua caixa de entrada.", null));
        } catch (Exception e) {
            logService.logError("Erro ao registrar usuário.", e);
            return ResponseEntity.status(500).body(ApiResponse.fail("Erro ao processar a requisição. Tente novamente mais tarde.", null));
        }
    }

    @GetMapping("/verify")
    public ResponseEntity<ApiResponse<Map<String, String>>> verify(@RequestParam String key) {
        try {
            final var requestOpt = registrationRequestRepository.findByKey(key);

            if (requestOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.fail("Chave de verificação inválida ou ausente.", null));
            }

            final var request = requestOpt.get();
            if (request.getExpiresAt().isBefore(LocalDateTime.now())) {
                registrationRequestRepository.delete(request);
                return ResponseEntity.badRequest().body(ApiResponse.fail("A chave de verificação expirou. Solicite um novo registro.", null));
            }

            final var newUser = new User(request.getName(), request.getEmail(), request.getHash(), UserRole.USER);

            userRepository.save(newUser);
            registrationRequestRepository.delete(request);
            final var token = tokenService.generateToken(newUser);

            return ResponseEntity.ok(ApiResponse.success("Conta verificada com sucesso.", Map.of("token", token)));
        } catch (Exception e) {
            logService.logError("Erro durante a verificação de conta de usuário.", e);
            return ResponseEntity.status(500).body(ApiResponse.fail("Erro interno ao verificar conta. Tente novamente mais tarde.", null));
        }
    }
}
