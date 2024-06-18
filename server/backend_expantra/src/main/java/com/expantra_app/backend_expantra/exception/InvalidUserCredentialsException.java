package com.expantra_app.backend_expantra.exception;

public class InvalidUserCredentialsException extends RuntimeException{

    public  InvalidUserCredentialsException(String message){
        super(message);
    }

}
