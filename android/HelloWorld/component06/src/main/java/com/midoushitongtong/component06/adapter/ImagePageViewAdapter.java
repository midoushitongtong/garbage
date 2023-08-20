package com.midoushitongtong.component06.adapter;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.viewpager.widget.PagerAdapter;

import com.midoushitongtong.component06.entity.Product;

import java.util.ArrayList;
import java.util.List;

public class ImagePageViewAdapter extends PagerAdapter {
    private final Context context;
    private final ArrayList<Product> products;
    private List<ImageView> imageViews = new ArrayList<>();

    public ImagePageViewAdapter(Context context, ArrayList<Product> products) {
        this.context = context;
        this.products = products;
        for (Product product : products) {
            ImageView imageView = new ImageView(context);
            imageView.setImageResource(product.pic);
            imageView.setLayoutParams(new ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.WRAP_CONTENT
            ));
            imageView.setScaleType(ImageView.ScaleType.FIT_CENTER);
            imageViews.add(imageView);
        }
    }

    @Override
    public int getCount() {
        return imageViews.size();
    }

    @Override
    public boolean isViewFromObject(@NonNull View view, @NonNull Object object) {
        // 通过返回的 tag 来判断 view 和 object 是否有关联
        return view == object;
    }

    @NonNull
    @Override
    public Object instantiateItem(@NonNull ViewGroup container, int position) {
        ImageView imageView = imageViews.get(position);
        // 将试图添加到容器中
        container.addView(imageView);
        // 返回当前 item 的 tag
        return imageView;
    }

    @Override
    public void destroyItem(@NonNull ViewGroup container, int position, @NonNull Object object) {
        // 将试图从容器中删除
        container.removeView(imageViews.get(position));
    }

    @Nullable
    @Override
    public CharSequence getPageTitle(int position) {
        return products.get(position).name;
    }
}
