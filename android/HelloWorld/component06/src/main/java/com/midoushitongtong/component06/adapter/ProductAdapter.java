package com.midoushitongtong.component06.adapter;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.midoushitongtong.component06.ProductDetailActivity;
import com.midoushitongtong.component06.R;
import com.midoushitongtong.component06.entity.Product;

import java.util.List;

public class ProductAdapter extends BaseAdapter {
    private Context context;
    private List<Product> productList;
    private ProductAdapterListener productAdapterListener;

    public ProductAdapter(Context context, List<Product> productList, ProductAdapterListener productAdapterListener) {
        this.context = context;
        this.productList = productList;
        this.productAdapterListener = productAdapterListener;
    }

    @Override
    public int getCount() {
        return productList.size();
    }

    @Override
    public Object getItem(int position) {
        return productList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        Product product = productList.get(position);
        ViewHolder viewHolder;

        if (convertView == null) {
            // 将布局文件转成转换试图
            convertView = LayoutInflater.from(context).inflate(R.layout.item_product, null);
            // 获取组件
            viewHolder = new ViewHolder();
            viewHolder.picImageView = convertView.findViewById(R.id.pic_image_view);
            viewHolder.nameTextView = convertView.findViewById(R.id.name_text_view);
            viewHolder.priceTextView = convertView.findViewById(R.id.price_text_view);
            viewHolder.addCartButton = convertView.findViewById(R.id.add_cart_button);
            convertView.setTag(viewHolder);
        } else {
            viewHolder = (ViewHolder) convertView.getTag();
        }

        Log.d("debug", product.toString());
        
        // 设置组件数据
        viewHolder.picImageView.setImageURI(Uri.parse(product.picPath));
        viewHolder.nameTextView.setText(product.name);
        viewHolder.priceTextView.setText(String.valueOf(product.price));
        // 购物车点击事件
        viewHolder.addCartButton.setOnClickListener(view -> {
            productAdapterListener.addToCart(product.id, product);
        });
        // 图片点击事件
        viewHolder.picImageView.setOnClickListener(view -> {
            Intent intent = new Intent(context, ProductDetailActivity.class);
            intent.putExtra("productId", product.id);
            context.startActivity(intent);
        });

        return convertView;
    }

    private final class ViewHolder {
        public ImageView picImageView;
        public TextView nameTextView;
        public TextView priceTextView;
        public Button addCartButton;
    }

    // adapter 监听器
    public interface ProductAdapterListener {
        void addToCart(int productId, Product product);
    }
}
