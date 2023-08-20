package com.midoushitongtong.component05_client;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.ContentUris;
import android.content.ContentValues;
import android.database.Cursor;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.CheckBox;
import android.widget.EditText;

import com.midoushitongtong.component05_client.entity.User;
import com.midoushitongtong.component05_client.util.ToastUtil;

import java.util.ArrayList;

public class ContentWriteActivity extends AppCompatActivity {
    @SuppressLint("Range")
    private void init() {
        EditText name = findViewById(R.id.name_edit_text);
        EditText age = findViewById(R.id.age_edit_text);
        EditText height = findViewById(R.id.height_edit_text);
        EditText weight = findViewById(R.id.weight_edit_text);
        CheckBox marry = findViewById(R.id.marry_checkbox);

        findViewById(R.id.save_button).setOnClickListener(view -> {
            ContentValues values = new ContentValues();
            values.put(UserInfoContent.FIELD_NAME_NAME, name.getText().toString());
            values.put(UserInfoContent.FIELD_NAME_AGE, Integer.parseInt(age.getText().toString()));
            values.put(UserInfoContent.FIELD_NAME_HEIGHT, Integer.parseInt(height.getText().toString()));
            values.put(UserInfoContent.FIELD_NAME_WEIGHT, Float.parseFloat(weight.getText().toString()));
            values.put(UserInfoContent.FIELD_NAME_MARRIED, marry.isChecked() ? 1 : 0);
            getContentResolver().insert(UserInfoContent.CONTENT_URI, values);
            ToastUtil.show(this, "保存成功");
        });

        findViewById(R.id.read_button).setOnClickListener(view -> {
            ArrayList<User> list = new ArrayList<>();
            Cursor cursor = getContentResolver().query(UserInfoContent.CONTENT_URI, null, null, null);
            if (cursor != null) {
                while (cursor.moveToNext()) {
                    User user = new User();
                    user.id = cursor.getInt(cursor.getColumnIndex(UserInfoContent.FIELD_NAME_ID));
                    user.name = cursor.getString(cursor.getColumnIndex(UserInfoContent.FIELD_NAME_NAME));
                    user.age = cursor.getInt(cursor.getColumnIndex(UserInfoContent.FIELD_NAME_AGE));
                    user.height = cursor.getLong(cursor.getColumnIndex(UserInfoContent.FIELD_NAME_HEIGHT));
                    user.weight = cursor.getDouble(cursor.getColumnIndex(UserInfoContent.FIELD_NAME_WEIGHT));
                    user.married = cursor.getInt(cursor.getColumnIndex(UserInfoContent.FIELD_NAME_MARRIED)) == 1;
                    list.add(user);
                }
            }
            for (User item : list) {
                Log.d("debug", item.toString());
            }
            if (cursor != null) {
                cursor.close();
            }
        });

        findViewById(R.id.delete_button).setOnClickListener(view -> {
            int count = getContentResolver().delete(UserInfoContent.CONTENT_URI, "name=?", new String[]{ name.getText().toString() });
//            int count = getContentResolver().delete(ContentUris.withAppendedId(UserInfoContent.CONTENT_URI, 1), null, null);
            if (count > 0) {
                ToastUtil.show(this, "删除成功");
            }
        });
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_content_write);

        init();
    }
}