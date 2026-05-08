package com.devlog.repository;

import com.devlog.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository
        extends JpaRepository<Comment, Long> {

    List<Comment> findByDevLogIdOrderByCreatedAtDesc(
            Long devLogId
    );
}