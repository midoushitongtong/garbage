package com.example.component04;

import android.os.Bundle;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

public class AppReadActivity extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_app_writer);

        EditText nameEditText = findViewById(R.id.name_edit_text);

        AppApplication appApplication = AppApplication.getInstance();
        nameEditText.setText( appApplication.dataMap.get("name"));
    }
}
