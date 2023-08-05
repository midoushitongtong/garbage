package com.midoushitongtong.component06.fragment;

import android.content.Context;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RadioButton;
import android.widget.RadioGroup;

import com.midoushitongtong.component06.R;
import com.midoushitongtong.component06.util.ToastUtil;

public class LaunchFragment extends Fragment {
    public static LaunchFragment newInstance(int position, int[] images) {
        LaunchFragment fragment = new LaunchFragment();
        Bundle args = new Bundle();
        args.putInt("position", position);
        args.putInt("imageId", images[position]);
        args.putInt("imageLength", images.length);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_launch, container, false);

        Bundle arguments = getArguments();
        Context context = getContext();
        int position = arguments.getInt("position", 0);
        int imageId = arguments.getInt("imageId", 0);
        int imageLength = arguments.getInt("imageLength", 0);

        ImageView launchImageView = view.findViewById(R.id.launch_image_view);
        RadioGroup dotRadioGroup = view.findViewById(R.id.dot_radio_group);
        Button startButton = view.findViewById(R.id.start_button);

        launchImageView.setImageResource(imageId);
        for (int j = 0; j < imageLength; j++) {
            RadioButton radioButton = new RadioButton(context);
            radioButton.setLayoutParams(new ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.WRAP_CONTENT,
                    ViewGroup.LayoutParams.WRAP_CONTENT
            ));
            radioButton.setPadding(10, 10, 10, 10);
            dotRadioGroup.addView(radioButton);
        }
        ((RadioButton)dotRadioGroup.getChildAt(position)).setChecked(true);
        if (position == imageLength - 1) {
            startButton.setVisibility(View.VISIBLE);
            startButton.setOnClickListener(v -> {
                ToastUtil.show(context, "立即使用");
            });
        }
        return view;
    }
}