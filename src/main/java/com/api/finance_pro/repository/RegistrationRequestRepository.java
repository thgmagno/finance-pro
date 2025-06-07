package com.api.finance_pro.repository;

import com.api.finance_pro.model.RegistrationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegistrationRequestRepository extends JpaRepository<RegistrationRequest, Integer> {
    Optional<RegistrationRequest> findByKey(String key);
}
