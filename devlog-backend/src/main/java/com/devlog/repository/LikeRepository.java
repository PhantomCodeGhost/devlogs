package com.devlog.repository;
import com.devlog.entity.DevLog;
import com.devlog.entity.Like;
import com.devlog.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository
        extends JpaRepository<Like, Long> {

    Optional<Like> findByUserIdAndDevLogId(
            Long userId,
            Long devLogId


    );

    Optional<Like> findByUserAndDevLog(
            User user,
            DevLog devLog
    );
}