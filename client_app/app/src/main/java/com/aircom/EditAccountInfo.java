package com.aircom;

import android.app.ActionBar;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;

import com.aircom.data.AccountInfoResponse;
import com.aircom.data.DeleteAccountResponse;
import com.aircom.data.EditInfoData;
import com.aircom.data.EditInfoResponse;
import com.aircom.data.RetrofitClient;
import com.aircom.data.ServiceAPI;
import com.aircom.data.SharedPreference;
import com.aircom.data.SignUpData;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class EditAccountInfo extends Activity {
    private TextView mEmail;
    private EditText mPassword;
    private EditText mBirthDate;
    private TextView mWithdraw;
    private RadioButton mMale;
    private RadioButton mFemale;
    private Button mEditButton;
    private ServiceAPI service;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_account_info);
        setActionBar();

        mEmail = (TextView) findViewById(R.id.emailForEditInfo);
        mPassword = (EditText) findViewById(R.id.pwForEditInfo);
        mEditButton = (Button) findViewById(R.id.editInfoButton);
        mMale = (RadioButton) findViewById(R.id.male);
        mFemale = (RadioButton) findViewById(R.id.female);
        mBirthDate = (EditText) findViewById(R.id.birthDateForEditInfo);
        service = RetrofitClient.getClient().create(ServiceAPI.class);
        mWithdraw = (TextView) findViewById(R.id.withdrawTextView);
        mWithdraw.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                requestDeleteAccount();
            }
        });

        //기존 정보 반영
        setAccountInfo();

        //정보 수정
        mEditButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptEditInfo();
            }
        });
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
        new AlertDialog.Builder(EditAccountInfo.this)
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

    private void setAccountInfo() {
        service.accountInfoRequest(SharedPreference.getLoginToken(EditAccountInfo.this))
                .enqueue(new Callback<AccountInfoResponse>() {
            @Override
            public void onResponse(Call<AccountInfoResponse> call,
                                   Response<AccountInfoResponse> response) {
                mEmail.setText(response.body().getEmail());
                if (response.body().getGender().equals("male")){
                    mMale.setChecked(true);
                }
                else {
                    mFemale.setChecked(true);
                }
                String birthDate = response.body().getBirthDate();
                birthDate = birthDate.substring(2, 4) + birthDate.substring(5, 7)
                        + birthDate.substring(8, 10);
                mBirthDate.setText(birthDate);
            }

            @Override
            public void onFailure(Call<AccountInfoResponse> call, Throwable t) {
                System.out.println("error: "+t.getMessage());
            }
        });
    }

    private void attemptEditInfo() {
        String password = mPassword.getText().toString();
        String gender = "";
        if (mMale.isChecked()) {
            gender = "male";
        }
        else {
            gender = "female";
        }
        String birthDate = mBirthDate.getText().toString();
        birthDate = "19"+
                birthDate.substring(0, 2) + "-" + birthDate.substring(2, 4) + "-"
                +birthDate.substring(4, 6);

        EditInfoData accountData = new EditInfoData();
        if (password.length() > 0) {
            accountData.setPassword(password);
            accountData.getPassword();
        }
        accountData.setGender(gender);
        accountData.setBirthDate(birthDate);
        editInfo(accountData);

        accountData.getGender();
        accountData.getBirthDate();
    }

    public void editInfo(final EditInfoData accountData) {
        service.editInfoRequest(SharedPreference.getLoginToken(EditAccountInfo.this), accountData)
                .enqueue(new Callback<EditInfoResponse>() {
            @Override
            public void onResponse(Call<EditInfoResponse> call, Response<EditInfoResponse> response) {
                if (response.code() == 200) {
                    Toast.makeText(EditAccountInfo.this, "정보가 수정되었습니다",
                            Toast.LENGTH_SHORT).show();
                    onBackPressed();
                }
            }
            @Override
            public void onFailure(Call<EditInfoResponse> call, Throwable t) {
                Toast.makeText(EditAccountInfo.this, "정보 수정 실패",
                        Toast.LENGTH_SHORT).show();
            }
        });
    }

    public void deleteAccount() {
        service.deleteAccountRequest(SharedPreference.getLoginToken(EditAccountInfo.this))
                .enqueue(new Callback<DeleteAccountResponse>() {
            @Override
            public void onResponse(Call<DeleteAccountResponse> call,
                                   Response<DeleteAccountResponse> response) {
                if (response.code() == 200) {
                    Toast.makeText(EditAccountInfo.this, "탈퇴되었습니다",
                            Toast.LENGTH_SHORT).show();
                    SharedPreference.clearLoginToken(EditAccountInfo.this);
                    EditAccountInfo.this.moveTaskToBack(true);
                    finishAffinity();
                }
            }

            @Override
            public void onFailure(Call<DeleteAccountResponse> call, Throwable t) {
                Toast.makeText(EditAccountInfo.this, "탈퇴 요청 실패",
                        Toast.LENGTH_SHORT).show();
            }
        });
    }
}
