package com.devlog.service;

import com.devlog.dto.*;
import com.devlog.entity.User;
import com.devlog.repository.UserRepository;
import com.devlog.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.
        PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException(
                    "Email already exists"
            );
        }

        if (userRepository.existsByUsername(
                request.getUsername())) {

            throw new RuntimeException(
                    "Username already exists"
            );
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .passwordHash(
                        passwordEncoder.encode(
                                request.getPassword()
                        )
                )
                .build();

        userRepository.save(user);

        return "User registered successfully";
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(
                        request.getEmail()
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invalid credentials"
                        ));

        boolean matches = passwordEncoder.matches(
                request.getPassword(),
                user.getPasswordHash()
        );

        if (!matches) {
            throw new RuntimeException(
                    "Invalid credentials"
            );
        }

        String token = jwtUtil.generateToken(
                user.getId(),
                user.getEmail()
        );

        return new AuthResponse(token);
    }
}