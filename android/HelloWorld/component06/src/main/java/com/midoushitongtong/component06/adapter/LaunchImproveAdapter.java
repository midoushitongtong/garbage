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
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;
import androidx.viewpager.widget.PagerAdapter;

import com.midoushitongtong.component06.R;
import com.midoushitongtong.component06.fragment.LaunchFragment;
import com.midoushitongtong.component06.util.ToastUtil;

import java.util.ArrayList;
import java.util.List;

public class LaunchImproveAdapter extends FragmentPagerAdapter {
    private int[] images;
    public LaunchImproveAdapter(@NonNull FragmentManager fm, int[] images) {
        super(fm, BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT);
        this.images = images;
    }

    @NonNull
    @Override
    public Fragment getItem(int position) {
        return LaunchFragment.newInstance(position, images);
    }

    @Override
    public int getCount() {
        return images.length;
    }
}
