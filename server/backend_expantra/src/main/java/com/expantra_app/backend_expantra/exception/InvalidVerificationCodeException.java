package com.expantra_app.backend_expantra.exception;

public class InvalidVerificationCodeException extends RuntimeException {

    public InvalidVerificationCodeException(String message){
        super(message);
    }

}
