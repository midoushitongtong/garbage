package com.midoushitongtong.component05_client;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.widget.EditText;
import android.widget.ImageView;

public class SendMmsActivity extends AppCompatActivity {
    private ImageView attachmentImageView;
    private Uri picUri;

    private ActivityResultLauncher activityResultLauncher = registerForActivityResult(
        new ActivityResultContracts.StartActivityForResult(),
        result -> {
            if (result.getResultCode() == RESULT_OK) {
                Intent intent = result.getData();
                // 获取选中图片的 uri 对象
                picUri = intent.getData();
                if (picUri != null) {
                    Log.d("ning", picUri + "");
                    attachmentImageView.setImageURI(picUri);
                }
            }
        }
    );

    // 发送带图片的彩信
    private void sendMms(String phoneNumber, String title, String message) {
        Intent intent = new Intent(Intent.ACTION_SEND);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        // intent 的接收者将被允许读取 intent 携带的 uri 数据
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        intent.putExtra("address", phoneNumber);
        intent.putExtra("subject", title);
        intent.putExtra("sms_body", message);
        intent.putExtra(Intent.EXTRA_STREAM, picUri);
        intent.setType("image/*");
        // 因为未指定要打开那个页面，系统会在底部弹出相关 action 的选择框
        startActivity(intent);
    }

    private void init() {
        attachmentImageView = findViewById(R.id.attachment_image_view);

        attachmentImageView.setOnClickListener(view -> {
            // 跳转到系统相册, 选择图片
            Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
            // 设置内容为图片类型
            intent.setType("image/*");
            // 跳转
            activityResultLauncher.launch(intent);
        });

        findViewById(R.id.submit_button).setOnClickListener(view -> {
            EditText phoneNumberEditText = findViewById(R.id.phone_number_edit_text);
            EditText titleEditText = findViewById(R.id.title_edit_text);
            EditText messageEditText = findViewById(R.id.message_edit_text);
            String phoneNumber = phoneNumberEditText.getText().toString();
            String title = titleEditText.getText().toString();
            String message = messageEditText.getText().toString();
            sendMms(phoneNumber, title, message);
        });
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_send_mms);

        init();
    }
}