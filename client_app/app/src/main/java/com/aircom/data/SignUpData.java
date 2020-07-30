package com.aircom.data;

import com.google.gson.annotations.SerializedName;

public class SignUpData {

    public SignUpData(String email, String password, String birthdate, String gender) {
        this.email = email;
        this.password = password;
        this.birthdate = birthdate;
        this.gender = gender;
    }

    @SerializedName("email")
    private String email;

    @SerializedName("password")
    private String password;

    @SerializedName("birthdate")
    private String birthdate;

    @SerializedName("gender")
    private String gender;

    public String getEmail(){
        return this.email;
    }
    public String getPassword(){
        return this.password;
    }
    public String getBirthdate(){
        return this.birthdate;
    }
    public String getGender(){
        return this.gender;
    }

    void setEmail(String email){
        this.email = email;
    }
    void setPassword(String password){
        this.password = password;
    }
    void setBirthdate(String birthdate){
        this.birthdate = birthdate;
    }
    void setGender(String gender){
        this.gender = gender;
    }
}
