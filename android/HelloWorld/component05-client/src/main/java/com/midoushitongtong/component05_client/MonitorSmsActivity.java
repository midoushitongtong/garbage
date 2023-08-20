package com.midoushitongtong.component05_client;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Context;
import android.database.ContentObserver;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

public class MonitorSmsActivity extends AppCompatActivity {
    private SmsGetObserver smsGetObserver;

    private static class SmsGetObserver extends ContentObserver {
        public Context mContext;

        public SmsGetObserver(Context context) {
            super(new Handler(Looper.getMainLooper()));
            this.mContext = context;
        }

        @Override
        @SuppressLint("Range")
        public void onChange(boolean selfChange, @Nullable Uri uri) {
            super.onChange(selfChange, uri);
            /**
             * onChange 会多次调用，收到一条短信会调用两次 onChange
             * uri == content://sms/raw/1
             * uri == content://sms/inbox/1
             * android 7.0 以上系统，点击标记为为已读，也会调用一次
             * uri == content://sms
             */
            if (uri == null) {
                return;
            }
            if (uri.toString().contains("content://sms/raw") || uri.toString().equals("content://sms")) {
                return;
            }
            // 获取最新的一条消息
            Cursor cursor = mContext.getContentResolver().query(uri, new String[]{"address", "body", "date"}, null, null, "date DESC");
            if (cursor.moveToNext()) {
                String sender = cursor.getString(cursor.getColumnIndex("address"));
                String body = cursor.getString(cursor.getColumnIndex("body"));
                Log.d("debug", String.format("sender: %s, body: %s", sender, body));
                Log.d("debug", body);
            }
            cursor.close();
        }
    }

    private void init() {
        // sms 的 uri
        Uri uri = Uri.parse("content://sms");
        // 注册监听器
        // notifyForDescendants: 是否是精确匹配 (content://sms/xxx 如果是精确匹配则监听不到子 url 的变化)
        SmsGetObserver smsGetObserver = new SmsGetObserver(this);
        getContentResolver().registerContentObserver(uri, false, smsGetObserver);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_monitor_sms);
        init();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        getContentResolver().unregisterContentObserver(smsGetObserver);
    }
}