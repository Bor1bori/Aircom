package com.aircom;

import android.app.ActionBar;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.widget.Toast;

import androidx.annotation.Nullable;

import com.aircom.data.SharedPreference;

public class SplashActivity extends Activity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ActionBar actionBar = getActionBar();
        actionBar.hide();
        setContentView(R.layout.activity_splash);
        Handler hd = new Handler();
        hd.postDelayed(new SplashHandler(), 1500);
    }

    private class SplashHandler implements Runnable {
        public void run(){
            startActivity(new Intent(getApplication(), SignIn.class));
            SplashActivity.this.finish();
        }
    }
}
