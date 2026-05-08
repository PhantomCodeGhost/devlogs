package com.devlog.repository;
import java.util.Optional;
import com.devlog.entity.DevLog;
import org.springframework.data.domain.Page;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DevLogRepository
        extends JpaRepository<DevLog, Long> {
    Optional<DevLog> findById(Long id);
    Page<DevLog> findAllByOrderByCreatedAtDesc(

            Pageable pageable
    );
    List<DevLog> findByUserIdOrderByCreatedAtDesc(
            Long userId
    );
    List<DevLog> findByUserId(
            Long userId
    );
}