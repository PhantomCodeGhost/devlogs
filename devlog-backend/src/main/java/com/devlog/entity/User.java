package com.devlog.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 30)
    private String username;

    @Column(nullable = false, unique = true, length = 120)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    private LocalDate lastActiveDate;

    private String avatar;

    @Builder.Default
    private Integer streaks = 0;

    @Builder.Default
    @Column(columnDefinition = "TEXT")
    private String badges = "[]";

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}