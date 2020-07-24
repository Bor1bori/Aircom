package com.limelight.data;

import com.google.gson.annotations.SerializedName;

public class SignUpData {
    @SerializedName("userName")
    private String userName;

    @SerializedName("userEmail")
    private String userEmail;

    @SerializedName("userPwd")
    private String userPwd;

    public SignUpData(String userName, String userEmail, String userPwd) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.userPwd = userPwd;
    }
}
