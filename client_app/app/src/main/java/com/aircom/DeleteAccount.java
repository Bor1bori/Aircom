package com.aircom;

import android.app.ActionBar;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;

import com.aircom.data.DeleteAccountResponse;
import com.aircom.data.RetrofitClient;
import com.aircom.data.ServiceAPI;
import com.aircom.data.SharedPreference;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class DeleteAccount extends Activity {
    private TextView mWithdraw;
    private ServiceAPI service;
    private TextView mEmail;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_delete_account);
        setActionBar();

        service = RetrofitClient.getClient().create(ServiceAPI.class);
        mEmail = (TextView) findViewById(R.id.emailForEditInfo);
        mWithdraw = (TextView) findViewById(R.id.withdrawTextView);
        mWithdraw.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                requestDeleteAccount();
            }
        });

        mEmail.setText(SharedPreference.getUserName(DeleteAccount.this));
    }

    private void setActionBar() {
        ActionBar actionBar = getActionBar();
        actionBar.setDisplayShowCustomEnabled(true);
        actionBar.setDisplayOptions(ActionBar.DISPLAY_SHOW_CUSTOM);
        actionBar.setCustomView(getLayoutInflater()
                        .inflate(R.layout.actionbar_edit_account_info, null),
                new ActionBar.LayoutParams(
                        ActionBar.LayoutParams.WRAP_CONTENT,
                        ActionBar.LayoutParams.MATCH_PARENT,
                        Gravity.CENTER
                )
        );
    }

    private void requestDeleteAccount() {
        new AlertDialog.Builder(DeleteAccount.this)
                .setMessage("탈퇴하시겠습니까?")
                .setPositiveButton("예",
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int which) {
                                deleteAccount();
                            }
                        })
                .setNegativeButton("아니오", null)
                .create()
                .show();
    }

    public void deleteAccount() {
        service.deleteAccountRequest(SharedPreference.getLoginToken(DeleteAccount.this))
                .enqueue(new Callback<DeleteAccountResponse>() {
                    @Override
                    public void onResponse(Call<DeleteAccountResponse> call,
                                           Response<DeleteAccountResponse> response) {
                        if (response.code() == 200) {
                            Toast.makeText(DeleteAccount.this, "탈퇴되었습니다",
                                    Toast.LENGTH_SHORT).show();
                            SharedPreference.clearLoginToken(DeleteAccount.this);
                            DeleteAccount.this.moveTaskToBack(true);
                            finishAffinity();
                        }
                    }

                    @Override
                    public void onFailure(Call<DeleteAccountResponse> call, Throwable t) {
                        Toast.makeText(DeleteAccount.this, "네트워크 상태를 확인해주세요",
                                Toast.LENGTH_SHORT).show();
                    }
                });
    }
}
