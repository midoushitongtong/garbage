package com.example.component04;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.widget.TextView;

public class DatabaseActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_database);

        TextView tooltip = findViewById(R.id.tooltip);

        // 数据库路径
        String databaseName = getFilesDir() + "/test.db";

        findViewById(R.id.create_database_button).setOnClickListener(view -> {
            // 创建或者打开数据库，如果数据库不存在则创建它，如果存在就打开
            SQLiteDatabase db = openOrCreateDatabase(databaseName, Context.MODE_PRIVATE, null);
            String desc = String.format("数据库%s创建成功", db.getPath());
            tooltip.setText(desc);
        });

        findViewById(R.id.delete_database_button).setOnClickListener(view -> {
            // 删除数据库
            boolean result = deleteDatabase(databaseName);
            String desc = String.format("数据库删除成功", result ? "成功" : "失败");
            tooltip.setText(desc);
        });
    }
}