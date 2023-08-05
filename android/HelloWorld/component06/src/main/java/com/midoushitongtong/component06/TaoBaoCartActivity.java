package com.midoushitongtong.component06;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import com.midoushitongtong.component06.adapter.CartAdapter;
import com.midoushitongtong.component06.database.TaoBaoDBHelper;
import com.midoushitongtong.component06.entity.Cart;
import com.midoushitongtong.component06.entity.Product;

import java.util.HashMap;
import java.util.List;
import java.util.Objects;

public class TaoBaoCartActivity extends AppCompatActivity {
    private TaoBaoDBHelper taoBaoDBHelper;
    private TextView cartCountTextView;
    private CartAdapter cartAdapter;

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
            // 通知 adapter 数据发生变化, 需要刷新视图
            cartAdapter.notifyDataSetChanged();
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
        ListView cartListContainer = findViewById(R.id.cart_list_container);

        List<Cart> cartList = taoBaoDBHelper.selectAllCart();

        setContainerVisibility();

        for (Cart cart : cartList) {
            Product product = taoBaoDBHelper.selectProductById(cart.productId);
            cart.product = product;
        }

        // 设置 adapter
        cartAdapter = new CartAdapter(this, cartList);
        cartListContainer.setAdapter(cartAdapter);

        // 添加点击事件
        cartListContainer.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent intent = new Intent(TaoBaoCartActivity.this, ProductDetailActivity.class);
                intent.putExtra("productId", cartList.get(position).product.id);
                startActivity(intent);
            }
        });

        // 添加长按事件
        cartListContainer.setOnItemLongClickListener(new AdapterView.OnItemLongClickListener() {
            @Override
            public boolean onItemLongClick(AdapterView<?> parent, View view, int position, long id) {
                Cart cart = cartList.get(position);
                AlertDialog.Builder builder = new AlertDialog.Builder(TaoBaoCartActivity.this);
                builder.setMessage("是否从购物车删除" + cart.product.name + "?");
                builder.setPositiveButton("是", (dialog, which) -> {
                    // 从列表删除数据
                    cartList.remove(position);
                    // 通知 adapter 数据发生变化, 需要刷新视图
                    cartAdapter.notifyDataSetChanged();
                    // 删除数据库中的数据
                    deleteCart(cart);
                    // 刷新商品数量
                    initCartCount();
                    // 刷新购物车总金额
                    refreshTotalPrice();
                    // 刷新布局
                    setContainerVisibility();
                    Toast.makeText(TaoBaoCartActivity.this, "已从购物车删除" + cart.product.name, Toast.LENGTH_SHORT).show();
                });
                builder.setNegativeButton("否", (dialog, which) -> {
                });
                builder.show();

                return true;
            }
        });

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