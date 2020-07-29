package com.aircom.data;

import com.google.gson.annotations.SerializedName;

public class SignUpData {

    @SerializedName("email")
    private String userEmail;

    @SerializedName("password")
    private String userPwd;

    @SerializedName("birthdate")
    private String userBD;

    @SerializedName("gender")
    private String userGender;

    public SignUpData(String userEmail, String userPwd, String userBD, String userGender) {
        this.userEmail = userEmail;
        this.userPwd = userPwd;
        this.userBD = userBD;
        this.userGender = userGender;
    }
}
