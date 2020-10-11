package com.aircom.data;

import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;

public class PcAllocationResponse {
    @SerializedName("ip")
    String ip;
    @SerializedName("port")
    ArrayList<Integer> port;

    public String getIp(){
        return this.ip;
    }
    public ArrayList<Integer> getPort(){
        return this.port;
    }
}
