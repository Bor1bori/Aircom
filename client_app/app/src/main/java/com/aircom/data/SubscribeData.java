package com.aircom.data;

import com.google.gson.annotations.SerializedName;

public class SubscribeData {
    public SubscribeData(){

    }
    public SubscribeData(int id, int userId, int subscriptionMenuId, String startDate,
                  String endDate, String createdAt, String updatedAt) {
        this.id = id;
        this.userId = userId;
        this.subscriptionMenuId = subscriptionMenuId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    @SerializedName("id")
    private int id;

    @SerializedName("userId")
    private int userId;

    public int getSubscriptionMenuId() {
        return subscriptionMenuId;
    }

    @SerializedName("subscriptionMenuId")
    private int subscriptionMenuId;

    @SerializedName("startDate")
    private String startDate;

    @SerializedName("endDate")
    private String endDate;

    public int getId() {
        return id;
    }

    public int getUserId() {
        return userId;
    }

    public String getStartDate() {
        return startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    @SerializedName("createdAt")
    private String createdAt;

    @SerializedName("updatedAt")
    private String updatedAt;
}
