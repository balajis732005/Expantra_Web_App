package com.expantra_app.backend_expantra.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateResponseDto {

    private String firstName;

    private String lastName;

    private String gender;

    private String mobileNumber;

    private String email;

}
