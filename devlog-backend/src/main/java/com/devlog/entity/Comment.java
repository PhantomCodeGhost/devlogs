package com.devlog.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(
            name = "user_id",
            nullable = false
    )
    private User user;

    @ManyToOne
    @JoinColumn(
            name = "devlog_id",
            nullable = false
    )
    private DevLog devLog;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Builder.Default
    private LocalDateTime createdAt =
            LocalDateTime.now();
}