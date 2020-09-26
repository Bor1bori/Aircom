package com.aircom.ui;

import android.content.Context;
import android.content.Intent;
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

import java.util.ArrayList;

public class MyPageListViewAdapter extends BaseAdapter{
    private static final int ITEM_VIEW_TYPE_ACCOUNT = 0 ;
    private static final int ITEM_VIEW_TYPE_CHARGE_LOGOUT = 1 ;
    private static final int ITEM_VIEW_TYPE_USAGE = 2 ;
    private ArrayList<ListViewItem> listViewItemList = new ArrayList<ListViewItem>() ;

    public MyPageListViewAdapter() {

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
}
