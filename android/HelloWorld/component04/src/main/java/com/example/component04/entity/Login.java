package com.example.component04.entity;

public class Login {
    public int id;
    public String phoneNumber;
    public String password;
    public boolean remember = false;

    public Login() {

    }

    public Login(String phoneNumber, String password, boolean remember) {
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.remember = remember;
    }

    @Override
    public String toString() {
        return "Login{" +
                "id=" + id +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", password='" + password + '\'' +
                ", remember=" + remember +
                '}';
    }
}
