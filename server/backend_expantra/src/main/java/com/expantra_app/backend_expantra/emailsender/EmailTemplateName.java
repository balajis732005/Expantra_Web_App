package com.expantra_app.backend_expantra.emailsender;

import lombok.Getter;

@Getter
public enum EmailTemplateName {

    VERIFY_EMAIL("verify_email"),

    FORGET_PASSWORD("forget_password");

    private final String templateName;

    EmailTemplateName(String templateName){
        this.templateName=templateName;
    }

}
