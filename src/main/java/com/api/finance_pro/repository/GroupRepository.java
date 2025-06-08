package com.api.finance_pro.repository;

import com.api.finance_pro.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupRepository extends JpaRepository<Group, Integer> {
    List<Group> findByName(String name);
}
