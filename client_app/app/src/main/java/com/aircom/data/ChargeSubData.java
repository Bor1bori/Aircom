package com.aircom.data;

import com.google.gson.annotations.SerializedName;

public class ChargeSubData {
    public ChargeSubData(int subscriptionMenuId) {
        this.subscriptionMenuId = subscriptionMenuId;
    }

    public int getSubscriptionMenuId() {
        return subscriptionMenuId;
    }

    public void setSubscriptionMenuId(int subscriptionMenuId) {
        this.subscriptionMenuId = subscriptionMenuId;
    }

    @SerializedName("subscriptionMenuId")
    private int subscriptionMenuId;

}
