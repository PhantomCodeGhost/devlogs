package com.devlog.service;


import com.devlog.entity.Comment;
import com.devlog.repository.CommentRepository;
import com.devlog.dto.CreateDevLogRequest;
import com.devlog.dto.DevLogResponse;
import com.devlog.dto.UpdateDevLogRequest;
import com.devlog.dto.CommentResponse;
import com.devlog.dto.CreateCommentRequest;
import com.devlog.dto.UserResponse;
import com.devlog.entity.DevLog;
import com.devlog.entity.User;
import com.devlog.repository.DevLogRepository;
import com.devlog.repository.LikeRepository;
import com.devlog.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.devlog.entity.Like;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DevLogService {

    private final CommentRepository commentRepository;
    private final DevLogRepository devLogRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;

    public DevLogResponse mapToResponse(
            DevLog devLog
    ) {

        User user = devLog.getUser();

        return DevLogResponse.builder()

                .id(devLog.getId())

                .user(
                        UserResponse.builder()
                                .id(user.getId())
                                .username(user.getUsername())
                                .email(user.getEmail())
                                .avatar(user.getAvatar())
                                .streaks(user.getStreaks())
                                .build()
                )

                .title(devLog.getTitle())
                .content(devLog.getContent())
                .tags(devLog.getTags())

                .likesCount(devLog.getLikesCount())
                .commentsCount(devLog.getCommentsCount())

                .createdAt(devLog.getCreatedAt())

                .build();
    }

    // ✅ Helper method to update user streaks
    private void updateUserStreak(User user) {
        LocalDate today = LocalDate.now();

        // Check if user already posted today
        if (user.getLastActiveDate() != null && 
            user.getLastActiveDate().equals(today)) {
            // Already posted today, don't increment streak again
            return;
        }

        // Check if it's consecutive day
        if (user.getLastActiveDate() != null &&
            user.getLastActiveDate().equals(today.minusDays(1))) {
            // Posted yesterday, increment streak
            user.setStreaks(user.getStreaks() + 1);
        } else if (user.getLastActiveDate() == null ||
                   !user.getLastActiveDate().equals(today.minusDays(1))) {
            // Either first post or missed a day, reset/start streak
            user.setStreaks(1);
        }

        // Update last active date
        user.setLastActiveDate(today);
        userRepository.save(user);
    }

    public DevLogResponse createDevLog(
            CreateDevLogRequest request,
            Long userId
    ) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );

        DevLog devLog = DevLog.builder()
                .user(user)
                .title(request.getTitle())
                .content(request.getContent())
                .tags(request.getTags())
                .build();

        DevLog saved =
                devLogRepository.save(devLog);

        // ✅ FIXED: Update user's streak when creating devlog
        updateUserStreak(user);

        return mapToResponse(saved);
    }

    public List<DevLogResponse> getFeed(
            int page,
            int size
    ) {

        Pageable pageable =
                PageRequest.of(page, size);

        Page<DevLog> pageDevLogs =
                devLogRepository.findAllByOrderByCreatedAtDesc(
                        pageable
                );

        return pageDevLogs.stream()
                .map(this::mapToResponse)
                .toList();
    }

    public DevLogResponse getDevLog(Long id) {

        DevLog devLog =
                devLogRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "DevLog not found"
                                )
                        );

        return mapToResponse(devLog);
    }

    public DevLogResponse updateDevLog(
            Long id,
            UpdateDevLogRequest request,
            Long userId
    ) {

        DevLog devLog =
                devLogRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "DevLog not found"
                                )
                        );

        if (!devLog.getUser().getId()
                .equals(userId)) {
            throw new RuntimeException(
                    "Unauthorized"
            );
        }

        devLog.setTitle(request.getTitle());
        devLog.setContent(request.getContent());
        devLog.setTags(request.getTags());

        DevLog updated =
                devLogRepository.save(devLog);

        return mapToResponse(updated);
    }

    public String deleteDevLog(
            Long id,
            Long userId
    ) {

        DevLog devLog =
                devLogRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "DevLog not found"
                                )
                        );

        if (!devLog.getUser().getId()
                .equals(userId)) {
            throw new RuntimeException(
                    "Unauthorized"
            );
        }

        devLogRepository.deleteById(id);

        return "DevLog deleted successfully";
    }

    public String toggleLike(
            Long id,
            Long userId
    ) {

        DevLog devLog =
                devLogRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "DevLog not found"
                                )
                        );

        Optional<Like> existingLike =
                likeRepository
                        .findByDevLogIdAndUserId(
                                id,
                                userId
                        );

        if (existingLike.isPresent()) {

            likeRepository.delete(
                    existingLike.get()
            );

            devLog.setLikesCount(
                    devLog.getLikesCount() - 1
            );

        } else {

            Like newLike = Like.builder()
                    .devLog(devLog)
                    .userId(userId)
                    .build();

            likeRepository.save(newLike);

            devLog.setLikesCount(
                    devLog.getLikesCount() + 1
            );
        }

        devLogRepository.save(devLog);

        return "Like toggled";
    }

    public List<DevLogResponse> getMyLogs(
            Long userId
    ) {

        List<DevLog> myLogs =
                devLogRepository
                        .findByUserIdOrderByCreatedAtDesc(
                                userId
                        );

        return myLogs.stream()
                .map(this::mapToResponse)
                .toList();
    }

    public DevLogResponse createComment(
            Long logId,
            CreateCommentRequest request,
            Long userId
    ) {

        DevLog devLog =
                devLogRepository.findById(logId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "DevLog not found"
                                )
                        );

        User user =
                userRepository.findById(userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );

        Comment comment = Comment.builder()
                .devLog(devLog)
                .user(user)
                .content(request.getContent())
                .build();

        commentRepository.save(comment);

        devLog.setCommentsCount(
                devLog.getCommentsCount() + 1
        );

        devLogRepository.save(devLog);

        return mapToResponse(devLog);
    }

    public List<CommentResponse>
    getComments(Long logId) {

        DevLog devLog =
                devLogRepository.findById(logId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "DevLog not found"
                                )
                        );

        return devLog.getComments().stream()
                .map(comment ->
                        CommentResponse.builder()
                                .id(comment.getId())
                                .content(
                                        comment
                                                .getContent()
                                )
                                .user(
                                        UserResponse
                                                .builder()
                                                .id(comment
                                                        .getUser()
                                                        .getId()
                                                )
                                                .username(
                                                        comment
                                                                .getUser()
                                                                .getUsername()
                                                )
                                                .email(
                                                        comment
                                                                .getUser()
                                                                .getEmail()
                                                )
                                                .avatar(
                                                        comment
                                                                .getUser()
                                                                .getAvatar()
                                                )
                                                .streaks(
                                                        comment
                                                                .getUser()
                                                                .getStreaks()
                                                )
                                                .build()
                                )
                                .createdAt(
                                        comment
                                                .getCreatedAt()
                                )
                                .build()
                )
                .toList();
    }
}
