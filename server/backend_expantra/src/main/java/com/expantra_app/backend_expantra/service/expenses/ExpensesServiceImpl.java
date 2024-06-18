package com.expantra_app.backend_expantra.service.expenses;

import com.expantra_app.backend_expantra.dto.*;
import com.expantra_app.backend_expantra.entity.Expenses;
import com.expantra_app.backend_expantra.entity.User;
import com.expantra_app.backend_expantra.exception.ExpenseNotFoundException;
import com.expantra_app.backend_expantra.exception.UserEmailNotFoundException;
import com.expantra_app.backend_expantra.repository.ExpensesRepository;
import com.expantra_app.backend_expantra.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ExpensesServiceImpl implements ExpensesService {

    private final ExpensesRepository expensesRepository;
    private final UserRepository userRepository;

    //CREATE
    @Override
    public PositiveResponseDto expenseCreate(ExpensesCreateRequestDto expensesCreateRequestDto) {

        User userDB = userRepository.findByEmail(expensesCreateRequestDto.getEmail())
                .orElseThrow(() -> new UserEmailNotFoundException("User Email Not Found"));

        if(!Objects.equals(userDB.getUserId(), expensesCreateRequestDto.getUserId())){
            throw new UserEmailNotFoundException("User Email Not Found");
        }

        var newExpense = Expenses.builder()
                .expenseName(expensesCreateRequestDto.getExpenseName())
                .expenseDescription(expensesCreateRequestDto.getExpenseDescription())
                .expenseCategory(expensesCreateRequestDto.getExpenseCategory())
                .expenseAmount(expensesCreateRequestDto.getExpenseAmount())
                .expenseCreatedBy(expensesCreateRequestDto.getExpenseCreatedBy())
                .userId(userDB.getUserId())
                .build();
        expensesRepository.save(newExpense);

        var positive = PositiveResponseDto.builder()
                .successMessage("Expense Created Successfully");
        return positive.build();
    }

    //READ
    @Override
    public List<Expenses> getExpenses(ExpensesReadRequestDto expensesReadRequestDto) {

        User userDB = userRepository.findByEmail(expensesReadRequestDto.getEmail())
                .orElseThrow(() -> new UserEmailNotFoundException("User Email Not Found"));

        if(!Objects.equals(userDB.getUserId(), expensesReadRequestDto.getUserId())){
            throw new UserEmailNotFoundException("User Email Not Found");
        }

        List<Expenses> filteredSortedExpenses;
        if(!Objects.equals(expensesReadRequestDto.getExpenseSearchName(), "")){
            filteredSortedExpenses = expensesRepository.findByExpenseNameContainingIgnoreCaseOrExpenseDescriptionContainingIgnoreCaseOrExpenseCategoryContainingIgnoreCase(
                    expensesReadRequestDto.getExpenseSearchName(), expensesReadRequestDto.getExpenseSearchName(), expensesReadRequestDto.getExpenseSearchName()
            );
        }else{
            filteredSortedExpenses=expensesRepository.findAll();
        }

        Long userIdExpenses = userDB.getUserId();

        if (expensesReadRequestDto.getPast() == 0L) {
            if (Objects.equals(expensesReadRequestDto.getSortOrder(), "ASC") ||
                    Objects.equals(expensesReadRequestDto.getSortOrder(), "DESC")) {
                if (Objects.equals(expensesReadRequestDto.getSortBy(), "NAME")) {
                    filteredSortedExpenses = filteredSortedExpenses.stream()
                            .filter((Expenses obj) -> userIdExpenses.equals(obj.getUserId()))
                            .sorted(Comparator.comparing(Expenses::getExpenseName))
                            .toList();
                } else{
                    filteredSortedExpenses = filteredSortedExpenses.stream()
                            .filter((Expenses obj) -> userIdExpenses.equals(obj.getUserId()))
                            .sorted(Comparator.comparingDouble(Expenses::getExpenseAmount))
                            .toList();
                }
            }
            if (Objects.equals(expensesReadRequestDto.getSortOrder(), "DESC")) {
                filteredSortedExpenses = filteredSortedExpenses.reversed();
            }
        } else {
            if (Objects.equals(expensesReadRequestDto.getSortOrder(), "ASC") ||
                    Objects.equals(expensesReadRequestDto.getSortOrder(), "DESC")) {
                if (Objects.equals(expensesReadRequestDto.getSortBy(), "NAME")) {
                    filteredSortedExpenses = filteredSortedExpenses.stream()
                            .filter((Expenses obj) -> userIdExpenses.equals(obj.getUserId()))
                            .filter((Expenses obj) -> obj.getExpenseCreatedDate().isAfter(LocalDateTime.now().minusMonths(expensesReadRequestDto.getPast())))
                            .sorted(Comparator.comparing(Expenses::getExpenseName))
                            .toList();
                }else{
                    filteredSortedExpenses = filteredSortedExpenses.stream()
                            .filter((Expenses obj) -> userIdExpenses.equals(obj.getUserId()))
                            .filter((Expenses obj) -> obj.getExpenseCreatedDate().isAfter(LocalDateTime.now().minusMonths(expensesReadRequestDto.getPast())))
                            .sorted(Comparator.comparingDouble(Expenses::getExpenseAmount))
                            .toList();
                }
            }
            if (Objects.equals(expensesReadRequestDto.getSortOrder(), "DESC")) {
                filteredSortedExpenses = filteredSortedExpenses.reversed();
            }
        }
        return filteredSortedExpenses;

    }

    //UPDATE
    @Override
    public Expenses expenseUpdate(ExpensesUpdateRequestDto expensesUpdateRequestDto) {

        Expenses oldExpense = expensesRepository.findById(expensesUpdateRequestDto.getExpenseId())
                .orElseThrow(() -> new ExpenseNotFoundException("Expenses Not Found"));

        var updateExpense = Expenses.builder()
                .expenseId(expensesUpdateRequestDto.getExpenseId())
                .expenseName(expensesUpdateRequestDto.getExpenseName())
                .expenseDescription(expensesUpdateRequestDto.getExpenseDescription())
                .expenseCategory(expensesUpdateRequestDto.getExpenseCreatedBy())
                .expenseAmount(expensesUpdateRequestDto.getExpenseAmount())
                .expenseCreatedBy(expensesUpdateRequestDto.getExpenseCreatedBy())
                .userId(expensesUpdateRequestDto.getUserId())
                .expenseCreatedDate(oldExpense.getExpenseCreatedDate())
                .expenseLastModifiedDate(LocalDateTime.now())
                .build();

        expensesRepository.save(updateExpense);

        return updateExpense;
    }

    //DELETE
    @Override
    public PositiveResponseDto expenseDelete(Long expenseIdToDelete) {
        expensesRepository.deleteById(expenseIdToDelete);
        var positive = PositiveResponseDto.builder()
                .successMessage("Expense Delete Successfully");
        return positive.build();
    }

}
