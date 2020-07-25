package com.limelight;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;

import com.limelight.data.RetrofitClient;
import com.limelight.data.ServiceAPI;
import com.limelight.data.SignUpData;
import com.limelight.data.SignUpResponse;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SignUp extends Activity {
    private EditText mName;
    private EditText mEmail;
    private EditText mPassword;
    private Button signUpButton;
    private ServiceAPI service;
    private RadioButton mMale;
    private RadioButton mFemale;
    private RadioButton mEtc;
    private EditText mYear;
    private EditText mMonth;
    private EditText mDay;
    private String gender;
    private String birthDate;
    public boolean loggedIn = false;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);


        mName = (EditText) findViewById(R.id.nameForSignUp);
        mEmail = (EditText) findViewById(R.id.emailForSignUp);
        mPassword = (EditText) findViewById(R.id.pwForSignUp);
        signUpButton = (Button) findViewById(R.id.signUpButton);
        mMale = (RadioButton) findViewById(R.id.male);
        mFemale = (RadioButton) findViewById(R.id.female);
        mEtc = (RadioButton) findViewById(R.id.etc);
        mYear = (EditText) findViewById(R.id.year);
        mMonth = (EditText) findViewById(R.id.month);
        mDay = (EditText) findViewById(R.id.day);
        if (mMale.isChecked()) gender = "male";
        if (mFemale.isChecked()) gender = "female";
        if (mEtc.isChecked()) gender = "etc";
        birthDate = mYear.toString()+"-"+mMonth.toString()+"-"+mDay.toString();
        //service = RetrofitClient.getClient().create(ServiceAPI.class);

        signUpButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                trySignUp();
            }
        });
    }

    private void trySignUp(){
        mName.setError(null);
        mEmail.setError(null);
        mPassword.setError(null);

        String name = mName.getText().toString();
        String email = mEmail.getText().toString();
        String password = mPassword.getText().toString();

        boolean cancel = false;
        View focusView = null;

        // 패스워드의 유효성 검사
        if (password.isEmpty()) {
            mPassword.setError("비밀번호를 입력해주세요.");
            focusView = mPassword;
            cancel = true;
        } else if (!isPasswordValid(password)) {
            mPassword.setError("8자 이상의 비밀번호를 입력해주세요.");
            focusView = mPassword;
            cancel = true;
        }

        // 이메일의 유효성 검사
        if (email.isEmpty()) {
            mEmail.setError("이메일을 입력해주세요.");
            focusView = mEmail;
            cancel = true;
        } else if (!isEmailValid(email)) {
            mEmail.setError("@를 포함한 유효한 이메일을 입력해주세요.");
            focusView = mEmail;
            cancel = true;
        }

        // 이름의 유효성 검사
        if (name.isEmpty()) {
            mName.setError("이름을 입력해주세요.");
            focusView = mName;
            cancel = true;
        }

        if (cancel) {
            focusView.requestFocus();
        } else {
            startSignUp(new SignUpData(name, email, password, birthDate, gender));
        }

    }

    private void startSignUp(SignUpData data){
        service.userJoin(data).enqueue(new Callback<SignUpResponse>() {
            @Override
            public void onResponse(Call<SignUpResponse> call, Response<SignUpResponse> response) {
                SignUpResponse result = response.body();
                Toast.makeText(SignUp.this, result.getMessage(), Toast.LENGTH_SHORT).show();

                if (result.getCode() == 200) {
                    loggedIn = true;
                    finish();
                }
                if (result.getCode() == 409) {
                    Toast.makeText(SignUp.this, "중복된 이메일", Toast.LENGTH_SHORT).show();
                }
                if (result.getCode() == 400) {
                    Toast.makeText(SignUp.this, "잘못된 가입 정보 기입", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<SignUpResponse> call, Throwable t) {
                Toast.makeText(SignUp.this, "회원가입 에러 발생", Toast.LENGTH_SHORT).show();
                Log.e("회원가입 에러 발생", t.getMessage());
            }
        });


    }
    private boolean isEmailValid(String email) {
        return email.contains("@");
    }

    private boolean isPasswordValid(String password) {
        return password.length() >= 8;
    }
}
