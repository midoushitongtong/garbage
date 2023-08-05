package com.midoushitongtong.component06;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;

import com.midoushitongtong.component06.adapter.ListStarBaseAdapter;
import com.midoushitongtong.component06.bean.Star;
import com.midoushitongtong.component06.util.ToastUtil;

import java.util.List;

public class ListFocusActivity extends AppCompatActivity {
    private void init() {
        ListView listView = findViewById(R.id.list_view);
        List<Star> starList = Star.getDefaultList();
        listView.setAdapter(new ListStarBaseAdapter(this, starList));
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                ToastUtil.show(ListFocusActivity.this, "你选择了: " + starList.get(position).name);
            }
        });
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list_focus);
        init();
    }
}