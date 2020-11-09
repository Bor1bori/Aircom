package com.aircom.data;

import com.google.gson.annotations.SerializedName;

public class AccountInfoResponse {
    @SerializedName("signinType")
    String signInType;
    @SerializedName("email")
    String email;
    @SerializedName("birthdate")
    String birthDate;
    @SerializedName("gender")
    String gender;

    public String getSignInType() {
        return signInType;
    }

    public String getEmail() {
        return email;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public String getGender() {
        return gender;
    }
}
