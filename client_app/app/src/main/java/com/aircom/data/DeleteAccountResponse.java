package com.aircom.data;

import com.google.gson.annotations.SerializedName;

public class DeleteAccountResponse {
    @SerializedName("code")
    int code;
    @SerializedName("message")
    String message;
}
