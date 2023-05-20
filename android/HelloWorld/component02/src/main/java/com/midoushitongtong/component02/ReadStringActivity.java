package com.midoushitongtong.component02;

import android.content.pm.ActivityInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

public class ReadStringActivity extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.acitivty_read_string);

        // 获取资源文件的数据
//        String weatherStr = getString(R.string.weather_str);
//        TextView content = findViewById(R.id.content);
//        content.setText(weatherStr);

        // 获取包管理器
        PackageManager packageManager = getPackageManager();
        try {
            // 获取 Activity 信息
            ActivityInfo activityInfo = packageManager.getActivityInfo(
                // 当前 Activity 组件名称
                getComponentName(),
                // 需要获取 Meta Data 数据
                PackageManager.GET_META_DATA
            );
            // 获取 Activity 的元数据
            Bundle metaData = activityInfo.metaData;
            String weatherStr = metaData.getString("weather");
            TextView content = findViewById(R.id.content);
            content.setText(weatherStr);
        } catch (PackageManager.NameNotFoundException e) {
           e.printStackTrace();
        }
    }
}
