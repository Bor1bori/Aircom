package com.aircom.data;

import com.google.gson.annotations.SerializedName;

public class SubscriptionResponse {
    public SubscriptionResponse(SubTotalData subscription, int remainTime) {
        this.subscription = subscription;
        this.remainTime = remainTime;
    }

    @SerializedName("subscription")
    SubTotalData subscription;

    @SerializedName("remainTime")
    private int remainTime;

    public SubTotalData getSubscription() {
        return subscription;
    }

    public int getRemainTime() {
        return remainTime;
    }
}

