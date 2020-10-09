package com.aircom.data;

import com.google.gson.annotations.SerializedName;

public class SubscribeData {
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

    @SerializedName("subscriptionMenuId")
    private int subscriptionMenuId;

    @SerializedName("startDate")
    private String startDate;

    @SerializedName("endDate")
    private String endDate;

    @SerializedName("createdAt")
    private String createdAt;

    @SerializedName("updatedAt")
    private String updatedAt;
}
