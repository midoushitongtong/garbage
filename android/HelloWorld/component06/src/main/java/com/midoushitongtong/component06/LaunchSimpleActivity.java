package com.midoushitongtong.component06;

import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager.widget.ViewPager;

import android.os.Bundle;
import android.view.View;

import com.midoushitongtong.component06.adapter.LaunchSimpleAdapter;

public class LaunchSimpleActivity extends AppCompatActivity {
    private void init() {
        ViewPager viewPager = findViewById(R.id.launch_view_pager);
        int[] images = {
                R.drawable.guide_bg1,
                R.drawable.guide_bg2,
                R.drawable.guide_bg3,
                R.drawable.guide_bg4,
        };
        viewPager.setAdapter(new LaunchSimpleAdapter(this, images));
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_launch_simple);
        init();
    }
}