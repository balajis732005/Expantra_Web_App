package com.expantra_app.backend_expantra.service.income;

import com.expantra_app.backend_expantra.dto.*;
import com.expantra_app.backend_expantra.entity.Income;
import com.expantra_app.backend_expantra.entity.User;
import com.expantra_app.backend_expantra.exception.IncomeNotFoundException;
import com.expantra_app.backend_expantra.exception.UserEmailNotFoundException;
import com.expantra_app.backend_expantra.repository.IncomeRepository;
import com.expantra_app.backend_expantra.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class IncomeServiceImpl implements IncomeService{

    private final IncomeRepository incomeRepository;
    private final UserRepository userRepository;

    //CREATE
    @Override
    public PositiveResponseDto incomeCreate(IncomeCreateRequestDto incomeCreateRequestDto) {

        User userDB = userRepository.findByEmail(incomeCreateRequestDto.getEmail())
                .orElseThrow(() -> new UserEmailNotFoundException("User Email Not Found"));

        if(!Objects.equals(userDB.getUserId(), incomeCreateRequestDto.getUserId())){
            throw new UserEmailNotFoundException("User Email Not Found");
        }

        var newIncome = Income.builder()
                .incomeName(incomeCreateRequestDto.getIncomeName())
                .incomeDescription(incomeCreateRequestDto.getIncomeDescription())
                .incomeCategory(incomeCreateRequestDto.getIncomeCategory())
                .incomeAmount(incomeCreateRequestDto.getIncomeAmount())
                .incomeCreatedBy(incomeCreateRequestDto.getIncomeCreatedBy())
                .userId(userDB.getUserId())
                .build();
        incomeRepository.save(newIncome);

        var positive = PositiveResponseDto.builder()
                .successMessage("Income Created Successfully");
        return positive.build();
    }

    private List<IncomeReadResponseDto> incomeFormat(List<Income> incomeList){
        List<IncomeReadResponseDto> formatedIncome = new ArrayList<>();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("E, MMM dd yyyy HH:mm:ss");

        for(Income income : incomeList){
            var formatIncome = IncomeReadResponseDto.builder()
                    .incomeId(income.getIncomeId())
                    .incomeName(income.getIncomeName())
                    .incomeDescription(income.getIncomeDescription())
                    .incomeCategory(income.getIncomeCategory())
                    .incomeAmount(income.getIncomeAmount())
                    .incomeCreatedBy(income.getIncomeCreatedBy())
                    .incomeCreatedDate(income.getIncomeCreatedDate().format(formatter))
                    .incomeLastModifiedDate(
                            income.getIncomeLastModifiedDate() !=null ?
                                    income.getIncomeLastModifiedDate().format(formatter) :
                                    ""
                    )
                    .build();
            formatedIncome.add(formatIncome);
        }
        return formatedIncome;
    }

    //READ
    @Override
    public List<IncomeReadResponseDto> getIncome(IncomeReadRequestDto incomeReadRequestDto) {

        User userDB = userRepository.findByEmail(incomeReadRequestDto.getEmail())
                .orElseThrow(() -> new UserEmailNotFoundException("User Email Not Found"));

        if(!Objects.equals(userDB.getUserId(), incomeReadRequestDto.getUserId())){
            throw new UserEmailNotFoundException("User Email Not Found");
        }

        List<Income> filteredSortedIncome;
        if(!Objects.equals(incomeReadRequestDto.getIncomeSearchName(), "")){
            filteredSortedIncome = incomeRepository.findByIncomeNameContainingIgnoreCaseOrIncomeDescriptionContainingIgnoreCaseOrIncomeCategoryContainingIgnoreCase(
                    incomeReadRequestDto.getIncomeSearchName(), incomeReadRequestDto.getIncomeSearchName(), incomeReadRequestDto.getIncomeSearchName()
            );
        }else{
            filteredSortedIncome=incomeRepository.findAll();
        }

        Long userIdIncome = userDB.getUserId();

        filteredSortedIncome = filteredSortedIncome.stream()
                .filter((Income obj) -> userIdIncome.equals(obj.getUserId()))
                .toList();

        if (incomeReadRequestDto.getPast() == 0L) {
            if (Objects.equals(incomeReadRequestDto.getSortOrder(), "ASC") ||
                    Objects.equals(incomeReadRequestDto.getSortOrder(), "DESC")) {
                if (Objects.equals(incomeReadRequestDto.getSortBy(), "NAME")) {
                    filteredSortedIncome = filteredSortedIncome.stream()
                            .sorted(Comparator.comparing(Income::getIncomeName))
                            .toList();
                } else{
                    filteredSortedIncome = filteredSortedIncome.stream()
                            .sorted(Comparator.comparingDouble(Income::getIncomeAmount))
                            .toList();
                }
            }
            if (Objects.equals(incomeReadRequestDto.getSortOrder(), "DESC")) {
                filteredSortedIncome = filteredSortedIncome.reversed();
            }
        } else {
            if (Objects.equals(incomeReadRequestDto.getSortOrder(), "ASC") ||
                    Objects.equals(incomeReadRequestDto.getSortOrder(), "DESC")) {
                if (Objects.equals(incomeReadRequestDto.getSortBy(), "NAME")) {
                    filteredSortedIncome = filteredSortedIncome.stream()
                            .filter((Income obj) -> obj.getIncomeCreatedDate().isAfter(LocalDateTime.now().minusMonths(incomeReadRequestDto.getPast())))
                            .sorted(Comparator.comparing(Income::getIncomeName))
                            .toList();
                }else{
                    filteredSortedIncome = filteredSortedIncome.stream()
                            .filter((Income obj) -> obj.getIncomeCreatedDate().isAfter(LocalDateTime.now().minusMonths(incomeReadRequestDto.getPast())))
                            .sorted(Comparator.comparingDouble(Income::getIncomeAmount))
                            .toList();
                }
            }
            if (Objects.equals(incomeReadRequestDto.getSortOrder(), "DESC")) {
                filteredSortedIncome = filteredSortedIncome.reversed();
            }
        }
        return incomeFormat(filteredSortedIncome);
    }

    //UPDATE
    @Override
    public PositiveResponseDto incomeUpdate(IncomeUpdateRequestDto incomeUpdateRequestDto) {

        Income oldIncome = incomeRepository.findByIncomeId(incomeUpdateRequestDto.getIncomeId())
                .orElseThrow(() -> new IncomeNotFoundException("Income Not Found"));

        var updateIncome = Income.builder()
                .incomeId(incomeUpdateRequestDto.getIncomeId())
                .incomeName(incomeUpdateRequestDto.getIncomeName())
                .incomeDescription(incomeUpdateRequestDto.getIncomeDescription())
                .incomeCategory(incomeUpdateRequestDto.getIncomeCategory())
                .incomeAmount(incomeUpdateRequestDto.getIncomeAmount())
                .incomeCreatedBy(incomeUpdateRequestDto.getIncomeCreatedBy())
                .userId(incomeUpdateRequestDto.getUserId())
                .incomeCreatedDate(oldIncome.getIncomeCreatedDate())
                .incomeLastModifiedDate(LocalDateTime.now())
                .build();
        incomeRepository.save(updateIncome);
        var positive = PositiveResponseDto.builder()
                .successMessage("Income Updated Successfully");
        return positive.build();
    }

    //DELETE
    @Override
    public PositiveResponseDto incomeDelete(Long incomeIdToDelete) {
        incomeRepository.deleteById(incomeIdToDelete);
        var positive = PositiveResponseDto.builder()
                .successMessage("Income Deleted Successfully");
        return positive.build();
    }

}
