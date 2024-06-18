package com.expantra_app.backend_expantra.service.user.update;

import com.expantra_app.backend_expantra.dto.UpdateRequestDto;
import com.expantra_app.backend_expantra.dto.UpdateResponseDto;
import com.expantra_app.backend_expantra.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface UpdateService {

    UpdateResponseDto updateUser(UpdateRequestDto updateRequestDto);

}
