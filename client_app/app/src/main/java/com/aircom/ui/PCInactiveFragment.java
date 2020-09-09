package com.aircom.ui;

import android.app.Activity;
import android.app.Fragment;
import android.media.Image;
import android.os.Bundle;
import android.os.Handler;
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
import androidx.fragment.app.FragmentActivity;

import com.aircom.AddComputerAutomatically;
import com.aircom.R;
import com.aircom.data.PCAllocationResponse;
import com.aircom.data.SharedPreference;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PCInactiveFragment extends Fragment {
    @Nullable
    static ImageView imageView;
    static TextView connectionTextView;
    static View root;
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        root = inflater.inflate(R.layout.fragment_pc_inactive, container, false);
        imageView = ((ImageView)root.findViewById(R.id.cloud_icon));
        connectionTextView = (TextView)root.findViewById(R.id.connectionTextview);
        imageView.setImageResource(R.drawable.cloud_inactive);
        root.findViewById(R.id.addPcButton).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                imageView.setImageResource(R.drawable.cloud_active);
                Animation animation = new AlphaAnimation(1, 0); //to change visibility from visible to invisible
                animation.setDuration(500); //1 second duration for each animation cycle
                animation.setInterpolator(new LinearInterpolator());
                animation.setRepeatCount(Animation.INFINITE); //repeating indefinitely
                animation.setRepeatMode(Animation.REVERSE); //animation will start from end point once ended.
                imageView.startAnimation(animation); //to start animation
                connectionTextView.setText("PC 연결 중...");

                handleDoneEvent();
            }
        });
        return root;
    }

    // Returns true if the event should be eaten
    public boolean handleDoneEvent() {
        System.out.println("login token: "+SharedPreference.getLoginToken(getActivity()));
        AddComputerAutomatically.hostAddress = "1.231.39.92";
        AddComputerAutomatically.service.allocationRequest(SharedPreference.getLoginToken(getActivity())).enqueue(new Callback<PCAllocationResponse>() {
            @Override
            public void onResponse(Call<PCAllocationResponse> call, Response<PCAllocationResponse> response) {
                System.out.println("status code: "+response.code());
                System.out.println("response body: "+response.body());
                //System.out.println("ip: "+response.body().getIp()+", port: "+response.body().getPort());
                //hostAddress = response.body().getIp();
            }

            @Override
            public void onFailure(Call<PCAllocationResponse> call, Throwable t) {
                System.out.println("error: "+t.getMessage());
                Toast.makeText(getActivity(), "PC 할당 에러 발생", Toast.LENGTH_SHORT).show();
            }
        });
        if ( AddComputerAutomatically.hostAddress.length() == 0) {
            Toast.makeText(getActivity(), getResources().getString(R.string.addpc_enter_ip), Toast.LENGTH_LONG).show();
            return true;
        }
        AddComputerAutomatically.computersToAdd.add( AddComputerAutomatically.hostAddress);
        return false;

    }

    public static void setConnectionViewInactive(){
        ((Activity)root.getContext()).runOnUiThread(new Runnable() {
            public void run() {
                imageView.setImageResource(R.drawable.cloud_inactive);
                imageView.clearAnimation();
                connectionTextView.setText("PC를 연결해 주세요.");
            }
        });
    }

}
