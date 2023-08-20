package com.midoushitongtong.component06.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RadioButton;
import android.widget.RadioGroup;

import androidx.annotation.NonNull;
import androidx.viewpager.widget.PagerAdapter;

import com.midoushitongtong.component06.R;
import com.midoushitongtong.component06.util.ToastUtil;

import java.util.ArrayList;
import java.util.List;

public class LaunchSimpleAdapter extends PagerAdapter {
    private final Context context;
    private final int[] images;
    private List<View> viewList = new ArrayList<>();

    public LaunchSimpleAdapter(Context context, int[] images) {
        this.context = context;
        this.images = images;
        for (int i = 0; i < images.length; i++) {
            View view = LayoutInflater.from(context).inflate(R.layout.item_launch, null);
            ImageView launchImageView = view.findViewById(R.id.launch_image_view);
            RadioGroup dotRadioGroup = view.findViewById(R.id.dot_radio_group);
            Button startButton = view.findViewById(R.id.start_button);
            launchImageView.setImageResource(images[i]);
            for (int j = 0; j < images.length; j++) {
                RadioButton radioButton = new RadioButton(context);
                radioButton.setLayoutParams(new ViewGroup.LayoutParams(
                        ViewGroup.LayoutParams.WRAP_CONTENT,
                        ViewGroup.LayoutParams.WRAP_CONTENT
                ));
                radioButton.setPadding(10, 10, 10, 10);
                dotRadioGroup.addView(radioButton);
            }
            ((RadioButton)dotRadioGroup.getChildAt(i)).setChecked(true);
            if (i == images.length - 1) {
                startButton.setVisibility(View.VISIBLE);
                startButton.setOnClickListener(v -> {
                    ToastUtil.show(context, "立即使用");
                });
            }
            viewList.add(view);
        }
    }

    @Override
    public int getCount() {
        return viewList.size();
    }

    @Override
    public boolean isViewFromObject(@NonNull View view, @NonNull Object object) {
        return view == object;
    }

    @NonNull
    @Override
    public Object instantiateItem(@NonNull ViewGroup container, int position) {
        View item = viewList.get(position);
        container.addView(item);
        return item;
    }

    @Override
    public void destroyItem(@NonNull ViewGroup container, int position, @NonNull Object object) {
        container.removeView(viewList.get(position));
    }
}
