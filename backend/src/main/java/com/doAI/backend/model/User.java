package com.doAI.backend.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private String idUser;
    private String name;
    private String email;
    private String password;
}