package com.example.component04;

import androidx.appcompat.app.AppCompatActivity;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.widget.Button;
import android.widget.ImageView;

import com.example.component04.util.FileUtil;
import com.example.component04.util.ToastUtil;

import java.io.File;

public class ImageWriterActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_image_writer);

        Button saveButton = findViewById(R.id.save_button);
        Button readButton = findViewById(R.id.read_button);
        ImageView imageView = findViewById(R.id.image_view);

        // 文件名
        String fileName = System.currentTimeMillis() + ".jpg";
        // 当前 app 私有下载目录
        String path = getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS).toString() + File.separator + fileName;

        saveButton.setOnClickListener(view -> {
            // 从指定资源转成位图对象
            Bitmap bitMap = BitmapFactory.decodeResource(getResources(), R.drawable.avatar);
            FileUtil.saveImage(path, bitMap);
            ToastUtil.show(this, "保存成功");
        });

        readButton.setOnClickListener(view -> {
//            Bitmap bitmap = FileUtil.readImage(path);
//            imageView.setImageBitmap(bitmap);
//            imageView.setImageBitmap(bitmap);

//            Bitmap bitmap = BitmapFactory.decodeFile(path);
//            imageView.setImageBitmap(bitmap);

            imageView.setImageURI(Uri.parse(path));
        });
    }
}