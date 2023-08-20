package com.example.component04;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.widget.CheckBox;
import android.widget.EditText;

import com.example.component04.database.UserDBHelper;
import com.example.component04.entity.User;
import com.example.component04.util.ToastUtil;

import java.util.List;

public class SQLiteHelperActivity extends AppCompatActivity {
    private UserDBHelper userDBHelper = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sqlite_helper);

        EditText nameEditText = findViewById(R.id.name_edit_text);
        EditText ageEditText = findViewById(R.id.age_edit_text);
        EditText heightEditText = findViewById(R.id.height_edit_text);
        EditText weightEditText = findViewById(R.id.weight_edit_text);
        CheckBox marryCheckbox = findViewById(R.id.marry_checkbox);

        findViewById(R.id.add_button).setOnClickListener(view -> {
            User user = new User(
                    nameEditText.getText().toString(),
                    Integer.parseInt(ageEditText.getText().toString()),
                    Long.parseLong((heightEditText.getText().toString())),
                    Float.parseFloat(weightEditText.getText().toString()),
                    marryCheckbox.isChecked()
            );
            if (userDBHelper.insert(user) > 0) {
                ToastUtil.show(this, "添加成功");
            }
        });

        findViewById(R.id.delete_button).setOnClickListener(view -> {
            if (userDBHelper.deleteByName(nameEditText.getText().toString()) > 0) {
                ToastUtil.show(this, "删除成功");
            }
        });

        findViewById(R.id.update_button).setOnClickListener(view -> {
            User user = new User(
                    nameEditText.getText().toString(),
                    Integer.parseInt(ageEditText.getText().toString()),
                    Long.parseLong((heightEditText.getText().toString())),
                    Float.parseFloat(weightEditText.getText().toString()),
                    marryCheckbox.isChecked()
            );
            if (userDBHelper.update(user) > 0) {
                ToastUtil.show(this, "修改成功");
            }
        });

        findViewById(R.id.select_button).setOnClickListener(view -> {
            List<User> list = userDBHelper.queryAll();
            if (list.size() == 0) {
                ToastUtil.show(this, "没有查询到任何记录");
            }
            list.forEach(user -> {
                Log.d("debug", user.toString());
            });

//            User user = userDBHelper.queryByName("1");
//            Log.d("debug", user.toString());
        });
    }

    @Override
    protected void onStart() {
        super.onStart();
        // 创建数据库实例
        userDBHelper = UserDBHelper.getInstance(this);
        // 打开数据库读连接
        userDBHelper.openReadLink();
        // 打开数据库写连接
        userDBHelper.openWriteLink();
    }

    @Override
    protected void onStop() {
        super.onStop();
        // 关闭数据库
        userDBHelper.close();
    }
}