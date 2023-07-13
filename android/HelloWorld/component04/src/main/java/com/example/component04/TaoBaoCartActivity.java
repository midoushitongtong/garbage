package com.example.component04;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.example.component04.database.TaoBaoDBHelper;
import com.example.component04.entity.Cart;
import com.example.component04.entity.Product;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

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
        // 跳转到手机商场页面
        findViewById(R.id.to_shopping_channel).setOnClickListener(view -> {
            Intent intent = new Intent(this, TaoBaoChannelActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            startActivity(intent);
        });
        // 清空
        findViewById(R.id.clear_button).setOnClickListener(view -> {
            taoBaoDBHelper.deleteAllCart();
            HashMap<String, String> dataMap = AppApplication.getInstance().dataMap;
            dataMap.put("cartCount", String.valueOf("0"));
            // 刷新商品数量
            initCartCount();
            // 刷新购物车总金额
            refreshTotalPrice();
            // 刷新布局
            setContainerVisibility();
            Toast.makeText(this, "已清空", Toast.LENGTH_SHORT).show();
        });
        // 结算
        findViewById(R.id.settle_button).setOnClickListener(view -> {
            AlertDialog.Builder builder = new AlertDialog.Builder(this);
            builder.setTitle("结算商品");
            builder.setMessage("客观抱歉，支付功能尚未开通，请下次再来");
            builder.setPositiveButton("我知道了", null);
            builder.show();
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

    private void deleteCart(Cart cart) {
        HashMap<String, String> dataMap = AppApplication.getInstance().dataMap;
        int count = dataMap.get("cartCount") != null
                ? Integer.parseInt(Objects.requireNonNull(AppApplication.getInstance().dataMap.get("cartCount"))) - cart.count
                : 0;
        dataMap.put("cartCount", String.valueOf(count));
        // 删除数据库中数据
        taoBaoDBHelper.deleteCartByProductId(cart.productId);
    }

    private void setContainerVisibility() {
        LinearLayout contentContainer = findViewById(R.id.content_container);
        LinearLayout emptyContainer = findViewById(R.id.empty_container);

        List<Cart> list = taoBaoDBHelper.selectAllCart();
        if (list.size() == 0) {
            emptyContainer.setVisibility(View.VISIBLE);
            contentContainer.setVisibility(View.GONE);
            return;
        }

        emptyContainer.setVisibility(View.GONE);
        contentContainer.setVisibility(View.VISIBLE);
    }

    private void renderCartList() {
        LinearLayout cartContainer = findViewById(R.id.cart_container);

        List<Cart> list = taoBaoDBHelper.selectAllCart();
        setContainerVisibility();

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

            // 设置商品点击事件
            view.setOnClickListener(view1 -> {
                Intent intent = new Intent(this, ProductDetailActivity.class);
                intent.putExtra("productId", product.id);
                startActivity(intent);
            });

            // 设置商品长按事件
            view.setOnLongClickListener(view1 -> {
                AlertDialog.Builder builder = new AlertDialog.Builder(this);
                builder.setMessage("是否从购物车删除" + product.name + "?");
                builder.setPositiveButton("是", (dialog, which) -> {
                    // 移除当前视图
                    cartContainer.removeView(view);
                    // 删除数据库中的数据
                    deleteCart(cart);
                    // 刷新商品数量
                    initCartCount();
                    // 刷新购物车总金额
                    refreshTotalPrice();
                    // 刷新布局
                    setContainerVisibility();
                    Toast.makeText(this, "已从购物车删除" + product.name, Toast.LENGTH_SHORT).show();
                });
                builder.setNegativeButton("否", (dialog, which) -> {

                });
                builder.show();

                return true;
            });

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