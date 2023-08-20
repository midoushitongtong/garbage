package com.example.component04;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.TextView;

import com.example.component04.util.FileUtil;
import com.example.component04.util.ToastUtil;

import java.io.File;

public class FileWriteActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_file_write);

        EditText nameEditText = findViewById(R.id.name_edit_text);
        EditText ageEditText = findViewById(R.id.age_edit_text);
        EditText heightEditText = findViewById(R.id.height_edit_text);
        EditText weightEditText = findViewById(R.id.weight_edit_text);
        CheckBox marryCheckbox = findViewById(R.id.marry_checkbox);
        Button saveButton = findViewById(R.id.save_button);
        Button readButton = findViewById(R.id.read_button);
        TextView dataTextView = findViewById(R.id.data_text_view);

        String fileName = System.currentTimeMillis() + ".txt";
//        // 外部存储的私有空间 (应用卸载会清空)
//        String path = getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS).toString() + File.separator + fileName;
//        // 外部存储公共空间 (应用卸载不会清空)
//        String path = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS).toString() + File.separator + fileName;
        // 内部私有空间 (应用卸载会清空，存储空间较小)
        String path = getFilesDir().toString() + File.separator + fileName;

        saveButton.setOnClickListener(view -> {
            String name = nameEditText.getText().toString();
            String age = ageEditText.getText().toString();
            String height = heightEditText.getText().toString();
            String weight = weightEditText.getText().toString();
            String marry = marryCheckbox.isChecked() ? "已婚" : "未婚";
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append("姓名:").append(name).append("\n");
            stringBuilder.append("年龄:").append(age).append("\n");
            stringBuilder.append("身高:").append(height).append("\n");
            stringBuilder.append("体重:").append(weight).append("\n");
            stringBuilder.append("婚姻状况:").append(marry);

            Log.d("debug", path);
            FileUtil.saveText(path, stringBuilder.toString());

            ToastUtil.show(this, "保存成功");
        });

        readButton.setOnClickListener(view -> {
            Log.d("debug", path);
            String txt = FileUtil.readText(path);
            dataTextView.setText(txt);
        });
    }
}