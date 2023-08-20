package com.midoushitongtong.component06;

import androidx.appcompat.app.AppCompatActivity;

import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.ListView;

import com.midoushitongtong.component06.adapter.StarBaseAdapter;
import com.midoushitongtong.component06.bean.Star;
import com.midoushitongtong.component06.util.DimensUtil;
import com.midoushitongtong.component06.util.ToastUtil;

import java.util.List;

public class ListViewActivity extends AppCompatActivity {
    private void init() {
        ListView listView = findViewById(R.id.list_view);
        List<Star> starList = Star.getDefaultList();
        StarBaseAdapter starBaseAdapter = new StarBaseAdapter(this, starList);
        // 设置 adapter
        listView.setAdapter(starBaseAdapter);
        // 设置点击事件
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                ToastUtil.show(ListViewActivity.this, "你选择的是: " + starList.get(position).name);
            }
        });

        CheckBox displayDividerCheckbox = findViewById(R.id.display_divider_checkbox);
        displayDividerCheckbox.setOnCheckedChangeListener((CompoundButton buttonView, boolean isChecked) -> {
            if (isChecked) {
                Drawable drawable = getResources().getDrawable(R.color.orange, getTheme());
                listView.setDivider(drawable);
                listView.setDividerHeight(DimensUtil.dip2px(this, 1));
            } else {
                listView.setDivider(null);
                listView.setDividerHeight(0);

            }
        });

        CheckBox displaySelectorCheckbox = findViewById(R.id.display_selector_checkbox);
        displaySelectorCheckbox.setOnCheckedChangeListener((CompoundButton buttonView, boolean isChecked) -> {
            if (isChecked) {
                listView.setSelector(R.drawable.list_selector);
            } else {
                Drawable drawable2 = getResources().getDrawable(R.color.transparent, getTheme());
                listView.setSelector(drawable2);
            }
        });
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list_view);
        init();
    }
}