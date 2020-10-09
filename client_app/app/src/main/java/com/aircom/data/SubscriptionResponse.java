package com.aircom.data;

import com.google.gson.annotations.SerializedName;

public class SubscriptionResponse {
    SubscriptionResponse(SubscriptionResponse subscription, SubscribeData subscribeData,
                         SubscriptionData subscriptionData, int remainTime) {
        this.subscription = subscription;
        this.subscribeData = subscribeData;
        this.subscriptionData = subscriptionData;
        this.remainTime = remainTime;
    }
    @SerializedName("subscription")
    private SubscriptionResponse subscription;

    @SerializedName("subscribe")
    private SubscribeData subscribeData;

    @SerializedName("subscription")
    private SubscriptionData subscriptionData;

    public int getRemainTime() {
        return remainTime;
    }

    @SerializedName("remainTime")
    private int remainTime;

}
