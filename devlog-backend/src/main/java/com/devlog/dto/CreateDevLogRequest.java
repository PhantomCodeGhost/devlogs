package com.devlog.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
public class CreateDevLogRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    private List<String> tags;
}