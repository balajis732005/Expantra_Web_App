package com.expantra_app.backend_expantra.exception;

public class ExpenseNotFoundException extends RuntimeException{

    public ExpenseNotFoundException(String message){
        super(message);
    }

}
