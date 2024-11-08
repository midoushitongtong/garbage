package com.midoushitongtong.component06.entity;

import com.midoushitongtong.component06.R;

import java.util.ArrayList;

public class Product {

    public int id;
    // 名称
    public String name;
    // 描述
    public String description;
    // 价格
    public float price;
    // 大图的保存路径
    public String picPath;
    // 大图的资源编号
    public int pic;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getPicPath() {
        return picPath;
    }

    public void setPicPath(String picPath) {
        this.picPath = picPath;
    }

    public int getPic() {
        return pic;
    }

    public void setPic(int pic) {
        this.pic = pic;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", picPath='" + picPath + '\'' +
                ", pic=" + pic +
                '}';
    }

    // 获取默认的手机信息列表
    public static ArrayList<Product> getDefaultList() {

        // 声明一个手机商品的名称数组
        String[] mNameArray = {
                "iPhone11", "Mate30", "小米10", "OPPO Reno3", "vivo X30"
        };
        // 声明一个手机商品的描述数组
        String[] mDescArray = {
                "Apple iPhone11 256GB 绿色 4G全网通手机",
                "华为 HUAWEI Mate30 8GB+256GB 丹霞橙 5G全网通 全面屏手机",
                "小米 MI10 8GB+128GB 钛银黑 5G手机 游戏拍照手机",
                "OPPO Reno3 8GB+128GB 蓝色星夜 双模5G 拍照游戏智能手机",
                "vivo X30 8GB+128GB 绯云 5G全网通 美颜拍照手机"
        };
        // 声明一个手机商品的价格数组
        float[] mPriceArray = {6299, 4999, 3999, 2999, 2998, 2399};
        // 声明一个手机商品的大图数组
        int[] mPicArray = {
            R.drawable.iphone, R.drawable.huawei, R.drawable.xiaomi,
            R.drawable.oppo, R.drawable.vivo, R.drawable.rongyao
        };

        ArrayList<Product> productList = new ArrayList<Product>();
        for (int i = 0; i < mNameArray.length; i++) {
            Product info = new Product();
            info.id = i;
            info.name = mNameArray[i];
            info.description = mDescArray[i];
            info.price = mPriceArray[i];
            info.pic = mPicArray[i];
            productList.add(info);
        }
        return productList;
    }
}
