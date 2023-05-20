package com.midoushitongtong.component01;

import android.os.Bundle;
import android.widget.ImageView;

import androidx.appcompat.app.AppCompatActivity;

public class ImageActivity extends AppCompatActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        init();
    }

    private void init() {
        setContentView(R.layout.activity_image);
        ImageView imageView1 = findViewById(R.id.imageView1);
//        imageView1.setImageResource(R.drawable.chrome);
        imageView1.setScaleType(ImageView.ScaleType.FIT_END);
    }
}
