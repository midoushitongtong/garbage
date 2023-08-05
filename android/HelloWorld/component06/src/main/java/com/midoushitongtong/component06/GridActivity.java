package com.midoushitongtong.component06;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.GridView;

import com.midoushitongtong.component06.adapter.GridViewStarBaseAdapter;
import com.midoushitongtong.component06.bean.Star;

import java.util.List;

public class GridActivity extends AppCompatActivity {
    private void init() {
        GridView gridView = findViewById(R.id.grid_view);
        List<Star> starList = Star.getDefaultList();
        GridViewStarBaseAdapter gridViewStarBaseAdapter = new GridViewStarBaseAdapter(this, starList);
        gridView.setAdapter(gridViewStarBaseAdapter);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_grid);
        init();
    }
}