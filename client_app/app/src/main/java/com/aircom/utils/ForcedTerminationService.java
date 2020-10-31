package com.aircom.utils;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.widget.Toast;

import androidx.annotation.Nullable;

import com.aircom.data.PcDeallocationResponse;
import com.aircom.data.RetrofitClient;
import com.aircom.data.ServiceAPI;
import com.aircom.data.SharedPreference;
import com.aircom.ui.PCInactiveFragment;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ForcedTerminationService extends Service {
    private ServiceAPI service;
    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onTaskRemoved(Intent rootIntent) {
        stopSelf();
    }
}
