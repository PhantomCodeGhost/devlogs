package com.devlog.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class DevLogResponse {

    private Long id;

    private UserResponse user;

    private String title;
    private String content;

    private List<String> tags;

    private Integer likesCount;
    private Integer commentsCount;

    private LocalDateTime createdAt;
}