package com.example.component04;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

public class AppWriterActivity extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_app_writer);

        EditText nameEditText = findViewById(R.id.name_edit_text);
        Button saveButton = findViewById(R.id.save_button);

        saveButton.setOnClickListener(view -> {
            String name = nameEditText.getText().toString();

            AppApplication appApplication = AppApplication.getInstance();
            appApplication.dataMap.put("name", name);

            Intent intent = new Intent();
            intent.setClass(this, AppReadActivity.class);
            startActivity(intent);
        });
    }
}
