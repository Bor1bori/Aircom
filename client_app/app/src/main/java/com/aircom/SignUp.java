package com.aircom;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.Toast;

import androidx.annotation.Nullable;

import com.aircom.data.RetrofitClient;
import com.aircom.data.ServiceAPI;
import com.aircom.data.SignInData;
import com.aircom.data.SignInResponse;
import com.aircom.data.SignUpData;
import com.aircom.data.SignUpResponse;
import com.aircom.preferences.AddComputerAutomatically;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SignUp extends Activity {
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

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);

        mEmail = (EditText) findViewById(R.id.emailForSignUp);
        mPassword = (EditText) findViewById(R.id.pwForSignUp);
        signUpButton = (Button) findViewById(R.id.signUpButton);
        mMale = (RadioButton) findViewById(R.id.male);
        mFemale = (RadioButton) findViewById(R.id.female);
        mEtc = (RadioButton) findViewById(R.id.etc);
        mYear = (EditText) findViewById(R.id.year);
        mMonth = (EditText) findViewById(R.id.month);
        mDay = (EditText) findViewById(R.id.day);

        service = RetrofitClient.getClient().create(ServiceAPI.class);

        signUpButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                trySignUp();
            }
        });

    }

    private void trySignUp(){
        mEmail.setError(null);
        mPassword.setError(null);

        String email = mEmail.getText().toString();
        String password = mPassword.getText().toString();
        String year = mYear.getText().toString();
        String month = mMonth.getText().toString();
        String day = mDay.getText().toString();
        String birthdate = year+"-"+month+"-"+day;
        String gender = "";
        if (mMale.isChecked()){
            gender = "male";
        }
        else if (mFemale.isChecked()){
            gender = "female";
        }
        else if (mEtc.isChecked()){
            gender = "etc";
        }


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

        if (cancel) {
            focusView.requestFocus();
        } else {
            SignUpData SD = new SignUpData(email, password, birthdate, gender);
            startSignUp(SD);
            SD.getEmail();
            SD.getGender();
            SD.getPassword();
            SD.getBirthdate();
        }

    }

    private void startSignUp(SignUpData data){
        final SignUpData registerData = data;
        service.userJoin(data).enqueue(new Callback<SignUpResponse>() {
            @Override
            public void onResponse(Call<SignUpResponse> call, Response<SignUpResponse> response) {
                if (response.code() == 200) {
                    //회원가입 후 바로 로그인 처리
                    SignInData loginData = new SignInData(registerData.getEmail(), registerData.getPassword());
                    //에러 방지 코드
                    loginData.getUserEmail();
                    loginData.getUserPwd();
                    startSignIn(loginData);
                    finish();
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

    public void startSignIn(SignInData data){
        service.userLogin(data).enqueue(new Callback<SignInResponse>() {
            @Override
            public void onResponse(Call<SignInResponse> call, Response<SignInResponse> response) {
                if (response.code() == 200) {
                    Toast.makeText(SignUp.this, "로그인 되었습니다", Toast.LENGTH_SHORT).show();
                    Intent intent = new Intent(SignUp.this, AddComputerAutomatically.class);
                    startActivity(intent);
                }
            }

            @Override
            public void onFailure(Call<SignInResponse> call, Throwable t) {
                Toast.makeText(SignUp.this, "로그인 에러 발생", Toast.LENGTH_SHORT).show();
                Log.e("로그인 에러 발생", t.getMessage());
            }
        });
    }
}
