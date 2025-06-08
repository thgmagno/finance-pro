package com.api.finance_pro.controller;

import com.api.finance_pro.dtos.CreateGroupDTO;
import com.api.finance_pro.model.ApiResponse;
import com.api.finance_pro.model.Group;
import com.api.finance_pro.model.User;
import com.api.finance_pro.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/group")
public class GroupController {

    @Autowired
    private GroupRepository groupRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Group>>> findByName(@RequestParam("search") String name) {
        return ResponseEntity.ok(ApiResponse.success("Lista de grupos encontrada com sucesso.", groupRepository.findByName(name)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Group>> create(@RequestBody CreateGroupDTO data) {
        final var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        final var newGroup = new Group(data.name(), user.getId());
        return ResponseEntity.ok(ApiResponse.success("Grupo criado com sucesso.", groupRepository.save(newGroup)));
    }

}
