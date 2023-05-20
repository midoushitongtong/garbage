package com.midoushitongtong.component02;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class Form2Activity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_form2);

        Bundle bundle = getIntent().getExtras();

        TextView content = findViewById(R.id.content);
        content.setText(bundle.getString("name"));

        findViewById(R.id.to_form1).setOnClickListener(View -> {
            Intent intent = new Intent();
            Bundle bundle2 = new Bundle();
            bundle2.putString("age", "25");
            intent.putExtras(bundle2);
            // 携带意图返回上一个页面, RESULT_OK 表示处理成功
            setResult(Activity.RESULT_OK, intent);
            finish();
        });
    }
}