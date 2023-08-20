package com.midoushitongtong.helloworld;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // 打印 log
        Log.d("debug", "hello world");
        // 初始化
        init();
    }

    private void init () {
        // 设置布局
        setContentView(R.layout.activity_main);
        // 找到 text view 控件
        TextView tv1 = findViewById(R.id.textView1);
        // 修改控件文字
        tv1.setText("你好 世界");

        // 找到 button 控件
        Button button1 = findViewById(R.id.button1);
        // 设置 button 点击事件
        button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent mainActivity2 = new Intent();
                mainActivity2.setClass(MainActivity.this, MainActivity2.class);
                startActivity(mainActivity2);
            }
        });
    }
}