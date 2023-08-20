package com.example.component04;

import android.app.Application;
import android.content.res.Configuration;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Environment;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.room.Room;

import com.example.component04.database.BookDatabase;
import com.example.component04.database.TaoBaoDBHelper;
import com.example.component04.entity.Product;
import com.example.component04.util.FileUtil;
import com.example.component04.util.SharedUtil;

import java.io.File;
import java.util.HashMap;
import java.util.List;

public class AppApplication extends Application {
    private static AppApplication appApplication;
    // 全局变量
    public HashMap<String, String> dataMap = new HashMap<>();
    // 数据库对象
    private BookDatabase bookDatabase;

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
        bookDatabase = Room.databaseBuilder(this, BookDatabase.class, "book")
                // 允许迁移数据库 (发生数据库变更的时候, Room 默认会删除原来的数据库，如此一来数据就丢失了，故要改为迁移的方式保留之前的数据)
                .allowMainThreadQueries()
                // 允许在主线程中操作数据库 (Room 默认不允许在主线程中操作数据库)
                .allowMainThreadQueries()
                .build();

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

    public BookDatabase getBookDatabase() {
        return bookDatabase;
    }
}
