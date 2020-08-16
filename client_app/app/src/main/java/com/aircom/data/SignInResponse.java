package com.aircom.data;

import com.google.gson.annotations.SerializedName;

public class SignInResponse {
    @SerializedName("code")
    private int code;

    @SerializedName("loginToken")
    private String loginToken;

    @SerializedName("userId")
    private int userId;

    public int getCode() {
        return code;
    }

    public String getLoginToken() {
        return loginToken;
    }

    public int getUserId() {
        return userId;
    }
}
