package com.expantra_app.backend_expantra.service.user.register;

import com.expantra_app.backend_expantra.dto.PositiveResponseDto;
import com.expantra_app.backend_expantra.dto.RegisterRequestDto;
import com.expantra_app.backend_expantra.dto.VerificationRequestDto;
import com.expantra_app.backend_expantra.emailsender.EmailService;
import com.expantra_app.backend_expantra.emailsender.EmailTemplateName;
import com.expantra_app.backend_expantra.entity.ActivationCode;
import com.expantra_app.backend_expantra.entity.RoleEnum;
import com.expantra_app.backend_expantra.entity.User;
import com.expantra_app.backend_expantra.entity.WaitListingUser;
import com.expantra_app.backend_expantra.exception.ActivationCodeExpiredException;
import com.expantra_app.backend_expantra.exception.InvalidVerificationCodeException;
import com.expantra_app.backend_expantra.exception.UserAlreadyExistsException;
import com.expantra_app.backend_expantra.exception.UserEmailNotFoundException;
import com.expantra_app.backend_expantra.repository.ActivationCodeRepository;
import com.expantra_app.backend_expantra.repository.UserRepository;
import com.expantra_app.backend_expantra.repository.WaitListingUserRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class RegisterServiceImpl implements RegisterService {

    private final UserRepository userRepository;
    private final EmailService emailService;
    private final ActivationCodeRepository activationCodeRepository;
    private final WaitListingUserRepository waitListingUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public PositiveResponseDto registerUser(RegisterRequestDto registerRequestDto) throws MessagingException {
        String emailResponse = registerRequestDto.getEmail();
        if(userRepository.findByEmail(emailResponse).isPresent()){
            throw new UserAlreadyExistsException("User Already Exists");
        }
        RoleEnum responseRoleEnum = RoleEnum.valueOf(registerRequestDto.getRole());
        if(!waitListingUserRepository.existsByEmail(registerRequestDto.getEmail())){
            var waiting = WaitListingUser.builder()
                    .firstName(registerRequestDto.getFirstName())
                    .lastName(registerRequestDto.getLastName())
                    .gender(registerRequestDto.getGender())
                    .age(registerRequestDto.getAge())
                    .mobileNumber(registerRequestDto.getMobileNumber())
                    .email(registerRequestDto.getEmail())
                    .password(registerRequestDto.getPassword())
                    .role(responseRoleEnum)
                    .build();
            waitListingUserRepository.save(waiting);
        }
        sendValidationEmail(emailResponse,registerRequestDto.getFirstName()+" "+registerRequestDto.getLastName());
        var positive = PositiveResponseDto.builder()
                .successMessage("Validation Email sent Success");
        return positive.build();
    }

    @Override
    public PositiveResponseDto verifyActivationCode(VerificationRequestDto verificationRequestDto) throws MessagingException {

        var verifyCode = activationCodeRepository.findByActivationCode(verificationRequestDto.getVerificationCode())
                .orElseThrow(() -> new InvalidVerificationCodeException("Invalid Verification Code Provided"));

        var waiting = waitListingUserRepository.findByEmail(verificationRequestDto.getEmail())
                .orElseThrow(() -> new UserEmailNotFoundException("User Email Not Found"));

        if(!Objects.equals(waiting.getEmail(), verificationRequestDto.getEmail())
        || !Objects.equals(waiting.getEmail(), verifyCode.getEmail()))
        {
            throw new UserEmailNotFoundException("User Email Not Found");
        }

        if(LocalDateTime.now().isAfter(verifyCode.getExpiration())){
            waitListingUserRepository.deleteById(waiting.getWaitId());
            var reRegister = RegisterRequestDto.builder()
                    .firstName(waiting.getFirstName())
                    .lastName(waiting.getLastName())
                    .gender(waiting.getGender())
                    .age(waiting.getAge())
                    .mobileNumber(waiting.getMobileNumber())
                    .email(waiting.getEmail())
                    .password(waiting.getPassword())
                    .role(waiting.getRole().toString())
                    .build();
            registerUser(reRegister);
            throw new ActivationCodeExpiredException("ActivationCode has been Expired A new Has been Sent");
        }
        System.out.println("5:"+verifyCode.getExpiration());
        var mainUser = User.builder()
                .firstName(waiting.getFirstName())
                .lastName(waiting.getLastName())
                .gender(waiting.getGender())
                .age(waiting.getAge())
                .mobileNumber(waiting.getMobileNumber())
                .email(waiting.getEmail())
                .password(passwordEncoder.encode(waiting.getPassword()))
                .role(waiting.getRole())
                .build();
        userRepository.save(mainUser);
        System.out.println("6:"+mainUser);
        waitListingUserRepository.deleteById(waiting.getWaitId());
        System.out.println("7:"+waiting.getWaitId());
        var positive = PositiveResponseDto.builder()
                .successMessage("Verification Code has been Verified Successfully");
        return positive.build();
    }

    @Override
    public String generateActivationCode(){
        String characters = "0123456789";
        StringBuilder code = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();
        for(int i=0;i<6;i++){
            int randomIndex = secureRandom.nextInt(characters.length());
            code.append(characters.charAt(randomIndex));
        }
        return code.toString();
    }

    private void sendValidationEmail(String email,String fullName) throws MessagingException {
        String generatedCode = generateActivationCode();
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
                EmailTemplateName.VERIFY_EMAIL,
                generatedCode,
                "Email Verification"
        );
    }

    // AUTOMATICALLY WORKS FOR EVERY 1 MINUTE TO DELETE UNVERIFIED DATA IN WAITING USER TABLE
    @Scheduled(fixedRate = 60000)
    @Transactional
    public void automaticDelete(){
        waitListingUserRepository.deleteByCreatedDateBefore(LocalDateTime.now().minusMinutes(10));
    }

}
