package com.midoushitongtong.component3;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;

public class DrawableShapeActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_drawable_shape);

        View view = findViewById(R.id.content);
        findViewById(R.id.button_rect).setOnClickListener(View -> {
            view.setBackgroundResource(R.drawable.shape_rect_gold);
        });
        findViewById(R.id.button_oval).setOnClickListener(View -> {
            view.setBackgroundResource(R.drawable.shape_oval_rose);
        });
    }
}