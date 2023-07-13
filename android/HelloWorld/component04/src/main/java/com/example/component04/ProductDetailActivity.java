package com.example.component04;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.component04.database.TaoBaoDBHelper;
import com.example.component04.entity.Product;
import com.example.component04.util.ToastUtil;

import java.util.HashMap;
import java.util.Objects;

public class ProductDetailActivity extends AppCompatActivity {
    private TaoBaoDBHelper taoBaoDBHelper;
    private TextView cartCountTextView;

    private Product product;

    private void init() {
        TextView titleTextView = findViewById(R.id.title_text_view);
        cartCountTextView = findViewById(R.id.cart_count_text_view);
        Button addCartButton = findViewById(R.id.add_cart_button);

        titleTextView.setText("商品详情");

        int productId = getIntent().getIntExtra("productId", 0);
        product = taoBaoDBHelper.selectProductById(productId);

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

        // 添加购物车按钮
        addCartButton.setOnClickListener(view -> {
            taoBaoDBHelper.insertCart(productId);
            ToastUtil.show(this, "已添加商品: " + product.name + " 到购物车");
            HashMap<String, String> dataMap = AppApplication.getInstance().dataMap;
            int count = dataMap.get("cartCount") != null
                    ? Integer.parseInt(Objects.requireNonNull(AppApplication.getInstance().dataMap.get("cartCount"))) + 1
                    : 0;
            dataMap.put("cartCount", String.valueOf(count));
            cartCountTextView.setText(String.valueOf(count));
        });
    }

    private void initCartCount() {
        int count = taoBaoDBHelper.selectCartCount();
        cartCountTextView.setText(String.valueOf(count));
        HashMap<String, String> dataMap = AppApplication.getInstance().dataMap;
        dataMap.put("cartCount", String.valueOf(count));
    }

    private void renderProductDetail() {
        ImageView productImageView = findViewById(R.id.product_image_view);
        TextView productTitle = findViewById(R.id.product_title);
        TextView productPrice = findViewById(R.id.product_price);
        TextView productDescription = findViewById(R.id.product_description);

        productImageView.setImageURI(Uri.parse(product.picPath));
        productTitle.setText(product.name);
        productPrice.setText(String.valueOf(product.price));
        productDescription.setText(product.description);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_detail);

        taoBaoDBHelper = TaoBaoDBHelper.getInstance(this);

        init();

        // 渲染商品详情
        renderProductDetail();
    }

    @Override
    protected void onResume() {
        super.onResume();
        // 初始化购物车总数
        initCartCount();
    }
}