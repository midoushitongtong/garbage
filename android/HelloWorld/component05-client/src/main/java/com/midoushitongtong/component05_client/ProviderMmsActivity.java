package com.midoushitongtong.component05_client;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.FileProvider;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.MediaScannerConnection;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Log;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.GridLayout;
import android.widget.ImageView;

import com.midoushitongtong.component05_client.entity.ImageInfo;
import com.midoushitongtong.component05_client.util.DimensUtil;
import com.midoushitongtong.component05_client.util.FileUtil;
import com.midoushitongtong.component05_client.util.PermissionUtil;

import java.io.File;
import java.util.ArrayList;

public class ProviderMmsActivity extends AppCompatActivity {
    private EditText phoneNumberEditText;
    private EditText titleEditText;
    private EditText messageEditText;
    private String filePath;
    private ArrayList<ImageInfo> imageInfoArrayList = new ArrayList<>();

    // 发送带图片的彩信
    private void sendMms(String phoneNumber, String title, String message, String path) {
        Uri uri = Uri.parse(path);
        // 兼容 android 7.0 将 Uri 转为 FileProvider
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            uri = FileProvider.getUriForFile(this, getString(R.string.file_provider), new File(path));
            Log.d("debug", uri.toString());
        }
        Intent intent = new Intent(Intent.ACTION_SEND);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        // intent 的接收者将被允许读取 intent 携带的 uri 数据
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        intent.putExtra("address", phoneNumber);
        intent.putExtra("subject", title);
        intent.putExtra("sms_body", message);
        intent.putExtra(Intent.EXTRA_STREAM, uri);
        intent.setType("image/*");
        // 因为未指定要打开那个页面，系统会在底部弹出相关 action 的选择框
        startActivity(intent);
    }

    // 初始化
    private void init() {
        phoneNumberEditText = findViewById(R.id.phone_number_edit_text);
        titleEditText = findViewById(R.id.title_edit_text);
        messageEditText = findViewById(R.id.message_edit_text);
    }

    // 初始化图片列表
    @SuppressLint("Range")
    private void initImageList() {
        GridLayout imageContainer = findViewById(R.id.image_container);

        String[] columns = new String[]{
                MediaStore.Images.Media._ID, // 编号
                MediaStore.Images.Media.TITLE, // 文件标题
                MediaStore.Images.Media.SIZE, // 文件大小
                MediaStore.Images.Media.DATA, // 文件大小
        };
        Cursor cursor = getContentResolver().query(
                MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
                columns,
                MediaStore.Images.Media.SIZE + " < " + "307200",
                null,
                MediaStore.Images.Media.SIZE + " DESC"
        );
        int count = 0;
        if (cursor != null) {
            while (cursor.moveToNext()) {
                ImageInfo imageInfo = new ImageInfo();
                imageInfo.id = cursor.getLong(cursor.getColumnIndex(MediaStore.Images.Media._ID));
                imageInfo.title = cursor.getString(cursor.getColumnIndex(MediaStore.Images.Media.TITLE));
                imageInfo.size = cursor.getLong(cursor.getColumnIndex(MediaStore.Images.Media.SIZE));
                imageInfo.path = cursor.getString(cursor.getColumnIndex(MediaStore.Images.Media.DATA));
                if (FileUtil.checkFileUri(this, imageInfo.path)) {
                    imageInfoArrayList.add(imageInfo);
                    count++;
                }
                // 只取前6条数据
                if (count >= 6) {
                    break;
                }
            }
        }
        cursor.close();

        // 渲染图片
        for (ImageInfo imageInfo : imageInfoArrayList) {
            ImageView imageView = new ImageView(this);
            Bitmap bitmap = BitmapFactory.decodeFile(imageInfo.path);
            imageView.setImageBitmap(bitmap);
            // 设置缩放类型
            imageView.setScaleType(ImageView.ScaleType.FIT_CENTER);
            // 设置布局类型
            int px = DimensUtil.dip2px(this, 80);
            ViewGroup.LayoutParams layoutParams = new ViewGroup.LayoutParams(px, px);
            imageView.setLayoutParams(layoutParams);
            int padding = DimensUtil.dip2px(this, 5);
            imageView.setPadding(padding, padding, padding, padding);
            // 设置点击事件
            imageView.setOnClickListener(view -> {
                String phoneNumber = phoneNumberEditText.getText().toString();
                String title = titleEditText.getText().toString();
                String message = messageEditText.getText().toString();
                filePath = imageInfo.path;
                sendMms(phoneNumber, title, message, imageInfo.path);
            });
            // 把图像添加到视图中
            imageContainer.addView(imageView);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == PermissionUtil.REQUEST_CODE_EXTERNAL_STORAGE) {
            initImageList();
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_provider_mms);

        init();

        // 刷新媒体库，防止读取不到新文件
        //手动让MediaStore扫描入库
        MediaScannerConnection.scanFile(
                this,
                new String[]{
                    Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS).toString()
                },
                null,
                null
        );


        if (PermissionUtil.checkPermission(this, PermissionUtil.PERMISSIONS_EXTERNAL_STORAGE, PermissionUtil.REQUEST_CODE_EXTERNAL_STORAGE)) {
            initImageList();
        }
    }
}