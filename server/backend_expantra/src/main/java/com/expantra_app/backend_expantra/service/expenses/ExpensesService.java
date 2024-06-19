package com.expantra_app.backend_expantra.service.expenses;

import com.expantra_app.backend_expantra.dto.*;
import com.expantra_app.backend_expantra.entity.Expenses;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ExpensesService {

    //CREATE
    PositiveResponseDto expenseCreate(ExpensesCreateRequestDto expensesCreateRequestDto);

    //READ
    List<ExpensesReadResponseDto> getExpenses(ExpensesReadRequestDto expensesReadRequestDto);

    //UPDATE
    PositiveResponseDto expenseUpdate(ExpensesUpdateRequestDto expensesUpdateRequestDto);

    //DELETE
    PositiveResponseDto expenseDelete(Long expenseIdToDelete);

}
