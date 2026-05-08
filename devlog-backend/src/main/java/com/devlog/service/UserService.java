package com.devlog.service;

import com.devlog.dto.DevLogResponse;
import com.devlog.dto.UserResponse;
import com.devlog.entity.DevLog;
import com.devlog.entity.User;
import com.devlog.repository.DevLogRepository;
import com.devlog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final DevLogRepository devLogRepository;
    private final DevLogService devLogService;

    public UserResponse getUser(
            Long id
    ) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );

        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .avatar(user.getAvatar())
                .streaks(user.getStreaks())
                .build();
    }

    public Integer getStreak(
            Long userId
    ) {

        User user =
                userRepository.findById(userId)

                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );

        return user.getStreaks();
    }

    public List<DevLogResponse> getUserLogs(
            Long userId
    ) {

        List<DevLog> logs =
                devLogRepository
                        .findByUserIdOrderByCreatedAtDesc(
                                userId
                        );

        return logs.stream()
                .map(devLogService::mapToResponse)
                .toList();
    }
}