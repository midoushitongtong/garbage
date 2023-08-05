package com.midoushitongtong.component06;

import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager.widget.PagerTitleStrip;
import androidx.viewpager.widget.ViewPager;

import android.app.DatePickerDialog;
import android.os.Bundle;
import android.util.TypedValue;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.ImageView;
import android.widget.TextView;

import com.midoushitongtong.component06.adapter.BillPagerAdapter;
import com.midoushitongtong.component06.database.BillDBHelper;
import com.midoushitongtong.component06.util.DateUtil;

import java.util.Calendar;

public class BillPagerActivity extends AppCompatActivity {
    private BillDBHelper billDBHelper;
    private TextView monthTextView;
    private Calendar calendar;
    private ViewPager billViewPager;
    private BillPagerAdapter billPagerAdapter;

    private void showDatePickDialog() {
        DatePickerDialog datePickerDialog = new DatePickerDialog(
                this,
                (DatePicker datePickerView, int year, int month, int dayOfMonth) -> {
                    calendar.set(Calendar.YEAR, year);
                    monthTextView.setText(DateUtil.getYear(calendar));
                    billViewPager.setCurrentItem(month);
                    billPagerAdapter.notifyDataSetChanged();
                },
                calendar.get(Calendar.YEAR),
                calendar.get(Calendar.MONTH),
                calendar.get(Calendar.DAY_OF_MONTH)
        );
        datePickerDialog.show();
    }

    private void initViewPager() {
        PagerTitleStrip billPagerTitleStrip = findViewById(R.id.pts_bill);
        billPagerTitleStrip.setTextSize(TypedValue.COMPLEX_UNIT_SP, 17);

        billViewPager = findViewById(R.id.vp_bill);
        billPagerAdapter = new BillPagerAdapter(getSupportFragmentManager(), calendar);
        billViewPager.setAdapter(billPagerAdapter);
        billViewPager.setCurrentItem(calendar.get(Calendar.MONTH));
    }

    private void init() {
        TextView titleTextView = findViewById(R.id.tv_title);
        TextView optionTextView = findViewById(R.id.tv_option);
        ImageView backImageView = findViewById(R.id.iv_back);
        monthTextView = findViewById(R.id.tv_month);

        calendar = Calendar.getInstance();

        titleTextView.setText("账单列表");
        optionTextView.setText("添加账单");
        monthTextView.setText(DateUtil.getYear(calendar));

        // 设置点击事件, 点击之后弹出日期选择框, 更新当前日期
        monthTextView.setOnClickListener(view -> {
            showDatePickDialog();
        });

        // 回退
        backImageView.setOnClickListener(view -> {
            finish();
        });

        initViewPager();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_bill_pager);
        init();
        billDBHelper = BillDBHelper.getInstance(this);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}