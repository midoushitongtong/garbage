package com.midoushitongtong.component06;

import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.SimpleAdapter;
import android.widget.Spinner;

import androidx.appcompat.app.AppCompatActivity;

import com.midoushitongtong.component06.util.ToastUtil;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class SpinnerIconActivity extends AppCompatActivity {
    private final static int[] startIconArray = {
            R.drawable.diqiu,
            R.drawable.jinxing,
            R.drawable.muxing,
            R.drawable.shuixing,
            R.drawable.huoxing,
            R.drawable.tuxing,
    };
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
        ArrayList<Map<String,Object>> list = new ArrayList<>();
        for (int i = 0; i < startIconArray.length; i++) {
            Map<String, Object> item = new HashMap<>();
            item.put("icon", startIconArray[i]);
            item.put("name", startArray[i]);
            list.add(item);
        }
        // 声明一个下拉数组适配器
        SimpleAdapter starAdapter = new SimpleAdapter(
                this,
                list,
                R.layout.spinner_select_item_icon_star,
                new String[]{"icon", "name"},
                new int[]{R.id.image, R.id.name}
        );
        // 设置 spinner 适配器
        starSpinner.setAdapter(starAdapter);
        // 设置标题
        starSpinner.setPrompt("请选择行星");
        // 默认选第0个
        starSpinner.setSelection(0);
        // 选中监听
        starSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                ToastUtil.show(SpinnerIconActivity.this, "你选择的是: " + startArray[position]);
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_spinner_icon);
        init();
    }
}