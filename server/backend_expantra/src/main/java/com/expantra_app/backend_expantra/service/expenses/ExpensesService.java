package com.expantra_app.backend_expantra.service.expenses;

import com.expantra_app.backend_expantra.dto.ExpensesCreateRequestDto;
import com.expantra_app.backend_expantra.dto.ExpensesReadRequestDto;
import com.expantra_app.backend_expantra.dto.ExpensesUpdateRequestDto;
import com.expantra_app.backend_expantra.dto.PositiveResponseDto;
import com.expantra_app.backend_expantra.entity.Expenses;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ExpensesService {

    //CREATE
    PositiveResponseDto expenseCreate(ExpensesCreateRequestDto expensesCreateRequestDto);

    //READ
    List<Expenses> getExpenses(ExpensesReadRequestDto expensesReadRequestDto);

    //UPDATE
    Expenses expenseUpdate(ExpensesUpdateRequestDto expensesUpdateRequestDto);

    //DELETE
    PositiveResponseDto expenseDelete(Long expenseIdToDelete);

}
