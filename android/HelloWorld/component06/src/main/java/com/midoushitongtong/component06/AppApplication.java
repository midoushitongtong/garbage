package com.midoushitongtong.component06;

import android.app.Application;
import android.content.res.Configuration;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Environment;
import android.util.Log;

import androidx.annotation.NonNull;

import com.midoushitongtong.component06.database.TaoBaoDBHelper;
import com.midoushitongtong.component06.entity.Product;
import com.midoushitongtong.component06.util.FileUtil;
import com.midoushitongtong.component06.util.SharedUtil;

import java.io.File;
import java.util.HashMap;
import java.util.List;

public class AppApplication extends Application {
    private static AppApplication appApplication;
    // 全局变量
    public HashMap<String, String> dataMap = new HashMap<>();

    public static AppApplication getInstance() {
        return appApplication;
    }

    private void initProduct() {
        boolean isFirst = SharedUtil.getInstance(this).readBoolean("first", true);
        if (isFirst) {
            List<Product> productList = Product.getDefaultList();
            for (Product product : productList) {
                Bitmap bitmap = BitmapFactory.decodeResource(getResources(), product.pic);
                String path = getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS).toString() + File.separator + product.id + "jpg";
                FileUtil.saveImage(path, bitmap);
                bitmap.recycle();
                product.picPath = path;
            }

            // 初始化数据库中的商品数据
            TaoBaoDBHelper taobaoDBHelper = TaoBaoDBHelper.getInstance(this);
            taobaoDBHelper.insertProduct(productList);

            // 保存 "是否首次打开" 为 false
            SharedUtil.getInstance(this).writeBoolean("first", false);
        }
    }

    // App 启动时调用
    @Override
    public void onCreate() {
        super.onCreate();
        appApplication = this;

        TaoBaoDBHelper taobaoDBHelper = TaoBaoDBHelper.getInstance(this);
        taobaoDBHelper.openReadLink();
        taobaoDBHelper.openWriteLink();

        initProduct();

        Log.d("debug", "AppApplication: onCreate");
    }

    // App 终止时调用
    @Override
    public void onTerminate() {
        super.onTerminate();
        TaoBaoDBHelper.getInstance(this).close();
        Log.d("debug", "AppApplication: onTerminate");
    }

    // 配置改变时调用
    // 例如竖屏变为横屏
    @Override
    public void onConfigurationChanged(@NonNull Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Log.d("debug", "AppApplication: onConfigurationChanged");
    }

}
