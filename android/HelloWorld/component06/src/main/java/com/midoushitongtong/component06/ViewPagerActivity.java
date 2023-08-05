package com.midoushitongtong.component06;

import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager.widget.ViewPager;

import android.os.Bundle;

import com.midoushitongtong.component06.adapter.ImagePageViewAdapter;
import com.midoushitongtong.component06.entity.Product;
import com.midoushitongtong.component06.util.ToastUtil;

import java.util.ArrayList;

public class ViewPagerActivity extends AppCompatActivity {
    private void init() {
        ViewPager viewPager = findViewById(R.id.view_pager);
        ArrayList<Product> products = Product.getDefaultList();
        viewPager.setAdapter(new ImagePageViewAdapter(this, products));
        viewPager.addOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

            }

            @Override
            public void onPageSelected(int position) {
                // 当翻页完成时触发, position 表示新页面下标
                ToastUtil.show(ViewPagerActivity.this, "当前展示第" + position + "页");
            }

            @Override
            public void onPageScrollStateChanged(int state) {

            }
        });
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_pager);
        init();
    }
}