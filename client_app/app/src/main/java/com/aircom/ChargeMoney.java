package com.aircom;

import android.app.ActionBar;
import android.app.Activity;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.widget.ImageView;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;

import androidx.annotation.Nullable;

public class ChargeMoney extends Activity {
    private RadioGroup mChargeRadioGroup;
    private RadioButton mBasic;
    private RadioButton mTime;
    private RadioButton mPro;
    private TextView mProductName;
    private TextView mDueDate;
    private TextView mCurrentLeftTime;
    private TextView mAfterLeftTime;
    private TextView mTotalPrice;
    private ImageView mBackArrow;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_charge_money);
        setActionBar();
        mChargeRadioGroup = (RadioGroup) findViewById(R.id.chargeRadioGroup);
        mBasic = (RadioButton)findViewById(R.id.basicRadioButton);
        mPro = (RadioButton)findViewById(R.id.proRadioButton);
        mTime = (RadioButton)findViewById(R.id.timeRadioButton);
        mProductName = findViewById(R.id.productName);
        mDueDate = findViewById(R.id.dueDate);
        mCurrentLeftTime = findViewById(R.id.currentLeftTime);
        mAfterLeftTime = findViewById(R.id.afterLeftTime);
        mTotalPrice = findViewById(R.id.totalPrice);

        mChargeRadioGroup.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup radioGroup, int i) {
                setChangedText();
            }
        });

        mBackArrow = (ImageView)findViewById(R.id.backArrow);
        mBackArrow.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                onBackPressed();
            }
        });
    }

    private void setActionBar() {
        ActionBar actionBar = getActionBar();
        actionBar.setDisplayShowCustomEnabled(true);
        actionBar.setDisplayOptions(ActionBar.DISPLAY_SHOW_CUSTOM);
        actionBar.setCustomView(getLayoutInflater().inflate(R.layout.actionbar_charge_money, null),
                new ActionBar.LayoutParams(
                        ActionBar.LayoutParams.WRAP_CONTENT,
                        ActionBar.LayoutParams.MATCH_PARENT,
                        Gravity.CENTER
                )
        );
    }

    private void setChangedText() {
        if (mBasic.isChecked()) {
            mProductName.setText("정액제 - 기본형");
            mDueDate.setText("2020.10.10 23시");
            mCurrentLeftTime.setText("0시간");
            mAfterLeftTime.setText("72시간");
            mTotalPrice.setText("9900원");
        }
        if (mPro.isChecked()) {
            mProductName.setText("정액제 - 프로형");
            mDueDate.setText("2020.10.10 23시");
            mCurrentLeftTime.setText("0시간");
            mAfterLeftTime.setText("160시간");
            mTotalPrice.setText("19900원");
        }
        if (mTime.isChecked()) {
            mProductName.setText("시간제");
            mDueDate.setText("-");
            mCurrentLeftTime.setText("0시간");
            mAfterLeftTime.setText("1시간");
            mTotalPrice.setText("300원");
        }
    }
}
