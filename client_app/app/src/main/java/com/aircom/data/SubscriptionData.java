package com.aircom.data;

import com.google.gson.annotations.SerializedName;

public class SubscriptionData {
    public SubscriptionData(int id, String name, int price, int monthlyUsableTime,
                     String createdAt, String updatedAt) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.monthlyUsableTime = monthlyUsableTime;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public int getId() {
        return id;
    }

    @SerializedName("id")
    private int id;

    @SerializedName("name")
    private String name;

    @SerializedName("price")
    private int price;

    @SerializedName("monthlyUsableTime")
    private int monthlyUsableTime;

    @SerializedName("createdAt")
    private String createdAt;

    @SerializedName("updatedAt")
    private String updatedAt;
}