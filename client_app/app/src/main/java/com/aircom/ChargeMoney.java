package com.aircom;

import android.app.ActionBar;
import android.app.Activity;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;

import com.aircom.data.ChargeSubData;
import com.aircom.data.ChargeTimeData;
import com.aircom.data.RetrofitClient;
import com.aircom.data.ServiceAPI;
import com.aircom.data.SharedPreference;
import com.aircom.data.SubscriptionResponse;

import java.util.Calendar;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ChargeMoney extends Activity {
    private RadioGroup mChargeRadioGroup;
    private RadioButton mBasic, mTime, mPro;
    private TextView mProductName, mDueDate, mCurrentLeftTime, mAfterLeftTime, mTotalPrice, mHour;
    private ImageView mBackArrow;
    private Button mPlusButton, mMinusButton, mPayButton;
    private CheckBox mCheckBox;
    private ServiceAPI service;
    private int hour = 1;
    private int remainTime = 0;
    private String dueDate;
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
        mHour = findViewById(R.id.hour);
        mPlusButton = (Button)findViewById(R.id.plusButton);
        mMinusButton = (Button)findViewById(R.id.minusButton);
        mPayButton = (Button)findViewById(R.id.payButton);
        mCheckBox = (CheckBox)findViewById(R.id.checkButton);
        service = RetrofitClient.getClient().create(ServiceAPI.class);

        mChargeRadioGroup.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup radioGroup, int i) {
                setChangedText();
            }
        });

        setRemainTime();
        setDueDate();

        mMinusButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                setMinusResult();
            }
        });

        mPlusButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
               setPlusResult();
            }
        });

        mPayButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                payProduct();
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

    private void setDueDate() {
        Calendar now = Calendar.getInstance();
        now.add(Calendar.DATE, 30);
        dueDate = now.get(Calendar.MONTH) + 1 + "월 " + now.get(Calendar.DAY_OF_MONTH) + "일 " +
                now.get(Calendar.HOUR) + "시 " +  now.get(Calendar.MINUTE) + "분";
    }

    private void setMinusResult() {
        if (hour > 1) {
            hour--;
            String hourText = hour + "";
            mHour.setText(hourText);
        }
        String after = remainTime + hour + "시간";
        mAfterLeftTime.setText(after);
        String price = 300 * hour + "원";
        mTotalPrice.setText(price);
    }

    private void setPlusResult() {
        hour++;
        String hourText = hour + "";
        mHour.setText(hourText);
        String after = remainTime + hour + "시간";
        mAfterLeftTime.setText(after);
        String price = 300 * hour + "원";
        mTotalPrice.setText(price);
    }

    private void setRemainTime() {
        service.subscriptionInfoRequest(SharedPreference.getLoginToken(ChargeMoney.this))
                .enqueue(new Callback<SubscriptionResponse>() {
                    @Override
                    public void onResponse(Call<SubscriptionResponse> call,
                                           Response<SubscriptionResponse> response) {
                        if (response.code() == 200) {
                            remainTime = response.body().getRemainTime() / 3600000;
                        }
                        else {
                            Toast.makeText(ChargeMoney.this, "에러 발생",
                                    Toast.LENGTH_SHORT).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<SubscriptionResponse> call, Throwable t) {
                        System.out.println("error: "+t.getMessage());
                    }
                });
    }

    private void setChangedText() {
        if (mBasic.isChecked()) {
            mProductName.setText("정액제 - 기본형");
            mDueDate.setText(dueDate);
            String current = remainTime + "시간";
            mCurrentLeftTime.setText(current);
            String after = remainTime + 72 + "시간";
            mAfterLeftTime.setText(after);
            mTotalPrice.setText(R.string.bascic_price);
        }
        if (mPro.isChecked()) {
            mProductName.setText("정액제 - 프로형");
            mDueDate.setText(dueDate);
            String current = remainTime + "시간";
            mCurrentLeftTime.setText(current);
            String after = remainTime + 160 + "시간";
            mAfterLeftTime.setText(after);
            mTotalPrice.setText(R.string.pro_price);
        }
        if (mTime.isChecked()) {
            mProductName.setText("시간제");
            mDueDate.setText("-");
            String current = remainTime + "시간";
            mCurrentLeftTime.setText(current);
            String after = remainTime + hour + "시간";
            mAfterLeftTime.setText(after);
            String price = 300 * hour + "원";
            mTotalPrice.setText(price);
        }
    }

    private void payProduct() {
        if (!mCheckBox.isChecked()) {
            Toast.makeText(ChargeMoney.this, "약관에 동의해주세요",
                    Toast.LENGTH_SHORT).show();
            return;
        }
        if (mTime.isChecked()) {
            ChargeTimeData data = new ChargeTimeData(hour);
            data.getHours();
            service.chargeTimeRequest(SharedPreference.getLoginToken(ChargeMoney.this), data)
                    .enqueue(new Callback<Void>() {
                        @Override
                        public void onResponse(Call<Void> call,
                                               Response<Void> response) {
                            if (response.code() == 200) {
                                Toast.makeText(ChargeMoney.this, "충전되었습니다",
                                        Toast.LENGTH_SHORT).show();
                                finish();
                            }
                            else {
                                Toast.makeText(ChargeMoney.this, "에러 발생",
                                        Toast.LENGTH_SHORT).show();
                            }
                        }
                        @Override
                        public void onFailure(Call<Void> call, Throwable t) {
                            Toast.makeText(ChargeMoney.this, "통신 에러 발생",
                                    Toast.LENGTH_SHORT).show();
                        }
                    });
        }
        else if (mBasic.isChecked()) {
            ChargeSubData data = new ChargeSubData(1);
            data.getSubscriptionMenuId();
            service.chargeSubRequest(SharedPreference.getLoginToken(ChargeMoney.this), data)
                    .enqueue(new Callback<Void>() {
                        @Override
                        public void onResponse(Call<Void> call,
                                               Response<Void> response) {
                            if (response.code() == 200) {
                                Toast.makeText(ChargeMoney.this, "충전되었습니다",
                                        Toast.LENGTH_SHORT).show();
                                finish();
                            }
                            else {
                                Toast.makeText(ChargeMoney.this, "에러 발생",
                                        Toast.LENGTH_SHORT).show();
                            }
                        }
                        @Override
                        public void onFailure(Call<Void> call, Throwable t) {
                            Toast.makeText(ChargeMoney.this, "통신 에러 발생",
                                    Toast.LENGTH_SHORT).show();
                        }
                    });
        }
        else {
            ChargeSubData data = new ChargeSubData(2);
            data.getSubscriptionMenuId();
            service.chargeSubRequest(SharedPreference.getLoginToken(ChargeMoney.this), data)
                    .enqueue(new Callback<Void>() {
                        @Override
                        public void onResponse(Call<Void> call,
                                               Response<Void> response) {
                            if (response.code() == 200) {
                                Toast.makeText(ChargeMoney.this, "충전되었습니다",
                                        Toast.LENGTH_SHORT).show();
                                finish();
                            }
                            else {
                                Toast.makeText(ChargeMoney.this, "에러 발생",
                                        Toast.LENGTH_SHORT).show();
                            }
                        }
                        @Override
                        public void onFailure(Call<Void> call, Throwable t) {
                            Toast.makeText(ChargeMoney.this, "통신 에러 발생",
                                    Toast.LENGTH_SHORT).show();
                        }
                    });
        }
    }
}
