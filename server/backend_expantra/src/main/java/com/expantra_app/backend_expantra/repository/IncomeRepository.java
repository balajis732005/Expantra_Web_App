package com.expantra_app.backend_expantra.repository;

import com.expantra_app.backend_expantra.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {

    Optional<Income> findByIncomeId(Long incomeId);

    List<Income> findByIncomeNameContainingIgnoreCaseOrIncomeDescriptionContainingIgnoreCaseOrIncomeCategoryContainingIgnoreCase
        (String expenseName, String expenseDescription,String expenseCategory);

    @Query("SELECT SUM(i.incomeAmount) FROM Income i where i.userId=:userId")
    Double findNetIncome(@Param("userId") Long userId);

}
