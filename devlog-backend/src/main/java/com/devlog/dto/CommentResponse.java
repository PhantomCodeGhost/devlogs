package com.devlog.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CommentResponse {

    private Long id;

    private UserResponse user;

    private String content;

    private LocalDateTime createdAt;
}