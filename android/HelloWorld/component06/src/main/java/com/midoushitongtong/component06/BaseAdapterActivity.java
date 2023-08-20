package com.midoushitongtong.component06;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Spinner;

import com.midoushitongtong.component06.adapter.StarBaseAdapter;
import com.midoushitongtong.component06.bean.Star;
import com.midoushitongtong.component06.util.ToastUtil;

import java.util.List;

public class BaseAdapterActivity extends AppCompatActivity {
    private void init() {
        Spinner spinner = findViewById(R.id.star_spinner);
        // 获取行星列表
        List<Star> starList = Star.getDefaultList();
        // 构建适配器
        StarBaseAdapter starBaseAdapter = new StarBaseAdapter(this, starList);
        // 设置适配器
        spinner.setAdapter(starBaseAdapter);
        spinner.setSelection(0);
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                ToastUtil.show(BaseAdapterActivity.this, "你选择的是: " + starList.get(position).name);
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_base_adapter);
        init();
    }
}