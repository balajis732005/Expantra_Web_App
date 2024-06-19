package com.expantra_app.backend_expantra.service.income;

import com.expantra_app.backend_expantra.dto.*;
import com.expantra_app.backend_expantra.entity.Income;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IncomeService {

    //CREATE
    PositiveResponseDto incomeCreate(IncomeCreateRequestDto incomeCreateRequestDto);

    //READ
    List<Income> getIncome(IncomeReadRequestDto incomeReadRequestDto);

    //UPDATE
    PositiveResponseDto incomeUpdate(IncomeUpdateRequestDto incomeUpdateRequestDto);

    //DELETE
    PositiveResponseDto incomeDelete(Long incomeIdToDelete);

}
