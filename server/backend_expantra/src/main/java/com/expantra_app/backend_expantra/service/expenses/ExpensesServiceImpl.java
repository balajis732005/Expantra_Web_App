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
import java.time.format.DateTimeFormatter;
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

    private List<ExpensesReadResponseDto> expenseFormat(List<Expenses> expensesList){
        List<ExpensesReadResponseDto> formatedExpenses = new ArrayList<>();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("E, MMM dd yyyy HH:mm:ss");

        for(Expenses expense : expensesList){
            var formatExpense = ExpensesReadResponseDto.builder()
                    .expenseId(expense.getExpenseId())
                    .expenseName(expense.getExpenseName())
                    .expenseDescription(expense.getExpenseDescription())
                    .expenseCategory(expense.getExpenseCategory())
                    .expenseAmount(expense.getExpenseAmount())
                    .expenseCreatedBy(expense.getExpenseCreatedBy())
                    .expenseCreatedDate(expense.getExpenseCreatedDate().format(formatter))
                    .expenseLastModifiedDate(
                            expense.getExpenseLastModifiedDate() !=null ?
                            expense.getExpenseLastModifiedDate().format(formatter) :
                                    ""
                    )
                    .build();
            formatedExpenses.add(formatExpense);
        }
        return formatedExpenses;
    }

    //READ
    @Override
    public List<ExpensesReadResponseDto> getExpenses(ExpensesReadRequestDto expensesReadRequestDto) {

        User userDB = userRepository.findByEmail(expensesReadRequestDto.getEmail())
                .orElseThrow(() -> new UserEmailNotFoundException("User Email Not Found"));

        if(!Objects.equals(userDB.getUserId(), expensesReadRequestDto.getUserId())){
            throw new UserEmailNotFoundException("User Email Not Found");
        }

        List<Expenses> filteredSortedExpenses;
        if(!expensesReadRequestDto.getExpenseSearchName().isEmpty()){
            filteredSortedExpenses = expensesRepository.findByExpenseNameContainingIgnoreCaseOrExpenseDescriptionContainingIgnoreCaseOrExpenseCategoryContainingIgnoreCase(
                    expensesReadRequestDto.getExpenseSearchName(), expensesReadRequestDto.getExpenseSearchName(), expensesReadRequestDto.getExpenseSearchName()
            );
        }else{
            filteredSortedExpenses=expensesRepository.findAll();
        }

        Long userIdExpenses = userDB.getUserId();

        filteredSortedExpenses = filteredSortedExpenses.stream()
                .filter((Expenses obj) -> userIdExpenses.equals(obj.getUserId()))
                .toList();

        if (expensesReadRequestDto.getPast() == 0L) {
            if (Objects.equals(expensesReadRequestDto.getSortOrder(), "ASC") ||
                    Objects.equals(expensesReadRequestDto.getSortOrder(), "DESC")) {
                if (Objects.equals(expensesReadRequestDto.getSortBy(), "NAME")) {
                    filteredSortedExpenses = filteredSortedExpenses.stream()
                            .sorted(Comparator.comparing(Expenses::getExpenseName))
                            .toList();
                } else{
                    filteredSortedExpenses = filteredSortedExpenses.stream()
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
                            .filter((Expenses obj) -> obj.getExpenseCreatedDate().isAfter(LocalDateTime.now().minusMonths(expensesReadRequestDto.getPast())))
                            .sorted(Comparator.comparing(Expenses::getExpenseName))
                            .toList();
                }else{
                    filteredSortedExpenses = filteredSortedExpenses.stream()
                            .filter((Expenses obj) -> obj.getExpenseCreatedDate().isAfter(LocalDateTime.now().minusMonths(expensesReadRequestDto.getPast())))
                            .sorted(Comparator.comparingDouble(Expenses::getExpenseAmount))
                            .toList();
                }
            }
            if (Objects.equals(expensesReadRequestDto.getSortOrder(), "DESC")) {
                filteredSortedExpenses = filteredSortedExpenses.reversed();
            }
        }

        return expenseFormat(filteredSortedExpenses);

    }

    //UPDATE
    @Override
    public PositiveResponseDto expenseUpdate(ExpensesUpdateRequestDto expensesUpdateRequestDto) {

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

        var positive = PositiveResponseDto.builder()
                .successMessage("Expense Updated Successfully");
        return positive.build();
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
