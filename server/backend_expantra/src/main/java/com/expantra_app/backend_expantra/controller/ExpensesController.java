package com.expantra_app.backend_expantra.controller;

import com.expantra_app.backend_expantra.dto.ExpensesCreateRequestDto;
import com.expantra_app.backend_expantra.dto.ExpensesReadRequestDto;
import com.expantra_app.backend_expantra.dto.ExpensesUpdateRequestDto;
import com.expantra_app.backend_expantra.dto.PositiveResponseDto;
import com.expantra_app.backend_expantra.entity.Expenses;
import com.expantra_app.backend_expantra.service.expenses.ExpensesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expantra")
@RequiredArgsConstructor
public class ExpensesController {

    private final ExpensesService expensesService;

    @PostMapping("/expenses/create")
    public PositiveResponseDto expenseCreate(
            @RequestBody ExpensesCreateRequestDto expensesCreateRequestDto
    ){
        return expensesService.expenseCreate(expensesCreateRequestDto);
    }

    @PostMapping("/expenses/read")
    public List<Expenses> getExpenses(
            @RequestBody ExpensesReadRequestDto expensesReadRequestDto
    ){
        return expensesService.getExpenses(expensesReadRequestDto);
    }

    @PostMapping("/expenses/update")
    public Expenses expenseUpdate(
            @RequestBody ExpensesUpdateRequestDto expensesUpdateRequestDto
    ){
        return expensesService.expenseUpdate(expensesUpdateRequestDto);
    }

    @DeleteMapping("/expenses/delete/{expenseIdToDelete}")
    public PositiveResponseDto expenseDelete(
            @PathVariable Long expenseIdToDelete
    ){
        return expensesService.expenseDelete(expenseIdToDelete);
    }

}
