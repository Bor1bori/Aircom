package com.aircom.ui;

import android.app.Activity;
import android.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.view.animation.LinearInterpolator;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;

import com.aircom.AddComputerAutomatically;
import com.aircom.R;
import com.aircom.data.PcAllocationResponse;
import com.aircom.data.SharedPreference;
import com.aircom.nvstream.http.NvHTTP;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PCInactiveFragment extends Fragment {
    @Nullable
    static ImageView imageView;
    static TextView connectionTextView;
    static View root;
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container,
                             Bundle savedInstanceState) {
        root = inflater.inflate(R.layout.fragment_pc_inactive, container, false);
        imageView = ((ImageView)root.findViewById(R.id.cloud_icon));
        connectionTextView = (TextView)root.findViewById(R.id.connectionTextview);
        imageView.setImageResource(R.drawable.cloud_inactive);
        root.findViewById(R.id.addPcButton).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                setFlickeringEffect();
                handleDoneEvent();
            }
        });
        return root;
    }

    // Returns true if the event should be eaten
    public boolean handleDoneEvent() {
        System.out.println("login token: "+SharedPreference.getLoginToken(getActivity()));
        AddComputerAutomatically.service.allocationRequest(SharedPreference.getLoginToken
                (getActivity())).enqueue(new Callback<PcAllocationResponse>() {
            @Override
            public void onResponse(Call<PcAllocationResponse> call,
                                   Response<PcAllocationResponse> response) {
                System.out.println("status code: "+response.code());
                System.out.println("response body: "+response.body());
                if (response.code() == 200) {
                    AddComputerAutomatically.hostAddress = response.body().getIp();
                    ArrayList<Integer> ports = response.body().getPort();
                    System.out.println(ports);
                    System.out.println(ports.get(0));
                    System.out.println(ports.get(1));
                    //NvHTTP.HTTP_PORT = ports.get(0);
                    //NvHTTP.HTTPS_PORT = ports.get(1);
                    AddComputerAutomatically.computersToAdd.add(AddComputerAutomatically.hostAddress);
                }
                else if (response.code() == 503) {
                    Toast.makeText(getActivity(), "현재 할당가능한 PC가 없습니다",
                            Toast.LENGTH_SHORT).show();
                    setConnectionViewInactive();
                }
                else {
                    System.out.println("error: "+response.code());
                    Toast.makeText(getActivity(), "에러 발생", Toast.LENGTH_SHORT).show();
                    setConnectionViewInactive();
                }
            }

            @Override
            public void onFailure(Call<PcAllocationResponse> call, Throwable t) {
                System.out.println("error: "+t.getMessage());
                Toast.makeText(getActivity(), "에러 발생", Toast.LENGTH_SHORT).show();
                setConnectionViewInactive();
            }
        });
        return false;

    }

    private void setFlickeringEffect() {
        imageView.setImageResource(R.drawable.cloud_active);
        Animation animation = new AlphaAnimation(1, 0);
        animation.setDuration(500);
        animation.setInterpolator(new LinearInterpolator());
        animation.setRepeatCount(Animation.INFINITE);
        animation.setRepeatMode(Animation.REVERSE);
        imageView.startAnimation(animation);
        connectionTextView.setText("PC 연결 중...");
    }

    public static void setConnectionViewInactive() {
        ((Activity)root.getContext()).runOnUiThread(new Runnable() {
            public void run() {
                imageView.setImageResource(R.drawable.cloud_inactive);
                imageView.clearAnimation();
                connectionTextView.setText("PC를 연결해 주세요.");
            }
        });
    }

}
