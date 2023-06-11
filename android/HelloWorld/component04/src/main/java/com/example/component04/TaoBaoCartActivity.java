package com.example.component04;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.example.component04.database.TaoBaoDBHelper;
import com.example.component04.entity.Cart;
import com.example.component04.entity.Product;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TaoBaoCartActivity extends AppCompatActivity {
    private TaoBaoDBHelper taoBaoDBHelper;
    private TextView cartCountTextView;
    private void initCartCount() {
        int count = taoBaoDBHelper.selectCartCount();
        cartCountTextView.setText(String.valueOf(count));
        HashMap<String, String> dataMap = AppApplication.getInstance().dataMap;
        dataMap.put("cartCount", String.valueOf(count));
    }

    private void init() {
        TextView titleTextView = findViewById(R.id.title_text_view);
        cartCountTextView = findViewById(R.id.cart_count_text_view);

        titleTextView.setText("购物车");

        // 返回按钮
        findViewById(R.id.back_image_view).setOnClickListener(view -> {
            finish();
        });
    }

    private void refreshTotalPrice() {
        TextView totalPriceTextView = findViewById(R.id.total_price_text_view);
        int totalPrice = 0;
        List<Cart> list = taoBaoDBHelper.selectAllCart();
        for (Cart cart : list) {
            Product product = taoBaoDBHelper.selectProductById(cart.productId);
            totalPrice += cart.count * product.price;
        }
        totalPriceTextView.setText(String.valueOf(totalPrice));
    }

    private void renderCartList() {
        LinearLayout contentContainer = findViewById(R.id.content_container);
        LinearLayout cartContainer = findViewById(R.id.cart_container);
        LinearLayout emptyContainer = findViewById(R.id.empty_container);

        List<Cart> list = taoBaoDBHelper.selectAllCart();
        if (list.size() == 0) {
            emptyContainer.setVisibility(View.VISIBLE);
            contentContainer.setVisibility(View.GONE);
            return;
        }

        emptyContainer.setVisibility(View.GONE);
        contentContainer.setVisibility(View.VISIBLE);

        for (Cart cart : list) {
            Product product = taoBaoDBHelper.selectProductById(cart.productId);
            View view = LayoutInflater.from(this).inflate(R.layout.item_cart, null);
            ImageView picImageView = view.findViewById(R.id.pic_image_view);
            TextView nameTextView = view.findViewById(R.id.name_text_view);
            TextView descTextView = view.findViewById(R.id.desc_text_view);
            TextView countTextView = view.findViewById(R.id.count_text_view);
            TextView priceTextView = view.findViewById(R.id.price_text_view);
            TextView sumTextView = view.findViewById(R.id.sum_text_view);
            picImageView.setImageURI(Uri.parse(product.picPath));
            nameTextView.setText(product.name);
            descTextView.setText(product.description);
            countTextView.setText(String.valueOf(cart.count));
            priceTextView.setText(String.valueOf(product.price));
            sumTextView.setText(String.valueOf(product.price * cart.count));
            cartContainer.addView(view);
        }

        refreshTotalPrice();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tao_bao_cart);
        taoBaoDBHelper = TaoBaoDBHelper.getInstance(this);

        init();

        renderCartList();
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