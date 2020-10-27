package com.aircom.ui;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.recyclerview.widget.RecyclerView.ViewHolder;

import com.aircom.R;
import com.aircom.data.RetrofitClient;
import com.aircom.data.ServiceAPI;
import com.aircom.data.SharedPreference;
import com.aircom.data.SubTotalData;
import com.aircom.data.SubscribeData;
import com.aircom.data.SubscriptionData;
import com.aircom.data.SubscriptionResponse;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MyPageListViewAdapter extends BaseAdapter{
    private static final int ITEM_VIEW_TYPE_ACCOUNT = 0 ;
    private static final int ITEM_VIEW_TYPE_CHARGE_LOGOUT = 1 ;
    private static final int ITEM_VIEW_TYPE_USAGE = 2 ;
    private ArrayList<ListViewItem> listViewItemList = new ArrayList<ListViewItem>() ;
    private TextView mLeftTime;
    private TextView mProvidedTime;
    private Context context;
    private SubscriptionResponse res;
    private SubTotalData data;
    private int subscriptionMenuId;
    private int remainTime;

    public MyPageListViewAdapter(Context context) {
        this.context = context;
    }
    @Override
    public int getCount() {
        return listViewItemList.size() ;
    }

    @Override
    public Object getItem(int i) {
        return listViewItemList.get(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @Override
    public int getViewTypeCount() {
        return 3;
    }

    @Override
    public int getItemViewType(int position) {
        return listViewItemList.get(position).getType();
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        final Context context = viewGroup.getContext();
        int viewType = getItemViewType(i) ;
        if (view == null) {
            LayoutInflater inflater = (LayoutInflater) context
                    .getSystemService(Context.LAYOUT_INFLATER_SERVICE) ;

            // Data Set(listViewItemList)에서 position에 위치한 데이터 참조 획득
            ListViewItem listViewItem = listViewItemList.get(i);
            switch (viewType){
                case ITEM_VIEW_TYPE_ACCOUNT:
                    view = inflater.inflate(R.layout.listview_mypage_account,
                            viewGroup, false);
                    TextView titleTextView = (TextView) view.findViewById(R.id.title) ;
                    TextView accountTextView = (TextView) view.findViewById(R.id.account) ;
                    titleTextView.setText(listViewItem.getTitle());
                    accountTextView.setText(listViewItem.getAccount());
                    break;
                case ITEM_VIEW_TYPE_CHARGE_LOGOUT:
                    view = inflater.inflate(R.layout.listview_mypage_charge_logout,
                            viewGroup, false);
                    TextView titleTextView2 = (TextView) view.findViewById(R.id.title) ;
                    titleTextView2.setText(listViewItem.getTitle());
                    break;
                case ITEM_VIEW_TYPE_USAGE:
                    view = inflater.inflate(R.layout.listview_mypage_usage,
                            viewGroup, false);
                    mLeftTime = (TextView)view.findViewById(R.id.leftTime);
                    mProvidedTime = (TextView)view.findViewById(R.id.providedTime);
                    View v = view.findViewById(R.id.usageBar);
                    ViewGroup.LayoutParams layoutParams = v.getLayoutParams();
                    setRemainTime(layoutParams, v);
                    break;
            }

        }
        return view;
    }
    // account
    public void addItem(String title, String account) {
        ListViewItem item = new ListViewItem() ;

        item.setType(ITEM_VIEW_TYPE_ACCOUNT);
        item.setTitle(title) ;
        item.setAccount(account) ;
        listViewItemList.add(item) ;
    }
    // charge/logout
    public void addItem(String title) {
        ListViewItem item = new ListViewItem() ;
        item.setType(ITEM_VIEW_TYPE_CHARGE_LOGOUT);
        item.setTitle(title) ;
        listViewItemList.add(item) ;
    }

    public void addItem() {
        ListViewItem item = new ListViewItem() ;
        item.setType(ITEM_VIEW_TYPE_USAGE);
        listViewItemList.add(item) ;
    }

    private void setRemainTime(final ViewGroup.LayoutParams layoutParams, final View v) {
        ServiceAPI service = RetrofitClient.getClient().create(ServiceAPI.class);
        service.subscriptionInfoRequest(SharedPreference.getLoginToken(context))
                .enqueue(new Callback<SubscriptionResponse>() {
                    @Override
                    public void onResponse(Call<SubscriptionResponse> call,
                                           Response<SubscriptionResponse> response) {
                        if (response.code() == 200) {
                            remainTime = response.body().getRemainTime() / 3600000;
                            res = new SubscriptionResponse(response.body().
                                    getSubscription(), response.body().getRemainTime());
                            response.body().getSubscription().getSubscribeData();
                            data = new SubTotalData(
                                    res.getSubscription().getSubscribeData(),
                                    res.getSubscription().getSubscriptionData());
                            subscriptionMenuId = data.getSubscribeData().subscriptionMenuId;
                            setUsageBar(layoutParams, v);
                        }
                        else {
                            Toast.makeText(context, "일시적으로 잔여 시간을 불러올 수 없습니다",
                                    Toast.LENGTH_SHORT).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<SubscriptionResponse> call, Throwable t) {
                        Toast.makeText(context, "네트워크 상태를 확인해주세요",
                                Toast.LENGTH_SHORT).show();
                    }
                });
    }

    private void setUsageBar(final ViewGroup.LayoutParams layoutParams, final View v) {
        final float scale = context.getResources().getDisplayMetrics().density;
        float width;
        if (res.getSubscription() == null) {
            String s = "남은 시간 " + remainTime + "시간";
            mProvidedTime.setText(s);
            mProvidedTime.setTextColor(Color.parseColor("#0052cc"));
            if (remainTime >= 30) {
                width = 335;
            }
            else {
                width = ((float)remainTime / 30 ) * 335;
                System.out.println("width: "+width);
            }
            layoutParams.width = (int) ( width * scale + 0.5f);
            v.setLayoutParams(layoutParams);
        }
        else {
            if (subscriptionMenuId == 1) {
                String s1 = "남은 시간 " + remainTime + "시간";
                String s2 = "제공 72시간";
                mLeftTime.setText(s1);
                mProvidedTime.setText(s2);
                if (remainTime >= 72) {
                    width = 335;
                }
                else {
                    width = ((float)remainTime / 72 ) * 335;
                }
                layoutParams.width = (int) (width * scale + 0.5f);
                v.setLayoutParams(layoutParams);
            }
            else if (subscriptionMenuId == 2) {
                String s1 = "남은 시간 " + remainTime + "시간";
                String s2 = "제공 160시간";
                mLeftTime.setText(s1);
                mProvidedTime.setText(s2);
                if (remainTime >= 160) {
                    width = 335;
                }
                else {
                    width = ((float)remainTime / 160 ) * 335;
                }
                layoutParams.width = (int) (width * scale + 0.5f);
                v.setLayoutParams(layoutParams);
            }
        }
    }
}
