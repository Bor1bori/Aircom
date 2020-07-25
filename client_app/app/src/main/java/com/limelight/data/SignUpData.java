package com.limelight.data;

import com.google.gson.annotations.SerializedName;

public class SignUpData {

    @SerializedName("userEmail")
    private String userEmail;

    @SerializedName("userPwd")
    private String userPwd;

    @SerializedName("userBD")
    private String userBD;

    @SerializedName("userGender")
    private String userGender;

    public SignUpData(String userEmail, String userPwd, String userBD, String userGender) {
        this.userEmail = userEmail;
        this.userPwd = userPwd;
        this.userBD = userBD;
        this.userGender = userGender;
    }
}
