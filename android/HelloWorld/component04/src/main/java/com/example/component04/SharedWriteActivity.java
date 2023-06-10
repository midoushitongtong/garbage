package com.example.component04;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.Button;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

public class SharedWriteActivity extends AppCompatActivity {
    private void initFormValues() {
        EditText nameEditText = findViewById(R.id.name_edit_text);
        EditText ageEditText = findViewById(R.id.age_edit_text);
        EditText heightEditText = findViewById(R.id.height_edit_text);
        EditText weightEditText = findViewById(R.id.weight_edit_text);
        CheckBox marryCheckbox = findViewById(R.id.marry_checkbox);

        SharedPreferences sharedPreferences = getSharedPreferences("personal_info", Context.MODE_PRIVATE);
        String name = sharedPreferences.getString("name", null);
        int age = sharedPreferences.getInt("age", 0);
        int height = sharedPreferences.getInt("height", 0);
        int weight = sharedPreferences.getInt("weight", 0);
        boolean marry = sharedPreferences.getBoolean("marry", false);

        if (name != null) {
            nameEditText.setText(name);
        }
        if (age != 0) {
            ageEditText.setText(String.valueOf(age));
        }
        if (height != 0) {
            heightEditText.setText(String.valueOf(height));
        }
        if (weight != 0) {
            weightEditText.setText(String.valueOf(weight));
        }
        marryCheckbox.setChecked(marry);
    }

    private void handleSubmit() {
        EditText nameEditText = findViewById(R.id.name_edit_text);
        EditText ageEditText = findViewById(R.id.age_edit_text);
        EditText heightEditText = findViewById(R.id.height_edit_text);
        EditText weightEditText = findViewById(R.id.weight_edit_text);
        CheckBox marryCheckbox = findViewById(R.id.marry_checkbox);

        // Context.MODE_PRIVATE 操作下， 表示该文件是私有数据，只允许应用本身访问
        SharedPreferences sharedPreferences = getSharedPreferences("personal_info", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString("name", nameEditText.getText().toString());
        editor.putInt("age", Integer.parseInt(ageEditText.getText().toString()));
        editor.putInt("height", Integer.parseInt(heightEditText.getText().toString()));
        editor.putInt("weight", Integer.parseInt(weightEditText.getText().toString()));
        editor.putBoolean("marry", marryCheckbox.isChecked());
        editor.commit();
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.acitivty_shared_write);

        // 还原表单
        initFormValues();

        // 获取页面组件
        Button submitButton = findViewById(R.id.submit_button);

        // 监听按钮点击事件
        submitButton.setOnClickListener(view -> handleSubmit());
    }
}
