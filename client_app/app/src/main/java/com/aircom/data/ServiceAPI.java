package com.aircom.data;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface ServiceAPI {
    @POST("/auth/signin")
    Call<SignInResponse> userLogin(@Body SignInData data);

    @POST("/auth/signup")
    Call<SignUpResponse> userJoin(@Body SignUpData data);

    @POST("/pc-allocations")
    Call<PCAllocationResponse> allocationRequest(@Header("loginToken") String loginToken);

    @DELETE("/pc-allocations/current")
    Call<PCWithdrawResponse> withdrawRequest(@Header("loginToken") String loginToken);

}
