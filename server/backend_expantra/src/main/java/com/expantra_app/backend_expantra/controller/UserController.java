package com.expantra_app.backend_expantra.controller;

import com.expantra_app.backend_expantra.dto.*;
import com.expantra_app.backend_expantra.service.netAmount.NetAmountService;
import com.expantra_app.backend_expantra.service.user.authenticate.AuthenticationService;
import com.expantra_app.backend_expantra.service.user.delete.DeleteService;
import com.expantra_app.backend_expantra.service.user.forgetpassword.ForgetPasswordService;
import com.expantra_app.backend_expantra.service.user.register.RegisterService;
import com.expantra_app.backend_expantra.service.user.update.UpdateService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/expantra")
@RequiredArgsConstructor
public class UserController {

    private final RegisterService registerService;
    private final AuthenticationService authenticationService;
    private final UpdateService updateService;
    private final DeleteService deleteService;
    private final ForgetPasswordService forgetPasswordService;
    private final NetAmountService netAmountService;

    @GetMapping("/demo")
    public String hello(){
        return "Hello World";
    }

    @PostMapping("/register")
    public ResponseEntity<PositiveResponseDto> registerUser(
            @RequestBody RegisterRequestDto registerRequestDto
            ) throws MessagingException {
        return ResponseEntity.ok(registerService.registerUser(registerRequestDto));
    }

    @PostMapping("/verify")
    public ResponseEntity<PositiveResponseDto> verifyActivationCode(
            @RequestBody VerificationRequestDto verificationRequestDto
            ) throws MessagingException {
        System.out.println(verificationRequestDto);
        return ResponseEntity.ok(registerService.verifyActivationCode(verificationRequestDto));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponseDto> authenticateUser(
            @RequestBody AuthenticateRequestDto authenticateRequestDto
            ) {
        return ResponseEntity.ok(authenticationService.authenticateUser(authenticateRequestDto));
    }

    @PostMapping("/update")
    public ResponseEntity<UpdateResponseDto> updateUser(
            @RequestBody UpdateRequestDto updateRequestDto
    ){
        return ResponseEntity.ok(updateService.updateUser(updateRequestDto));
    }

    @DeleteMapping("/delete/{idToDelete}")
    public ResponseEntity<PositiveResponseDto> deleteUser(
            @PathVariable Long idToDelete
    ){
        System.out.println("controller:"+idToDelete);
        return ResponseEntity.ok(deleteService.deleteUser(idToDelete));
    }

    @PostMapping("/forgetpassword/email")
    public PositiveResponseDto forgetPasswordEmailSend(
            @RequestBody ForgetPasswordEmailSendDto forgetPasswordEmailSendDto
    ) throws MessagingException {
        return forgetPasswordService.forgetPasswordEmailSend(forgetPasswordEmailSendDto);
    }

    @PostMapping("/forgetpassword/verify")
    public PositiveResponseDto forgetPasswordVerify(
            @RequestBody  VerificationRequestDto verificationRequestDto
    ) throws MessagingException {
        return forgetPasswordService.forgetPasswordVerify(verificationRequestDto);
    }

    @PostMapping("/forgetpassword/newpassword")
    public ResponseEntity<PositiveResponseDto> passwordReset(
            @RequestBody  ResetPasswordDto resetPasswordDto
    ) {
        return ResponseEntity.ok(forgetPasswordService.passwordReset(resetPasswordDto));
    }

    @GetMapping("/netamount/{userId}")
    public NetAmountResponseDto getNetAmount(
            @PathVariable Long userId
    ) {
        return netAmountService.getNetAmount(userId);
    }

}
