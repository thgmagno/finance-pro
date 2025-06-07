package com.api.finance_pro.repository;

import com.api.finance_pro.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
