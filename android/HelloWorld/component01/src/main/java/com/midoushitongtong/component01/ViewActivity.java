package com.midoushitongtong.component01;

import android.os.Bundle;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.midoushitongtong.component01.util.DimensUtil;

public class ViewActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        init2();
    }

    private void init() {
        setContentView(R.layout.activity_view);
        TextView textView1 = findViewById(R.id.textView1);
        ViewGroup.LayoutParams layoutParams = textView1.getLayoutParams();
        layoutParams.width = DimensUtil.dip2px(this, 200);
        textView1.setLayoutParams(layoutParams);
    }

    private void init2() {
        setContentView(R.layout.activity_view);
    }
}
