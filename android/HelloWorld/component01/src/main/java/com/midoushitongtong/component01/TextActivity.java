package com.midoushitongtong.component01;

import android.graphics.Color;
import android.os.Bundle;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class TextActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        init();
    }

    private void init () {
        setContentView(R.layout.activity_text);
        TextView textView1 = findViewById(R.id.textView1);
        textView1.setTextSize(30); // 默认 android sp
        textView1.setTextColor(Color.parseColor("#0066ff"));
        textView1.setBackgroundColor(Color.argb(255, 0, 0, 0));
    }
}
