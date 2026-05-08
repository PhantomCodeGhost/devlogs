package com.devlog.controller;

import com.devlog.dto.DevLogResponse;
import com.devlog.dto.UserResponse;
import com.devlog.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/streak")
    public Integer getStreak(

            @RequestHeader("Authorization")
            String authHeader
    ) {

        String token =
                authHeader.substring(7);

        Long userId =
                jwtUtil.extractUserId(token);

        return userService.getStreak(userId);
    }

    @GetMapping("/{id}")
    public UserResponse getUser(
            @PathVariable Long id
    ) {

        return userService.getUser(id);
    }

    @GetMapping("/{id}/logs")
    public List<DevLogResponse> getUserLogs(
            @PathVariable Long id
    ) {

        return userService.getUserLogs(id);
    }
}