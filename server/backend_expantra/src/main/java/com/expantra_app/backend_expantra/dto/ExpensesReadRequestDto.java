package com.expantra_app.backend_expantra.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExpensesReadRequestDto {

    private Long userId;

    private String email;

    private String expenseSearchName;

    private String sortBy;

    private String sortOrder;

    private Long past;

}
