package com.expantra_app.backend_expantra.service.user.forgetpassword;

import com.expantra_app.backend_expantra.dto.*;
import com.expantra_app.backend_expantra.emailsender.EmailService;
import com.expantra_app.backend_expantra.emailsender.EmailTemplateName;
import com.expantra_app.backend_expantra.entity.ActivationCode;
import com.expantra_app.backend_expantra.entity.User;
import com.expantra_app.backend_expantra.exception.ActivationCodeExpiredException;
import com.expantra_app.backend_expantra.exception.InvalidVerificationCodeException;
import com.expantra_app.backend_expantra.exception.UserEmailNotFoundException;
import com.expantra_app.backend_expantra.repository.ActivationCodeRepository;
import com.expantra_app.backend_expantra.repository.UserRepository;
import com.expantra_app.backend_expantra.service.user.register.RegisterService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ForgetPasswordServiceImpl implements ForgetPasswordService {

    private final UserRepository userRepository;
    private final ActivationCodeRepository activationCodeRepository;
    private final EmailService emailService;
    private final RegisterService registerService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public PositiveResponseDto forgetPasswordEmailSend(ForgetPasswordEmailSendDto forgetPasswordEmailSendDto) throws MessagingException {

        User userDB = userRepository.findByEmail(forgetPasswordEmailSendDto.getEmail())
                .orElseThrow(() -> new UserEmailNotFoundException("User Email Not Found"));

        sendValidationEmail(forgetPasswordEmailSendDto.getEmail()
                , userDB.getFirstName() + " " + userDB.getLastName());

        var positive = PositiveResponseDto.builder()
                .successMessage("Forget Password Retain Email Send Successfully");

        return positive.build();
    }

    @Override
    public PositiveResponseDto forgetPasswordVerify(VerificationRequestDto verificationRequestDto) throws MessagingException {
        var verifyCode = activationCodeRepository.findByActivationCode(verificationRequestDto.getVerificationCode())
                .orElseThrow(() -> new InvalidVerificationCodeException("Invalid Verification Code Provided"));
        var userDB = userRepository.findByEmail(verificationRequestDto.getEmail())
                .orElseThrow(() -> new UserEmailNotFoundException("User Email Not Found"));
        if (!Objects.equals(userDB.getEmail(), verificationRequestDto.getEmail())
                || !Objects.equals(userDB.getEmail(), verifyCode.getEmail())) {
            throw new UserEmailNotFoundException("User Email Not Found");
        }
        if (LocalDateTime.now().isAfter(verifyCode.getExpiration())) {
            sendValidationEmail(verificationRequestDto.getEmail()
                    , userDB.getFirstName() + " " + userDB.getLastName());
            throw new ActivationCodeExpiredException("ActivationCode has been Expired A new Has been Sent");
        }
        var positive = PositiveResponseDto.builder()
                .successMessage("Verification Code has been Verified Successfully");
        return positive.build();
    }

    private void sendValidationEmail(String email, String fullName) throws MessagingException {
        String generatedCode = registerService.generateActivationCode();
        var activationCode = ActivationCode.builder()
                .email(email)
                .activationCode(generatedCode)
                .createdAt(LocalDateTime.now())
                .expiration(LocalDateTime.now().plusMinutes(10))
                .build();
        activationCodeRepository.save(activationCode);
        emailService.sendEmail(
                email,
                fullName,
                EmailTemplateName.FORGET_PASSWORD,
                generatedCode,
                "Forget Password"
        );
    }

    @Override
    public PositiveResponseDto passwordReset(ResetPasswordDto resetPasswordDto) {
        User userDB = userRepository.findByEmail(resetPasswordDto.getEmail())
                .orElseThrow(() -> new UserEmailNotFoundException("User Email Not Found"));
        userDB.setPassword(passwordEncoder.encode(resetPasswordDto.getNewPassword()));
        userRepository.save(userDB);
        var positive = PositiveResponseDto.builder()
                .successMessage("New Password has been saved Successfully");
        return positive.build();
    }
}
