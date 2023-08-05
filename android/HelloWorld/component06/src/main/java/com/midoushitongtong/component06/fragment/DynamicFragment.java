package com.midoushitongtong.component06.fragment;

import android.content.Context;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.midoushitongtong.component06.R;
import com.midoushitongtong.component06.entity.Product;

public class DynamicFragment extends Fragment {
    public static DynamicFragment newInstance(int position, int imageId, String name) {
        DynamicFragment fragment = new DynamicFragment();
        Bundle args = new Bundle();
        args.putInt("position", position);
        args.putInt("imageId", imageId);
        args.putString("name", name);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_dynamic, container, false);
        Bundle arguments = getArguments();
        if (arguments != null) {
            ImageView picImageView = view.findViewById(R.id.pic_image_view);
            TextView nameTextView = view.findViewById(R.id.name_text_view);
            picImageView.setImageResource(arguments.getInt("imageId", R.drawable.huawei));
            nameTextView.setText(arguments.getString("name"));
        }
        return view;
    }

    // 当碎片被销毁

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
        Log.d("test", getArguments().getInt("position") + "");
    }

    // 当碎片被销毁
    @Override
    public void onDestroyView() {
        super.onDestroyView();
        Log.d("test", "onDestroyView: ");
    }

    // 当前页面销毁
    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d("test", "onDestroy: ");
    }

    // 当碎片被移除
    @Override
    public void onDetach() {
        super.onDetach();
        Log.d("test", "onDestroy: ");
    }
}