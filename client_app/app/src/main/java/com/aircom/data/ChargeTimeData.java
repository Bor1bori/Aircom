package com.aircom.data;

import com.google.gson.annotations.SerializedName;

public class ChargeTimeData {
    public ChargeTimeData(int hours) {
        this.hours = hours;
    }
    @SerializedName("hours")
    int hours;

    public int getHours() {
        return hours;
    }

    public void setHours(int hours) {
        this.hours = hours;
    }
}
