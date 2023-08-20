package com.midoushitongtong.component06;

import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager.widget.PagerTabStrip;
import androidx.viewpager.widget.ViewPager;

import android.graphics.Color;
import android.os.Bundle;
import android.util.TypedValue;

import com.midoushitongtong.component06.adapter.ImagePageViewAdapter;
import com.midoushitongtong.component06.adapter.MobilePagerAdapter;
import com.midoushitongtong.component06.entity.Product;
import com.midoushitongtong.component06.util.ToastUtil;

import java.util.ArrayList;

public class FragmentDynamicActivity extends AppCompatActivity {
    private void init() {
        // 初始化标签栏
        PagerTabStrip pagerTabStrip = findViewById(R.id.page_tab_strip);
        pagerTabStrip.setTextSize(TypedValue.COMPLEX_UNIT_SP, 20);
        pagerTabStrip.setTextColor(Color.BLACK);

        // 初始化翻页试图
        ViewPager viewPager = findViewById(R.id.view_pager);
        ArrayList<Product> products = Product.getDefaultList();
        viewPager.setAdapter(new MobilePagerAdapter(getSupportFragmentManager(), products));
        viewPager.setCurrentItem(0);
        viewPager.addOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

            }

            @Override
            public void onPageSelected(int position) {
                // 当翻页完成时触发, position 表示新页面下标
                ToastUtil.show(FragmentDynamicActivity.this, "当前展示第" + position + "页");
            }

            @Override
            public void onPageScrollStateChanged(int state) {

            }
        });
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_fragment_dynamic);
        init();
    }
}