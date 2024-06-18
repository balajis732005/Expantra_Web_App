package com.expantra_app.backend_expantra.exception;

public class UserEmailNotFoundException extends RuntimeException{

    public UserEmailNotFoundException(String message){
        super(message);
    }

}
