package com.example.component04.database;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.example.component04.entity.Cart;
import com.example.component04.entity.Product;

import java.util.ArrayList;
import java.util.List;

public class TaoBaoDBHelper extends SQLiteOpenHelper {
    private static final String DB_NAME = "taobao.db";
    // 商品信息表
    private static final String PRODUCT_TABLE_NAME = "product";
    // 购物车信息表
    private static final String CART_TABLE_NAME = "cart";
    private static final int DB_VERSION = 1;
    private static TaoBaoDBHelper dbHelper = null;
    private SQLiteDatabase readDB = null;
    private SQLiteDatabase writeDB = null;

    private TaoBaoDBHelper(Context context) {
        super(context, DB_NAME, null, DB_VERSION);
    }

    public static TaoBaoDBHelper getInstance(Context context) {
        if (dbHelper == null) {
            dbHelper = new TaoBaoDBHelper(context);
        }
        return dbHelper;
    }

    public void insertProduct(List<Product> list) {
        try {
            writeDB.beginTransaction();
            for (Product product : list) {
                ContentValues values = new ContentValues();
                values.put("name", product.name);
                values.put("description", product.description);
                values.put("price", product.price);
                values.put("pic_path", product.picPath);
                writeDB.insert(PRODUCT_TABLE_NAME, null, values);
            }
            writeDB.setTransactionSuccessful();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            writeDB.endTransaction();
        }
    }

    public List<Product> selectAllProduct() {
        List<Product> list = new ArrayList<>();
        Cursor cursor = readDB.rawQuery("SELECT * FROM " + PRODUCT_TABLE_NAME, null);
        while (cursor.moveToNext()) {
            Product product = new Product();
            product.id = cursor.getInt(0);
            product.name = cursor.getString(1);
            product.description = cursor.getString(2);
            product.price = cursor.getFloat(3);
            product.picPath = cursor.getString(4);
            list.add(product);
        }
        cursor.close();
        return list;
    }

    public List<Cart> selectAllCart() {
        List<Cart> list = new ArrayList<>();
        Cursor cursor = readDB.rawQuery("SELECT * FROM " + CART_TABLE_NAME, null);
        while (cursor.moveToNext()) {
            Cart product = new Cart();
            product.id = cursor.getInt(0);
            product.productId = cursor.getInt(1);
            product.count = cursor.getInt(2);
            list.add(product);
        }
        cursor.close();
        return list;
    }

    public int selectCartCount() {
        int count = 0;

        String sql = "SELECT SUM(count) FROM " + CART_TABLE_NAME;
        Cursor cursor = readDB.rawQuery(sql, null);
        if (cursor.moveToNext()) {
            count = cursor.getInt(0);
        }
        cursor.close();

        return count;
    }

    public Cart selectCartById(int productId) {
        Cursor cursor = readDB.query(CART_TABLE_NAME, null, "product_id=?", new String[]{String.valueOf(productId)}, null, null, null);
        Cart cart = null;
        if (cursor.moveToNext()) {
            cart = new Cart();
            cart.id = cursor.getInt(0);
            cart.productId = cursor.getInt(1);
            cart.count = cursor.getInt(2);
        }
        cursor.close();
        return cart;
    }

    public void insertCart(int productId) {
        Cart cart = selectCartById(productId);
        ContentValues values = new ContentValues();
        if (cart == null) {
            // 如果购物车不存在商品，则插入
            values.put("product_id", productId);
            values.put("count", 1);
            writeDB.insert(CART_TABLE_NAME, null, values);
        } else {
            // 如果购物车存在商品，则更新
            values.put("count", cart.count + 1);
            writeDB.update(CART_TABLE_NAME, values, "id=?", new String[]{String.valueOf(cart.id)});
        }
    }

    // 打开数据库读连接
    public SQLiteDatabase openReadLink() {
        if (readDB == null || !readDB.isOpen()) {
            readDB = dbHelper.getReadableDatabase();
        }
        return readDB;
    }

    // 打开数据库写连接
    public SQLiteDatabase openWriteLink() {
        if (writeDB == null || !writeDB.isOpen()) {
            writeDB = dbHelper.getWritableDatabase();
        }
        return writeDB;
    }

    // 关闭数据库连接
    public void close() {
        if (readDB != null && readDB.isOpen()) {
            readDB.close();
            readDB = null;
        }
        if (writeDB != null && writeDB.isOpen()) {
            writeDB.close();
            writeDB = null;
        }
    }

    // 创建数据库，执行建表语句
    @Override
    public void onCreate(SQLiteDatabase db) {
        String productSQL =
                "CREATE TABLE IF NOT EXISTS " + PRODUCT_TABLE_NAME + " (" +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
                    "name VARCHAR NOT NULL," +
                    "description VARCHAR NOT NULL," +
                    "price FLOAT NOT NULL," +
                    "pic_path VARCHAR NOT NULL" +
                ");";
        db.execSQL(productSQL);

        String cartSQL =
                "CREATE TABLE IF NOT EXISTS " + CART_TABLE_NAME + " (" +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
                    "product_id INTEGER NOT NULL," +
                    "count INTEGER NOT NULL" +
                ");";
        db.execSQL(cartSQL);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

    }
}
