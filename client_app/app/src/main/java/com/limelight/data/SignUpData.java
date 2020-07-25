package com.limelight.data;

import com.google.gson.annotations.SerializedName;

public class SignUpData {
    @SerializedName("userName")
    private String userName;

    @SerializedName("userEmail")
    private String userEmail;

    @SerializedName("userPwd")
    private String userPwd;

    @SerializedName("userBD")
    private String userBD;

    @SerializedName("userGender")
    private String userGender;

    public SignUpData(String userName, String userEmail, String userPwd, String userBD, String userGender) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.userPwd = userPwd;
        this.userBD = userBD;
        this.userGender = userGender;
    }
}
