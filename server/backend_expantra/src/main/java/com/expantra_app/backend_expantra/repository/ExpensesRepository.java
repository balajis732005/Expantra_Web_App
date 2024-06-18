package com.expantra_app.backend_expantra.repository;

import com.expantra_app.backend_expantra.entity.Expenses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpensesRepository extends JpaRepository<Expenses, Long> {

    List<Expenses> findByExpenseNameContainingIgnoreCaseOrExpenseDescriptionContainingIgnoreCaseOrExpenseCategoryContainingIgnoreCase
            (String expenseName, String expenseDescription,String expenseCategory);

    @Query("SELECT SUM(i.expenseAmount) FROM Expenses i where i.userId=:userId")
    Double findNetExpense(@Param("userId") Long userId);

}
