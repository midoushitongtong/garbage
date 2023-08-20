package com.midoushitongtong.component06.adapter;

import android.content.Context;
import android.net.Uri;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.midoushitongtong.component06.R;
import com.midoushitongtong.component06.entity.Cart;
import com.midoushitongtong.component06.entity.Product;

import java.util.List;

public class CartAdapter extends BaseAdapter {
    private Context context;
    private List<Cart> cartList;
    public final class ViewHolder {
        public ImageView picImageView;
        public TextView nameTextView;
        public TextView descTextView;
        public TextView countTextView;
        public TextView priceTextView;
        public TextView sumTextView ;
    }

    public CartAdapter(Context context, List<Cart> cartList) {
        this.context = context;
        this.cartList = cartList;
    }

    @Override
    public int getCount() {
        return cartList.size();
    }

    @Override
    public Object getItem(int position) {
        return cartList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        Cart cart = cartList.get(position);

        ViewHolder viewHolder;
        if (convertView == null) {
            viewHolder = new ViewHolder();
            convertView = LayoutInflater.from(context).inflate(R.layout.item_cart, null);
            viewHolder.picImageView = convertView.findViewById(R.id.pic_image_view);
            viewHolder.nameTextView = convertView.findViewById(R.id.name_text_view);
            viewHolder.descTextView = convertView.findViewById(R.id.desc_text_view);
            viewHolder.countTextView = convertView.findViewById(R.id.count_text_view);
            viewHolder.priceTextView = convertView.findViewById(R.id.price_text_view);
            viewHolder.sumTextView = convertView.findViewById(R.id.sum_text_view);
            convertView.setTag(viewHolder);
        } else {
            viewHolder = (ViewHolder) convertView.getTag();
        }

        viewHolder.picImageView.setImageURI(Uri.parse(cart.product.picPath));
        viewHolder.nameTextView.setText(cart.product.name);
        viewHolder.descTextView.setText(cart.product.description);
        viewHolder.countTextView.setText(String.valueOf(cart.count));
        viewHolder.priceTextView.setText(String.valueOf(cart.product.price));
        viewHolder.sumTextView.setText(String.valueOf(cart.product.price * cart.count));

        return convertView;
    }
}
