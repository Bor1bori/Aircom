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

import androidx.annotation.Nullable;

import com.aircom.data.SharedPreference;

public class EditAccountInfo extends Activity {
    private TextView mEmail;
    private EditText mPassword;
    private EditText mRePassword;
    private EditText mBirthDate;
    private TextView mWithdraw;
    private RadioButton mMale;
    private RadioButton mFemale;
    private Button mEditButton;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_account_info);
        ActionBar actionBar = getActionBar();
        actionBar.setDisplayShowCustomEnabled(true);
        actionBar.setDisplayOptions(ActionBar.DISPLAY_SHOW_CUSTOM);
        actionBar.setCustomView(getLayoutInflater().inflate(R.layout.actionbar_edit_account_info, null),
                new ActionBar.LayoutParams(
                        ActionBar.LayoutParams.WRAP_CONTENT,
                        ActionBar.LayoutParams.MATCH_PARENT,
                        Gravity.CENTER
                )
        );
        mEmail = (TextView) findViewById(R.id.emailForEditInfo);
        mPassword = (EditText) findViewById(R.id.pwForEditInfo);
        mRePassword = (EditText) findViewById(R.id.rePWForEditInfo);
        mEditButton = (Button) findViewById(R.id.editInfoButton);
        mMale = (RadioButton) findViewById(R.id.male);
        mFemale = (RadioButton) findViewById(R.id.female);
        mBirthDate = (EditText) findViewById(R.id.birthDateForSignUp);
        mEmail.setText("aircom@naver.com");
        mWithdraw = (TextView) findViewById(R.id.withdrawTextView);
        mWithdraw.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new AlertDialog.Builder(EditAccountInfo.this)
                        .setMessage("탈퇴하시겠습니까?")
                        .setPositiveButton("예",
                                new DialogInterface.OnClickListener() {
                                    public void onClick(DialogInterface dialog, int which) {
                                       //탈퇴
                                    }
                                })
                        .setNegativeButton("아니오", null)
                        .create()
                        .show();
            }
        });

    }
}
