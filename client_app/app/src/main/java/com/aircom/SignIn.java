package com.aircom;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.StrictMode;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.aircom.data.SharedPreference;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.SignInButton;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.aircom.data.RetrofitClient;
import com.aircom.data.ServiceAPI;
import com.aircom.data.SignInData;
import com.aircom.data.SignInResponse;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static android.content.ContentValues.TAG;

public class SignIn extends Activity{
    private static final int RC_SIGN_IN = 9001;
    private GoogleSignInOptions gso;
    private GoogleSignInClient mGoogleSignInClient;
    private SignInButton googleSignInButton;
    private TextView signUpLink;
    private EditText mEmail, mPassword;
    private Button signInButton;
    private ServiceAPI service;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_in);
        if (SharedPreference.getLoginToken(SignIn.this).length()!=0){
            Intent intent = new Intent(SignIn.this, AddComputerAutomatically.class);
            Toast.makeText(SignIn.this, "로그인 되었습니다", Toast.LENGTH_SHORT).show();
            startActivity(intent);
        }
        //1. 구글로그인
        // Configure sign-in to request the user's ID, email address, and basic
        // profile. ID and basic profile are included in DEFAULT_SIGN_IN.
        gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(getString(R.string.server_client_id))
                .requestEmail()
                .build();

        // Build a GoogleSignInClient with the options specified by gso.
        mGoogleSignInClient = GoogleSignIn.getClient(this, gso);

        //이미 로그인 돼 있으면 바로 로그인
        /*mGoogleSignInClient.silentSignIn().addOnCompleteListener(this, new OnCompleteListener<GoogleSignInAccount>() {
            @Override
            public void onComplete(@NonNull Task<GoogleSignInAccount> task) {
                handleSignInResult(task);
            }
        });*/

        googleSignInButton = findViewById(R.id.googleSignInButton);

        // Set the dimensions of the sign-in button.
        googleSignInButton.setSize(SignInButton.SIZE_WIDE);
        googleSignInButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
               googleSignIn();
                }
        });

        //2. 일반 로그인
        mEmail = (EditText)findViewById(R.id.email);
        mPassword = (EditText)findViewById(R.id.PW);
        signInButton = (Button)findViewById(R.id.signInButton);

        service = RetrofitClient.getClient().create(ServiceAPI.class);

        signInButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptSignIn();
            }
        });


        //3. 회원가입
        signUpLink = (TextView) findViewById(R.id.signUpLink);
        signUpLink.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                signUp();
            }
        });
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

    }

    // 버튼 클릭 시 실행. 구글 계정 선택 창을 띄우고 선택하면 onActivityResult로 결과값이 전달된다
    private void googleSignIn() {
        Intent signInIntent = mGoogleSignInClient.getSignInIntent();
        startActivityForResult(signInIntent, RC_SIGN_IN);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        // Result returned from launching the Intent from GoogleSignInClient.getSignInIntent(...);
        if (requestCode == RC_SIGN_IN) {
            // The Task returned from this call is always completed, no need to attach
            // a listener.
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            handleSignInResult(task);
        }
    }

    private void handleSignInResult(@NonNull Task<GoogleSignInAccount> completedTask) {
        try {
            GoogleSignInAccount account = completedTask.getResult(ApiException.class);
            String idToken = account.getIdToken();
            System.out.println("idToken: "+idToken);

            // TODO(developer): send ID Token to server and validate
            HttpClient httpClient = new DefaultHttpClient();
            HttpPost httpPost = new HttpPost("http://ec2-52-79-77-234.ap-northeast-2.compute.amazonaws.com:3000/auth/oauth/google/signin");

            try {
                List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>(1);
                nameValuePairs.add(new BasicNameValuePair("idToken", idToken));
                httpPost.setEntity(new UrlEncodedFormEntity(nameValuePairs));

                HttpResponse response = httpClient.execute(httpPost);
                int statusCode = response.getStatusLine().getStatusCode();
                final String responseBody = EntityUtils.toString(response.getEntity()).split(":")[1];
                SharedPreference.setLoginToken(SignIn.this, responseBody);
            } catch (ClientProtocolException e) {
                Log.e(TAG, "Error sending ID token to backend.", e);
            } catch (IOException e) {
                Log.e(TAG, "Error sending ID token to backend.", e);
            }

            updateUI(account);
        } catch (ApiException e) {
            Log.w(TAG, "handleSignInResult:error", e);
            updateUI(null);
        }
    }

    protected void onStart() {
        super.onStart();
        // Check for existing Google Sign In account, if the user is already signed in
        // the GoogleSignInAccount will be non-null.
        GoogleSignInAccount account = GoogleSignIn.getLastSignedInAccount(this);
        updateUI(account);
    }

    private void attemptSignIn(){
        mEmail.setError(null);
        mPassword.setError(null);

        String email = mEmail.getText().toString();
        String password = mPassword.getText().toString();

        boolean cancel = false;
        View focusView = null;

        // 패스워드의 유효성 검사
        if (password.isEmpty()) {
            mEmail.setError("비밀번호를 입력해주세요.");
            focusView = mEmail;
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
            SignInData SD = new SignInData(email, password);
            SD.getUserEmail();
            SD.getUserPwd();
            startSignIn(SD);
        }
    }

    private void startSignIn(SignInData data){
        service.userLogin(data).enqueue(new Callback<SignInResponse>() {
            @Override
            public void onResponse(Call<SignInResponse> call, Response<SignInResponse> response) {
                Toast.makeText(SignIn.this, response.message(), Toast.LENGTH_SHORT).show();
                if (response.code() == 200) {
                    System.out.println("Login Token: "+response.body().getLoginToken());
                    SharedPreference.setLoginToken(SignIn.this, response.body().getLoginToken());
                    Intent intent = new Intent(SignIn.this, AddComputerAutomatically.class);
                    startActivity(intent);
                }
            }

            @Override
            public void onFailure(Call<SignInResponse> call, Throwable t) {
                Toast.makeText(SignIn.this, "로그인 에러 발생", Toast.LENGTH_SHORT).show();
                Log.e("로그인 에러 발생", t.getMessage());
            }
        });
    }

    private void signUp(){
        Intent intent = new Intent(SignIn.this, SignUp.class);
        startActivity(intent);
    }

    private void updateUI(GoogleSignInAccount account) {
        if (account != null){
            Toast.makeText(this, "로그인 되었습니다", Toast.LENGTH_SHORT).show();
            Intent intent = new Intent(SignIn.this, AddComputerAutomatically.class);
            startActivity(intent);
        }
    }

    private boolean isEmailValid(String email) {
        return email.contains("@");
    }

    private boolean isPasswordValid(String password) {
        return password.length() >= 8;
    }

}
