package com.limelight.data;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface ServiceAPI {
    @POST("/auth/signin")
    Call<SignInResponse> userLogin(@Body SignInData data);

    @POST("/auth/signup")
    Call<SignUpResponse> userJoin(@Body SignUpData data);

}
