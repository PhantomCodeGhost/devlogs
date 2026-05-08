package com.devlog.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntimeException(
            RuntimeException ex
    ) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(
                        Map.of(
                                "timestamp",
                                LocalDateTime.now(),

                                "message",
                                ex.getMessage(),

                                "status",
                                400
                        )
                );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(
            Exception ex
    ) {

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(
                        Map.of(
                                "timestamp",
                                LocalDateTime.now(),

                                "message",
                                "Something went wrong",

                                "status",
                                500
                        )
                );
    }
}