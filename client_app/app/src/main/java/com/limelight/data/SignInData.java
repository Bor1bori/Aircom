package com.limelight.data;

import com.google.gson.annotations.SerializedName;

public class SignInData {
    @SerializedName("email")
    String userEmail;

    @SerializedName("password")
    String userPwd;

    public SignInData(String userEmail, String userPwd) {
        this.userEmail = userEmail;
        this.userPwd = userPwd;
    }
}
