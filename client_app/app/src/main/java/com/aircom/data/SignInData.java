package com.aircom.data;

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

    public String getUserEmail() {
        return this.userEmail;
    }

    public String getUserPwd() {
        return this.userPwd;
    }

    public void setEmail(String userEmail){
        this.userEmail = userEmail;
    }

    public void setUserPwd(String userPwd){
        this.userPwd = userPwd;
    }
}
