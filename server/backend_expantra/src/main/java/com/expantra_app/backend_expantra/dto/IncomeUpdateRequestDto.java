package com.expantra_app.backend_expantra.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IncomeUpdateRequestDto {

    private Long incomeId;

    private String incomeName;

    private String incomeDescription;

    private String incomeCategory;

    private Double incomeAmount;

    private String incomeCreatedBy;

    private Long userId;

}
