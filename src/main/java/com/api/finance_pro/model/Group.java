package com.api.finance_pro.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "groups")
public class Group {
    @Id
    @GeneratedValue(generator = "increment")
    private int id;

    private String name;
    private int ownerId;
    private List<Integer> participants;
    @Column(name = "created_at", nullable = false, updatable = false, insertable = false)
    private LocalDateTime createdAt;

    public Group(String name, int ownerId) {
        this.name = name;
        this.ownerId = ownerId;
    }

    public Group(String name, int ownerId, List<Integer> participants) {
        this.name = name;
        this.ownerId = ownerId;
        this.participants = participants;
    }
}
