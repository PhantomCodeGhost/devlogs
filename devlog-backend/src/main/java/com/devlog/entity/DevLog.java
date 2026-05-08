package com.devlog.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "devlogs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DevLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @ElementCollection
    private List<String> tags;

    @Builder.Default
    private Integer likesCount = 0;

    @Builder.Default
    private Integer commentsCount = 0;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}