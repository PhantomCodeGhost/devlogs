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

        return mapToResponse(saved);
    }

    public List<DevLogResponse> getFeed(
            int page,
            int size
    ) {

        Pageable pageable =
                PageRequest.of(page, size);

        Page<DevLog> devLogs =
                devLogRepository
                        .findAllByOrderByCreatedAtDesc(
                                pageable
                        );

        return devLogs.getContent()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    public DevLogResponse getDevLog(
            Long id
    ) {

        DevLog devLog = devLogRepository.findById(id)
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

        DevLog devLog = devLogRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "DevLog not found"
                        )
                );

        if (!devLog.getUser().getId().equals(userId)) {

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

        DevLog devLog = devLogRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "DevLog not found"
                        )
                );

        if (!devLog.getUser().getId().equals(userId)) {

            throw new RuntimeException(
                    "Unauthorized"
            );
        }

        devLogRepository.delete(devLog);

        return "DevLog deleted successfully";
    }

    public String toggleLike(
            Long logId,
            Long userId
    ) {

        DevLog devLog = devLogRepository.findById(logId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "DevLog not found"
                        )
                );

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );

        Optional<Like> existingLike =
                likeRepository.findByUserAndDevLog(
                        user,
                        devLog
                );

        if (existingLike.isPresent()) {

            likeRepository.delete(
                    existingLike.get()
            );

            devLog.setLikesCount(
                    devLog.getLikesCount() - 1
            );

            devLogRepository.save(devLog);

            return "Unliked";
        }

        Like like = Like.builder()
                .user(user)
                .devLog(devLog)
                .build();

        likeRepository.save(like);

        devLog.setLikesCount(
                devLog.getLikesCount() + 1
        );

        devLogRepository.save(devLog);

        return "Liked";
    }

    public List<DevLogResponse> getMyLogs(
            Long userId
    ) {

        return devLogRepository
                .findByUserId(userId)

                .stream()

                .map(this::mapToResponse)

                .toList();
    }

    private CommentResponse mapCommentResponse(
            Comment comment
    ) {

        User user = comment.getUser();

        return CommentResponse.builder()

                .id(comment.getId())

                .user(
                        UserResponse.builder()
                                .id(user.getId())
                                .username(user.getUsername())
                                .email(user.getEmail())
                                .avatar(user.getAvatar())
                                .streaks(user.getStreaks())
                                .build()
                )

                .content(comment.getContent())

                .createdAt(comment.getCreatedAt())

                .build();
    }
    public CommentResponse createComment(
            Long devLogId,
            CreateCommentRequest request,
            Long userId
    ) {

        DevLog devLog =
                devLogRepository.findById(devLogId)
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
                .user(user)
                .devLog(devLog)
                .content(request.getContent())
                .build();

        Comment saved =
                commentRepository.save(comment);

        devLog.setCommentsCount(
                devLog.getCommentsCount() + 1
        );

        devLogRepository.save(devLog);

        return mapCommentResponse(saved);
    }

    public List<CommentResponse> getComments(
            Long devLogId
    ) {

        return commentRepository
                .findByDevLogIdOrderByCreatedAtDesc(
                        devLogId
                )
                .stream()
                .map(this::mapCommentResponse)
                .toList();
    }


}