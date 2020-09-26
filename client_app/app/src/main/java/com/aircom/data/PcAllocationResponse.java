package com.aircom.data;

import com.google.gson.annotations.SerializedName;

public class PcAllocationResponse {
    @SerializedName("ip")
    String ip;
    @SerializedName("port")
    int port;

    public String getIp(){
        return this.ip;
    }
    public int getPort(){
        return this.port;
    }
}
