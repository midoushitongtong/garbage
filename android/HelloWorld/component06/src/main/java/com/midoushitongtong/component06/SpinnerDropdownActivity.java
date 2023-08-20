package com.midoushitongtong.component06;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;

import com.midoushitongtong.component06.util.ToastUtil;

public class SpinnerDropdownActivity extends AppCompatActivity {
    private final static String[] startArray = {
            "地球",
            "金星",
            "木星",
            "水星",
            "火星",
            "土星"
    };
    private Spinner starSpinner;

    private void init() {
        starSpinner = findViewById(R.id.star_spinner);
        // 声明一个下拉数组适配器
        ArrayAdapter<String> starAdapter = new ArrayAdapter<>(this, R.layout.spinner_select_item_star, startArray);
        // 设置 spinner 适配器
        starSpinner.setAdapter(starAdapter);
        // 默认选第0个
        starSpinner.setSelection(0);
        // 选中监听
        starSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                ToastUtil.show(SpinnerDropdownActivity.this, "你选择的是: " + startArray[position]);
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_spinner_dropdown);
        init();
    }
}