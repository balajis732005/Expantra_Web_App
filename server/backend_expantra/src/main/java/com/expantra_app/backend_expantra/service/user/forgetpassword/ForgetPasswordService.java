package com.expantra_app.backend_expantra.service.user.forgetpassword;

import com.expantra_app.backend_expantra.dto.*;
import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;

@Service
public interface ForgetPasswordService {

    PositiveResponseDto forgetPasswordEmailSend(ForgetPasswordEmailSendDto forgetPasswordEmailSendDto) throws MessagingException;

    PositiveResponseDto forgetPasswordVerify(VerificationRequestDto verificationRequestDto) throws MessagingException;

    PositiveResponseDto passwordReset(ResetPasswordDto resetPasswordDto);

}
