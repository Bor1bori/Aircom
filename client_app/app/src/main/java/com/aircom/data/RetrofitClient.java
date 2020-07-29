package com.aircom.data;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitClient {
    private final static String BASE_URL = "https://6d98885d-908a-48e9-afdd-51d4c4b716bf.mock.pstmn.io";
    //할당받은 public dns 작성
    private static Retrofit retrofit = null;

    private RetrofitClient() {
    }

    public static Retrofit getClient() {
        if (retrofit == null) {
            retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL) // 요청을 보낼 base url을 설정한다.
                    .addConverterFactory(GsonConverterFactory.create()) //JSON 파싱을 위한 GsonConverterFactory를 추가한다.
                    .build();
        }

        return retrofit;
    }
}
