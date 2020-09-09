package com.aircom.ui;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.Fragment;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.aircom.ChargeMoney;
import com.aircom.EditAccountInfo;
import com.aircom.Game;
import com.aircom.R;
import com.aircom.data.PCDeallocationResponse;
import com.aircom.data.RetrofitClient;
import com.aircom.data.ServiceAPI;
import com.aircom.data.SharedPreference;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MyPageFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        final ListView listview;
        final MyPageListViewAdapter adapter;
        final View root = inflater.inflate(R.layout.fragment_my_page, container, false);
        // Adapter 생성
        adapter = new MyPageListViewAdapter();

        // 리스트뷰 참조 및 Adapter달기
        listview = root.findViewById(R.id.myPageListView);
        listview.setAdapter(adapter);

        //item 추가
        adapter.addItem("사용자 계정", "aircom@naver.com");
        adapter.addItem();
        adapter.addItem("충전하기");
        adapter.addItem("구글 | 원드라이브 연동", "aircom@gmail.com");
        adapter.addItem("로그아웃");

        listview.setOnItemClickListener(new AdapterView.OnItemClickListener(){
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                if (i==0){
                    Intent intent = new Intent(getActivity(), EditAccountInfo.class);
                    startActivity(intent);
                }
                if (i==2){
                    Intent intent = new Intent(getActivity(), ChargeMoney.class);
                    startActivity(intent);
                }
                if (i==4){
                    new AlertDialog.Builder(getActivity())
                            .setMessage("로그아웃 하시겠어요?")
                            .setPositiveButton("예",
                                    new DialogInterface.OnClickListener() {
                                        public void onClick(DialogInterface dialog, int which) {
                                            SharedPreference.clearLoginToken(getActivity());
                                            getActivity().moveTaskToBack(true);
                                            getActivity().finish();
                                        }
                                    })
                            .setNegativeButton("아니오", null)
                            .create()
                            .show();
                }
            }
        });

        return root;
    }

}
