package com.expantra_app.backend_expantra.service.netAmount;

import com.expantra_app.backend_expantra.dto.NetAmountResponseDto;
import org.springframework.stereotype.Service;

@Service
public interface NetAmountService {

    NetAmountResponseDto getNetAmount(Long userId);

}
