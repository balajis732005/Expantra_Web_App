package com.expantra_app.backend_expantra.service.user.delete;

import com.expantra_app.backend_expantra.dto.PositiveResponseDto;
import org.springframework.stereotype.Service;

@Service
public interface DeleteService {

    PositiveResponseDto deleteUser(Long idToDelete);

}
