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
@Table(name="expantra_income")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Income {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="income_id")
    private Long incomeId;

    @Column(name="income_name")
    private String incomeName;

    @Column(name="income_description")
    private String incomeDescription;

    @Column(name="income_category")
    private String incomeCategory;

    @Column(name="income_amount")
    private Double incomeAmount;

    @Column(name="income_created_by")
    private String incomeCreatedBy;

    @Column(name="income_user_id")
    private Long userId;

    @CreatedDate
    @Column(name="income_account_created", nullable = false, updatable = false)
    private LocalDateTime incomeCreatedDate;

    @LastModifiedDate
    @Column(name="income_account_last_modified", insertable = false)
    private LocalDateTime incomeLastModifiedDate;


}
