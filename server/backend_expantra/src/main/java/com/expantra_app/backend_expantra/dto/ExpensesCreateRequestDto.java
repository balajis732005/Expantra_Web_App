package com.expantra_app.backend_expantra.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExpensesCreateRequestDto {

    private Long userId;

    private String email;

    private String expenseName;

    private String expenseDescription;

    private String expenseCategory;

    private Double expenseAmount;

    private String expenseCreatedBy;

}
