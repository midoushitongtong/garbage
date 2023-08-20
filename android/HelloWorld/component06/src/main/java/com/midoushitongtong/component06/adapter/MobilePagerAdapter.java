package com.midoushitongtong.component06.adapter;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;

import com.midoushitongtong.component06.entity.Product;
import com.midoushitongtong.component06.fragment.DynamicFragment;

import java.util.List;

public class MobilePagerAdapter extends FragmentPagerAdapter {
    private List<Product> productList;

    public MobilePagerAdapter(@NonNull FragmentManager fragmentManager, List<Product> productList) {
        // 懒加载
        super(fragmentManager, BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT);
        this.productList = productList;
    }

    @NonNull
    @Override
    public Fragment getItem(int position) {
        Product product = productList.get(position);
        return DynamicFragment.newInstance(position, product.pic, product.name);
    }

    @Override
    public int getCount() {
        return productList.size();
    }

    @Nullable
    @Override
    public CharSequence getPageTitle(int position) {
        return productList.get(position).name;
    }
}
