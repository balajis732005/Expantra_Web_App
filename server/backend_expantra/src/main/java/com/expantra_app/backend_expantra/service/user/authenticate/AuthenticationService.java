package com.expantra_app.backend_expantra.service.user.authenticate;

import com.expantra_app.backend_expantra.dto.AuthenticateRequestDto;
import com.expantra_app.backend_expantra.dto.AuthenticationResponseDto;
import org.springframework.stereotype.Service;

@Service
public interface AuthenticationService {

    AuthenticationResponseDto authenticateUser(AuthenticateRequestDto authenticateRequestDto);

}
