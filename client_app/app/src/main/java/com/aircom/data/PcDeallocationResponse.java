package com.aircom.data;

import com.google.gson.annotations.SerializedName;

public class PcDeallocationResponse {
    @SerializedName("usedTime")
    int usedTime;

    public int getUsedTime(){
        return this.usedTime;
    }
}
