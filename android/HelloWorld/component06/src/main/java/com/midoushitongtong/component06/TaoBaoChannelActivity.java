package com.midoushitongtong.component06;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.GridLayout;
import android.widget.GridView;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.midoushitongtong.component06.adapter.ProductAdapter;
import com.midoushitongtong.component06.database.TaoBaoDBHelper;
import com.midoushitongtong.component06.entity.Cart;
import com.midoushitongtong.component06.entity.Product;
import com.midoushitongtong.component06.util.FileUtil;
import com.midoushitongtong.component06.util.ToastUtil;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

public class TaoBaoChannelActivity extends AppCompatActivity {
    private TaoBaoDBHelper taoBaoDBHelper;
    private TextView cartCountTextView;

    private void init() {
        TextView titleTextView = findViewById(R.id.title_text_view);
        cartCountTextView = findViewById(R.id.cart_count_text_view);

        titleTextView.setText("手机商场");

        // 返回按钮
        findViewById(R.id.back_image_view).setOnClickListener(view -> {
            finish();
        });

        // 跳转到购物车页面
        findViewById(R.id.cart_image_view).setOnClickListener(view -> {
            Intent intent = new Intent(this, TaoBaoCartActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            startActivity(intent);
        });
    }

    private void initCartCount() {
        int count = taoBaoDBHelper.selectCartCount();
        cartCountTextView.setText(String.valueOf(count));
        HashMap<String, String> dataMap = AppApplication.getInstance().dataMap;
        dataMap.put("cartCount", String.valueOf(count));
    }

    public void addToCart(int productId, Product product) {
        taoBaoDBHelper.insertCart(productId);
        ToastUtil.show(this, "已添加商品: " + product.name + " 到购物车");
        HashMap<String, String> dataMap = AppApplication.getInstance().dataMap;
        int count = dataMap.get("cartCount") != null
                ? Integer.parseInt(Objects.requireNonNull(AppApplication.getInstance().dataMap.get("cartCount"))) + 1
                : 0;
        dataMap.put("cartCount", String.valueOf(count));
        cartCountTextView.setText(String.valueOf(count));
    }

    private void renderProductList() {
        GridView productListGridView = findViewById(R.id.product_list_grid_view);
        // 获取商品列表
        List<Product> list = taoBaoDBHelper.selectAllProduct();
        ProductAdapter productAdapter = new ProductAdapter(this, list, new ProductAdapter.ProductAdapterListener() {
            @Override
            public void addToCart(int productId, Product product) {
                TaoBaoChannelActivity.this.addToCart(productId, product);
            }
        });
        productListGridView.setAdapter(productAdapter);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_taobao_channel);
        taoBaoDBHelper = TaoBaoDBHelper.getInstance(this);

        init();

        renderProductList();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    @Override
    protected void onResume() {
        super.onResume();
        // 初始化购物车总数
        initCartCount();
    }
}