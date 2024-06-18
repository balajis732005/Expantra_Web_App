package com.expantra_app.backend_expantra.exception.handler;

import com.expantra_app.backend_expantra.dto.ExceptionDto;
import com.expantra_app.backend_expantra.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class ExceptionControllerAdvice {

    //Main Filter and Security Exception Handler

    @ExceptionHandler(value = {Exception.class})
    public ResponseEntity<ExceptionDto> handleSecurityException(Exception ex, WebRequest request){
        var exceptionDto = ExceptionDto.builder()
                .errorMessage(ex.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(exceptionDto);
    }

    //Other UserDefied Exception Handlers

    @ExceptionHandler(UserEmailNotFoundException.class)
    public ResponseEntity<ExceptionDto> handleUserEmailNotFound(UserEmailNotFoundException ex){
        var exceptionDto = ExceptionDto.builder()
                .errorMessage(ex.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exceptionDto); //404
    }

    @ExceptionHandler(InvalidUserCredentialsException.class)
    public ResponseEntity<ExceptionDto> handleInvalidUserCredentialsException(InvalidUserCredentialsException ex){
        var exceptionDto = ExceptionDto.builder()
                .errorMessage(ex.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exceptionDto); //400
    }

    @ExceptionHandler(ActivationCodeExpiredException.class)
    public ResponseEntity<ExceptionDto> handleActivationCodeExpired(ActivationCodeExpiredException ex){
        var exceptionDto = ExceptionDto.builder()
                .errorMessage(ex.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.REQUEST_TIMEOUT).body(exceptionDto); //408
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ExceptionDto> handleUserAlreadyExists(UserAlreadyExistsException ex){
        var exceptionDto = ExceptionDto.builder()
                .errorMessage(ex.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.CONFLICT).body(exceptionDto); //409
    }

    @ExceptionHandler(InvalidVerificationCodeException.class)
    public ResponseEntity<ExceptionDto> handleInvalidVerificationCodeException(InvalidVerificationCodeException ex){
        var exceptionDto = ExceptionDto.builder()
                .errorMessage(ex.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.CONFLICT).body(exceptionDto); //409
    }

    @ExceptionHandler(ExpenseNotFoundException.class)
    public ResponseEntity<ExceptionDto> handleExpenseNotFoundException(ExpenseNotFoundException ex){
        var exceptionDto = ExceptionDto.builder()
                .errorMessage(ex.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.CONFLICT).body(exceptionDto); //409
    }

    @ExceptionHandler(IncomeNotFoundException.class)
    public ResponseEntity<ExceptionDto> handleIncomeNotFoundException(IncomeNotFoundException ex){
        var exceptionDto = ExceptionDto.builder()
                .errorMessage(ex.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.CONFLICT).body(exceptionDto); //409
    }

}
