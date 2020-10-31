package com.aircom.data;

import com.google.gson.annotations.SerializedName;

public class SubTotalData {
    public SubTotalData(SubscribeData subscribeData, SubscriptionData subscriptionData) {
        this.subscribeData = subscribeData;
        this.subscriptionData = subscriptionData;
    }

    @SerializedName("subscribe")
    SubscribeData subscribeData;

    @SerializedName("subscription")
    SubscriptionData subscriptionData;

    public SubscribeData getSubscribeData() {
        return subscribeData;
    }

    public SubscriptionData getSubscriptionData() {
        return subscriptionData;
    }
}
