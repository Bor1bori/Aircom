package com.aircom;

import android.app.ActionBar;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;

import com.aircom.data.RetrofitClient;
import com.aircom.data.ServiceAPI;
import com.aircom.data.SharedPreference;
import com.aircom.data.SignInData;
import com.aircom.data.SignInResponse;
import com.aircom.data.SignUpData;
import com.aircom.data.SignUpResponse;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SignUp extends Activity {
    private EditText mEmail;
    private EditText mPassword;
    private EditText mRePassword;
    private Button signUpButton;
    private ServiceAPI service;
    private RadioButton mMale;
    private RadioButton mFemale;
    private EditText mBirthDate;
    private TextView mGender;
    private CheckBox mCheckBox;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);
        setActionBar();

        mEmail = (EditText) findViewById(R.id.emailForSignUp);
        mPassword = (EditText) findViewById(R.id.pwForSignUp);
        mRePassword = (EditText) findViewById(R.id.rePWForSignUp);
        signUpButton = (Button) findViewById(R.id.signUpButton);
        mMale = (RadioButton) findViewById(R.id.male);
        mFemale = (RadioButton) findViewById(R.id.female);
        mBirthDate = (EditText) findViewById(R.id.birthDateForSignUp);
        mGender = (TextView)findViewById(R.id.genderTextView);
        mCheckBox = (CheckBox)findViewById(R.id.checkButton);

        service = RetrofitClient.getClient().create(ServiceAPI.class);
        signUpButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                trySignUp();
            }
        });

    }

    private void setActionBar() {
        ActionBar actionBar = getActionBar();
        actionBar.setDisplayShowCustomEnabled(true);
        actionBar.setDisplayOptions(ActionBar.DISPLAY_SHOW_CUSTOM);
        actionBar.setCustomView(getLayoutInflater().inflate(R.layout.actionbar_sign_up, null),
                new ActionBar.LayoutParams(
                        ActionBar.LayoutParams.WRAP_CONTENT,
                        ActionBar.LayoutParams.MATCH_PARENT,
                        Gravity.CENTER
                )
        );
    }
    private void trySignUp() {
        mEmail.setError(null);
        mPassword.setError(null);

        String email = mEmail.getText().toString();
        String password = mPassword.getText().toString();
        String rePassword = mRePassword.getText().toString();
        String birthDate = mBirthDate.getText().toString();
        String gender = "";

        if (mMale.isChecked()) {
            gender = "male";
        }
        else if (mFemale.isChecked()) {
            gender = "female";
        }

        boolean cancel = false;
        View focusView = null;

        // 패스워드의 유효성 검사
        if (password.isEmpty()) {
            mPassword.setError("비밀번호를 입력해주세요.");
            focusView = mPassword;
            cancel = true;
        }
        else if (isPasswordInvalid(password)) {
            mPassword.setError("8자 이상의 비밀번호를 입력해주세요.");
            focusView = mPassword;
            cancel = true;
        }

        // 이메일의 유효성 검사
        if (email.isEmpty()) {
            mEmail.setError("이메일을 입력해주세요.");
            focusView = mEmail;
            cancel = true;
        }
        else if (isEmailInValid(email)) {
            mEmail.setError("@를 포함한 유효한 이메일을 입력해주세요.");
            focusView = mEmail;
            cancel = true;
        }

        // 패스워드 확인 유효성 검사
        if (rePassword.isEmpty()) {
            mRePassword.setError("비밀번호를 다시 입력해주세요.");
            focusView = mRePassword;
            cancel = true;
        }
        else if (!rePassword.equals(password)) {
            mRePassword.setError("비밀번호가 일치하지 않습니다.");
            focusView = mRePassword;
            cancel = true;
        }

        //생년월일 유효성
        if (birthDate.length() != 6) {
            mBirthDate.setError("생년월일을 6자리로 입력해주세요");
            focusView = mBirthDate;
            cancel = true;
        }
        else {
            birthDate = "19" + birthDate.substring(0, 2) + "-" + birthDate.substring(2, 4) + "-"
                    +birthDate.substring(4, 6);
        }

        //성별 체크 여부
        if (!mMale.isChecked() && !mFemale.isChecked()) {
            mGender.setError("성별을 선택해주세요");
            focusView = mBirthDate;
            cancel = true;
        }

        if (cancel) {
            focusView.requestFocus();
        }
        else if (!mCheckBox.isChecked()){
            Toast.makeText(SignUp.this, "약관에 동의해 주세요", Toast.LENGTH_SHORT).show();
        }
        else {
            SignUpData SD = new SignUpData(email, password, birthDate, gender);
            startSignUp(SD);
            SD.getEmail();
            SD.getGender();
            SD.getPassword();
            SD.getBirthdate();
        }

    }

    private void startSignUp(SignUpData data) {
        final SignUpData registerData = data;
        service.userJoin(data).enqueue(new Callback<SignUpResponse>() {
            @Override
            public void onResponse(Call<SignUpResponse> call, Response<SignUpResponse> response) {
                if (response.code() == 200) {
                    //회원가입 후 바로 로그인 처리
                    SignInData loginData =
                            new SignInData(registerData.getEmail(), registerData.getPassword());
                    //에러 방지 코드
                    loginData.getUserEmail();
                    loginData.getUserPwd();
                    startSignIn(loginData);
                    finish();
                }
            }

            @Override
            public void onFailure(Call<SignUpResponse> call, Throwable t) {
                Toast.makeText(SignUp.this, "회원가입 에러 발생",
                        Toast.LENGTH_SHORT).show();
                Log.e("회원가입 에러 발생", t.getMessage());
            }
        });


    }
    private boolean isEmailInValid(String email) {
        return !email.contains("@");
    }

    private boolean isPasswordInvalid(String password) {
        return password.length() < 8;
    }

    public void startSignIn(final SignInData data) {
        service.userLogin(data).enqueue(new Callback<SignInResponse>() {
            @Override
            public void onResponse(Call<SignInResponse> call, Response<SignInResponse> response) {
                if (response.code() == 200) {
                    Toast.makeText(SignUp.this, "로그인 되었습니다",
                            Toast.LENGTH_SHORT).show();
                    System.out.println("Login Token: "+response.body().getLoginToken());
                    SharedPreference.setUserName(SignUp.this, data.getUserEmail());
                    SharedPreference.setLoginToken(SignUp.this,
                            response.body().getLoginToken());
                    Intent intent = new Intent(SignUp.this,
                            AddComputerAutomatically.class);
                    startActivity(intent);
                }
            }

            @Override
            public void onFailure(Call<SignInResponse> call, Throwable t) {
                Toast.makeText(SignUp.this, "로그인 에러 발생",
                        Toast.LENGTH_SHORT).show();
                Log.e("로그인 에러 발생", t.getMessage());
            }
        });
    }
}
