package com.expantra_app.backend_expantra.controller;

import com.expantra_app.backend_expantra.dto.*;
import com.expantra_app.backend_expantra.entity.Income;
import com.expantra_app.backend_expantra.service.income.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expantra")
@RequiredArgsConstructor
public class IncomeController {

    private final IncomeService incomeService;

    @PostMapping("/income/create")
    public PositiveResponseDto incomeCreate(
            @RequestBody IncomeCreateRequestDto incomeCreateRequestDto
    ){
        return incomeService.incomeCreate(incomeCreateRequestDto);
    }

    @PostMapping("/income/read")
    public List<IncomeReadResponseDto> getIncome(
            @RequestBody IncomeReadRequestDto incomeReadRequestDto
    ){
        return incomeService.getIncome(incomeReadRequestDto);
    }

    @PostMapping("/income/update")
    public PositiveResponseDto incomeUpdate(
            @RequestBody IncomeUpdateRequestDto incomeUpdateRequestDto
    ){
        return incomeService.incomeUpdate(incomeUpdateRequestDto);
    }

    @DeleteMapping("/income/delete/{incomeIdToDelete}")
    public PositiveResponseDto incomeDelete(
            @PathVariable Long incomeIdToDelete
    ){
        return incomeService.incomeDelete(incomeIdToDelete);
    }
}
