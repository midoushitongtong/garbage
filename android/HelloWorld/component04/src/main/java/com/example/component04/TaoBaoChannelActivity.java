package com.example.component04;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.GridLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.example.component04.database.TaoBaoDBHelper;
import com.example.component04.entity.Cart;
import com.example.component04.entity.Product;
import com.example.component04.util.ToastUtil;

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

    private void addToCart(int productId, Product product) {
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
        GridLayout productListGridLayout = findViewById(R.id.product_list_grid_layout);
        // 获取商品列表
        List<Product> list = taoBaoDBHelper.selectAllProduct();
        // 设置组件宽高
        int screenWidth = getResources().getDisplayMetrics().widthPixels;
        LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(screenWidth / 2, ViewGroup.LayoutParams.WRAP_CONTENT);
        for (Product product : list.subList(0, 5)) {
            // 将布局文件转成组件
            View productItem = LayoutInflater.from(this).inflate(R.layout.item_product, null);
            // 获取组件
            ImageView picImageView = productItem.findViewById(R.id.pic_image_view);
            TextView nameTextView = productItem.findViewById(R.id.name_text_view);
            TextView priceTextView = productItem.findViewById(R.id.price_text_view);
            Button addCartButton = productItem.findViewById(R.id.add_cart_button);
            // 设置组件数据
            picImageView.setImageURI(Uri.parse(product.picPath));
            nameTextView.setText(product.name);
            priceTextView.setText(String.valueOf(product.price));
            // 购物车点击事件
            addCartButton.setOnClickListener(view -> {
                addToCart(product.id, product);
            });
            // 插入组件
            productListGridLayout.addView(productItem, layoutParams);
        }
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