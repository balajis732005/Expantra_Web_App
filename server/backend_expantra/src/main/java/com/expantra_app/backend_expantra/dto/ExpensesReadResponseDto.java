package com.expantra_app.backend_expantra.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExpensesReadResponseDto {

    private Long expenseId;

    private String expenseName;

    private String expenseDescription;

    private String expenseCategory;

    private Double expenseAmount;

    private String expenseCreatedBy;

    private String expenseCreatedDate;

    private String expenseLastModifiedDate;

}
