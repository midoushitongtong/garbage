package com.midoushitongtong.component06.fragment;

import android.content.Context;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.midoushitongtong.component06.R;

public class StaticFragment extends Fragment {
    private static final String TAG = "fragment";

    // 当碎片关联到 activity
    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
        Log.d(TAG, "onAttach: ");
    }

    // 当页面创建
    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(TAG, "onCreate: ");
    }

    // 当创建视图
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        Log.d(TAG, "onCreateView: ");
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_static, container, false);
    }

    // 当页面启动
    @Override
    public void onStart() {
        super.onStart();
        Log.d(TAG, "onStart: ");
    }

    // 当页面恢复
    @Override
    public void onResume() {
        super.onResume();
        Log.d(TAG, "onResume: ");
    }

    // 当页面暂停
    @Override
    public void onStop() {
        super.onStop();
        Log.d(TAG, "onStop: ");
    }

    // 当碎片被销毁
    @Override
    public void onDestroyView() {
        super.onDestroyView();
        Log.d(TAG, "onDestroyView: ");
    }

    // 当前页面销毁
    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "onDestroy: ");
    }

    // 当碎片被移除
    @Override
    public void onDetach() {
        super.onDetach();
        Log.d(TAG, "onDestroy: ");
    }
}