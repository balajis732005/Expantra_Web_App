package com.expantra_app.backend_expantra.service.user.register;

import com.expantra_app.backend_expantra.dto.PositiveResponseDto;
import com.expantra_app.backend_expantra.dto.RegisterRequestDto;
import com.expantra_app.backend_expantra.dto.VerificationRequestDto;
import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;

@Service
public interface RegisterService {

    PositiveResponseDto registerUser(RegisterRequestDto registerRequestDto) throws MessagingException;

    PositiveResponseDto verifyActivationCode(VerificationRequestDto verificationRequestDto) throws MessagingException;

    String generateActivationCode();

}
