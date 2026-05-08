package com.devlog.controller;


import com.devlog.dto.*;
import com.devlog.security.JwtUtil;
import com.devlog.service.DevLogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
@RequiredArgsConstructor
public class DevLogController {


    private final DevLogService devLogService;
    private final JwtUtil jwtUtil;

    @PostMapping
    public DevLogResponse createDevLog(@Valid @RequestBody CreateDevLogRequest request, @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);

        Long userId = jwtUtil.extractUserId(token);

        return devLogService.createDevLog(request, userId);
    }

    @GetMapping
    public List<DevLogResponse> getFeed(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size) {

        return devLogService.getFeed(page, size);
    }

    @GetMapping("/{id}")
    public DevLogResponse getDevLog(@PathVariable Long id) {

        return devLogService.getDevLog(id);
    }

    @PutMapping("/{id}")
    public DevLogResponse updateDevLog(

            @PathVariable Long id,

            @Valid @RequestBody UpdateDevLogRequest request,

            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);

        Long userId = jwtUtil.extractUserId(token);

        return devLogService.updateDevLog(id, request, userId);
    }

    @DeleteMapping("/{id}")
    public String deleteDevLog(

            @PathVariable Long id,

            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);

        Long userId = jwtUtil.extractUserId(token);

        return devLogService.deleteDevLog(id, userId);
    }

    @PostMapping("/{id}/like")
    public String toggleLike(

            @PathVariable Long id,

            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);

        Long userId = jwtUtil.extractUserId(token);

        return devLogService.toggleLike(id, userId);
    }
    @GetMapping("/my")
    public List<DevLogResponse> getMyLogs(

            @RequestHeader("Authorization")
            String authHeader
    ) {

        String token =
                authHeader.substring(7);

        Long userId =
                jwtUtil.extractUserId(token);

        return devLogService.getMyLogs(userId);
    }
    @PostMapping("/{id}/comments")
    public CommentResponse createComment(

            @PathVariable Long id,

            @Valid
            @RequestBody
            CreateCommentRequest request,

            @RequestHeader("Authorization")
            String authHeader
    ) {

        String token = authHeader.substring(7);

        Long userId =
                jwtUtil.extractUserId(token);

        return devLogService.createComment(
                id,
                request,
                userId
        );
    }

    @GetMapping("/{id}/comments")
    public List<CommentResponse> getComments(
            @PathVariable Long id
    ) {

        return devLogService.getComments(id);
    }
}