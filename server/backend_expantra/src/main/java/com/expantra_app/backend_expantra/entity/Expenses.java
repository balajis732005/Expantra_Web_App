package com.expantra_app.backend_expantra.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name="expantra_expenses")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Expenses {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="expen_id")
    private Long expenseId;

    @Column(name="expen_name")
    private String expenseName;

    @Column(name="expen_description")
    private String expenseDescription;

    @Column(name="expen_category")
    private String expenseCategory;

    @Column(name="expen_amount")
    private Double expenseAmount;

    @Column(name="expen_created_by")
    private String expenseCreatedBy;

    @Column(name="expen_user_id")
    private Long userId;

    @CreatedDate
    @Column(name="expense_account_created", nullable = false, updatable = false)
    private LocalDateTime expenseCreatedDate;

    @LastModifiedDate
    @Column(name="expense_account_last_modified", insertable = false)
    private LocalDateTime expenseLastModifiedDate;

}
