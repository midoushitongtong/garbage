package com.midoushitongtong.component05_client.entity;

public class Contact {
    public String name;
    public String phoneNumber;
    public String email;

    @Override
    public String toString() {
        return "Contact{" +
                "name='" + name + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
