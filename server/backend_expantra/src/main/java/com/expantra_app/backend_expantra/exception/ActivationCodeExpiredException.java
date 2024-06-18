package com.expantra_app.backend_expantra.exception;

public class ActivationCodeExpiredException extends RuntimeException{

    public ActivationCodeExpiredException(String message){
        super(message);
    }

}
