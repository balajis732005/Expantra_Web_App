package com.expantra_app.backend_expantra.service.netAmount;

import com.expantra_app.backend_expantra.dto.NetAmountResponseDto;
import com.expantra_app.backend_expantra.repository.ExpensesRepository;
import com.expantra_app.backend_expantra.repository.IncomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NetAmountServiceImpl implements NetAmountService{

    private final ExpensesRepository expensesRepository;
    private final IncomeRepository incomeRepository;

    @Override
    public NetAmountResponseDto getNetAmount(Long userId) {
        Double netExpense = expensesRepository.findNetExpense(userId);
        Double netIncome = incomeRepository.findNetIncome(userId);
        if(netExpense==null){
            netExpense=0.0;
        }
        if(netIncome==null){
            netIncome=0.0;
        }
        return NetAmountResponseDto.builder()
                .netExpense(netExpense)
                .netIncome(netIncome)
                .build();
    }
}
