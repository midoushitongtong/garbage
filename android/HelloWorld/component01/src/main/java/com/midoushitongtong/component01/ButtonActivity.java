package com.midoushitongtong.component01;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.midoushitongtong.component01.util.DateUtil;

public class ButtonActivity extends AppCompatActivity implements  View.OnClickListener {
    private TextView textView1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        init();
//        init2();
//        init3();
        init4();
    }

    private void init() {
        setContentView(R.layout.activity_button);
        textView1 = findViewById(R.id.textView1);
        Button button1 = findViewById(R.id.button1);
        button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                ButtonActivity.this.updateCurrentDate(view);
            }
        });
    }

    public void updateCurrentDate(View view) {
        textView1.setText("当前时间: " + DateUtil.getNowTime());
    }

    private void init2() {
        setContentView(R.layout.activity_button);
        TextView textView2 = findViewById(R.id.textView2);
        Button button2 = findViewById(R.id.button2);
        button2.setOnClickListener(new MyOnClickListener(textView2));
        Button button3 = findViewById(R.id.button3);
        button3.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        if (view.getId() == R.id.button3) {
            TextView textView2 = findViewById(R.id.textView2);
            textView2.setText("当前时间: " + DateUtil.getNowTime());
        }
    }

    public static class MyOnClickListener implements View.OnClickListener {
        TextView textView;

        public MyOnClickListener(TextView textView) {
            this.textView = textView;
        }

        @Override
        public void onClick(View view) {
            textView.setText("当前时间: " + DateUtil.getNowTime());
        }
    }

    private void init3() {
        setContentView(R.layout.activity_button);
        Button button4 = findViewById(R.id.button4);
        button4.setOnLongClickListener(view -> {
            TextView textView3 = findViewById(R.id.textView3);
            textView3.setText("当前时间: " + DateUtil.getNowTime());
            // 允许事件冒泡
            return false;
        });
    }

    private void init4() {
        setContentView(R.layout.activity_button);
        Button button5 = findViewById(R.id.button5);
        Button button6 = findViewById(R.id.button6);
        Button button7 = findViewById(R.id.button7);

        button5.setOnClickListener((View view) -> {
            button7.setEnabled(true);
        });

        button6.setOnClickListener((View view) -> {
            button7.setEnabled(false);
        });
    }
}
