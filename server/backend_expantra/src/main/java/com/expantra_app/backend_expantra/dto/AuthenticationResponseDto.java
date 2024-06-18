package com.expantra_app.backend_expantra.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponseDto {

    private Long userId;

    private String firstName;

    private String lastName;

    private String gender;

    private Integer age;

    private String mobileNumber;

    private String email;

    private String role;

    private String jwtToken;

}
