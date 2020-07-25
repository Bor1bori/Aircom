package com.limelight.data;

import com.google.gson.annotations.SerializedName;

public class SignInData {
    @SerializedName("userEmail")
    String userEmail;

    @SerializedName("userPwd")
    String userPwd;

    public SignInData(String userEmail, String userPwd) {
        this.userEmail = userEmail;
        this.userPwd = userPwd;
    }
}
